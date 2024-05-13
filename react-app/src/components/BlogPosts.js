import ServerRack from "./posts/ServerRack";
import WorkInProgress from "./WorkInProgress";
import SecureHosting from "./posts/SecureHosting";
import ServerK8s from "./posts/ServerK8s";

const BlogPosts = {
    '3d Printing': [
        { title: 'How is your App performing? See what you should look after', slug: 'Measure your App ', component: WorkInProgress },
    ],
    'CICD': [
        { title: 'Automate your FrontEnd Deployment', slug: 'frontend-release', component: WorkInProgress },
    ],
    'Hacking': [
        { title: 'Bounty Hunting (~5min read)', slug: 'Server Rack', component: ServerRack },
    ],
    'Mobile Apps': [
        { title: 'Go from Web to Mobile', slug: 'Mobile Apps', component: WorkInProgress },
    ],
    'Monetization': [
        { title: 'Make some $ from your website', slug: 'Web Monetization', component: WorkInProgress },
    ],
    'Monitoring': [
        { title: 'How is your App performing? See what you should look after', slug: 'monitoring', component: WorkInProgress },
    ],
    'NFT': [
        { title: 'New to NFT? Hope on the next generation wagon', slug: 'NFT', component: WorkInProgress },
    ],
    'Security': [
        { title: 'Test your own website', slug: 'WebsiteSecurity', component: WorkInProgress },
        { title: 'How to connect securely to your Servers - Teleport', slug: 'server-ssh', component: WorkInProgress },
    ],
    'Self-Hosting': [
        { title: 'Server Rack and  Why you need to build one (~5.5 min read)', slug: 'server-rack', component: ServerRack },
        { title: 'How to serve content securely from your Server (~5 min read)', slug: 'secure-hosting', component: SecureHosting },
        { title: 'What I used to build my Server Rack', slug: 'Server Supplies', component: WorkInProgress },
        { title: 'Setup a K8s Controller and K8s Nodes', slug: 'Server K8s', component: ServerK8s },
    ],
    'SEO': [
        { title: 'Increase traffic to your website', slug: 'SEO', component: WorkInProgress },
    ],
    'Web Development': [
        { title: 'Make some $ from your website', slug: 'Web Monetization', component: WorkInProgress },
    ],
    'Web3': [
        { title: 'Web3 - What is it and why should you care', slug: 'Web3', component: WorkInProgress },
    ]
};

export default BlogPosts;