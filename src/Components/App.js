import React from 'react';
import { Container } from 'react-bootstrap';
import SignUp from '../auth/SignUp';

export default function App() {
    return (
        <Container
            className='d-flex align-items-center justify-content-center'
            style={{ minHeight: '100vh' }}
        >
            <div className='w-100' style={{ maxWidth: '400px' }}>
                <SignUp />
            </div>
        </Container>
    );
}
