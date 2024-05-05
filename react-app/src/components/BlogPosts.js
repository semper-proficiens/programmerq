import ServerRack from "./posts/ServerRack";
import WorkInProgress from "./WorkInProgress";

const BlogPosts = {
    'Hardware': [
        { title: 'Server Rack - Why you need to build one', slug: 'Server Rack', component: ServerRack },
    ],
    'Security': [
        { title: 'Test your own website', slug: 'WebsiteSecurity', component: WorkInProgress },
    ],
    'App Performance': [
        { title: 'How is your App performing? See what you should look after', slug: 'Measure your App ', component: WorkInProgress },
    ],
    'CICD': [
        { title: 'Automate your FrontEnd Deployment', slug: 'CICD', component: WorkInProgress },
    ],
    'SEO': [
        { title: 'Increase traffic to your website', slug: 'SEO', component: WorkInProgress },
    ],
    'NFT': [
        { title: 'New to NFT? Hope on the next generation wagon', slug: 'NFT', component: WorkInProgress },
    ],
    'Web3': [
        { title: 'Web3 - What is it and why should you care', slug: 'Web3', component: WorkInProgress },
    ],
    'Mobile Apps': [
        { title: 'Go from Web to Mobile', slug: 'Mobile Apps', component: WorkInProgress },
    ],
    'Web Monetization': [
        { title: 'Make some $ from your website', slug: 'Web Monetization', component: WorkInProgress },
    ],
};

export default BlogPosts;