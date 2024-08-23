import React, { useContext } from 'react';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import '../../../styles/post.css';
import WebhookRelayInternal from '../../../assets/images/webhook_relay_internal.png';
import CollapsibleSection from '../../CollapsibleSection';
import BlogPostIndentedParagraph from "../../BlogPostIndentedParagraph";
import ExternalLink from "../../ExternalLink";

function WebhookRelay() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={WebhookRelayInternal} alt="WebhookRelayInternal" />

            <CollapsibleSection title="Why we need this and what tool did I select? (~1min)">
                <BlogPostIndentedParagraph>
                    If like me, your Jenkins Controller is hosted in private network, and you want to implement
                    GitOps, you will need a way for push event in Github webhooks in your public repo to reach your Jenkins Controller.
                    One way to accomplish this is by allowing your Github repository to send webhook event to a third-party
                    software and can tunnel into your internal network.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    In my search for this solution, I saw a couple of tools, <strong>SMEE</strong> being a popular one, but
                    not all of them checked my boxes. In fact, SMEE was a good candidate until I learned it's not really designed
                    for production use, it's truly meant for development and testing only because its channels are not authenticated, so,
                    if someone has your channel ID, they can see the payloads being sent, so it is not secure for production use.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    I decided to select WebhookRelay Agent and its internal network relay architecture.
                    You read more about this here: <ExternalLink href="https://webhookrelay.com/v1/platform/#:~:text=Webhook%20Relay%20is%20designed%20to,entire%20servers%20to%20the%20Internet."/>.
                    But in a nutshell, it receives Github Webhook events from my repository and relays them to my Jenkins Controller
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

            <CollapsibleSection title="Setting up the integration (~1min)">
                <BlogPostIndentedParagraph>
                    There is already a nice tutorial by Jenkins for this <ExternalLink href="https://webhookrelay.com/v1/tutorials/github-webhooks-jenkins-vm/"/>.
                    I have my WebhookRelay agent running on a dedicated server in private network. So, for this setup I used their
                    Their option 2 <ExternalLink href="https://webhookrelay.com/v1/tutorials/github-webhooks-jenkins-vm/#Option-2-Installing-the-agent-as-a-background-service"/>.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Webhook relay doc is so well-described for a Jenkins implementation that I don't think I need to add anything that isn't described in their doc above.
                    If you configured it all correctly, upon your git push to master or main branch, it should trigger a push webhook to your public webhook relay endpoint,
                    which then gets pulled by your internally hosted webhook relay agent and triggers a build in your Jenkins pipeline for that repository.
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

        </article>
    );
}

export default WebhookRelay;