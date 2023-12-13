import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/loginPage.css';

function LoginPage() {
    const [isSignup, setIsSignup] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const email = event.target.formBasicEmail.value;
        const password = event.target.formBasicPassword.value;
        const confirmPassword = isSignup ? event.target.formBasicPasswordConfirm.value : null;

        if (isSignup) {
            if (password !== confirmPassword) {
                // Handle the mismatch password here
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
                    // Handle the response data here
                })
                .catch((error) => {
                    console.error('Error:', error);
                    // Handle the error here
                });
        } else {
            // Handle login here
            console.log('Logging in');
        }
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
