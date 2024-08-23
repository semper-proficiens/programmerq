import React, { useContext } from 'react';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import '../../../styles/post.css';
import CICD_ProgrammerQ_Frontend from '../../../assets/images/CICD_ProgrammerQ_Frontend.drawio.png';
import CollapsibleSection from '../../CollapsibleSection';
import BlogPostIndentedParagraph from "../../BlogPostIndentedParagraph";
import {Link} from "react-router-dom";

function AutomateFrontendDeployment() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={CICD_ProgrammerQ_Frontend} alt="CD_Diagram" />

            <CollapsibleSection title="Why spend time automating this? (~1min)">
                <BlogPostIndentedParagraph>
                    Well, in my head there is no way I can scale constant changes without automation.
                    I embrace the GitOps culture, so, I expect every commit to my <i>main</i> branch in github
                    to reflect changes in production in a matter of minutes (hopefully builds don't take
                    longer than that).
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    I don't have the time to be testing builds locally, and manually shipping the product
                    to prod. And that's it, I can see how anyone wouldn't want to implement something like,
                    it just doesn't scale otherwise.
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

            <CollapsibleSection title="Workflow explained (~5 min)">
                <BlogPostIndentedParagraph>
                    So, how do I automate my deployments from a commit to github main to a live change in my webpage?
                    My CI/CD workflow is just a baby at the moment (I'll update it as I introduced more components and features).
                    You can see what it looks like above (diagram at the top of the page).
                </BlogPostIndentedParagraph>

            </CollapsibleSection>

            <CollapsibleSection title="Pointer to each setup (~1min)">
                <BlogPostIndentedParagraph>
                    Hopefully, I got you hooked, and you want to do the same.
                    Well, you can see how I deployed each component here.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    My GitOps workflow from push to Webhook Relay to Jenkins here: <Link to="/post/webhook-relay-jenkins">GitOps and Webhook Relay to Jenkins</Link>
                </BlogPostIndentedParagraph>

            </CollapsibleSection>

        </article>
    );
}

export default AutomateFrontendDeployment;