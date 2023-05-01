import React, { useState, useEffect } from 'react';
import { Toggle } from 'react-toggle-component';

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
        <div className={`toggle-container ${isDarkMode ? 'dark' : ''}`}>
            <Toggle
                leftBackgroundColor="#343a40"
                rightBackgroundColor="#fff"
                knobColor="#343a40"
                borderColor="#343a40"
                name="dark-mode-toggle"
                checked={isDarkMode}
                onToggle={() => setIsDarkMode(!isDarkMode)}
                className="dark-mode-toggle"
            />
            <span className="toggle-message">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </span>
        </div>
    );
}

export default DarkLightToggle;
