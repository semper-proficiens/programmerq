import React from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProgrammerQ() {
  return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">ProgrammerQ</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#projects">Projects</Nav.Link>
                <Nav.Link href="#blog">Blog</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                <NavDropdown title="More" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Contact</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.2">Privacy Policy</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Terms and Conditions</NavDropdown.Item>
                </NavDropdown>
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