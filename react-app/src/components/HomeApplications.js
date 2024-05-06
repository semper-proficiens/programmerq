import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import '../styles/blog.css';

import { Link } from 'react-router-dom';
import { DarkModeContext } from '../contexts/DarkModeContext';

function HomeApplications() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (
        <Container id="blog" className="my-5">
            <h2 className={isDarkMode ? "text-warning" : "primary"}>Applications</h2>
            <div className={isDarkMode ? "blog-box-dark" : "blog-box-light"}>
                <p className={`${isDarkMode ? "typewriter-dark" : "typewriter-light"} mb-custom`}>
                    Check the <Link to="/applications">Applications</Link> section for some self-developed
                    Applications that attempt to solve some SoftWare Engineer problems, and Internet security
                </p>
            </div>
        </Container>
    );
}

export default HomeApplications;
