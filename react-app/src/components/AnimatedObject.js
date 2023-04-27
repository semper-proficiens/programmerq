import React from 'react';
import '../styles/AnimatedObject.css';

function AnimatedObject() {
    const numSquares = 5;
    const squares = [];

    for (let i = 0; i < numSquares; i++) {
        squares.push(
            <div key={i} className="animated-object" style={{ animationDelay: `${i * 0.2}s`, left: `${i * 50}px`, top: `${i * 50}px` }}>
                {i === 0 ? 'Service' : `Message${i}`}
            </div>
        );
    }

    return (
        <div className="animated-object-wrapper">
            {squares}
        </div>
    );
}

export default AnimatedObject;
