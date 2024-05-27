import React, { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import '../../styles/post.css';
import SecureLock from '../../assets/images/secure-on-chalkboard-with-locks.jpg';
import CollapsibleSection from '../CollapsibleSection';
import BlogPostIndentedParagraph from "../BlogPostIndentedParagraph";
import CodeBlock from "../CodeBlock";
import ExternalLink from "../ExternalLink";

function TeleportSimpleSetup() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={SecureLock} alt="SecureLock" />

            <CollapsibleSection title="Installing Teleport (~1min)">
                <BlogPostIndentedParagraph>
                    Follow Teleport installation instruction from
                    <ExternalLink href="https://goteleport.com/docs/installation/"/>.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    You can harden this later, but to make sure your Teleport binary runs smoothly from first try,
                    bump the teleport binary permissions:
                    <CodeBlock>
                        sudo chmod 755 /usr/local/bin/teleport
                    </CodeBlock>
                    <br/>
                    Then, we want to run Teleport as a daemon service that's always running in the background.
                    So, let's configure the Teleport daemon as a systemd service. In order to so let's create a
                    systemd file, you can use your favorite text editor to do this, I'll use <strong>vi</strong>:
                    <CodeBlock>
                        vi /etc/systemd/system/teleport.service
                    </CodeBlock>
                    Once the file is open, add this service config (the <strong>--diag-addr=0.0.0.0:3000</strong> is optional, and is only needed
                    if you want to enable the Teleport Healthcheck and Local Metrics, more info
                    <ExternalLink href="https://goteleport.com/docs/management/diagnostics/monitoring/"/>):
                    <CodeBlock>
                        {`
                        [Unit]
                        Description=Teleport Service
                        After=network.target
                        
                        [Service]
                        Type=simple
                        Restart=on-failure
                        EnvironmentFile=-/etc/default/teleport
                        ExecStart=/usr/local/bin/teleport start --diag-addr=0.0.0.0:3000 --pid-file=/run/teleport.pid
                        ExecReload=/bin/kill -HUP $MAINPID
                        PIDFile=/run/teleport.pid
                        LimitNOFILE=65536
                        
                        [Install]
                        WantedBy=multi-user.target
                        `}
                    </CodeBlock>
                    Close the file and save.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Now that our Teleport systemd configuration is done, let's configure the Teleport Service itself.
                    There is the most important Teleport setup step, and the one you should carefully configure, and
                    will end up coming back to if need to make any adjustments. Here is a sample Teleport configuration
                    that runs the Teleport Proxy and Auth Service on the Same server (more on this later). Let's create the Teleport configuration
                    file:
                    <CodeBlock>
                        vi /etc/teleport.yaml
                    </CodeBlock>
                    Then, let's add this configuration inside the file, this is yaml, so be careful with indentation:
                    <CodeBlock language="yaml">
                        {`
                        version: v2
                        teleport:
                          nodename: teleport-cluster
                          data_dir: /var/lib/teleport
                          advertise_ip: 192.168.0.172
                          storage:
                            type: sqlite
                            audit_events_uri: ['file:///var/lib/teleport/audit/events', 'stdout://']
                          log:
                            output: stderr
                            severity: INFO
                            format:
                              output: text
                        ssh_service:
                          enabled: yes
                          labels:
                            env: dev
                        auth_service:
                          authentication:
                            type: local
                            local_auth: true
                          enabled: yes
                          listen_addr: 0.0.0.0:3025
                          proxy_listener_mode: multiplex
                          client_idle_timeout:  15m
                        proxy_service:
                          enabled: yes
                          web_listen_addr: 0.0.0.0:3080
                        `}
                    </CodeBlock>

                    So, let's breakdown a few of the attribute set above (you can also check the official doc for all attributes reference

                    <ExternalLink href="https://goteleport.com/docs/reference/config/"/>):

                    <CodeBlock>
                        {`
                        - private_ip: this is private ip your server will have. find out what that value is, and put it here
                        - storage:
                            - type: I chose sqlite here for simplicity, which uses a local SB Lite backend. You can select something else. I recommend to use
                            a backend server hosted in a separate server for production. I've used AWS DynamoDB in the past and it works really well.
                            - audit_events_uri: I chose a simple local file and stdout. Again in production you'd want to send this to another backend solution. I have used DDB
                            for this and it works quite well.
                            - audit_sessions_uri: I chose to not include this one in the template. But, if you're running this in PROD for a Corporation, you might want a
                            good Storage solution. I've used S3 in the past, and it works nice.
                            - log.severity: I chose INFO to avoid exporting more logs than necessary. But, if you experience any issues, you should edit this to DEBUG and restart
                            the Teleport service for troubleshooting.
                        - ssh_service: this runs the Teleport SSH service. You want this enabled if you want to be able to SSH into the service through Teleport. Labels are optional.
                        - auth_service.authentication: this part configures how Teleport will authenticate its users. We're using local. If you're setting this for a Corporation PROD environment.
                          you'll definitely want to use one the Enterprise solutions like 'saml'. I've used OKTA in the past, and they both work nicely.
                        - auth_service.listen_addr: you can use other port if you want. This is the IP and Port other Nodes will use to authenticate users. Make sure this port is free.
                        - auth_service.cluster_name: I've omitted this attribute for simplicity. But in PROD you may want to use internal or public DNS so that other services or Nodes can
                          discover your proxy using a DNS instead of a hardcoded port and ip.
                        - auth_service.proxy_listener_mode: very important parameter. I chose 'multiplex' because I prefer to keep things simple and proxy to route all request on its web listener address
                          on one single port: 443.
                        - proxy_service: this service is in charge of routing traffic in Teleport. In this case it will handle all trafic to Auth Service. In PROD it's recommended to separate this Service from the Auth
                        Service, so they both run on separate servers. The reason for this is prevent a Proxy service failure to bring down Auth Service with it. But, generally speaking one can't function with the other.
                        - proxy_service.web_listen_addr: all services will hit this port and ip for routing. We're using multiplex, so all Auth traffic will also go here. It also provides a nice web GUI for Teleport.
                        We also selected port 3080, but in PROD you want this to be using a Private Certificate or Public certificate signed by a trusted CA, and be on port 443.
                        `}
                    </CodeBlock>
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

            <CollapsibleSection>
                <BlogPostIndentedParagraph>
                    <CodeBlock>
                        Code
                    </CodeBlock>
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

        </article>
    );
}

export default TeleportSimpleSetup;