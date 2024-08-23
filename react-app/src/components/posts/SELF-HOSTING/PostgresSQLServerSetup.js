import React, { useContext } from 'react';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import '../../../styles/post.css';
import SecureLock from '../../../assets/images/secure-on-chalkboard-with-locks.jpg';
import CollapsibleSection from '../../CollapsibleSection';
import BlogPostIndentedParagraph from "../../BlogPostIndentedParagraph";
import CodeBlock from "../../CodeBlock";

function PostgresSQLServerSetup() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={SecureLock} alt="SecureLock" />

            <CollapsibleSection title="Setting a PostgresSQL Server (~2mins)">
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

            <CollapsibleSection title="Configuring PostgresSQL DB with JFrog Artifactory (~3min)">
                <BlogPostIndentedParagraph>
                    In order for JFrog Artifactory to work, it needs a backend. The goal here is to configure our PostgresSQL
                    DB server into a backend Artifactory can use.

                    We'll create a DATABASE, a USER, USER's Password, :
                    <CodeBlock language={"bash"}>
                        {`
                        sudo -i -u postgres
                        psql

                        CREATE DATABASE artifactory;
                        CREATE USER $yourArtifactoryUser WITH PASSWORD '$yourArtifactoryPassword';
                        
                        # grants all privileges on the artifactory database to $yourArtifactoryUser.
                        GRANT ALL PRIVILEGES ON DATABASE artifactory TO $yourArtifactoryUser;
                        
                        # connects to artifactory database
                        \\c artifactory
                        
                        # grants all privileges on the public schema to $yourArtifactoryUser.
                        # grants all privileges on all tables in the public schema to $yourArtifactoryUser.
                        # grants all privileges on all sequences in the public schema to $yourArtifactoryUser.
                        GRANT ALL ON SCHEMA public TO $yourArtifactoryUser;
                        GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $yourArtifactoryUser;
                        GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $yourArtifactoryUser;
                        
                        # disconnects from artifactory database
                        \\q
                        `}
                    </CodeBlock>
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Now we need to configure our Database a bit further in order for Artifactory to talk to our DB:
                    <CodeBlock language={"bash"}>
                        {`
                        # open file and add this line to listen on all interfaces
                        vi /var/lib/pgsql/data/postgresql.conf 
                        listen_addresses = 'ip'
                        
                        # need to allow artifactory in (whitelist) , so open file and add this line at the end
                        # host: Specifies a host connection (TCP/IP, as opposed to local which would be a Unix-domain socket connection).
                        # artifactory: The name of the database we're allowing the connection to.
                        # $yourArtifactoryUser: The name of the user who will connect.
                        # $yourPrivateArtifactoryServerIP: The IP address of the client machine (/32 means a single IP address).
                        # md5: Use MD5 password-based authentication.
                        vi /var/lib/pgsql/data/pg_hba.conf
                        host    artifactory    $yourArtifactoryUser    $yourPrivateArtifactoryServerIP/32    md5
                        `}
                    </CodeBlock>
                    The hardest part is now done. Now just reload the psql service for the changes to take effect:
                    <CodeBlock language={"bash"}>
                        {`
                        sudo systemctl reload postgresql
                        `}
                    </CodeBlock>
                    This concludes our PostgresSQL DB config needed for Artifactory running on private network to connect
                    to a private PostgresSQL server also running in the same private network.
                </BlogPostIndentedParagraph>
            </CollapsibleSection>
        </article>
    );
}

export default PostgresSQLServerSetup;