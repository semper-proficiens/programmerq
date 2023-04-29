import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Typing from 'react-typing-animation';

function Home() {
    const fontStyles = {
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fontSize: '32px',
        letterSpacing: '1px',
        lineHeight: '48px',
    };

    const [key, setKey] = useState(0);

    const handleTypingComplete = () => {
        setKey(0);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setKey(key => key + 1);
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Container>
            <Typing key={key} speed={300} onFinishedTyping={handleTypingComplete}>
                <h1 style={fontStyles}>
                    {Array.from('Welcome to ProgrammerQ!').map((letter, index) => (
                        <span
                            key={index}
                            style={{
                                color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
                            }}>
              {letter}
            </span>
                    ))}
                </h1>
            </Typing>
        </Container>
    );
}

export default Home;
