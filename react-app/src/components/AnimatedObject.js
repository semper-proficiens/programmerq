import React from 'react';
import '../styles/AnimatedObject.css';

function AnimatedObject() {
    const squares = [
        { message: 'Service' },
        { message: 'Message1' },
        { message: 'Message2' },
        { message: 'Message3' },
        { message: 'Message4' },
    ];

    return (
        <div>
            {squares.map((square, index) => (
                <div
                    key={index}
                    className="animated-object"
                    style={{ animationDelay: `${index * 0.2}s` }}
                >
                    {square.message}
                </div>
            ))}
        </div>
    );
}

export default AnimatedObject;
