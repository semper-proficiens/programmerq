import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import '../../styles/post.css';
import SecureLock from '../../assets/images/secure-on-chalkboard-with-locks.jpg';
import CollapsibleSection from '../CollapsibleSection';
import BlogPostIndentedParagraph from "../BlogPostIndentedParagraph";
import ExternalLink from "../ExternalLink";

function SecureHosting() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={SecureLock} alt="SecureLock" />

            <CollapsibleSection title="Exposing your Server to the Internet (~1min)">
                <BlogPostIndentedParagraph>
                    If you reached this page it means you're thinking of exposing some content into the Internet, or
                    at least are curious about it, from a Server that <strong>you</strong> own.
                    Self-hosting is a really rewarding experience, you can see why in more detail
                    in this other blog <Link to="/post/server-rack">Server Rack and  Why you need to build one</Link>.
                    Now, that being said, before launching your content to the internet you have to make sure you're not
                    exposing your server and it's fully protected, otherwise you're in for a world of pain.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    Your content has to be publicly reachable, otherwise how will internet users ever find your website?
                    This means that somehow your local Server has to be exposed. But wait, I thought you said it shouldn't be exposed?
                    Yes and No.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>
                    You want your Server to be reachable, but in a manner that it won't compromise your information, and making
                    sure you have some layers of protection in case of malicious attacks. This is exactly what we'll cover next.
                    <br/>
                    Now, this assumes you have local Server already configured to serve your content.
                    <br/>
                    If you don't have anything setup, and you want to know how you can check this blog post
                    <Link to="/post/server-content-setup">Configuring content to serve in your Server</Link>
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

            <CollapsibleSection title="Tools to use (~1min)">
                <BlogPostIndentedParagraph>
                    There are many tools out there that can help you serve your web content. However, one tool I use and
                    I recommend is Cloudflare's Zero Trust Tunnel (you can find more about it
                    <ExternalLink href="https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/" />).
                </BlogPostIndentedParagraph>
            </CollapsibleSection>

        </article>
    );
}

export default SecureHosting;