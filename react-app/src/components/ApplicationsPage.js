import React, {useContext, useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import ApplicationCard from './ApplicationCard';
import dashboardImage from '../assets/images/dashboard_350x200.jpeg';
import { DarkModeContext } from '../contexts/DarkModeContext';


function ApplicationsPage() {
    const [serviceIndex, setServiceIndex] = useState(0);
    const { isDarkMode } = useContext(DarkModeContext);

    const services = [
        {
            title: "Daily Programmer",
            description: "Byte-sized Hacking Dashboard info on cyber-security topics like hacks, programming languages, and more!",
            imageUrl: dashboardImage,
            link: "/application/dailyprogrammer",
        },
        {
            title: "Service 2",
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
            <h2 class={isDarkMode ? "text-white" : "primary"}>Applications</h2>
            <Row className="justify-content-center align-items-center">
                <Col md={1} className="d-flex align-items-center justify-content-end">
                    <Button className="p-0" variant={isDarkMode ? "outline-warning" : "light"} onClick={handlePrevService}>
                        <BsChevronLeft className="h2 text-black" />
                    </Button>
                </Col>
                <Col md={3}>
                    <ApplicationCard service={services[serviceIndex]} />
                </Col>
                <Col md={1} className="d-flex align-items-center">
                    <Button className="p-0" variant={isDarkMode ? "outline-warning" : "light"} onClick={handleNextService}>
                        <BsChevronRight className="h2 text-black" />
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ApplicationsPage;
