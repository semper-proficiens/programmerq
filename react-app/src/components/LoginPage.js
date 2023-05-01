import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/loginPage.css';

function LoginPage() {
    const [isSignup, setIsSignup] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted');
    }

    return (
        <div className="login-page">
            <div className="form">
                <h2>{isSignup ? 'Sign up' : 'Log in'}</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required className="form-control" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required />
                    </Form.Group>

                    {isSignup && (
                        <Form.Group controlId="formBasicPasswordConfirm">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm password" required />
                        </Form.Group>
                    )}

                    <Button variant="primary" type="submit">
                        {isSignup ? 'Sign up' : 'Log in'}
                    </Button>

                    <div className="form-text">
                        {isSignup
                            ? 'Already have an account?'
                            : 'Don\'t have an account?'
                        }
                        <Button variant="outline-primary" size="sm" onClick={() => setIsSignup(!isSignup)}>
                            {isSignup
                                ? 'Log in'
                                : 'Sign up'
                            }
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default LoginPage;
