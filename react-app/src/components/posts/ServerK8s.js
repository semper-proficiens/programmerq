import React, { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import '../../styles/post.css';
import SecureLock from '../../assets/images/secure-on-chalkboard-with-locks.jpg';
import CollapsibleSection from '../CollapsibleSection';
import BlogPostIndentedParagraph from "../BlogPostIndentedParagraph";
import CodeBlock from "../CodeBlock";
import ExternalLink from "../ExternalLink";

function SecureHosting() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={SecureLock} alt="SecureLock" />

            <CollapsibleSection title="K8s Controller and Node (~1min)">
                <BlogPostIndentedParagraph>
                    You can use your preferred virtualization softare for VMs runnign on your self-hosted Server(s).
                    I like ProxMox and that's what I'll be using for this example. You don't have to, and can simply another
                    software like VMWare (make sure it's supported by your Server(s), I tried to use a specific VMWare version
                    in my servers and I couldn't because they are too old and don't support, so make sure to do your homework there first).
                    Also, these VM using are using Ubuntu 24.04 LTS.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Proxmox has its own native Container Solution, but in this case we're not using it. We'll be spinning up
                    2 VMs: 1 K8s Controller and 1 K8s Node. Configure a VM in ProxMox and once you have both running,
                    we're ready to start.
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

            <CollapsibleSection title="Configure K8s Controller and Node (~1min)">
                <BlogPostIndentedParagraph>
                    We're going to start making our VMs IP static. We can do this by modifying the Canonical `netplan` utility
                    in our Linux system (you can find more about it
                    <ExternalLink href="https://netplan.io/#:~:text=Netplan%20is%20a%20utility%20for,for%20your%20chosen%20renderer%20tool"/>)
                    Now, let's fine the file containing our connected interface config and make a copy (yours make look different, just look for
                    a file that shows config for your interface).
                    You can find what's your interface by running this on Ubuntu24.04, it also works on RHEL8, and maybe a few other Linux distros:
                    <CodeBlock>
                        ip a
                    </CodeBlock>
                    Your interface (might be different depending on your config) would be anything that's not a loopback. In my case is <strong>ens18</strong>.
                    Let's backup our original netplan config:
                    <CodeBlock>
                        cp /etc/netplan/50-cloud-init.yaml /etc/netplan/50-cloud-init.bak
                    </CodeBlock>
                    Use you preferred text editor to change the content of your original netplan.
                    Your original netplan config might look like this:
                    <CodeBlock>

                    </CodeBlock>

                </BlogPostIndentedParagraph>
            </CollapsibleSection>

        </article>
    );
}

export default SecureHosting;