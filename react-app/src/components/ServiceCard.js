import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ServiceCard({ service }) {
    return (
        <Card style={{ border: '2px solid #28282B' }}>
            <Card.Img variant="top" src={service.imageUrl} />
            <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>
                    {service.description}
                </Card.Text>
                <Button href={service.link} variant="outline-dark">Learn More</Button>
            </Card.Body>
        </Card>
    );
}

export default ServiceCard;
