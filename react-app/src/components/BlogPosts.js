import ServerRack from "./posts/SELF-HOSTING/ServerRack";
import WorkInProgress from "./WorkInProgress";
import SecureHosting from "./posts/SELF-HOSTING/SecureHosting";
import TeleportSimpleSetup from "./posts/SECURITY/TeleportSimpleSetup";
import TroubleshootTeleportNodeJoinOnRhel9 from "./posts/SELF-HOSTING/TroubleshootTeleportNodeJoinOnRHEL9";
import ProxMoxTemplates from "./posts/SELF-HOSTING/ProxmoxTemplates";
import K8sClusterAndNode from "./posts/SELF-HOSTING/K8sClusterAndNode";
import K8sTroubleshooting from "./posts/SELF-HOSTING/K8sTroubleshooting";
import PostgresSQLServerSetup from "./posts/SELF-HOSTING/PostgresSQLServerSetup";
import JenkinsControllerServerSetup from "./posts/SELF-HOSTING/JenkinsControllerServer";
import AutomateFrontendDeployment from "./posts/CICD/AutomateFrontendDeployment";
import WebhookRelay from "./posts/CICD/WebhookRelay";

const BlogPosts = {
    // '3d Printing': [
    //     { title: 'How is your App performing? See what you should look after', slug: 'Measure your App ', component: WorkInProgress },
    // ],
    'CICD': [
        { title: 'Automate your FrontEnd Deployment', slug: 'frontend-cicd', component: AutomateFrontendDeployment },
        { title: 'GitOps and Webhook Relay to Jenkins', slug: 'webhook-relay-jenkins', component: WebhookRelay },
    ],
    // 'Hacking': [
    //     { title: 'Bounty Hunting (~5min read)', slug: 'Server Rack', component: ServerRack },
    // ],
    // 'Mobile Apps': [
    //     { title: 'Go from Web to Mobile', slug: 'Mobile Apps', component: WorkInProgress },
    // ],
    // 'Monetization': [
    //     { title: 'Make some $ from your website', slug: 'Web Monetization', component: WorkInProgress },
    // ],
    // 'Monitoring': [
    //     { title: 'How is your App performing? See what you should look after', slug: 'monitoring', component: WorkInProgress },
    // ],
    // 'NFT': [
    //     { title: 'New to NFT? Hope on the next generation wagon', slug: 'NFT', component: WorkInProgress },
    // ],
    'Security': [
        // { title: 'Test your own website', slug: 'WebsiteSecurity', component: WorkInProgress },
        { title: 'How to connect securely to your Servers - Teleport', slug: 'server-ssh', component: TeleportSimpleSetup },
    ],
    'Self-Hosting': [
        { title: 'Server Rack and  Why you need to build one (~5.5 min read)', slug: 'server-rack', component: ServerRack },
        { title: 'How to serve content securely from your Server (~5 min read)', slug: 'secure-hosting', component: SecureHosting },
        { title: 'What I used to build my Server Rack', slug: 'server-supplies', component: WorkInProgress },
        { title: 'Setup a K8s Controller and K8s Nodes', slug: 'k8s-cluster-and-node', component: K8sClusterAndNode },
        { title: 'Teleport Simple Setup Self-Hosted', slug: 'teleport-simple-setup', component: TeleportSimpleSetup },
        { title: 'Troubleshoot Teleport Node Join on RHEL9', slug: 'teleport-simple-setup-node-join-rhel9', component: TroubleshootTeleportNodeJoinOnRhel9 },
        { title: 'Making ProxMox Templates', slug: 'proxmox-templates', component: ProxMoxTemplates },
        { title: 'K8s Troubleshooting', slug: 'k8s-troubleshooting', component: K8sTroubleshooting },
        { title: 'PostgresSQL Server Setup for Artifactory (~5mins read)', slug: 'postgresSQL-artifactory', component: PostgresSQLServerSetup },
        { title: 'Jenkins Controller Server setup', slug: 'jenkins-controller-server', component: JenkinsControllerServerSetup },
    ],
    // 'SEO': [
    //     { title: 'Increase traffic to your website', slug: 'SEO', component: WorkInProgress },
    // ],
    // 'Web Development': [
    //     { title: 'Make some $ from your website', slug: 'Web Monetization', component: WorkInProgress },
    // ],
    // 'Web3': [
    //     { title: 'Web3 - What is it and why should you care', slug: 'Web3', component: WorkInProgress },
    // ]
};

export default BlogPosts;