import React, { useState } from 'react';
import { Nav, Navbar, Container, NavDropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

function NavbarComponent() {
    const [showLoginPage, setShowLoginPage] = useState(false);

    const handleShowLoginPage = () => {
        setShowLoginPage(true);
    };

    const handleCloseLoginPage = () => {
        setShowLoginPage(false);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top mr-2"
                    />
                    <span className="brand-text pl-2">Programmer<span className="text-primary">Q</span></span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/"><span className="text-primary">H</span>ome</Nav.Link>
                        <Nav.Link as={Link} to="/services"><span className="text-primary">S</span>ervices</Nav.Link>
                        <Nav.Link as={Link} to="/blog"><span className="text-primary">B</span>log</Nav.Link>
                        <Nav.Link as={Link} to="/about"><span className="text-primary">A</span>bout</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <NavDropdown title="More" id="basic-nav-dropdown" className="dropdown-more">
                            <NavDropdown.Item href="#action/3.1">Contact</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">Privacy Policy</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Terms and Conditions</NavDropdown.Item>
                        </NavDropdown>
                        <Button as={Link} to="/login" variant="outline-warning">Login</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
