import React, { useContext, useState } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import '../styles/post.css';

function AboutPage() {
    const { isDarkMode } = useContext(DarkModeContext);
    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (section) => {
        setExpandedSections(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    const isSectionExpanded = (section) => {
        return expandedSections[section] ?? false; // Default to false if not set
    };

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <section className="post-section" onClick={() => toggleSection('section1')}>
                        <h1 className="post-subheading">
                            <span className={`arrow ${isSectionExpanded('section1') ? 'down' : ''}`}>&#x2192;</span>
                            Who am I?
                        </h1>
                        {isSectionExpanded('section1') && (
                            <p className="post-content">
                                I'm a Software Engineer with a somewhat diverse background. I've had the opportunity to work
                                on a variety of projects. These projects touched on different IT areas including Data Warehouse, Machine Learning,
                                Business Intelligence, Web Development, and Security.
                                I've been a Consultant, a Developer, a DevOps, an AppSecDev (what?! yes it's a title
                                <span role="img" aria-label="smiling and sweating">😅</span>). In terms of Industries, I've worked
                                in Consulting, Banking, Oil, Networking, and CyberSecurity.
                            </p>
                        )}
            </section>

            <section className="post-section" onClick={() => toggleSection('section2')}>
                <h1 className="post-subheading">
                    <span className={`arrow ${isSectionExpanded('section2') ? 'down' : ''}`}>&#x2192;</span>
                    Why this Website?
                </h1>
                {isSectionExpanded('section2') && (
                    <p className="post-content">
                        This website aims to inform, discuss, and challenge topics around SoftWare Engineering, Security,
                        Development, and other trending topics. I use this website as a place to test concepts
                        and broadcast some of my work publicly (most of my professional work has been proprietary
                        code, so, I can't share artifacts of my work).
                        <br/>
                        <br/>

                        On a side note, it would be amazing to gain an audience, build a community, and who knows, maybe even
                        earn a few bucks to pay for coffee <span role="img" aria-label="coffee">☕️</span> and keep my bad
                        boy servers alive <span role="img" aria-label="smiling and sweating">😅</span>.
                    </p>
                )}
            </section>
        </article>
    );
}

export default AboutPage;