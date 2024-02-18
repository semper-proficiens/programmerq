import React, { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import '../styles/blogpostcategorywidget.css';

function BlogPostCategoryWidget({ category }) {
    const { isDarkMode } = useContext(DarkModeContext);

    return (
        <div className={isDarkMode ? 'blog-post-add-widget-dark' : 'blog-post-add-widget-light'}>
            <div className={isDarkMode ? "blog-post-widget-title-container-dark" : "blog-post-widget-title-container-dark"}>
                    {category}
            </div>
        </div>
    );
}

export default BlogPostCategoryWidget;