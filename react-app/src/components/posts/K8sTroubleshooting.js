import React, { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import '../../styles/post.css';
import SecureLock from '../../assets/images/secure-on-chalkboard-with-locks.jpg';
import CollapsibleSection from '../CollapsibleSection';
import BlogPostIndentedParagraph from "../BlogPostIndentedParagraph";
import CodeBlock from "../CodeBlock";
import {Link} from "react-router-dom";

function K8sTroubleshooting() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={SecureLock} alt="SecureLock" />

            <CollapsibleSection title="K8s Cluster Error Logs (~1min)">
                <BlogPostIndentedParagraph>
                    This blog post is an extension to another blog post where I cover how to create a K8s Cluster and K8s Node:
                    <Link to="/post/k8s-cluster-and-node">K8s Troubleshooting</Link>.
                    The very first thing to understand, is that when deploying a K8s Cluster with <strong>kubeadm</strong>
                    binary, most the pods are statically controlled by kubelet; i.e. they don't run as the legacy method
                    of isolated systemd services (e.g. kube-apiserver, kube-controller-manager, kube-scheduler). Instead <strong>kubelet</strong>
                    does all management and coordination for us. This simplifies the amount of places where we need to look for errors.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    So, start checking any errors detect by <strong>kubelet</strong>:
                    <CodeBlock language={"bash"}>
                        journalctl -xeu kubelet
                    </CodeBlock>
                    The chances of any errors encountered by your K8s Cluster, or Node, being found under the kubelet daemon logs is
                    really high, so, make sure to carefully read the error logs there.

                    Depending on what you see it can take on a few searching paths. I will share a few errors I encountered later on, but first,
                    I'll share how to remove the K8s Cluster deployment and subresources if you wish to cancel this whole deployment, or if wish to retry
                    re-deploying a fresh-state cluster after you found out the root cause of the errors.
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

            <CollapsibleSection title="Remove K8s Cluster and dependencies (~1min)">
                <BlogPostIndentedParagraph>
                    In order to fully delete the K8s Cluster resources, sub-resources, and most of its deployed configs and components, you can run this commands:
                    <CodeBlock language={"bash"}>
                        {`
                        # to remove kubeadm deployment
                        sudo kubeadm reset
                        # cleanup cni plugin
                        sudo rm -rf /etc/cni/net.d
                        # disable kubelet
                        sudo systemctl stop kubelet
                        sudo systemctl disable kubelet
                        # your api-server could still be running if partial deployment failed, check if api-server is up on any given port
                        ps aux | grep kube
                        # then kill the process
                        sudo kill -9 $pid
                        `}
                    </CodeBlock>
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

            <CollapsibleSection title="K8s Errors Encountered (~5min)">
                <BlogPostIndentedParagraph>
                    While setting up the K8s Cluster and Node, I encountered a few errors.
                    Both of the errors I encountered where caused by native OS security
                    services that enforce some restrictions.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    My K8s Cluster running on Ubuntu2404-LTS, was failing because <strong>containerd</strong>.
                    As previously mentioned, I started by dissecting <strong>kubelet logs</strong>. There, I saw this error:
                    <CodeBlock language={"bash"}>
                        {`
                        exit status 1: unable to signal init: permission denied\\n: unknown", failed to "KillPodSandbox" for "e0757c6c-fc52-47b4-aaa9-e35683a18aa9" with KillPodSandboxError: "rpc error: code = Unknown >
                        kill: runc did not terminate successfully: exit status 1: unable to signal init: permission denied\\\\n: unknown\\", failed to \\"KillPodSandbox\\" for
                        `}
                    </CodeBlock>
                    I noticed a few other errors related to permissions. I checked kubelet and containerd permissions, and they were both running with elevated and appropriate permissions.
                    <CodeBlock language="bash">
                        {`
                        ps -o user= -p $(pidof kubelet)
                        ps -o user= -p $(pidof containerd)
                        `}
                    </CodeBlock>
                    The problem was AppArmor service that runs on Ubuntu. I checked the AppArmor service logs for any logs showing <strong>DENIED</strong>:
                    <CodeBlock language="bash">
                        cat /var/log/syslog | grep DENIED
                    </CodeBlock>
                    Turns out there were quite a few for containerd:
                    <CodeBlock language="bash">
                        {`
                        kernel: audit: type=1400 audit(1717192856.240:191): apparmor="DENIED" operation="signal" 
                        class="signal" profile="cri-containerd.apparmor.d" pid=288071 
                        comm="runc" requested_mask="receive" denied_mask="receive" signal=kill peer="runc"
                        `}
                    </CodeBlock>
                    Knowing, the root cause of the problem I found out that containerd was getting restrained by AppArmor. One way to solve this was to
                    disable AppArmor for the containerd service (there might be better ways to do this, like just make sure that AppArmor complains about it,
                    but doesn't deny it, but those are outside of this scope).
                    This can be done by editing the containerd config file <strong>/etc/containerd/config.toml</strong> and replacing this <strong>disable_apparmor</strong> for true:
                    <CodeBlock>
                        disable_apparmor = false => true
                    </CodeBlock>
                    Then, restart containerd and kubelet:
                    <CodeBlock language="bash">
                        {`
                        systemctl restart containerd
                        systemctl restart kubelet
                        `}
                    </CodeBlock>
                    That did it for me.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Another error I encountered during this exercise was when trying to join a RHEL9 Node to the K8s Cluster.
                    In this particular case the RHEL9 Node was failing because SELinux by default enforces some port policies
                    that restrict which ports are open.

                    I managed to solve this issue, by opening the listening port of 6443. This is the most important port that needs to be open on a Node,
                    as it is used by kubeadm join and the Kubernetes kubelet service to communicate with the Kubernetes API server on the master node(s).

                    The commands to do such thing on RHEL9 are:
                    <CodeBlock language="bash">
                        {`
                        sudo firewall-cmd --zone=public --permanent --add-port=6443/tcp
                        sudo firewall-cmd --reload
                        `}
                    </CodeBlock>
                    This will open the necessary ports on your K8s Node, then restart the kubelet service.
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

        </article>
    );
}

export default K8sTroubleshooting;