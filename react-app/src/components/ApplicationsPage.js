import React, {useContext} from "react";
import {DarkModeContext} from "../contexts/DarkModeContext";
import '../styles/post.css';

function ApplicationsPage() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <section className="post-section">
                <h1 className="post-subheading">Daily Programmer</h1>
                <p className="post-content">
                    Check all your Security parameters from one place
                </p>
            </section>

            <hr className="post-divider" />

            <section className="post-section">
                <h1 className="post-subheading">Service2</h1>
                <p className="post-content">
                    Check all your Security parameters from one place
                </p>
            </section>

        </article>
    );
}

export default ApplicationsPage;