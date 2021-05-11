import React, { useRef, useState } from 'react';
import { Form, Card, Button } from 'react-bootstrap';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
    };
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Login</h2>
                    <Form>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                ref={passwordRef}
                                required
                            />
                        </Form.Group>
                        <Form.Group id='password-confirm'>
                            <Form.Label>Password Confirm</Form.Label>
                            <Form.Control
                                type='password'
                                ref={passwordConfirmRef}
                                required
                            />
                        </Form.Group>
                        <Button
                            variant='primary'
                            block
                            onClick={handleLogin}
                            disable={isLoading.toString()}
                        >
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}
