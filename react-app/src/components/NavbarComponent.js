import React, {useContext} from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext';
import { DarkModeContext } from '../contexts/DarkModeContext';

function NavbarComponent() {

    // const { isLoggedIn, user, logOut } = useContext(AuthContext);
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
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto m-auto">
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
                            <NavDropdown.Item as={Link} to="/services/dailyprogrammer" className={isDarkMode ? "text-warning" : "text-primary bg-dark"}><span>DailyProgrammer</span><div className="dropdown-divider dark"></div></NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/services/service2" className={isDarkMode ? "text-warning" : "text-primary bg-dark"}><span>Service2</span></NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/blog"><span className={isDarkMode ? "text-warning" : "text-primary"}>B</span>log</Nav.Link>
                        <Nav.Link as={Link} to="/blog"><span className={isDarkMode ? "text-warning" : "text-primary"}>I</span>1%</Nav.Link>
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
                    </Nav>
                </Navbar.Collapse>
                {/*{isLoggedIn ? (*/}
                {/*    <>*/}
                {/*        <Navbar.Text>Signed in as: {user.name}</Navbar.Text>*/}
                {/*        <Button variant={isDarkMode ? "outline-warning" : "outline-primary"} onClick={logOut}>Log out</Button>*/}
                {/*    </>*/}
                {/*) : (*/}
                {/*    <Button as={Link} to="/login" variant={isDarkMode ? "outline-warning" : "outline-primary"} className="btn-login">Login</Button>*/}
                {/*)}*/}
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
