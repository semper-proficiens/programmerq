import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/blog.css';

import { Link } from 'react-router-dom';

function HomeBlog() {
    return (
        <Container id="blog" className="my-5">
            <h2>Blog</h2>
            <div className="blog-box">
                <p className="typewriter">
                    Check what we're cooking -> <Link to="/blog" className="text-decoration-none">Blog</Link>
                </p>
            </div>
        </Container>
    );
}

export default HomeBlog;
