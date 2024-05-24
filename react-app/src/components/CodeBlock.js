import React, { useState } from 'react';
import dedent from 'dedent';
import '../styles/codeblock.css';

const CodeBlock = ({ language, children }) => {
    const [buttonText, setButtonText] = useState('Copy');

    const dedentedCode = dedent(children);

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

    // Convert children to a string if it's not already, for copying purposes
    const codeString = typeof children === 'string' ? children : React.Children.toArray(children).join('');

    return (
        <div className="codeblock-container" onClick={(event) => event.stopPropagation()}>
          <pre className={`language-${language}`}>
            <code className="code">
              {dedentedCode}
            </code>
            <button onClick={(event) => copyToClipboard(codeString, event)} className="copy-button">
                {buttonText}
            </button>
          </pre>
        </div>
    );
};

export default CodeBlock;
