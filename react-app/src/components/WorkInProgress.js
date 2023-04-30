import React from 'react';
import { Container } from 'react-bootstrap';
import dashboardImage from '../assets/images/build.gif';

function WorkInProgress() {
    return (
        <Container id="blog" className="my-5">
            <section>
                <h1 className="display-5 text-center m-4 ">😖 Sorry, this page is under construction</h1>
            </section>
            <div className="media">
                <img className="mr-3 align-self-center m-auto" src={dashboardImage} alt="work in progress"/>
            </div>
        </Container>
    );
}

export default WorkInProgress;
