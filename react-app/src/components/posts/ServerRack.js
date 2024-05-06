import React, { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import '../../styles/post.css';
import ServerRackImage from '../../assets/images/server_rack_cables.jpeg';
import ServerRackMess from '../../assets/images/server_rack_mess.jpeg';

function ServerRack() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <img className="post-image" src={ServerRackImage} alt="ServerRack" />

            <section className="post-section">
                <h1 className="post-subheading">Next-Gen Engineers and the Cloud</h1>
                <p className="post-content">
                    In today's world, we're all hooked into Cloud-oriented Infrastructure and Cloud-hosted Apps.
                    The Cloud is a new paradigm that is groundbreaking and every Engineer should be involved in growing their
                    skills in a Cloud-native environment.

                    However, this has also abstracted some of the foundational knowledge that some Engineers should have.
                    New generations of Engineers are building straight into the Cloud and skipping the Hardware hustle.
                    I was a victim of this Cloud side-effect. For App developers, dealing with Infrastructure is the
                    last thing they want to worry about, but that's until they need to start worrying about cost.
                </p>
            </section>

            <hr className="post-divider" />

            <section className="post-section">
                <h1 className="post-subheading">Cost</h1>
                <p className="post-content">
                    Have you ever been hit with a Cloud Provider bill? I have, and it sure hurts <span span role="img" aria-label="head hurt">🤕</span>.
                    Most Public Cloud Providers offer tier-free resources for a promotional period, and that's awesome.
                    This option is certainly cool for testing stuff and learning new stuff. But what if you need something
                    more permanent? Yeah...after the promotional period that first bill is going to  open a whole in your budget.
                </p>
            </section>

            <hr className="post-divider" />

            <section className="post-section">
                <h1 className="post-subheading">Learning Experience</h1>
                <p className="post-content">
                    So, almost every new Engineer out there is following tutorials for Cloud certifications, or other purposes,
                    and they are just stand up vanilla Network infrastructure. This often leads to Public Networks,
                    open ports, and other security holes in your implementation.
                </p>
            </section>

            <hr className="post-divider" />

            <section className="post-section">
                <h1 className="post-subheading">Conclusion</h1>
                <p className="post-content">
                    Get a HomeLab going, get something running in Server(s) that <strong>you</strong> maintain.
                    It doesn't have to be perfect, you can iterate on the imperfections and improve as you go along.
                    Let me show you mine (where you're currently seeing this page rendered from).

                    <img className="post-image" src={ServerRackMess} alt="ServerRackMess" />

                    As you can tell, it's definitely not good-looking, and every Server Rack <em>aficionado</em> is probably
                    having a heart attack seeing this.

                    But, trust me, going through this experience is worth it, and probably something cool you can talk about
                    with your coworkers or friends (those <em>"OMG! You're a hacker!"</em> moments from
                    non-tech folks are also priceless <span role="img" aria-label="smiling face with sunglasses emoji">😎</span>).
                </p>
            </section>
        </article>
    );
}

export default ServerRack;