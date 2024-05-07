import React, {useContext, useState} from 'react';
import { Card, Button } from 'react-bootstrap';
import { DarkModeContext } from '../contexts/DarkModeContext';

function ApplicationCard({ service }) {
    const { isDarkMode } = useContext(DarkModeContext);

    // Define a custom style for the text
    const textStyle = {
        color: isDarkMode ? '#dcdcdc' : '#343a40',
        textAlign: 'justify'
    };

    const titleStyle = {
        color: isDarkMode ? '#ffc107' : '#28282B',
        fontFamily: 'Georgia, serif',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        letterSpacing: '1px',
        margin: '0.5rem 0',
        textAlign: 'center',
    };

    return (
        <Card style={isDarkMode ? { border: '2px solid #ffc107', maxWidth: '20rem', backgroundColor: '#28282B', minHeight: '100%' } : { border: '2px solid #28282B', maxWidth: '20rem', minHeight: '100%' }}>
            <Card.Img variant="top" src={service.imageUrl} />
            <Card.Body>
                <Card.Title style={titleStyle}>
                    {service.title}
                </Card.Title>
                <Card.Text style={textStyle}>
                    {service.description}
                </Card.Text>
                <Button href={service.link} variant={isDarkMode ? "outline-warning" : "outline-dark"}>Try it!</Button>
            </Card.Body>
        </Card>
    );
}

export default ApplicationCard;
