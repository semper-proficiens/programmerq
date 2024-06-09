import React, { useEffect, useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import '../styles/toggle.css';

function DarkLightToggle() {
    const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

    useEffect(() => {
        const body = document.querySelector('body');
        if (isDarkMode) {
            body.classList.add('bg-dark');
        } else {
            body.classList.remove('bg-dark');
        }
    }, [isDarkMode]);

    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className='toggle-container'>
            <label className="toggle-switch">
                <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={handleToggle}
                />
                <span className="switch-slider"></span>
            </label>
            <span className={isDarkMode ? "toggle-message-dark" : "toggle-message-light"}>
                {isDarkMode ? 'Try Light Mode!' : 'Try Dark Mode!'}
            </span>
        </div>
    );
}

export default DarkLightToggle;
