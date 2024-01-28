import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GoogleAuth from '../services/auth/googleAuth';

function Auth() {
    const location = useLocation();

    useEffect(() => {
        console.log('Auth component mounted');
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');

        if (code) {
            GoogleAuth.handleAuth(code);
        }
    }, [location]);

    return (
        <div>
            Authenticating...
        </div>
    );
};

export default Auth;