import React, { useState } from 'react';

const CollapsibleSection = ({ title, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <section className="post-section" onClick={toggleExpanded}>
            <h1 className="post-subheading">
                <span className={`arrow ${isExpanded ? 'down' : ''}`}>&#x2192;</span>
                {title}
            </h1>
            {isExpanded && (
                <div className="post-content">
                    {children}
                </div>
            )}
        </section>
    );
};

export default CollapsibleSection;