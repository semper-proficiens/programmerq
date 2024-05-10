import React, { useContext } from 'react';
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

    return (
        <Typing speed={300} delay={500}>
            <h1 style={fontStyles}>Welcome to ProgrammerQ!</h1>
        </Typing>
    );
};

function WelcomeMessage() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (
        <Container>
            <TypedWelcomeMessage key={isDarkMode ? 'dark' : 'light'} isDarkMode={isDarkMode} />
        </Container>
    );
}

export default WelcomeMessage;