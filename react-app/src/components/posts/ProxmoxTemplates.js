import React, { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import '../../styles/post.css';
import SecureLock from '../../assets/images/secure-on-chalkboard-with-locks.jpg';
import CollapsibleSection from '../CollapsibleSection';
import BlogPostIndentedParagraph from "../BlogPostIndentedParagraph";
import CodeBlock from "../CodeBlock";

function ProxMoxTemplates() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={SecureLock} alt="SecureLock" />

            <CollapsibleSection title="Create ProxMox Templates Ubuntu2404 (~1min)">
                <BlogPostIndentedParagraph>
                    Commands to setup a ProxMox template off an Ubuntu2404-LTS VM:
                    <CodeBlock language={"bash"}>
                        {`
                        cloud-init clean
                        rm -rf /var/lib/cloud/instances
                        truncate -s 0 /etc/machine-id
                        rm /var/lib/dbus/machine-id
                        ln -s /etc/machine-id /var/lib/dbus/machine-id
                        sudo poweroff
                        `}
                    </CodeBlock>
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Run above commands on the VM you want to clone. Then on your ProxMox GUI, click <strong>Convert to Template</strong>.
                    After this you can click on the VM template, and select <strong>Full Clone</strong> to create as many instances of that template as you desire.
                </BlogPostIndentedParagraph>

            </CollapsibleSection>

        </article>
    );
}

export default ProxMoxTemplates;