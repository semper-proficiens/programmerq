import React, { useState, useEffect } from 'react';
import dedent from 'dedent';
import Prism from 'prismjs';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
// ... import other languages you need
import 'prismjs/themes/prism.css'; // or another theme you prefer
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import '../styles/codeblock.css';

const CodeBlock = ({ language, children }) => {
    const [buttonText, setButtonText] = useState('Copy');

    // Normalize the children to string
    const codeString = typeof children === 'string' ? children : React.Children.toArray(children).join('');
    // Dedent the code string
    const dedentedCode = dedent(codeString);

    // Highlight the syntax using Prism
    useEffect(() => {
        Prism.highlightAll();
    }, [dedentedCode]); // Re-run syntax highlighting when code changes

    // Function to copy the code to the clipboard
    const copyToClipboard = async (code, event) => {
        event.stopPropagation(); // Prevent click from propagating to parent elements
        try {
            await navigator.clipboard.writeText(code);
            setButtonText('Copied!'); // Change button text to 'Copied!'
            // Reset button text back to 'Copy' after some time
            setTimeout(() => setButtonText('Copy'), 2000);
        } catch (err) {
            console.error('Could not copy text: ', err);
        }
    };

    return (
        <div className="codeblock-container" onClick={(event) => event.stopPropagation()}>
            {/* Add the "line-numbers" class to enable line numbers */}
            <pre className={`language-${language} line-numbers`} style={{ position: 'relative' }}>
                <code className={`language-${language}`}>
                    {dedentedCode}
                </code>
                <button
                    onClick={(event) => copyToClipboard(dedentedCode, event)}
                    className="copy-button"
                    style={{ position: 'absolute', top: '5px', right: '5px' }}
                >
                    {buttonText}
                </button>
            </pre>
        </div>
    );
};

export default CodeBlock;
