import React, { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import '../styles/post.css';
import CollapsibleSection from './CollapsibleSection';

function AboutPage() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <CollapsibleSection title="Who am I?">
                <p className="post-content">
                    I'm a Software Engineer with a somewhat diverse background. I've had the opportunity to work
                    on a variety of projects. These projects touched on different IT areas including Data Warehouse, Machine Learning,
                    Business Intelligence, Web Development, and Security.
                    I've been a Consultant, a Developer, a DevOps, an AppSecDev (what?! yes it's a title
                    <span role="img" aria-label="smiling and sweating">😅</span>). In terms of Industries, I've worked
                    in Consulting, Banking, Oil, Networking, and CyberSecurity.
                </p>
            </CollapsibleSection>

            <CollapsibleSection title="Why this Website?">
                <p className="post-content">
                    This website aims to inform, discuss, and challenge topics around SoftWare Engineering, Security,
                    Development, and other trending topics. I use this website as a place to test concepts,
                    broadcast some of my work publicly (most of my professional work has been proprietary
                    code, so, I can't share artifacts of my work), and promote Applications I'll build on other domains.
                    <br/>
                    <br/>
                    On a side note, it would be amazing to help someone out there, build a community, and who knows, maybe even
                    earn a few bucks to pay for coffee <span role="img" aria-label="coffee">☕️</span> and keep my bad
                    boy servers alive <span role="img" aria-label="smiling and sweating">😅</span>.
                </p>
            </CollapsibleSection>

            <CollapsibleSection title="Contributors">
                <p className="post-content">
                    I work on this website after hours, depending on my mood and motivation. So, like any other project out there,
                    if you feel like contributing please do so. If you notice  typos, errors, or that some commands need update,
                    etc, feel free to raise an issue in the github's repo <a href="https://github.com/semper-proficiens/programmerq">here</a>.
                </p>
            </CollapsibleSection>

        </article>
    );
}

export default AboutPage;