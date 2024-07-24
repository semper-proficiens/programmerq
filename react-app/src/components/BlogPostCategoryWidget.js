import React, { useContext, useRef, useState, useEffect } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import '../styles/blogpostcategorywidget.css';

function BlogPostCategoryWidget({ category, onClick }) {
    const { isDarkMode } = useContext(DarkModeContext);
    const textRef = useRef(null);
    const [fontSize, setFontSize] = useState(40); // Start with max font size

    useEffect(() => {
        const adjustFontSize = () => {
            const currentElement = textRef.current;
            if (currentElement) {
                const parentWidth = currentElement.parentNode.offsetWidth;
                const currentWidth = currentElement.scrollWidth;
                if (currentWidth > parentWidth) {
                    setFontSize((size) => size * (parentWidth / currentWidth));
                } else {
                    setFontSize(40); // Reset to max font size if it fits
                }
            }
        };

        adjustFontSize();
        // Optional: Adjust font size on window resize
        window.addEventListener('resize', adjustFontSize);
        return () => window.removeEventListener('resize', adjustFontSize);
    }, [category]);

    return (
        <div className={isDarkMode ? 'blog-post-add-widget-dark' : 'blog-post-add-widget-light'} onClick={onClick}>
            <div>
                <span
                    ref={textRef}
                    className="widget-title"
                    style={{ fontSize: `${fontSize}px` }}
                >
                    {category}
                </span>
            </div>
        </div>
    );
}

export default BlogPostCategoryWidget;
