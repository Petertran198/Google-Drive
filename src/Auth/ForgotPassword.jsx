import React, { useState, useRef } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const { resetPassword } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef();
    const [errors, setErrors] = useState();
    const [message, setMessage] = useState();
    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            setMessage();
            setErrors();
            setIsLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check you inbox for further instructions');
        } catch (e) {
            setErrors(e.message);
        }

        setIsLoading(false);
    };
    return (
        <>
            {errors && <div className='alert alert-danger'>{errors}</div>}
            {message && <div className='alert alert-success'>{message}</div>}
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Password Reset</h2>
                    <Form>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>

                        <Button
                            variant='primary'
                            block
                            onClick={handleResetPassword}
                            disable={isLoading.toString()}
                        >
                            {isLoading === true ? 'Sending to email..' : 'Reset'}
                        </Button>
                    </Form>
                    <Link to='login'>Login</Link>
                </Card.Body>
            </Card>
        </>
    );
}
