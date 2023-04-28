import React from 'react';
import { Nav, Navbar, Container, NavDropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/navbar.css';
import QueuedSquares from './components/QueuedSquares';

function ProgrammerQ() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">ProgrammerQ</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="flex-grow-1">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#projects">Projects</Nav.Link>
                            <Nav.Link href="#blog">Blog</Nav.Link>
                            <Nav.Link href="#about">About</Nav.Link>
                            <NavDropdown title="More" id="basic-nav-dropdown" className="dropdown-more">
                                <NavDropdown.Item href="#action/3.1">Contact</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">Privacy Policy</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Terms and Conditions</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="ml-auto">
                            <Button variant="outline-warning">Login</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                    <h1>Welcome to ProgrammerQ!</h1>
                    <p>Here's some content for the home page.</p>
            </Container>
            <Container id="projects">
                <h2>Projects</h2>
                <p>Here's some content for the projects page.</p>
            </Container>
            <QueuedSquares width={20} height={20} color="#ff0000" speed={1} zIndex={1} />
            <Container id="blog">
                <h2>Blog</h2>
                <p>Here's some content for the blog page.</p>
            </Container>
            <Container id="about">
                <h2>About</h2>
                <p>Here's some content for the about page.</p>
            </Container>
        </div>
    );
}

export default ProgrammerQ;
