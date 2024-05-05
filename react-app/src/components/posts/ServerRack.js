import React, { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import '../../styles/post.css';
import ServerRackImage from '../../assets/images/server_rack_cables.jpeg';

function ServerRack() {
    const { isDarkMode } = useContext(DarkModeContext);

    return (
        <div className={isDarkMode ? 'post dark-mode' : 'post'}>
            <h1 className="post-title">ServerRack</h1>
            <img className="post-image" src={ServerRackImage} alt="ServerRack" />
            <p className="post-content">This is some content for post 1.</p>
        </div>
    );
}

export default ServerRack;