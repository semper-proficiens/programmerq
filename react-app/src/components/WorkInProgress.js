import React, {useContext} from 'react';
import { Container } from 'react-bootstrap';
import dashboardImage from '../assets/images/build.gif';
import { DarkModeContext } from '../contexts/DarkModeContext';

function WorkInProgress() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (
        <Container id="blog" className="my-5">
            <section>
                <h1 className={isDarkMode ? "display-5 text-center m-4 text-white" : "display-5 text-center m-4 text-black"}><span role="img" aria-label="sorry">😖</span> Sorry, this page is under construction</h1>
            </section>
            <div className="media">
                <img className="mr-3 align-self-center m-auto" src={dashboardImage} alt="work in progress"/>
            </div>
        </Container>
    );
}

export default WorkInProgress;
