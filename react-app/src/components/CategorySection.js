// components/CategorySection.js
import React, { useState } from 'react';
import BlogPost from './BlogPost';
import '../styles/categorysection.css';

const CategorySection = ({ category, posts }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div key={category} className={`mt-5 ${isExpanded ? 'expanded' : ''}`}>
            <button
                className="btn btn-primary mb-3"
                onClick={handleToggleExpand}
                aria-controls={`category-${category}`}
                aria-expanded={isExpanded}
            >
                {category}
            </button>

            <div className="category-content">
                {(posts[category] || []).map((post, index) => (
                    <BlogPost key={index} post={post} />
                ))}
            </div>
        </div>
    );
};

export default CategorySection;