import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/blog.css';

import {Link, Route, Routes} from 'react-router-dom';
import NavbarComponent from "./NavbarComponent";
import WelcomeMessage from "./WelcomeMessage";
import Footer from "./Footer";

function BlogPage() {
    return (
        <Container>
            <div className="media">
                <img className="mr-3 align-self-center m-auto" src="build.gif"/>
            </div>
            <div className="container mt-2">
                <h4 className="text-dark mt-2 text-center">In Progress</h4>
                <div className="progress mt-2">
                    <div className="progress-bar progress-bar-striped progress-bar-animated"
                         role="progressbar"
                         aria-valuenow="10"
                         aria-valuemin="0"
                         aria-valuemax="100"
                         style="width:10%">
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default BlogPage;
