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
                    <Link
                        key={index}
                        to={`/post/${index + 1}`} // Assuming each post has a unique identifier/index
                        className={`post-link ${isDarkMode ? 'post-link-dark' : 'post-link-light'}`}
                    >
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;
