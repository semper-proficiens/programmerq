import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/navbar.css';
import WelcomeMessage from './components/WelcomeMessage.js';
import HomeServices from './components/HomeServices';
import HomeBlog from './components/HomeBlog';
import QueuedSquares from './components/QueuedSquares';
import NavbarComponent from "./components/NavbarComponent";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WorkInProgress from "./components/WorkInProgress";

function MainPage() {
    return (
        <BrowserRouter>
            <div className="text-center">
                <NavbarComponent className="mx-auto"/>
                <Routes>
                    <Route path="/blog" element={<WorkInProgress />} />
                    <Route path="/services" element={<WorkInProgress />} />
                    <Route path="/about" element={<WorkInProgress />} />
                    <Route path="/" element={<>
                        <WelcomeMessage/>
                        <HomeServices/>
                        <HomeBlog/>
                        <QueuedSquares width={20} height={20} color="#ff0000" speed={1} zIndex={2} />
                        <Footer/>
                    </>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default MainPage;
