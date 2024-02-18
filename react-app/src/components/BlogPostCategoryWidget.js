import React, { useContext } from 'react';
import { Textfit } from 'react-textfit';
import { DarkModeContext } from '../contexts/DarkModeContext';
import '../styles/blogpostcategorywidget.css';

function BlogPostCategoryWidget({ category, onClick }) {
    const { isDarkMode } = useContext(DarkModeContext);

    return (
        <div className={isDarkMode ? 'blog-post-add-widget-dark' : 'blog-post-add-widget-light'} onClick={onClick}>
            <div>
                <Textfit className="widget-title" mode="single" max={40}>
                    {category}
                </Textfit>
            </div>
        </div>
    );
}

export default BlogPostCategoryWidget;