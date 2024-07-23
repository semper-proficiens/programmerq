import React, { useContext } from 'react';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import '../../../styles/post.css';
import SecureLock from '../../../assets/images/secure-on-chalkboard-with-locks.jpg';
import CollapsibleSection from '../../CollapsibleSection';
import BlogPostIndentedParagraph from "../../BlogPostIndentedParagraph";
import CodeBlock from "../../CodeBlock";

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

            <CollapsibleSection title="Create ProxMox Templates RHEL (~1min)">
                <BlogPostIndentedParagraph>
                    It's quite a long list of commands. So, might be easier to just add this to a <strong>.sh</strong> script,
                    and execute it:
                    <CodeBlock language="bash">
                        vi /etc/template_script.sh
                    </CodeBlock>
                    Add commands:
                    <CodeBlock language="bash">
                        {`
                        hostnamectl set-hostname localhost.localdomain
                        > /etc/machine-id
                        rm -f /etc/ssh/ssh_host
                        rm -rf /root/.ssh/
                        rm -f /root/anaconda-ks.cfg
                        rm -f /root/.bash_history
                        unset HISTFILE
                        rm -f /var/log/boot.log
                        rm -f /var/log/cron
                        rm -f /var/log/dmesg
                        rm -f /var/log/grubby
                        rm -f /var/log/lastlog
                        rm -f /var/log/maillog
                        rm -f /var/log/messages
                        rm -f /var/log/secure
                        rm -f /var/log/spooler
                        rm -f /var/log/tallylog
                        rm -f /var/log/wpa_supplicant.log
                        rm -f /var/log/wtmp
                        rm -f /var/log/yum.log
                        rm -f /var/log/audit/audit.log
                        rm -rf /var/lib/teleport
                        sudo yum install cloud-init -y
                        sudo systemctl enable cloud-init
                        cloud-init clean
                        `}
                    </CodeBlock>
                    You'll notice commands like <strong>cloud-init install</strong>, if your VM already has it you can skip the install and enable cloud-init commands.
                    Also, you'll see one of the commands above removes the <strong>/var/lib/teleport</strong> files. That's because most of my template come with Teleport
                    binary and service configured, because I just like to connect and manage them all through Teleport, and removing that folder and files makes it easier
                    to start a fresh Teleport Node template. You can skip if you don't use Teleport in your VMs.
                    If you're ready to proceed, you can make the script executable and execute it:
                    <CodeBlock language="bash">
                        sudo chmod u+x /etc/template_script.sh
                    </CodeBlock>
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Run above commands on the VM you want to clone and <strong>Stop</strong> the VM. Then on your ProxMox GUI, click <strong>Convert to Template</strong>.
                    After this you can click on the VM template, and select <strong>Full Clone</strong> to create as many instances of that template as you desire.
                </BlogPostIndentedParagraph>

            </CollapsibleSection>

        </article>
    );
}

export default ProxMoxTemplates;