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
        <div class="form-container">
            <div className="form">
                <h2>{isSignup ? 'SignUp' : 'Login'}</h2>
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

                    <Button variant="outline-dark" type="submit" style={{backgroundColor: isSignup ? "#f0a500" : "#f0a500" , marginTop: 5}}>
                        {isSignup ? 'SignUp' : 'Login'}
                    </Button>

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
            </div>
        </div>
    );
}

export default LoginPage;
