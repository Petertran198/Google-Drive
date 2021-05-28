import React, { useRef, useState } from 'react';
//Ref has the ability to perserve data such as useState, but it does not trigger rerender
//While useState will triger a rerender
import { Card, Form, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { getCredential } from '../auth/Firebase';

import { Link, useHistory } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';
export default function UpdateProfile() {
    const [errors, setErrors] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    // ref to update password if needed
    const newPasswordRef = useRef();
    const newPasswordConfirmRef = useRef();
    const { updateEmail, updatePassword, currentUser } = useAuth();
    const history = useHistory();
    const handleUpdate = async (e) => {
        // Reset config & Prevent refresh
        e.preventDefault();
        setErrors();
        setIsLoading(true);
        getCredential(emailRef.current.value, passwordRef.current.value);
        //If password field is empty
        if (!passwordRef.current.value) {
            return setErrors('Enter your password to update profile');
        }
        // if not the same exit function
        if (newPasswordRef.current.value !== newPasswordConfirmRef.current.value) {
            return setErrors('Password is not the same');
        }

        //Make an array to hold all the promises since we want to do two things at once update email & password
        const combinedPromises = [];
        if (emailRef.current.value !== currentUser.email) {
            // Add the updateEmail promise to the combinedPromises array
            // so we can wait for all the promises to finish before we throw any errors by calling
            // Promise.all(combinedPromises) at the very end
            combinedPromises.push(updateEmail(emailRef.current.value));
        }

        if (newPasswordRef.current.value) {
            combinedPromises.push(updatePassword(newPasswordRef.current.value));
        }
        try {
            // Run all the promises
            await Promise.all(combinedPromises);
            history.push('/user-profile');
        } catch (e) {
            setErrors(e.message);
        } finally {
            //loading becomes false after it is done waiting for the signUp to work or not to be able to click signUp button
            setIsLoading(false);
        }
    };

    return (
        <CenteredContainer>
            {errors && <div className='alert alert-danger'>{errors}</div>}
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Update Profile</h2>
                    <Form>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                ref={emailRef}
                                defaultValue={currentUser.email} // populate the email
                            />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type='password'
                                ref={passwordRef}
                                required
                                placeholder='Please enter password'
                            />
                        </Form.Group>
                        <Form.Group id='new-password'>
                            <Form.Label className='text-muted'>
                                Update Password
                                <small>
                                    {' '}
                                    (Leave blank if u dont want to change)
                                </small>
                            </Form.Label>

                            <Form.Control
                                type='password'
                                ref={newPasswordRef}
                                placeholder='Update password'
                            />
                        </Form.Group>
                        <Form.Group id='new-password-confirm'>
                            <Form.Control
                                type='password'
                                ref={newPasswordConfirmRef}
                                placeholder='Update password confirmation'
                            />
                        </Form.Group>
                        <Button
                            variant='primary'
                            block
                            onClick={handleUpdate}
                            disable={isLoading.toString()}
                        >
                            Update Profile
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Link to='/'>Cancel Update</Link>
            </div>
        </CenteredContainer>
    );
}
