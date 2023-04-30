import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/navbar.css';
import Home from './components/Home';
import Services from './components/Services';
import Blog from './components/Blog';
import QueuedSquares from './components/QueuedSquares';
import NavbarComponent from "./components/NavbarComponent";
import Footer from "./components/Footer";

function ProgrammerQ() {
    return (
        <div className="text-center">
            <NavbarComponent className="mx-auto"/> {/* add mx-auto class */}
            <Home />
            <Services />
            <QueuedSquares width={20} height={20} color="#ff0000" speed={1} zIndex={2} />
            <Blog />
            <Footer/>
        </div>
    );
}


export default ProgrammerQ;
