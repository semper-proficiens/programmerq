import React, {useContext, useState} from 'react';
import { Card, Button } from 'react-bootstrap';
import { DarkModeContext } from '../contexts/DarkModeContext';

function ServiceCard({ service }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    const { isDarkMode } = useContext(DarkModeContext);

    const truncatedText = service.description.slice(0, 50);

    return (
        <Card style={isDarkMode ? {border: '2px solid #28282B', maxWidth: '20rem', backgroundColor: '#28282B' } : {border: '2px solid #28282B', maxWidth: '20rem' }}>
            <Card.Img variant="top" src={service.imageUrl} />
            <Card.Body>
                <Card.Title style={isDarkMode ? {maxHeight: "2.4em", overflow: "hidden", color: "#f8f9fa"} : {maxHeight: "2.4em", overflow: "hidden", color: "#343a40"}}>{service.title}</Card.Title>
                <div style={{ display: "flex" }}>
                    {isExpanded ?
                        <Card.Text style={isDarkMode ? {color: "#f8f9fa"} : {color: "#343a40"}}>
                            {service.description}
                        </Card.Text>
                        :
                        <Card.Text className="text-truncate" style={isDarkMode ? {maxHeight: "2.4em", overflow: "hidden", color: "#f8f9fa"} : {maxHeight: "2.4em", overflow: "hidden", color: "#343a40"}}>
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
                <Button href={service.link} variant={isDarkMode ? "outline-warning" : "outline-dark"}>Learn More</Button>
            </Card.Body>
        </Card>
    );
}

export default ServiceCard;
