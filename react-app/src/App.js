import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/navbar.css';
// import WelcomeMessage from './components/WelcomeMessage.js';
import HomeBlog from './components/HomeBlog';
import QueuedSquares from './components/QueuedSquares';
import NavbarComponent from "./components/NavbarComponent";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BlogPostList from "./components/BlogPostList";
import DarkLightToggle from "./components/DarkLightToggle";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import DailyProgrammerPage from "./components/DailyProgrammerPage";
import BlogPostCategories from "./components/BlogPostCategories";
import BlogPost from "./components/BlogPost";
import ApplicationsPage from "./components/ApplicationsPage";
import HomeApplications from "./components/HomeApplications";
import AboutPage from "./components/AboutPage";
import MorePage from "./components/MorePage";
// import LoginPage from "./components/LoginPage";
// import { AuthProvider } from './contexts/AuthContext';
// import Auth  from './components/Auth;'

function MainPage() {

    return (
        <BrowserRouter>
            <div className={"text-center"}>
                {/*<AuthProvider>*/}
                    <DarkModeProvider>
                        <NavbarComponent className="mx-auto"/>
                        <DarkLightToggle/>
                        <Routes>
                            <Route path="/" element={
                                <>
                                    {/*<WelcomeMessage/>*/}
                                    <HomeApplications/>
                                    <HomeBlog/>
                                    <QueuedSquares width={20} height={20} color="#ff0000" speed={1} zIndex={2} />
                                    <Footer/>
                                    <Footer/>
                                </>
                            }/>
                            <Route path="/blog" element={<BlogPostCategories />} />
                            <Route path="/blog/:id" element={<BlogPostList />} />
                            <Route path="/post/:slug" element={<BlogPost />} />
                            <Route path="/applications" element={<ApplicationsPage />} />
                            <Route path="/application/dailyprogrammer" element={<DailyProgrammerPage/>} />
                            <Route path="/more" element={<MorePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            {/*<Route path="/login" element={<LoginPage />} />*/}
                            {/*<Route path="/auth" element={<Auth />} />*/}
                        </Routes>
                    </DarkModeProvider>
                {/*</AuthProvider>*/}
            </div>
        </BrowserRouter>
    );
}

export default MainPage;
