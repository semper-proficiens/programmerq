import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';
import WelcomeMessage from './WelcomeMessage.js';
import HomeServices from './HomeServices';
import HomeBlog from './HomeBlog';
import QueuedSquares from './QueuedSquares';
import NavbarComponent from "./NavbarComponent";
import Footer from "./Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function MainPage() {
    return (
        <BrowserRouter>
            <div className="text-center">
                <NavbarComponent className="mx-auto"/>
                <Routes>
                </Routes>
                <WelcomeMessage/>
                <HomeServices/>
                <HomeBlog/>
                <QueuedSquares width={20} height={20} color="#ff0000" speed={1} zIndex={2} />
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default MainPage;
