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

            <CollapsibleSection title="K8s Error Encountered native OS Security (~5min)">
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

            <CollapsibleSection title="Rogue CNI plugin pod failing (~2mins)">
                <BlogPostIndentedParagraph>
                    In my deployments I was getting a rogue pod failing to properly start. So, I check my kubelet logs and I see:
                    <CodeBlock language="bash">
                        {`
                     kubelet[989]: "failed to do request: dial tcp $ip: connect: connection refused"
                    `}
                    </CodeBlock>
                    One way to check connectivity is to check how our CNI Plugin pods are doing. You can check those pods status like
                    this:
                    <CodeBlock language="bash">
                        {`
                         kubectl get pods -n kube-system
                        `}
                    </CodeBlock>
                    Depending on which CNI Plugin you used (Flannel, Calico, etc...) you will see a pod in status other than <bold>running</bold>.
                    One of my <bold>kube-proxy</bold> pods was failing:
                    <CodeBlock language="bash">
                        {`
                         # check my pod logs
                         kubectl logs kube-proxy-k9n64 -n kube-system
                         
                         # error msg
                         Error from server: Get "https://$ip:10250/containerLogs/kube-system/kube-proxy-k9n64/kube-proxy": dial tcp $ip:10250: connect: no route to host
                        `}
                    </CodeBlock>
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    I noticed the ip it was trying to reach no longer existed in my fleet, so, it was stuck in a failing state.
                    I just deleted the pod and more faulty pods in <bold>kube-system</bold> namespace.

                    However, this didn't solve the initial problem I had and how I came to notice the error message I saw in
                    my kubelet logs. Check next section if curious about that other issue (root cause in title).
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

            <CollapsibleSection title="Pod deployed in misconfigured Node (~1min)">
                <BlogPostIndentedParagraph>
                    I initially searched kubelet logs in the previous search to understand why one of the pods running my
                    frontend page was constantly failing to pull the Artifactory image (check the Artifactory setup blog to find
                    out how that CD part of the frontend page works).
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    What's interesting here, is that other pods are capable of pulling the private image from K8s just fine.
                    So, what's different about this pod? Even killing the pod will result in another pod getting created with same result.
                    Then, I proceeded to describe both pods to see what is different in their config.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Everything was exactly the same (they all take from the same deployment yaml after all), except one thing:
                    <bold>Node</bold>. Comparing the fault pod's Node to the healthy ones, I noticed the Node information was different.
                    In fact, it was pointing to a totally different Node. That's when I realized my deployment configuration wa snot restrictive
                    enough: it was deploying the pods to <bold>every node in the cluster</bold>. Ouch! I immediately knew what was wrong.
                    I had a dedicated Node for Artifactory pulling and such, but not every node is setup this way.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    How can we fix this? Well, one way of doing this is by instructing our deployment to deploy those pods only to Nodes that match
                    a criteria defined by us. There are more complex ways of establishing our criteria, but in my simple environment, Node labels are simple enough
                    to fix the issue. So, this is how we do it:
                    <CodeBlock language="bash">
                        {`
                         # on the Node you want the pods to deploy, run this
                         kubectl label node $nodeName $yourFilterKey=$yourFilterValue
                        `}
                    </CodeBlock>
                    You will now see that this Node has this label key/value pair if you describe it:
                    <CodeBlock language="bash">
                        {`
                         Labels:            beta.kubernetes.io/arch=amd64
                                            beta.kubernetes.io/os=linux
                                            kubernetes.io/arch=amd64
                                            kubernetes.io/hostname=$nodeName
                                            kubernetes.io/os=linux
                                            $yourKeyFilter=$yourKeyValue
                        `}
                    </CodeBlock>
                    All that's left now is to add this filter in our deployment to make sure our desired pods deploy only there, and not in another Node.
                    You can update your deployment yaml by adding this line in the spec (we only care <bold>nodeSelector</bold>, but added the rest so you see where it goes
                    in the yaml):
                    <CodeBlock language="yaml">
                        {`
                         spec:
                            containers:
                            - name: $name
                              image: $image
                              imagePullPolicy: $policy
                              ports:
                              - containerPort: $port
                            imagePullSecrets:
                            - name: $name
                            nodeSelector:
                              $yourKeyFilter: $yourValueFilter
                        `}
                    </CodeBlock>
                    After edit your deployment with nodeSelector, you can just apply the deployment with the updated file, and it should deploy the pods in your
                    defined Node. That fixed my Node config problem with the frontend pods.
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

            <CollapsibleSection title="Containerd and Kubelet in deprecated mode (~3min)">
                <BlogPostIndentedParagraph>
                    Here goes another error I recently encountered. I automated my Jenkins pipeline to update
                    the K8s deployment to a given UUID image (generated during build). I check my pipeline status
                    and is all good: no errors and the deployment logs show containers are getting rolled out. But, when I hit
                    my webpage, I don't see the new commit changes. I thought, maybe it is the browser caching data? But no,
                    an incognito session proved me wrong.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    I continue to describe my pods to make sure they're successfully retrieving the image UUID, and they are.
                    I checked Artifactory and downloads count is incrementing. So, images are getting pulled, I thought routing within the cluster is
                    incorrect. So, I checked my deployed service and I see that the service endpoints match my pods ips. So, that's not it.
                    Then, I went the source of all k8s: kubelet logs.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    In kubelet logs is where I see finally some errors. I see <bold>containerd</bold> failing to delete a given image in a loop.
                    I check containerd logs and I see same errors. So, I check containerd images and even try to delete a few manually:
                    <CodeBlock language="bash">
                        {`
                        sudo crictl images
                        
                        #attempt to manually remove an image
                        sudo crictl rmi $image
                        `}
                    </CodeBlock>
                    But I couldn't delete it:
                    <CodeBlock language="bash">
                        {`
                        WARN[0000] image connect using default endpoints: [unix:///run/containerd/containerd.sock unix:///run/crio/crio.sock unix:///var/run/cri-dockerd.sock]. 
                        As the default settings are now deprecated, you should set the endpoint instead.
                        ERRO[0000] no such image $image
                        FATA[0000] unable to remove the image(s)
                        `}
                    </CodeBlock>
                    So, I follow the advice of passing the endpoint in the command, but that didn't help:
                    <CodeBlock language="bash">
                        {`
                        sudo crictl --runtime-endpoint unix:///run/containerd/containerd.sock rmi $image
                        ERRO[0000] no such image $image
                        FATA[0000] unable to remove the image(s)
                        `}
                    </CodeBlock>
                    So, I'm really confused at this point as to what to do, and google search on github issues almost took me into
                    the wrong rabbit hole path.
                    <br/>
                    Then, what fixed it? Restart containerd and kubelet services.....It seems like containerd, my container runtime
                    for k8s, was stock trying to delete a corrupt old image (not sure why), and it was causing to not rollout containers in the pods,
                    even when the new image was correctly being pulled.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Sorry, maybe you were expecting something more exciting as the solution? Nope, sometimes systems run
                    in an unhealthy loop.
                    That's why the <bold>IT Crowd</bold> recording works so well: <i>"Have you tried turning
                    it off and on again?"</i><span role="img" aria-label="smiling and sweating">😅</span>
                </BlogPostIndentedParagraph>

            </CollapsibleSection>

        </article>
    );
}

export default K8sTroubleshooting;