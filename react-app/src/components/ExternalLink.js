import React from 'react';

const ExternalLink = ({ href }) => {
    return (
        <>
            &nbsp;
            <a href={href} target="_blank" rel="noopener noreferrer">
                here
            </a>
        </>
    );
};

export default ExternalLink;