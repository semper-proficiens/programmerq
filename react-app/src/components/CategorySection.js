// components/CategorySection.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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
                {isExpanded &&
                (posts[category] || []).map((post, index) => (
                    <div key={index} className={`post ${isDarkMode ? 'post-dark' : 'post-light'}`}>
                        <Link to={`/post/${index + 1}`} className={`post-title ${isDarkMode ? 'post-link-dark' : 'post-link-light'}`}>
                            <h3>{post.title}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;
