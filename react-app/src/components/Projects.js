import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Projects() {
    const [cardIndex, setCardIndex] = useState(0);
    const projectCards = [
        {
            title: "Project 1",
            imgSrc: "https://via.placeholder.com/350x200",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, lectus nec ullamcorper convallis, velit velit maximus quam, ut eleifend leo arcu sit amet elit.",
            link: "#"
        },
        {
            title: "Project 2",
            imgSrc: "https://via.placeholder.com/350x200",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, lectus nec ullamcorper convallis, velit velit maximus quam, ut eleifend leo arcu sit amet elit.",
            link: "#"
        },
        {
            title: "Project 3",
            imgSrc: "https://via.placeholder.com/350x200",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, lectus nec ullamcorper convallis, velit velit maximus quam, ut eleifend leo arcu sit amet elit.",
            link: "#"
        },
        {
            title: "Project 4",
            imgSrc: "https://via.placeholder.com/350x200",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, lectus nec ullamcorper convallis, velit velit maximus quam, ut eleifend leo arcu sit amet elit.",
            link: "#"
        }
    ];

    const handleArrowClick = (direction) => {
        if (direction === "left") {
            setCardIndex((prevIndex) => (prevIndex === 0 ? projectCards.length - 1 : prevIndex - 1));
        } else if (direction === "right") {
            setCardIndex((prevIndex) => (prevIndex === projectCards.length - 1 ? 0 : prevIndex + 1));
        }
    };

    return (
        <Container id="projects">
            <h2>Projects</h2>
            <Row>
                <Col xs={1} className="d-flex align-items-center">
                    <FaArrowLeft className="arrow" onClick={() => handleArrowClick("left")} />
                </Col>
                <Col xs={10}>
                    <Row>
                        <Col md={4}>
                            <Card>
                                <Card.Img variant="top" src={projectCards[cardIndex].imgSrc} />
                                <Card.Body>
                                    <Card.Title>{projectCards[cardIndex].title}</Card.Title>
                                    <Card.Text>
                                        {projectCards[cardIndex].description}
                                    </Card.Text>
                                    <Button variant="primary" href={projectCards[cardIndex].link}>Learn More</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xs={1} className="d-flex align-items-center justify-content-end">
                    <FaArrowRight className="arrow" onClick={() => handleArrowClick("right")} />
                </Col>
            </Row>
        </Container>
    );
}

export default Projects;
