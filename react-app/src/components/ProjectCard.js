import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ProjectCard({ project }) {
    return (
        <Card>
            <Card.Img variant="top" src={project.imageUrl} />
            <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>
                    {project.description}
                </Card.Text>
                <Button href={project.link} variant="primary">Learn More</Button>
            </Card.Body>
        </Card>
    );
}

export default ProjectCard;