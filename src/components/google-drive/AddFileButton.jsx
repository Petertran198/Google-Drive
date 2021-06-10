import React, { useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
// To import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Import icon
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { database } from '../firebase/Firebase';
export default function AddFileButton({ currentFolder }) {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (currentFolder == null || file === null) {
            return;
        }
        console.log(file);
    };
    return (
        <>
            <label className='btn btn-outline-primary m-0'>
                <FontAwesomeIcon icon={faFileUpload} />
                <input
                    type='file'
                    onChange={handleFileUpload}
                    //used onChange instead of onClick because onClick runs after every click while onChange only runs only if a value change
                    //so it won't trigger on first click when no file is uploaded only when file is uploaded
                    // also it doesn't work with onclick only onchange and input
                    //https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
                    className='d-none'
                />
            </label>
        </>
    );
}
