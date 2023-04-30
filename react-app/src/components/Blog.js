import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/blog.css';

function Blog() {
    return (
        <Container id="blog" className="my-5">
            <h2>Blog</h2>
            <div className="blog-box">
                <p className="typewriter">
                    Here's some content for the <a href="/blog" className="text-decoration-none">blog page</a>.
                </p>
            </div>
        </Container>
    );
}

export default Blog;
