import React from 'react';
import BlogPostCategoryWidget from './BlogPostCategoryWidget';

const categories = ['Hardware', 'Security', 'App Performance', 'CI/CD'];

function BlogPostCategories() {
    return (
        <div className="blog-post-category-page">
            <div className="widgets-container">
                {categories.map((category, index) => (
                    <BlogPostCategoryWidget key={index} category={category} />
                ))}
            </div>
        </div>
    );
}

export default BlogPostCategories;