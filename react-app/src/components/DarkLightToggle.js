import React, { useState, useEffect } from 'react';
import { Toggle } from 'react-toggle-component';
import '../styles/toggle.css'


function DarkLightToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const body = document.querySelector('body');
        if (isDarkMode) {
            body.classList.add('bg-dark');
        } else {
            body.classList.remove('bg-dark');
        }
    }, [isDarkMode]);

    return (
        <div className='toggle-container'>
            <Toggle
                leftKnobColor = "#f8f9fa"
                leftBackgroundColor = "#343a40"
                rightKnobColor= "#3b3b3b"
                rightBackgroundColor="#fafafa"
                borderColor="#0339ff"
                name="dark-mode-toggle"
                checked={isDarkMode}
                onToggle={() => setIsDarkMode(!isDarkMode)}
            />
            <span className={isDarkMode ? "toggle-message-dark" : "toggle-message-light"}>
                {isDarkMode ? 'Try Light Mode!' : 'Try Dark Mode!'}
            </span>
        </div>
    );
}

export default DarkLightToggle;
