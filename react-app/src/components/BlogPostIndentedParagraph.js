import React from 'react';
import '../styles/post.css';

const BlogPostIndentedParagraph = ({ children }) => {
    return (
        <p className="post-content">
            {children}
        </p>
    );
};

export default BlogPostIndentedParagraph;
