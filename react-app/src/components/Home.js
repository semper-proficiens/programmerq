import React from 'react';
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

    return (
        <Container>
            <Typing speed={300}>
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
