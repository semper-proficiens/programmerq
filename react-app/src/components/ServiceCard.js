import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

function ServiceCard({ service }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    const truncatedText = service.description.slice(0, 50) + '...';

    return (
        <Card style={{ border: '2px solid #28282B', maxWidth: '20rem' }}>
            <Card.Img variant="top" src={service.imageUrl} />
            <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <div style={{ display: "flex" }}>
                    {isExpanded ?
                        <Card.Text>
                            {service.description}
                        </Card.Text>
                        :
                        <Card.Text className="text-truncate" style={{maxHeight: "2.4em", overflow: "hidden"}}>
                            {truncatedText}
                        </Card.Text>
                    }
                    {service.description.length > 50 && !isExpanded &&
                        <Button onClick={toggleExpand} variant="link" className="pl-0">
                            ...
                        </Button>
                    }
                </div>
                {service.description.length > 50 && isExpanded &&
                    <Button onClick={toggleExpand} variant="link" className="pl-0">
                        See less
                    </Button>
                }
                <Button href={service.link} variant="outline-dark">Learn More</Button>
            </Card.Body>
        </Card>
    );
}

export default ServiceCard;
