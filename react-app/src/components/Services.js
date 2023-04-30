import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import ServiceCard from './ServiceCard';

function Services() {
    const [serviceIndex, setServiceIndex] = useState(0);

    const services = [
        {
            title: "Service 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, lectus nec ullamcorper convallis, velit velit maximus quam, ut eleifend leo arcu sit amet elit.",
            imageUrl: "https://via.placeholder.com/350x200",
            link: "#",
        },
        {
            title: "Service 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, lectus nec ullamcorper convallis, velit velit maximus quam, ut eleifend leo arcu sit amet elit.",
            imageUrl: "https://via.placeholder.com/350x200",
            link: "#",
        },
        {
            title: "Service 3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, lectus nec ullamcorper convallis, velit velit maximus quam, ut eleifend leo arcu sit amet elit.",
            imageUrl: "https://via.placeholder.com/350x200",
            link: "#",
        },
        {
            title: "Service 4",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, lectus nec ullamcorper convallis, velit velit maximus quam, ut eleifend leo arcu sit amet elit.",
            imageUrl: "https://via.placeholder.com/350x200",
            link: "#",
        }
    ];

    const handlePrevService = () => {
        setServiceIndex((serviceIndex - 1 + services.length) % services.length);
    }

    const handleNextService = () => {
        setServiceIndex((serviceIndex + 1) % services.length);
    }

    return (
        <Container id="services">
            <h2>Services</h2>
            <Row className="justify-content-center align-items-center">
                <Col md={1} className="d-flex align-items-center justify-content-end">
                    <Button className="p-0" variant="light" onClick={handlePrevService}>
                        <BsChevronLeft className="h2 text-black" />
                    </Button>
                </Col>
                <Col md={3}>
                    <ServiceCard service={services[serviceIndex]} />
                </Col>
                <Col md={1} className="d-flex align-items-center">
                    <Button className="p-0" variant="light" onClick={handleNextService}>
                        <BsChevronRight className="h2 text-black" />
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Services;
