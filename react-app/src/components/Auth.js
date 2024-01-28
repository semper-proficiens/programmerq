import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import GoogleAuth  from '../services/auth/googleAuth';
import { AuthContext } from '../contexts/AuthContext';

function Auth() {
    const location = useLocation();
    const { logIn } = useContext(AuthContext);

    useEffect(() => {
        console.log('Auth component mounted');
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');

        if (code) {
            GoogleAuth.handleAuth(code)
                .then(user => {
                    if (user) {
                        logIn(user);
                    } else {
                        console.log('No user data');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [location, logIn]); // added logIn to dependency array

    return <div>Authenticating...</div>;
}

export default Auth;