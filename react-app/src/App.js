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
import BlogPage from './components/BlogPage';

function MainPage() {
    return (
        <BrowserRouter>
            <div className="text-center">
                <NavbarComponent className="mx-auto"/>
                <Routes>
                    {/*<Route path="/blog" element={<BlogPage />} />*/}
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
