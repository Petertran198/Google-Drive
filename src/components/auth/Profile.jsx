import React, { useState } from 'react';
import { Card, Alert, Button } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Dashboard() {
    const { currentUser, logOut } = useAuth();
    const [errors, setErrors] = useState();
    const history = useHistory();
    const handleLogOut = async () => {
        try {
            await logOut();
            // Make sure to make this route private because if u don't react will think this route is public and when u log out there will be no currentUser therefore info on currentUser will be null and u will get an undefined error. If it is private when this page gets hit it will redirect to login and u won't get currentUser undefined error.
            history.push('/login');
        } catch {
            setErrors('Failed to log out');
        }
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {errors && <Alert variant='danger'>{errors}</Alert>}
                    <strong>Email:</strong> {currentUser.email}
                    <Button
                        variant='primary'
                        className='btn-block'
                        as={Link}
                        to='/update-profile'
                    >
                        Update Profile
                    </Button>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Button variant='link' onClick={handleLogOut}>
                    Log Out
                </Button>
            </div>
        </>
    );
}
