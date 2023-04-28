import React from 'react';
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/navbar.css';
import Home from './components/Home';
import Projects from './components/Projects';
import Blog from './components/Blog';
import QueuedSquares from './components/QueuedSquares';
import NavbarComponent from "./components/Navbar";

function ProgrammerQ() {
    return (
        <div>
            <NavbarComponent/>
            <Home />
            <Projects />
            <QueuedSquares width={20} height={20} color="#ff0000" speed={1} zIndex={1} />
            <Blog />
        </div>
    );
}

export default ProgrammerQ;
