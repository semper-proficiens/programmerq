import React, { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import '../../styles/post.css';
import SecureLock from '../../assets/images/secure-on-chalkboard-with-locks.jpg';
import CollapsibleSection from '../CollapsibleSection';
import BlogPostIndentedParagraph from "../BlogPostIndentedParagraph";
import CodeBlock from "../CodeBlock";
import ExternalLink from "../ExternalLink";
import {Link} from "react-router-dom";

function PostgreSQLServerSetup() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={SecureLock} alt="SecureLock" />

            <CollapsibleSection title="Context for SQL Setup (~5min)">
                <BlogPostIndentedParagraph>
                    This installation runs on a RHEL9 server and is geared towards configuring a
                    self-hosted PostgreSQL backend for any application, but at some point it
                    will become specific to an Artifactory backend config.
                </BlogPostIndentedParagraph>

                <BlogPostIndentedParagraph>

                </BlogPostIndentedParagraph>

            </CollapsibleSection>

        </article>
    );
}

export default PostgreSQLServerSetup;