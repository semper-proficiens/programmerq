import React, { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import '../styles/post.css';

function AboutPage() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <section className="post-section">
                <h1 className="post-subheading">Who am I?</h1>
                <p className="post-content">
                    I'm a Software Engineer with a somewhat diverse background. I've had the opportunity to work
                    on a variety of projects. These projects touched on different IT areas including Data Warehouse, Machine Learning,
                    Business Intelligence, Web Development, and Security.
                    I've been a Consultant, a Developer, a DevOps, an AppSecDev (what?! yes it's a title
                    <span role="img" aria-label="smiling and sweating">😅</span>). In terms of Industries, I've worked
                    in Consulting, Banking, Oil, Networking, and CyberSecurity.
                </p>
            </section>

            <hr className="post-divider" />

            <section className="post-section">
                <h1 className="post-subheading">Why this Website?</h1>
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
            </section>
        </article>
    );
}

export default AboutPage;