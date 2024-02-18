import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import GoogleAuth from '../services/auth/googleAuth';
import { AuthContext } from '../contexts/AuthContext';

function LoginPage() {
    const [isSignup, setIsSignup] = useState(false);

    const { logIn } = useContext(AuthContext);

    const handleLogin = () => {
        GoogleAuth.redirectToGoogle()
            .then(userData => {
                // Ensure user data is received correctly
                console.log("Received user data: ", userData);
                logIn(userData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const email = event.target.formBasicEmail.value;
        const password = event.target.formBasicPassword.value;
        const confirmPassword = isSignup ? event.target.formBasicPasswordConfirm.value : null;

        if (isSignup) {
            if (password !== confirmPassword) {
                console.log('Passwords do not match');
                return;
            }

            fetch('YOUR_BACKEND_API_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            console.log('Logging in');
        }
    };

    const handleOAuthLogin = (oauthServer) => {
        switch(oauthServer) {
            case 'google':
                window.location.href = 'YOUR_GOOGLE_OAUTH_URL';
                break;
            case 'facebook':
                window.location.href = 'YOUR_FACEBOOK_OAUTH_URL';
                break;
            case 'yourServer':
                window.location.href = 'YOUR_OAUTH2_SERVER_URL';
                break;
            default:
                break;
        }
    };

    return (
        <Container style={{ maxWidth: "400px", padding: "20px", backgroundColor: "#373c40", borderRadius: "5px", marginTop: "20px"}}>
            <Form onSubmit={handleSubmit}>
                <h2 style={{color: "#fdfdfc"}}>{isSignup ? 'SignUp' : 'Login'}</h2>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label style={{color: "#fdfdfc"}}>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label style={{color: "#fdfdfc"}}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required />
                </Form.Group>

                {isSignup && (
                    <Form.Group controlId="formBasicPasswordConfirm">
                        <Form.Label style={{color: "#fdfdfc"}}>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm password" required />
                    </Form.Group>
                )}

                <Button variant="outline-dark" type="submit" style={{backgroundColor: isSignup ? "#f0a500" : "#f0a500" , marginTop: 5}}>
                    {isSignup ? 'SignUp' : 'Login'}
                </Button>

                <div className="oauth-options">
                    <h3 style={{color: "#fdfdfc"}}>Or one of these</h3>
                    <div>
                        <button onClick={handleLogin}>Login with Google</button>
                    </div>
                    <div>
                        <Button variant="outline-dark" onClick={() => handleOAuthLogin('facebook')} style={{backgroundColor: "#f0a500", marginTop: 5}}>
                            Facebook
                        </Button>
                    </div>
                    <div>
                        <Button variant="outline-dark" onClick={() => handleOAuthLogin('yourServer')} style={{backgroundColor: "#f0a500", marginTop: 5}}>
                            Your OAuth2 Server
                        </Button>
                    </div>
                </div>

                <div className="form-text" style={{color: "#fff"}}>
                    {isSignup
                        ? 'Already have an account?'
                        : 'Don\'t have an account?'
                    }
                    <Button variant="outline-dark" size="sm" onClick={() => setIsSignup(!isSignup)} style={{marginLeft: "5px", color: "#f0a500", borderColor: "#f0a500"}}>
                        {isSignup
                            ? 'Login'
                            : 'SignUp'
                        }
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default LoginPage;