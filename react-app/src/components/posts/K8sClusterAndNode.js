import React, { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import '../../styles/post.css';
import SecureLock from '../../assets/images/secure-on-chalkboard-with-locks.jpg';
import CollapsibleSection from '../CollapsibleSection';
import BlogPostIndentedParagraph from "../BlogPostIndentedParagraph";
import CodeBlock from "../CodeBlock";
import {Link} from "react-router-dom";

function K8sClusterAndNode() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={SecureLock} alt="SecureLock" />

            <CollapsibleSection title="Context for the K8s Controller and Node (~1min)">
                <BlogPostIndentedParagraph>
                    You can use your preferred virtualization software for VMs running on your self-hosted Server(s).
                    I like ProxMox and that's what I'll be using for this example. You don't have to, and can simply use another
                    software like VMWare (make sure it's supported by your Server(s), I tried to use a specific VMWare version
                    in my servers, and I couldn't because some of them are too old and don't support it, so, make sure you do your homework there first).
                    The K8s Controller and Node will run on an Ubuntu2404-LTS VM.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Proxmox has its own native Container Solution, but in this case we're not using it. We'll be spinning up
                    2 VMs: 1 K8s Controller and 1 K8s Node. Have at least 2 VMs in ProxMox ready. Also, you will need a container runtime.
                    I chose to use <strong>containerd</strong>.
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

            <CollapsibleSection title="Configuring the K8s Controller and Node (~3min)">
                <BlogPostIndentedParagraph>
                    Both the K8s Controller and Node share similar config up to a certain point.
                    You can run these commands on both VMs:
                    <CodeBlock language={"bash"}>
                        {`
                        sudo apt install containerd -y
                        sudo mkdir /etc/containerd
                        containerd config default | sudo tee /etc/containerd/config.toml
                        `}
                    </CodeBlock>
                    Now that we have the containerd pkg and its config, let's make a few adjustments.
                    Let's start by opening the new created containerd config file (<strong>/etc/containerd/config.toml</strong>)
                    and change its SystemdCgroup to true:
                    <CodeBlock language={"bash"}>
                        SystemdCgroup = false => true
                    </CodeBlock>
                    Enable ipv4 forwarding on this linux machine by editing the <strong>/etc/sysctl.conf</strong> file
                    and uncommenting the line where <strong>net.ipv4.ip_forward=1</strong> attribute is defined.
                    This change basically sets up the Linux machine to act as a router or gateway, allowing it to forward
                    packets from one network interface to another.
                    <CodeBlock language={"bash"}>
                        {`
                        # Uncomment the next line to enable packet forwarding for IPv4
                        #net.ipv4.ip_forward=1 => net.ipv4.ip_forward=1
                        `}
                    </CodeBlock>
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Another important pre-requisite that can cause a lot of headache with K8s initialization is <strong>swap</strong>
                    configuration in your Linux machine. So, make sure to disable it. You can do this by opening the file
                    <strong>/etc/fstab</strong> and commenting any line(s) containing a swap:
                    <CodeBlock language={"bash"}>
                        /swap.img      none    swap    sw      0       0 => #/swap.img      none    swap    sw      0       0
                    </CodeBlock>
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Now, let's proceed to create file <strong>/etc/modules-load.d/k8s.conf</strong> and this value inside:
                    <CodeBlock language={"bash"}>
                        br_netfilter
                    </CodeBlock>
                    This will allow the Linux kernel's bridge to interact with iptables, enabling network packets that pass through the Linux bridge to be processed by iptables.
                    In simpler terms, K8s needs to be able to interact with iptables under the hood, which is essential for K8s Networking yto work properly.

                    Optionally, you can reboot your machine after this step to ensure all the networking config in the OS
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Next, we'll need to download and install the k8s binaries needed to install, configure, and manage our k8s Controller and Node.
                    You can run these commands to be able install the binaries:
                    <CodeBlock language={"bash"}>
                        {`
                        sudo apt-get install -y apt-transport-https ca-certificates curl gnupg
                        curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
                        sudo chmod 644 /etc/apt/keyrings/kubernetes-apt-keyring.gpg
                        echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
                        sudo chmod 644 /etc/apt/sources.list.d/kubernetes.list
                        sudo apt update -y
                        sudo apt-get install -y kubeadm kubectl kubelet
                        `}
                    </CodeBlock>
                    You have all the pre-requisites to configure a K8s Cluster and a Node up to this point.
                    You can create a template of this VM if you wish to quickly spin K8s Cluster or Node off the configuration you have created up to his point.
                    So, you can refer to this page where I explain how to do that in ProxMox:
                    <Link to="/post/proxmox-templates">ProxMox Template</Link>
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

            <CollapsibleSection title="Initialize a K8s Cluster (~5min)">
                <BlogPostIndentedParagraph>
                    With all the dependencies previously addressed, we're ready to start a K8s Cluster:
                    <CodeBlock language={"bash"}>
                        kubeadm init --control-plane-endpoint=$ip --node-name k8s-controller-frontend --pod-network-cidr=10.244.0.0/16 --v=5
                    </CodeBlock>
                    A few comments on above command:
                    <li>
                        --control-plane-endpoint: this is your Server (VM) ip. You can run something like <strong>ip a</strong> in a few Linux distros, to find out your own ip
                    </li>
                    <li>
                        --node-name: a Node will be created in your K8s Cluster with this name, and many resources in the cluster will append this to their name. So, choose wisely.
                    </li>
                    <li>
                        --pod-network-cidr: This is a crucial attribute. This should be a free range of ips that cluster controller can communicate with. None of the ips in this range
                        should overlap with any other ip. Also, through trial and error I found out that many Network Plugins (covered later) by default have the <strong>10.244.0.0/16</strong>
                        defined, and any deviation of this range would require extra manual steps (e.g. download the manifest and edit the CIDR ranges in the yaml), etc. So, highly advised that you stick
                        to this range if you can.
                    </li>
                    <li>
                        --v=5: quite a high lvl of verbosity, but, I like to watch deployment and catch any errors early on
                    </li>
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    If it all worked, you should see in your terminal suggested command to run like:
                    <CodeBlock language={"bash"}>
                        {`
                        mkdir -p $HOME/.kube
                        sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
                        sudo chown $(id -u):$(id -g) $HOME/.kube/config
                        `}
                    </CodeBlock>
                    Run them. There should also be a command similar to this:
                    <CodeBlock>
                        kubeadm join $ip:6443 --token $token --discovery-token-ca-cert-hash $hash
                    </CodeBlock>
                    Keep above command handy somewhere for immediate use on the Node.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    We've made it far, but, we're not done on the Cluster side yet.
                    If you run this:
                    <CodeBlock language={"bash"}>
                        kubectl get pods --all-namespaces
                    </CodeBlock>
                    Should see that at the very least 2 pods with name <strong>coredns</strong> aren't in <strong>Ready</strong> status.
                    The reason for this is because we have to add a supported CNI plugin (e.g. Calico, Flannel, Weave) on the Cluster.
                    Once the CNI plugin is successfully initiated, then your coredns pods will be ready. So, let's continue to install a
                    CNI plugin.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    I chose Flannel CNI Plugin because this is a homelab, is lightweight, compared to more robust implementations like Calico that come with lots of
                    additional features. So, let's add flannel CNI:
                    <CodeBlock language={"bash"}>
                        kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml
                    </CodeBlock>
                    These plugins yml repos tend to change a lot, if you encounter any issues make sure to search for the latest flannel
                    repo as instructed in the official K8s website.
                    If this worked, you should see at the very least one pod container the flannel daemon set in Ready status:
                    <CodeBlock language={"bash"}>
                        {`
                        NAMESPACE      NAME                                              READY   STATUS    RESTARTS   AGE
                        kube-flannel   kube-flannel-ds-27mbw                             1/1     Running   0          4h57m
                        `}
                    </CodeBlock>
                    If you re-run this:
                    <CodeBlock language={"bash"}>
                        kubectl get pods --all-namespaces
                    </CodeBlock>
                    You should see your coredns pods change to Pending, or Ready status, if it all worked.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    If it didn't, don't panic, it's quite common on freshly configured servers to fail the K8s Cluster
                    config, and that could be because of a myriad of reasons. I can't cover all potential causes, but
                    I can share some tips to troubleshoot your K8s Cluster errors. Check this other blog I created where I go over that
                    <Link to="/post/k8s-troubleshooting">K8s Troubleshooting</Link>
                </BlogPostIndentedParagraph>

            </CollapsibleSection>

            <CollapsibleSection title="Initialize a K8s Node (~3min)">
                <BlogPostIndentedParagraph>
                    Now, this part should be the simplest section of them all if all dependencies were taken care
                    of. If you still have you Node join command handy from previous section like:
                    <CodeBlock language={"bash"}>
                        kubeadm join $ip:6443 --token $token --discovery-token-ca-cert-hash $hash
                    </CodeBlock>
                    You can run in the Node you have prepared for joining. If you don't have the command handy, or if the
                    values expired (they do, you'll get a CA hash pin value error, or similar error), or if had to redeploy your
                    K8s Cluster for whatever reason, etc...you can just run this command on <strong>K8s Cluster Node</strong>:
                    <CodeBlock language={"bash"}>
                        sudo kubeadm token create --print-join-command
                    </CodeBlock>
                    This generates another Node join command to use on your <strong>K8s Node</strong>.
                    Once you run that command, you should see some stdout message that says Node joined.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    If this worked, on your <strong>K8s Controller Node</strong>, if you run:
                    <CodeBlock language={"bash"}>
                        kubectl get nodes
                    </CodeBlock>
                    You should see at the very least 2 Nodes: your K8s Controller Node, and your newly joined K8s Node.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    If it didn't, don't panic, it's quite common on freshly configured servers to fail the K8s
                    config, and that could be because of a myriad of reasons. I can't cover all potential causes, but
                    I can share some tips to troubleshoot your K8s Cluster, and some errors I encountered while doing this.
                    Check this other blog I created where I go over that
                    <Link to="/post/k8s-troubleshooting">K8s Troubleshooting</Link>
                </BlogPostIndentedParagraph>

            </CollapsibleSection>

        </article>
    );
}

export default K8sClusterAndNode;