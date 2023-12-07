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
import BlogPage from "./components/BlogPage"
import DarkLightToggle from "./components/DarkLightToggle";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import DailyProgrammerPage from "./components/DailyProgrammerPage";
import Post from './components/Post';

function MainPage() {

    return (
        <BrowserRouter>
            <div className={"text-center"}>
                <DarkModeProvider>
                    <NavbarComponent className="mx-auto"/>
                    <DarkLightToggle/>
                    <Routes>
                        <Route path="/" element={<>
                            <WelcomeMessage/>
                            <HomeServices/>
                            <HomeBlog/>
                            <QueuedSquares width={20} height={20} color="#ff0000" speed={1} zIndex={2} />
                            <Footer/>
                        </>} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/services" element={<WorkInProgress />} />
                        <Route path="/services/dailyprogrammer" element={<DailyProgrammerPage/>} />
                        <Route path="/about" element={<WorkInProgress />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/post/:id" component={Post} />
                    </Routes>
                </DarkModeProvider>
            </div>
        </BrowserRouter>
    );
}

export default MainPage;
