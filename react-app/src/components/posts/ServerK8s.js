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

            <CollapsibleSection title="Context for the K8s Controller and Node (~1min)">
                <BlogPostIndentedParagraph>
                    You can use your preferred virtualization software for VMs running on your self-hosted Server(s).
                    I like ProxMox and that's what I'll be using for this example. You don't have to, and can simply use another
                    software like VMWare (make sure it's supported by your Server(s), I tried to use a specific VMWare version
                    in my servers, and I couldn't because some of them are too old and don't support it, so, make sure you do your homework there first).
                    Also, the K8s Controller Node is using RHEL9.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Proxmox has its own native Container Solution, but in this case we're not using it. We'll be spinning up
                    2 VMs: 1 K8s Controller and 1 K8s Node. Have at least 2 VMs in ProxMox ready. In my case, I'll be using RHEL9
                    images for both the Controller and the Node.
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

            <CollapsibleSection title="Configuring the K8s Controller and Node (~1min)">
                <BlogPostIndentedParagraph>

                </BlogPostIndentedParagraph>
            </CollapsibleSection>

        </article>
    );
}

export default SecureHosting;