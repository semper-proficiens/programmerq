import React, { useContext } from 'react';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import '../../../styles/post.css';
import SecureLock from '../../../assets/images/secure-on-chalkboard-with-locks.jpg';
import CollapsibleSection from '../../CollapsibleSection';
import BlogPostIndentedParagraph from "../../BlogPostIndentedParagraph";
import CodeBlock from "../../CodeBlock";
import {Link} from "react-router-dom";

function TroubleshootTeleportNodeJoinOnRhel9() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={SecureLock} alt="SecureLock" />

            <CollapsibleSection title="Troubleshoot Teleport Node Join on RHEL9 (~2min)">
                <BlogPostIndentedParagraph>
                    This blog is made as a troubleshooting guide for users following the Teleport Simple Setup self-hosted
                    blog <Link to="/post/teleport-simple-setup">Teleport Simple Setup Self-Hosted</Link>.
                    While attempting to make a RHEL9 Server (Node in Teleport lingo) join the Teleport Cluster, I faced an issue
                    when I'd try to SSH into the RHEL9 server (it had joined Teleport already, so it showed in the GUI).
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    It seems like the Teleport Cluster couldn't utilize the direct dial route of the established connection on
                    port 3022. In other words, it seems the teleport agent connection to my Cluster was fine, but the Teleport
                    Cluster couldn't use that connection back to the Node.

                    This is the error I was getting:
                    <CodeBlock language={"bash"}>
                        {`
                        User Message: failed connecting to host $hostname:0: failed to receive cluster details response
                                failed to dial target host
                                Teleport proxy failed to connect to &#34;node&#34; agent &#34;$nodeIP:3022&#34; over direct dial:
                        
                          dial tcp $nodeIP:3022: connect: no route to host
                          
                        This usually means that the agent is offline or has disconnected. Check the
                        agent logs and, if the issue persists, try restarting it or re-registering it
                        with the cluster.
                        `}
                    </CodeBlock>
                    The issue seems to be client side (Node) and it was.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    It seems like RHEL9 system comes with some strict firewall rules by default. My RHEL9 server runs on ProxMox as a VM.
                    This VM has an ipv4 address on a specific interface. In RHEL9, to find out which firewall rules exist on a given ip interface you need to
                    find out in which zone it exists first.

                    <CodeBlock language={"bash"}>
                        firewall-cmd --get-active-zones
                    </CodeBlock>

                    A common active zone is <strong>public</strong>. It was in my case, so, I ran this next:
                    <CodeBlock language={"bash"}>
                        firewall-cmd --zone=public --list-all
                    </CodeBlock>

                    The output from this command showed my that no port was open. In my case, it seemed like Teleport Cluster needed 3022 open
                    on the Node side to be able to establish a connection. So, I opened that port in the firewall:
                    <CodeBlock language={"bash"}>
                        firewall-cmd --zone=public --add-port=3022/tcp --permanent
                    </CodeBlock>

                    Running the previous command to see all ports again now showed port 3022. The moment I did that my connection to the joined Teleport Node
                    on RHEL9 worked again.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Note that in most common implementation of Teleport no ports need to be open, but in this one case it did because we're advertising a private ip and it's direct dialing
                    to that Node on the port it used to establish the outbound connection: 3022.
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

        </article>
    );
}

export default TroubleshootTeleportNodeJoinOnRhel9;