import React from 'react';
import { Container } from 'react-bootstrap';
import BlogPostCategories from "./BlogPostCategories";

const BlogPage = () => {

    return (
        <Container id="blog" className="my-5">
            <BlogPostCategories />
        </Container>
    );
};

export default BlogPage;