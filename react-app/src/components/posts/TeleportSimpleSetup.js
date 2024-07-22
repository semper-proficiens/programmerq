import React, { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import '../../styles/post.css';
import SecureLock from '../../assets/images/secure-on-chalkboard-with-locks.jpg';
import CollapsibleSection from '../CollapsibleSection';
import BlogPostIndentedParagraph from "../BlogPostIndentedParagraph";
import CodeBlock from "../CodeBlock";
import ExternalLink from "../ExternalLink";
import {Link} from "react-router-dom";

function TeleportSimpleSetup() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={SecureLock} alt="SecureLock" />

            <CollapsibleSection title="Configuring a Teleport Cluster (~5min)">
                <BlogPostIndentedParagraph>
                    Follow Teleport installation instruction from
                    <ExternalLink href="https://goteleport.com/docs/installation/"/>.

                    Download and install the Teleport binary:
                    <CodeBlock language={"yaml"}>
                        curl https://goteleport.com/static/install.sh | bash -s 15.3.1 oss
                    </CodeBlock>

                    Of course, Teleport version changes very quickly, so, make sure to adapt and read the vendor installation
                    doc previously referenced.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Previous command is very convenient because it abstracts a lot of the previous manual configuration needed to get started with Teleport.
                    This downloads Teleport binaries, adds them to path, and adds a <strong>systemd</strong> file to run TP as a daemon service.
                    There is one more step to go and one you should carefully configure, and
                    will end up coming back to if you need to make any adjustments. Here is a sample Teleport configuration
                    that runs the Teleport Proxy and Auth Service on the Same server (more on this later). Let's create the Teleport configuration
                    file:
                    <CodeBlock language={"bash"}>
                        vi /etc/teleport.yaml
                    </CodeBlock>
                    Then, let's add this configuration inside the file, this is yaml, so be careful with indentation:
                    <CodeBlock language="yaml">
                        {`
                        version: v2
                        teleport:
                          nodename: teleport-cluster
                          data_dir: /var/lib/teleport
                          advertise_ip: $ip
                          log:
                            output: stderr
                            severity: INFO
                            format:
                              output: text
                        auth_service:
                          enabled: yes
                          listen_addr: $ip:3025
                          proxy_listener_mode: multiplex
                        ssh_service:
                          enabled: yes
                          commands:
                          - name: hostname
                            command: [hostname]
                            period: 1m0s
                        proxy_service:
                          enabled: yes
                        `}
                    </CodeBlock>

                    So, let's breakdown a few of the attribute set above (you can also check the official doc for all attributes reference

                    <ExternalLink href="https://goteleport.com/docs/reference/config/"/>):

                    <CodeBlock language="yaml">
                        {`
                        - advertise_ip: this is private ip your tp cluster will have and will listen in. find out what that your VM ip is, and put it here
                        - storage (omitted and all its attributes as well; defaults to sqlite locally on server):
                            - type: I chose sqlite here for simplicity, which uses a local SQLite backend. You can select something else. I recommend to use
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

                <BlogPostIndentedParagraph>
                    This is probably a good stopping point if you want to make this VM config a template Teleport Cluster.
                    Refer to <Link to="/post/proxmox-templates">ProxMox Template</Link> to see how to turn this VM into
                    a reusable VM template to spin multiple instances easily in Proxmox.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Let's now start the service by running these commands:

                    <CodeBlock language={"bash"}>
                        {`
                        sudo systemctl daemon-reload
                        sudo systemctl enable teleport
                        sudo systemctl start teleport
                        `}
                    </CodeBlock>

                    If you experience any issues make sure to check logs in journald, syslog, or whatever logging directory
                    your OS exports to. Also, by default Teleport binary sends some event logs to <strong>/var/lib/teleport/log/events.log</strong>,
                    but these would be more helpful for things like access permissions on a <strong>running cluster</strong>.

                    If you need some quick commands to see why Teleport service is failing you can try these commands:

                    <CodeBlock language={"bash"}>
                        {`
                        systemctl status teleport       <--- check overall service health
                        journalctl -fu teleport         <--- check with live logs what's happening with teleport service
                        journalctl -u teleport -n 100   <--- check last 100 log lines of the teleport service
                        `}
                    </CodeBlock>

                    Make your modifications and restart the service if needed:

                    <CodeBlock language={"bash"}>
                        systemctl restart teleport
                    </CodeBlock>

                    It may also be the case when testing different setups that your teleport service is caching some information,
                    and whatever troubleshooting steps you're trying don't work, and it doesn't mean that your changes didn't
                    work, but that teleport is stuck with stale data, which is why sometimes you may need to remove that cached data:

                    <CodeBlock language={"bash"}>
                        rm -rf /var/lib/teleport
                    </CodeBlock>

                    Then, restart the service as previously shown.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    If you made this far and managed to have a running Teleport service, amazing! Good job. The hardest part is done!
                    <br/>
                    Let's recap on what we have thus far. We have a running Teleport Cluster yaml file (<strong>/etc/teleport.yaml</strong>) configured to run the SSH, Proxy, and Auth Services. This cluster will run
                    as a systemd daemon service (setup <strong>/etc/systemd/system/teleport.service</strong>) and you will be able to SSH into it, it will be able to route request to the Auth Service through cli or wbe service
                    using the Proxy Service, and it will be able to grant or deny access to resources in Teleport using the Auth Service.
                </BlogPostIndentedParagraph>

            </CollapsibleSection>

            <CollapsibleSection title="Playing with Teleport (~10min)">

                <BlogPostIndentedParagraph>
                    Now that you have a running Teleport Cluster, you might be wondering how to interact with it.
                    Teleport has 2 main ways of communicating with it:
                    <li>
                        Teleport CLI
                    </li>
                    <li>
                        Teleport Web GUI
                    </li>
                    I love working with the cli. But Teleport is one of those rare services offering a really nice GUI
                    that makes you want to skip the CLI altogether. But, I'll cover both ways here.
                    In order to enable MFA you may need to access it through the Web the first time. So, I'll cover that method first.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    If you followed along, your Teleport Cluster Proxy should be listening on the advertised ip and port defined
                    your <strong>/etc/teleport.yaml</strong> config file.

                    Hit:
                    <CodeBlock language={"bash"}>
                        https://$yourIp:3080/web/login
                    </CodeBlock>
                    This will take you to a landing page asking to setup MFA (don't skip MFA!).
                    By the way, is normal that your browser doesn't trust it the certificate because Teleport cluster with this config is using a
                    self-signed cert, and therefore the warning from your browser. It's of course recommended to use a public certificate, from a well known CA,
                    and the certs to your server, etc, etc. But, this is a vanilla implementation, plus, we're (I hope for you) just exposing this in the local network, not to the
                    internet, so it's totally ok.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Back to first setup. Add the user, password, and register your app with OTP provider like Google Authenticator, MSFT Authenticator, Authy, whatever rocks your boat.
                    After this, you should be able to login on the browser and see on Server (your own Teleport Cluster there because it's running SSH Service). You can connect to it
                    using the GUI and using an OS User that you know exists on your server.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    However, before that, you need to configure a Role in Teleport that allows you to connect as that user.
                    Teleport has a couple of default roles like Editor, Access, and Auditor. Roles in Teleport are the core of
                    RBAC, and how you will manage the who, what and how your resources get access in Teleport.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Head over <strong>Access Management</strong> tab (Teleport GUI changes very often, so don't blame me if things have changed).
                    Look for <strong>User Roles</strong>. Find the <strong>Access</strong> default role and hit <strong>Edit</strong>. Just so, that we're clear on what we're doing.
                    We're modifying a default Teleport Role that's already provisioned with a lot of elevated privileges, but the reason for it, is because
                    it doesn't specify what OS User you're allowed to login as, because it doesn't know, you need to let it know. You can have a custom OS User like "admin"on your target
                    server, or use the default OS Users that come with different OS systems like "ubuntu", "ec2-user", "debian", avoid giving it <strong>root</strong> for obvious reasons.
                    Anyway, back to the role editing, look for the yaml line that says:
                    <CodeBlock language={"yaml"}>
                        {`
                        logins:
                        - '{{internal.logins}}'
                        `}
                    </CodeBlock>
                    Append your target OS user there like:
                    <CodeBlock language={"yaml"}>
                        {`
                        logins:
                        - '{{internal.logins}}'
                        - ec2-user
                        - ubuntu
                        - yourCustomUser
                        `}
                    </CodeBlock>
                    Hit save and go back Resources tab, find your server, click connect, and your newly added login user should show as a an option in the dropdown.
                    Select that target OS User and your session should show up.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Either on the Web, or the CLI, you always need to make sure that the target OS User exists on the Server, or your Teleport Role has
                    been defined with permission to access that OS User. Otherwise, you'll an hit error that looks like this:
                    <CodeBlock language={"bash"}>
                        {`
                        Failed to launch: user: unknown user $user.
                        Process exited with status 255
                        `}
                    </CodeBlock>
                    So, make sure both target server and Teleport Cluster Role are aligned in that aspect.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    In order to interact with your cluster using CLI, you need to have Teleport installed in your local machine and an user configured (in the previous step using GUI
                    we did just that with MFA).
                    You can follow the same link shared earlier (<ExternalLink href="https://goteleport.com/docs/installation/"/>), pick your
                    local machine OS from the list, and download the binary.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    <strong>Your local Teleport binary should be equal, or at most one major version, below your Teleport Cluster version.</strong>
                    I've experienced Teleport CLI working with even 2 major versions behind the running Cluster version, but if you don't want to
                    have surprises just head the warning, because that's what Teleport support team will also recommend.
                    Teleport binary comes other binaries by default like <strong>tsh, tbot, and tctl</strong>. They all have different usage.
                    But, the one we care about here is <strong>tsh</strong>. This is a protocol developed by Teleport that extends the standard SSH
                    protocol.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Once the cli installed, you can use this command to connect to your running cluster:
                    <CodeBlock language={"bash"}>
                        tsh login -d --proxy=$yourIP:3080 --user=$yourUser --insecure
                    </CodeBlock>

                    Let's explain the flags:
                    <li>
                        -d: for debug, this will help you troubleshoot in case of errors
                    </li>
                    <li>
                        --proxy: replace $yourIP by the advertised ip you used in previous steps in your /etc/teleport.yaml file
                    </li>
                    <li>
                        --user: as configured in the Web GUI MFA setup
                    </li>
                    <li>
                        --insecure: because Teleport Cluster is presenting a self-signed cert in this specific local implementation
                    </li>
                    You should see an output in your terminal similar to this:
                    <CodeBlock language={"bash"}>
                        {`
                        2024-05-27T18:40:40-04:00 DEBU [CLIENT]    Attempting to login with a new RSA private key. client/api.go:3873
                        Enter password for Teleport user $userName:
                        Enter your OTP token:
                        2024-05-27T18:42:34-04:00 DEBU [CLIENT]    not using loopback pool for remote proxy addr: $ip:3080 client/api.go:4522
                        2024-05-27T18:42:34-04:00 DEBU [CLIENT]    HTTPS client init(proxyAddr=$ip:3080, insecure=true, extraHeaders=map[]) client/weblogin.go:338
                        WARNING: You are using insecure connection to Teleport proxy https://$ip:3080
                        `}
                    </CodeBlock>
                    It finds the server, recognizes the given user exists, prompts for password, for OTP, and establishes the local credentials.
                    If successful, you should see similar output in your terminal:
                    <CodeBlock language={"bash"}>
                        {`
                        2024-05-27T18:42:35-04:00 DEBU [KEYSTORE]  Teleport TLS certificate valid until "". client/client_store.go:106
                        > Profile URL:        https://yourIP:3080
                          Logged in as:       $user
                          Cluster:            $clusterNodeName
                          Roles:              access, custom-access, editor
                        `}
                    </CodeBlock>
                    You're golden if you reached here.
                    You can run simple commands like:
                    <CodeBlock language={"bash"}>
                        tsh ls
                    </CodeBlock>
                    To check what Nodes you can access.
                    And this command to connect to those servers:
                    <CodeBlock language={"bash"}>
                        tsh ssh -d $targetServerOSUser@$teleportNodeName
                    </CodeBlock>
                    The value of $teleportNodeName can be easily obtained after running <strong>tsh ls</strong>. The Nodes list contain the NodeNames.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    That's it. Congrats!
                    Just know that you can do a lot using teleport, including upload and download from and to local machine and server, also easy to copy and paste from clipboard, which is awesome.
                    It's in my opinion much easier, and friendlier than having to hack the virtualization tool you're using for your server (like ProxMox in my case).
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

            <CollapsibleSection title="Joining Servers to the Cluster (~5min)">
                <BlogPostIndentedParagraph>
                    Now that you have a running Teleport Cluster, it's time to start adding more server to Teleport.
                    The process to make other servers (or Nodes, in Teleport lingo) join the Cluster, and show as new
                    accessible server in Teleport is really simple compared to setting up the Cluster server.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Follow Teleport installation instruction from
                    <ExternalLink href="https://goteleport.com/docs/installation/"/>.

                    Download and install the Teleport binary:
                    <CodeBlock language={"yaml"}>
                        curl https://goteleport.com/static/install.sh | bash -s 15.3.1
                    </CodeBlock>

                    Of course, Teleport version changes very quickly, so, make sure to adapt and read the vendor installation
                    doc previously referenced.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    There are many ways to make a server (Node in Teleport lingo) join the Cluster. You can use (sorry for only referencing AWS
                    available methods, but those are the ones I've worked with in a professional environment) AWS IAM, AWS EC2Method, ephemeral or long-lived tokens.
                    In our case, because we're self-hosting we're using tokens as the join method, and because we trust our local network safety and the servers
                    that will join are self-managed, we're going to create a long-lived token for this implementation.
                    <br/>
                    <strong>Note:</strong>Nodes joining your cluster don't represent any threats to your Cluster other than maybe having the ability (if they're malicious)
                    to DOS your cluster with requests. But, since this is local cluster, we wouldn't care about it being DOSed. All the security risk lies on which users
                    can authenticate with your Cluster, and what they can do in it, which is something that you determine through User, and Roles in Teleport.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    In a production environment with multiple teams, users, Servers, etc, you may want to look at the Enterprise version of Teleport, which provides
                    multiple IDP integrations for well-known providers like OKTA, Auth0, etc. You don't want to be handling users inside Teleport, but rather trust your IDP
                    with that, and you can segregate permission to Teleport Resources through Labels at the App Layer in Teleport. Also, Nodes would join through more advanced
                    mechanisms like native-cloud methods mentioned previously, or Tokens that have whitelist rules enabled to limit who and from where can join.
                    I just wanted to share what's possible at a larger scale and prod-ready. Now, let's get back to our Node-joining implementation.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    We said that we were going to use long-lived tokens, so we need to create a token with a really long <strong>ttl</strong> and a value.
                    From your Cluster Server (as in SSHed into it), run this command:
                    <CodeBlock language={"bash"}>
                        tctl tokens add --type=node --ttl=2000h --value=sample-token
                    </CodeBlock>
                    The command is self-explanatory, but a few notes, so, you understand more about Teleport.
                    If you don't specify a value for your token, (and by the way is the token value that any server needs to present to the Auth service in order to join)
                    Teleport will generate UUID token value, no big deal, you can use that instead if you prefer. In terms of types, we specify <strong>node</strong> because
                    we're attempting to join servers (nodes), but just know that Teleport has other types of resources that can be joined like K8s Clusters, Applications, and
                    DBs.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    If you were successful in creating your token, you should see similar output on your terminal:
                    <CodeBlock language={"bash"}>
                        {`
                        Please note:
                          - This invitation token will expire in 120000 minutes
                          - $yourIP:3025 must be reachable from the new node
                        `}
                    </CodeBlock>
                    This means the token was created, and you can also check it against the Teleport Cluster backend like this:
                    <CodeBlock language={"bash"}>
                        tctl tokens ls
                    </CodeBlock>
                    <br/>
                    <strong>Note:</strong> In order to run the <strong>tctl</strong> commands in your running Cluster server, you may need to have elevated
                    permissions or you may encounter errors. If so, try running them as <strong>root</strong>.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Now we should have everything that's necessary to make the server join the cluster without issues.
                    All that's left is to configure our Teleport joining Node. We can do this in same way we did with our Cluster
                    server. So, in the Teleport Node, create a file in <strong>/etc/teleport.yaml</strong> like this:
                    <CodeBlock language={"yaml"}>
                        {`
                        teleport:
                          nodename: $yourDesiredNodeName
                          ca_pin: $pinValue
                          data_dir: /var/lib/teleport
                          join_params:
                            token_name: $yourTokenValue
                            method: token
                          auth_servers:
                            - http://$yourClusterIP:3025
                          log:
                            output: stderr
                            severity: INFO
                            format:
                              output: text
                        ssh_service:
                          enabled: yes
                          labels:
                            env: k8s
                            os: rhel9
                        auth_service:
                          enabled: no
                        proxy_service:
                          enabled: no
                        `}
                    </CodeBlock>

                    You may have noticed the <strong>ca_pin</strong> value there. Notice, that this is optional for joining,
                    and your Node will still join without specifying that value, so, you can omit that attribute if you want.
                    However, I recommend you add it for 2 reasons:
                    <li>
                        Extra Security: this means your Node won't just join a Cluster that has that token value of happens to run on that same ip.
                        The Cluster shows the pin value in its cert signature, meaning only the trusted CLuster will be able to generate that same value.
                    </li>
                    <li>
                        Fewer Logs on the Node server: Teleport by default will generate a log every now and then in your Node server daemon service saying
                        that your Teleport service is vulnerable to MITM attacks because you're not adding the ca_pin attribute.
                    </li>
                    If I convinced you to take the extra step and add the <strong>ca_pin</strong>, then let's do it, it's pretty easy.
                    Hop into your Cluster server, once you're in the terminal just run:
                    <CodeBlock language={"bash"}>
                        tctl status
                    </CodeBlock>
                    This will produce some metadata about your Cluster, and provide you with the CA pin value, it should look like this:
                    <CodeBlock language={"bash"}>
                        CA pin        sha256:$hashValue
                    </CodeBlock>
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    This is probably a good stopping point if you want to make this VM config a template Teleport Node.
                    Refer to <Link to="/post/proxmox-templates">ProxMox Template</Link> to see how to turn this VM into
                    a reusable VM to spin multiple instances easily in Proxmox.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Now that you have the pin, just update the config file (<strong>/etc/teleport.yaml</strong>) to include the <strong>ca_pin</strong>
                    attribute, and just add your obtained hash value to the yaml file.
                    Now we're ready to start the Teleport service on the Node, and attempt to join the server.
                    So, just run the same commands we used to run Teleport in the Cluster:
                    <CodeBlock language={"bash"}>
                        {`
                        sudo systemctl daemon-reload
                        sudo systemctl enable teleport
                        sudo systemctl start teleport
                        `}
                    </CodeBlock>
                    You can use the previously shared commands (journalctl and systemctl) to check how the teleport service daemon is behaving.
                    If it all worked, you should see logs saying service started successfully, and as it attempts to join the Cluster if it reaches
                    the Cluster server it will generate logs on the Cluster server, so you can also check the logs on that side and check for any error logs.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    With above steps, making a server join the Teleport CLuster and show up in the GUI (or the local terminal using tsh) is straightforward.
                    However, sometimes other factors get in the equation causing errors and require deep diving. For example, I recently attempted to join
                    a RHEL9 server to the Cluster with this approach and got into an error due to firewall rules in the OS.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    If you're curious about how I got it to work, check this other post I created for anyone trying to do this on RHEL9
                    <Link to="/post/teleport-simple-setup-node-join-rhel9">Troubleshooting Node Join on RHEL9</Link>
                </BlogPostIndentedParagraph>

            </CollapsibleSection>

            <CollapsibleSection title="Conclusion (~1min)">
                <BlogPostIndentedParagraph>
                    This was a simple Teleport setup showing how to spin up a Teleport Cluster self-hosted on local network, with no DNS, and self-signed certificates.
                    There are more production-ready ways to do this, but since this example covers those wanting to do this securely on their private network, some
                    adjustments and compromises have to be made. However, the overall effort pays off when you see all your Nodes easily accessible in that nice GUI, and you know
                    you can access them securely. Also, the fact you can now use <strong>scp</strong> commands to copy and paste from and to local machine, and being able to copy to clipboard
                    is a huge win over just having that server in ProxMox and needing to do a bunch of hacks to accomplish something like this. It's perfect for a home lab environment
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

        </article>
    );
}

export default TeleportSimpleSetup;