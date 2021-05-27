import React, { useRef, useState } from 'react';
//Ref has the ability to perserve data such as useState, but it does not trigger rerender
//While useState will triger a rerender
import { Card, Form, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';
export default function SignUp(props) {
    const [errors, setErrors] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    // pull the signUp function from useAuth context to use
    const { signUp } = useAuth();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setErrors('Password & PasswordConfirm do not match ');
        }

        try {
            setErrors('');
            setIsLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
        } catch (e) {
            setErrors('Can not sign up');
        }

        //loading becomes false after it is done waiting for the signUp to work or not to be able to click signUp button
        setIsLoading(false);
    };

    return (
        <CenteredContainer>
            {errors && <div className='alert alert-danger'>{errors}</div>}
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up Now</h2>
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
                            onClick={handleSignUp}
                            disable={isLoading.toString()}
                        >
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Already have an account? <Link to='login'>Login</Link>
            </div>
        </CenteredContainer>
    );
}
