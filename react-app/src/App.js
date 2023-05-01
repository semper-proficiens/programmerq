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
import LoginPage from "./components/LoginPage";
import ToggleDark from "./components/DarkLightToggle";

function MainPage() {

    return (
        <BrowserRouter>
            <div className={"text-center"}>
                <NavbarComponent className="mx-auto"/>
                <ToggleDark/>
                <Routes>
                    <Route path="/" element={<>
                        <WelcomeMessage/>
                        <HomeServices/>
                        <HomeBlog/>
                        <QueuedSquares width={20} height={20} color="#ff0000" speed={1} zIndex={2} />
                        <Footer/>
                    </>} />
                    <Route path="/blog" element={<WorkInProgress />} />
                    <Route path="/services" element={<WorkInProgress />} />
                    <Route path="/about" element={<WorkInProgress />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default MainPage;
