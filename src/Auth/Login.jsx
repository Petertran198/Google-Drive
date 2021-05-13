import React, { useRef, useState } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const { login } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState();
    const history = useHistory();
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(emailRef.current.value, passwordRef.current.value);
            //redirect to dashboard after login
            history.push('/');
        } catch {
            setErrors('Unable to login please try again');
        }
        // reset login to false so if failed to login the login button is not disable
        setIsLoading(false);
    };
    return (
        <>
            {errors && <div className='alert alert-danger'>{errors}</div>}
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
                        <Button
                            variant='primary'
                            block
                            onClick={handleLogin}
                            disable={isLoading.toString()}
                        >
                            Login
                        </Button>
                    </Form>
                    <Link to='/forgot-password'>Forgot Password</Link>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Don't have an account? <Link to='signup'>Sign Up</Link>
            </div>
        </>
    );
}
