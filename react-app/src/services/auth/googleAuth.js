import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleAuth = () => {

    const GoogleLoginButton = ({ onSuccess, onFailure }) => (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText='Login with Google'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            responseType='code,token'
        />
    );

    return { GoogleLoginButton };
};

export default GoogleAuth();