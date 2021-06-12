import React from 'react';
import { Navbar } from 'react-bootstrap';
export default function Footer() {
    return (
        <Navbar
            fixed='bottom'
            variant='dark'
            className='bg-dark text-light w-100 d-flex justify-content-center'
        >
            GDrive&copy; All rights reserved-
            <br />
            <div className='text-muted '>
                <a
                    href='https://www.linkedin.com/in/petertran-developer/'
                    target='_blank'
                    className='text-muted'
                >
                    Developed by Peter Tran, Web Developer
                </a>
            </div>
        </Navbar>
    );
}
