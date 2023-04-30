import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/blog.css';
import {Link} from "react-router-dom";

function BlogPage() {
    return (
        <Container id="blog" className="my-5">
            <h2>Test</h2>
            <div className="blog-box">
                <p className="typewriter">
                    Testing 1,2,3
                </p>
            </div>
        </Container>
    );
}

export default BlogPage;
