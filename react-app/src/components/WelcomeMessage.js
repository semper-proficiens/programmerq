import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Typing from 'react-typing-animation';
import { DarkModeContext } from '../contexts/DarkModeContext';

const TypedWelcomeMessage = ({ isDarkMode }) => {
    const fontStyles = {
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fontSize: '32px',
        letterSpacing: '1px',
        lineHeight: '48px',
        marginBottom: '50px',
        color: isDarkMode ? '#E4A11B' : '#007bff',
    };

    // Generate a unique key for the component to force remount
    const componentKey = isDarkMode ? 'dark' : 'light';

    return (
        <Typing speed={300} key={componentKey}>
            <h1 style={fontStyles}>Welcome to ProgrammerQ!</h1>
        </Typing>
    );
};

function WelcomeMessage() {
    const { isDarkMode } = useContext(DarkModeContext);
    const [key, setKey] = useState(isDarkMode ? 'dark' : 'light');

    // Update the key when the theme changes to force remount the TypedWelcomeMessage
    useEffect(() => {
        setKey(isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <Container>
            <TypedWelcomeMessage key={key} isDarkMode={isDarkMode} />
        </Container>
    );
}

export default WelcomeMessage;