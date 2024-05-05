import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/navbar.css';
// import WelcomeMessage from './components/WelcomeMessage.js';
import HomeServices from './components/HomeServices';
import HomeBlog from './components/HomeBlog';
import QueuedSquares from './components/QueuedSquares';
import NavbarComponent from "./components/NavbarComponent";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WorkInProgress from "./components/WorkInProgress";
// import LoginPage from "./components/LoginPage";
import BlogPostList from "./components/BlogPostList";
import DarkLightToggle from "./components/DarkLightToggle";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import DailyProgrammerPage from "./components/DailyProgrammerPage";
// import { AuthProvider } from './contexts/AuthContext';
import  Auth  from './components/Auth'
import BlogPostCategories from "./components/BlogPostCategories";
import ServerRack from "./components/posts/ServerRack";

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
                                    <HomeServices/>
                                    <HomeBlog/>
                                    <QueuedSquares width={20} height={20} color="#ff0000" speed={1} zIndex={2} />
                                    <Footer/>
                                    <Footer/>
                                </>
                            }/>
                            <Route path="/blog" element={<BlogPostCategories />} />
                            <Route path="/blog/:id" element={<BlogPostList />} />
                            <Route path="/post/ServerRack" element={<ServerRack />} />
                            <Route path="/application" element={<WorkInProgress />} />
                            <Route path="/application/dailyprogrammer" element={<DailyProgrammerPage/>} />
                            <Route path="/about" element={<WorkInProgress />} />
                            {/*<Route path="/login" element={<LoginPage />} />*/}
                            <Route path="/auth" element={<Auth />} />
                        </Routes>
                    </DarkModeProvider>
                {/*</AuthProvider>*/}
            </div>
        </BrowserRouter>
    );
}

export default MainPage;
