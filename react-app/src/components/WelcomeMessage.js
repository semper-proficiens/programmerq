import React, {useContext} from 'react';
import { Container } from 'react-bootstrap';
import Typing from 'react-typing-animation';
import {DarkModeContext} from "../contexts/DarkModeContext";

function WelcomeMessage() {
    const { isDarkMode } = useContext(DarkModeContext);

    const fontStyles = {
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fontSize: '32px',
        letterSpacing: '1px',
        lineHeight: '48px',
        marginBottom: '50px',
        color: isDarkMode ? "#E4A11B" : "primary",
    };

    return (
        <Container>
            <Typing speed={300}>
                <h1 style={fontStyles}>
                    {Array.from('Welcome to ProgrammerQ!').map((letter, index) => (
                        <span key={index}>{letter}</span>
                    ))}
                </h1>
            </Typing>
        </Container>
    );
}

export default WelcomeMessage;
