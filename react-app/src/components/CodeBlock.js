import React from 'react';
import '../styles/codeblock.css';

const CodeBlock = ({ language, children }) => {
    return (
        <pre className={`language-${language}`}>
      <code>
        {children}
      </code>
    </pre>
    );
};

export default CodeBlock;
