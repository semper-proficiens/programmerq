import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import '../styles/blog.css';

import { Link } from 'react-router-dom';
import { DarkModeContext } from '../contexts/DarkModeContext';

function HomeBlog() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (
        <Container id="blog" className="my-5">
            <h2 className={isDarkMode ? "text-warning" : "primary"}>Blog</h2>
            <div className={isDarkMode ? "blog-box-dark" : "blog-box-light"}>
                <p className={`${isDarkMode ? "typewriter-dark" : "typewriter-light"} mb-custom`}>
                    Check the <Link to="/blog">Blog</Link> section for interesting topics around Software Engineering,
                    Security, and even how to generate some revenue using self-hosted servers, and other nerd
                    ideas
                </p>
            </div>
        </Container>
    );
}

export default HomeBlog;
