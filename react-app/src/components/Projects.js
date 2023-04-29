import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import ProjectCard from './ProjectCard';

function Projects() {
    const [projectIndex, setProjectIndex] = useState(0);

    const projects = [
        {
            title: "Project 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, lectus nec ullamcorper convallis, velit velit maximus quam, ut eleifend leo arcu sit amet elit.",
            imageUrl: "https://via.placeholder.com/350x200",
            link: "#",
        },
        {
            title: "Project 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, lectus nec ullamcorper convallis, velit velit maximus quam, ut eleifend leo arcu sit amet elit.",
            imageUrl: "https://via.placeholder.com/350x200",
            link: "#",
        },
        {
            title: "Project 3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, lectus nec ullamcorper convallis, velit velit maximus quam, ut eleifend leo arcu sit amet elit.",
            imageUrl: "https://via.placeholder.com/350x200",
            link: "#",
        },
        {
            title: "Project 4",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, lectus nec ullamcorper convallis, velit velit maximus quam, ut eleifend leo arcu sit amet elit.",
            imageUrl: "https://via.placeholder.com/350x200",
            link: "#",
        }
    ];

    const handlePrevProject = () => {
        setProjectIndex((projectIndex - 1 + projects.length) % projects.length);
    }

    const handleNextProject = () => {
        setProjectIndex((projectIndex + 1) % projects.length);
    }

    return (
        <Container id="projects">
            <h2>Projects</h2>
            <Row className="justify-content-center align-items-center">
                <Col md={1} className="d-flex align-items-center justify-content-end">
                    <Button className="p-0" onClick={handlePrevProject}><BsChevronLeft className="h2 text-black" /></Button>
                </Col>
                <Col md={3}>
                    <ProjectCard project={projects[projectIndex]} />
                </Col>
                <Col md={1} className="d-flex align-items-center">
                    <Button className="p-0" onClick={handleNextProject}><BsChevronRight className="h2 text-black" /></Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Projects;
