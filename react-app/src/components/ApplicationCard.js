import React, {useContext, useState} from 'react';
import { Card, Button } from 'react-bootstrap';
import { DarkModeContext } from '../contexts/DarkModeContext';

function ApplicationCard({ service }) {
    const { isDarkMode } = useContext(DarkModeContext);

    // Define a custom style for the text
    const textStyle = {
        color: isDarkMode ? '#f8f9fa' : '#343a40',
        textAlign: 'justify'
    };

    return (
        <Card style={isDarkMode ? { border: '2px solid #ffc107', maxWidth: '20rem', backgroundColor: '#28282B', minHeight: '100%' } : { border: '2px solid #28282B', maxWidth: '20rem', minHeight: '100%' }}>
            <Card.Img variant="top" src={service.imageUrl} />
            <Card.Body>
                <Card.Title style={isDarkMode ? { color: "#f8f9fa" } : { color: "#343a40" }}>
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
