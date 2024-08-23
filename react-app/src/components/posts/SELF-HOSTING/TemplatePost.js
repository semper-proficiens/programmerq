import React, { useContext } from 'react';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import '../../../styles/post.css';
import SecureLock from '../../../assets/images/secure-on-chalkboard-with-locks.jpg';
import CollapsibleSection from '../../CollapsibleSection';
import BlogPostIndentedParagraph from "../../BlogPostIndentedParagraph";
import CodeBlock from "../../CodeBlock";

function TemplateComponentName() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={SecureLock} alt="SecureLock" />

            <CollapsibleSection title="Title of Template Component Name (~2mins)">
                <BlogPostIndentedParagraph>
                    This installation runs on a RHEL9 server and is geared towards configuring a
                    self-hosted PostgresSQL backend for any application, but at some point it
                    will become specific to an Artifactory backend config.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    In our server, we can install and configure the postgres DB by running these commands:
                    <CodeBlock language={"bash"}>
                        {`
                        sudo dnf module enable postgresql:16 -y
                        sudo dnf install postgresql-server -y
                        sudo /usr/bin/postgresql-setup --initdb
                        
                        sudo systemctl start postgresql
                        sudo systemctl enable postgresql
                        `}
                    </CodeBlock>
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    If like me, you're running on RHEL9.X, you should update your firewall rules to allow the postrgressql service:
                    <CodeBlock language={"bash"}>
                        {`
                        sudo firewall-cmd --add-service=postgresql --permanent
                        sudo firewall-cmd --reload
                        `}
                    </CodeBlock>

                    Now, we need to set the password for the postgres system user on the RHEL server.
                    This user is created during the installation of the PostgreSQL package and is used to run the
                    PostgresSQL service and execute system-level tasks related to PostgreSQL.
                    <CodeBlock language={"bash"}>
                        {`
                        sudo passwd postgres
                        $yourPassword
                        
                        sudo -i -u postgres
                        psql
                        
                        \\password postgres
                        $otherPassword
                        `}
                    </CodeBlock>
                    The DB should already be running, but you can reload the service so everything is properly updated.
                    If you just wanted to setup a PostgresSQL Server DB, this is your stop. If you want to configure a
                    PostgresSQL DB to use with JFrog's Artifactory, keep on reading the next section.
                </BlogPostIndentedParagraph>

            </CollapsibleSection>

        </article>
    );
}

export default TemplateComponentName;