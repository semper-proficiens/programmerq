import React, {useContext} from 'react';
import { Nav, Navbar, Container, NavDropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../contexts/DarkModeContext';

function NavbarComponent() {

    const { isDarkMode } = useContext(DarkModeContext);

    return (
        <Navbar bg={isDarkMode ? "secondary" : "dark"} variant={isDarkMode ? "light" : "dark"} expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top mr-2"
                    />
                    <span className="brand-text pl-2">Programmer<span className={isDarkMode ? "text-warning" : "text-primary"}>Q</span></span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/"><span className={isDarkMode ? "text-warning" : "text-primary"}>H</span>ome</Nav.Link>
                        <NavDropdown
                            title={
                                <span>
                                    <span className={isDarkMode ? "text-warning" : "text-primary"}>S</span>ervices
                                </span>
                            }
                            id="basic-nav-dropdown"
                            className="nav-link-dropdown"
                        >
                            <NavDropdown.Item as={Link} to="/services/dailyprogrammer" className={isDarkMode ? "text-warning bg-secondary" : "text-primary bg-dark"}><span>DailyProgrammer</span><div className="dropdown-divider dark"></div></NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1" className={isDarkMode ? "text-warning bg-secondary" : "text-primary bg-dark"}><span>Service2</span></NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/blog"><span className={isDarkMode ? "text-warning" : "text-primary"}>B</span>log</Nav.Link>
                        <Nav.Link as={Link} to="/about"><span className={isDarkMode ? "text-warning" : "text-primary"}>A</span>bout</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <NavDropdown
                            title={
                                <span>
                                    <span className={isDarkMode ? "text-warning" : "text-primary"}>M</span>ore
                                </span>
                            }
                            id="basic-nav-dropdown"
                            className="nav-link-dropdown"
                        >
                            <NavDropdown.Item href="#action/3.1" className={isDarkMode ? "text-warning" : "text-primary"}><span>Contact</span><div className="dropdown-divider dark"></div></NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1" className={isDarkMode ? "text-warning" : "text-primary"}><span>Privacy Policy</span><div className="dropdown-divider dark"></div></NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1" className={isDarkMode ? "text-warning" : "text-primary"}><span>Terms and Conditions</span></NavDropdown.Item>
                        </NavDropdown>
                        <Button as={Link} to="/login" variant="outline-warning" className="btn-login">Login</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
