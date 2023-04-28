import React from 'react';
import '../styles/QueuedSquares.css';

function QueuedSquares() {
    const numSquares = 5;
    const squares = [];

    for (let i = 0; i < numSquares; i++) {
        squares.push(
            <div key={i} className="animated-object" style={{ animationDelay: `${i * 0.2}s`, top: `${(i + 1) * 100}px` }}>
                {i === 0 ? 'Programmer...' : `Queue${i}`}
            </div>
        );
    }

    return (
        <div className="animated-object-wrapper">
            {squares}
        </div>
    );
}

export default QueuedSquares;
