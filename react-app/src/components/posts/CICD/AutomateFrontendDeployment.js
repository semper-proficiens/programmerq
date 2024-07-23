import React, { useContext } from 'react';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import '../../../styles/post.css';
import SecureLock from '../../../assets/images/secure-on-chalkboard-with-locks.jpg';
import CollapsibleSection from '../../CollapsibleSection';
import BlogPostIndentedParagraph from "../../BlogPostIndentedParagraph";
import CodeBlock from "../../CodeBlock";
import ExternalLink from "../../ExternalLink";

function AutomateFrontendDeployment() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={SecureLock} alt="SecureLock" />

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

            <CollapsibleSection title="Workflow explained (~min)">
                <BlogPostIndentedParagraph>
                    So, how do I automate my deployments from a commit to github main to a live change in my webpage?
                    My CI/CD workflow is just a baby at the moment (I'll update it as I introduced more components and features).
                    Let's break it down in pieces.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>

                </BlogPostIndentedParagraph>

            </CollapsibleSection>

        </article>
    );
}

export default AutomateFrontendDeployment;