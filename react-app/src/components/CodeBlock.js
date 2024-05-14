import React, { useState } from 'react';
import '../styles/codeblock.css';

const CodeBlock = ({ language, children }) => {
    const [buttonText, setButtonText] = useState('Copy');

    // Function to copy the code to the clipboard
    const copyToClipboard = async (code, event) => {
        event.stopPropagation(); // Prevent click from propagating to parent elements
        try {
            await navigator.clipboard.writeText(code);
            setButtonText('Copied!'); // Change button text to 'Copied!'
            // Reset button text back to 'Copy' after some time
            setTimeout(() => setButtonText('Copy'), 20000);
        } catch (err) {
            console.error('Could not copy text: ', err);
        }
    };

    return (
        <div className="codeblock-container">
          <pre className={`language-${language}`}>
            <code>
              {children}
            </code>
          </pre>
            <button onClick={(event) => copyToClipboard(children, event)} className="copy-button">
                {buttonText}
            </button>
        </div>
    );
};

export default CodeBlock;
