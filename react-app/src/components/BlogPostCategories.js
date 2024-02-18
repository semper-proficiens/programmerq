import React from 'react';
import { Link } from 'react-router-dom';
import BlogPostCategoryWidget from './BlogPostCategoryWidget';

const categories = ['Hardware', 'Security', 'App Performance', 'CI/CD', 'SEO'];

function BlogPostCategories() {
    return (
        <div className="blog-post-category-page">
            <div className="widgets-container">
                {categories.map((category, index) => (
                    <Link to={`/blog/category/${category}`} key={index}>
                        <BlogPostCategoryWidget category={category} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default BlogPostCategories;