import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ServiceCard({ service }) {
    return (
        <Card>
            <Card.Img variant="top" src={service.imageUrl} />
            <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>
                    {service.description}
                </Card.Text>
                <Button href={service.link} variant="primary">Learn More</Button>
            </Card.Body>
        </Card>
    );
}

export default ServiceCard;