import ServerRack from "./posts/ServerRack";
import WorkInProgress from "./WorkInProgress";

const BlogPosts = {
    '3d Printing': [
        { title: 'How is your App performing? See what you should look after', slug: 'Measure your App ', component: WorkInProgress },
    ],
    'CICD': [
        { title: 'Automate your FrontEnd Deployment', slug: 'CICD', component: WorkInProgress },
    ],
    'Hacking': [
        { title: 'Bounty Hunting (~5min read)', slug: 'Server Rack', component: ServerRack },
    ],
    'Hardware': [
        { title: 'Server Rack and  Why you need to build one (~5min read)', slug: 'Server Rack', component: ServerRack },
        { title: 'Where to find parts for your servers', slug: 'Server Supplies', component: WorkInProgress },
        { title: 'What I used to build my Server Rack', slug: 'Server Supplies', component: WorkInProgress },
    ],
    'Mobile Apps': [
        { title: 'Go from Web to Mobile', slug: 'Mobile Apps', component: WorkInProgress },
    ],
    'Monitoring': [
        { title: 'How is your App performing? See what you should look after', slug: 'Measure your App ', component: WorkInProgress },
    ],
    'NFT': [
        { title: 'New to NFT? Hope on the next generation wagon', slug: 'NFT', component: WorkInProgress },
    ],
    'Security': [
        { title: 'Test your own website', slug: 'WebsiteSecurity', component: WorkInProgress },
    ],
    'SEO': [
        { title: 'Increase traffic to your website', slug: 'SEO', component: WorkInProgress },
    ],
    'Web Development': [
        { title: 'Make some $ from your website', slug: 'Web Monetization', component: WorkInProgress },
    ],
    'Web Monetization': [
        { title: 'Make some $ from your website', slug: 'Web Monetization', component: WorkInProgress },
    ],
    'Web3': [
        { title: 'Web3 - What is it and why should you care', slug: 'Web3', component: WorkInProgress },
    ]
};

export default BlogPosts;