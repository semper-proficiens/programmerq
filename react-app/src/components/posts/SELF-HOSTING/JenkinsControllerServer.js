import React, { useContext } from 'react';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import '../../../styles/post.css';
import SecureLock from '../../../assets/images/secure-on-chalkboard-with-locks.jpg';
import CollapsibleSection from '../../CollapsibleSection';
import BlogPostIndentedParagraph from "../../BlogPostIndentedParagraph";
import CodeBlock from "../../CodeBlock";
import ExternalLink from "../../ExternalLink";

function JenkinsControllerServerSetup() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={SecureLock} alt="SecureLock" />

            <CollapsibleSection title="Setting a Jenkins Controller Server (~2mins)">
                <BlogPostIndentedParagraph>
                    The goal here is to setup a quick Jenkins Controller server for all of our CI and CD needs.
                    I'll update this blog post again on how to setup the Node workers. For now, it will just be the
                    Controller Node running pipelines (not recommended for a production environment, all pipelines job
                    should be executed by an ephemeral fleet of Nodes).
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    The instruction to do this are already available here:
                    <ExternalLink href="https://www.jenkins.io/doc/book/installing/linux/#long-term-support-release-3" />

                    But, if you're feeling lazy, here the commands on a RHEL9 server:
                    <CodeBlock language={"bash"}>
                        {`
                        sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
                        sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
                        sudo yum upgrade -y
                        
                        # Add required dependencies for the jenkins package
                        sudo yum install fontconfig java-17-openjdk -y
                        sudo yum install jenkins -y
                        sudo systemctl daemon-reload
                        
                        # (optional) let's have podman for containers
                        sudo dnf install -y podman
                        `}
                    </CodeBlock>
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Now, let's configure our server to allow the Jenkins service to run smoothly:
                    <CodeBlock language={"bash"}>
                        {`
                        firewall-cmd --permanent --new-service=jenkins
                        firewall-cmd --permanent --service=jenkins --set-short="Jenkins ports"
                        firewall-cmd --permanent --service=jenkins --set-description="Jenkins port exceptions"
                        firewall-cmd --permanent --service=jenkins --add-port=$YOURPORT/tcp
                        firewall-cmd --permanent --add-service=jenkins
                        firewall-cmd --zone=public --add-service=http --permanent
                        firewall-cmd --reload
                        `}
                    </CodeBlock>
                    Then, proceed to enable and start the service:
                    <CodeBlock language={"bash"}>
                        {`
                        sudo systemctl enable jenkins
                        sudo systemctl start jenkins
                        # (optional) to check service status
                        sudo systemctl status jenkins
                        `}
                    </CodeBlock>
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    The service configuration is done at this point and service should be up and running.
                    You should be able to access your application on your network on the ip of your server
                    and your specified port above.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Now you can proceed with creating the Admin user and add plugins.
                    You can use the official Jenkins links for it:
                    <ExternalLink href="https://www.jenkins.io/doc/book/installing/linux/#creating-the-first-administrator-user"/>
                    <ExternalLink href="https://www.jenkins.io/doc/book/installing/linux/#customizing-jenkins-with-plugins"/>
                    I like to have the Blue Ocean plugin. It tends to have regular updates, but the GUI offers a much better experience.
                    THe Git plugins are a most if you plan to have any GitOps workflows.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    I plan to update this post with a Node workers setup section. But, for now you can follow this official Jenkins wiki:
                    <ExternalLink href="https://wiki.jenkins-ci.org/display/JENKINS/Distributed+builds#Distributedbuilds-Havemasterlaunchslaveagentviassh"/>
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

            <CollapsibleSection title="Troubleshooting Jenkins (~2mins)">
                <BlogPostIndentedParagraph>
                    The goal of this section is to cover some common errors encountered while working with Jenkins.
                </BlogPostIndentedParagraph>

            </CollapsibleSection>

        </article>
    );
}

export default JenkinsControllerServerSetup;