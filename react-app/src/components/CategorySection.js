import React, { useState, useContext } from 'react';
import BlogPost from './BlogPost';
import '../styles/categorysection.css';
import { DarkModeContext } from '../contexts/DarkModeContext';

const CategorySection = ({ category, posts }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { isDarkMode } = useContext(DarkModeContext);

    const handleToggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div key={category} className={`category-section ${isExpanded ? 'expanded' : ''}`}>
            <button
                className={`btn ${isDarkMode ? 'btn-category-dark' : 'btn-category-light'}`}
                onClick={handleToggleExpand}
                aria-controls={`category-${category}`}
                aria-expanded={isExpanded}
            >
                {category}
            </button>
            <div className={`category-content ${isDarkMode ? 'dark-mode' : ''}`}>
                {(posts[category] || []).map((post, index) => (
                    <BlogPost key={index} post={post} />
                ))}
            </div>
        </div>
    );
};

export default CategorySection;
