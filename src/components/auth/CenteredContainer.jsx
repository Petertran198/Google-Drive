import React from 'react';
import { Container } from 'react-bootstrap';
import GradientBg from '../background/GradientBg';

export default function CenteredContainer({ children }) {
    return (
        <GradientBg>
            <Container
                className='d-flex align-items-center justify-content-center'
                style={{ minHeight: '100vh' }}
            >
                <div className='w-100' style={{ maxWidth: '400px' }}>
                    {children}
                </div>
            </Container>
        </GradientBg>
    );
}
