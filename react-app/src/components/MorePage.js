import React, { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import '../styles/post.css';

function MorePage() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (

        <article className={isDarkMode ? 'post dark-mode' : 'post'}>

            <section className="post-section">
                <h1 className="post-subheading">Contact</h1>
                <p className="post-content">
                    You can reach me through:
                </p>
            </section>

            <hr className="post-divider" />

            <section className="post-section">
                <h1 className="post-subheading">Privacy Policy</h1>
                <p className="post-content">
                    Placeholder
                </p>
            </section>

            <hr className="post-divider" />

            <section className="post-section">
                <h1 className="post-subheading">Terms and Conditions</h1>
                <p className="post-content">
                    Placeholder
                </p>
            </section>

            <hr className="post-divider" />
        </article>
    );
}

export default MorePage;