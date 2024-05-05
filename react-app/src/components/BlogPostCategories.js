import React from 'react';
import { Link } from 'react-router-dom';
import BlogPostCategoryWidget from './BlogPostCategoryWidget';
import BlogPosts from './BlogPosts';

const categories = Object.keys(BlogPosts);

function BlogPostCategories() {
    return (
        <div className="blog-post-page">
            <div className="widgets-container">
                {categories.map((category, index) => (
                    <Link to={`/blog/${category}`} key={index}>
                        <BlogPostCategoryWidget category={category} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default BlogPostCategories;