import React, {useContext} from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
// import { NavDropdown } from 'react-bootstrap';
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
                        width="50"
                        height="50"
                        className="d-inline-block align-top mr-2"
                    />
                    <span className="brand-text pl-2 cursive-text">Programmer<span className={isDarkMode ? "text-warning" : "text-primary"}>Q</span></span>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">
                        <Nav.Link as={Link} to="/"><span className={isDarkMode ? "text-warning" : "text-primary"}>H</span>ome</Nav.Link>
                        <Nav.Link as={Link} to="/applications"><span className={isDarkMode ? "text-warning" : "text-primary"}>A</span>pplications</Nav.Link>
                        <Nav.Link as={Link} to="/blog"><span className={isDarkMode ? "text-warning" : "text-primary"}>B</span>log</Nav.Link>
                        {/*<Nav.Link as={Link} to="/blog"><span className={isDarkMode ? "text-warning" : "text-primary"}>D</span>ev-Diary</Nav.Link>*/}
                        <Nav.Link as={Link} to="/about"><span className={isDarkMode ? "text-warning" : "text-primary"}>A</span>bout</Nav.Link>
                        <Nav.Link as={Link} to="/more"><span className={isDarkMode ? "text-warning" : "text-primary"}>M</span>ore</Nav.Link>
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
