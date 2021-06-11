import React, { useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
// To import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Import icon
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { storage, database } from '../firebase/Firebase';
import { ROOT_FOLDER } from '../../hooks/folder/useFolder';
import { useAuth } from '../../contexts/AuthContext';
export default function AddFileButton({ currentFolder }) {
    const { currentUser } = useAuth();
    const getFullFolderPath = () => {
        let arr = [];
        if (currentFolder) {
            arr = currentFolder.path
                .map((p) => p.name)
                .concat(currentFolder.name)
                .join('/');
        }
        return arr;
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (currentFolder == null || file === null) {
            return;
        }
        const filePath =
            currentFolder === ROOT_FOLDER
                ? `/${file.name}`
                : getFullFolderPath() + `/${file.name}`;

        // store it in storage
        //returns uploadTask which represents the process of uploading an object. Allows you to monitor and manage the upload.
        const uploadTask = storage
            .ref(`/files/${currentUser.uid}/${filePath}`)
            .put(file);

        //"state_change" have three callback functions (referred to as next: called repeatedly to keep track of progress of upload, error, and complete: runs after upload is completed )
        uploadTask.on(
            // ------------
            'state_change',
            (snapshot) => {
                console.log('still working');
            },
            (error) => {
                alert(error.message);
            },
            async () => {
                try {
                    const url = await uploadTask.snapshot.ref.getDownloadURL();
                    database.files.add({
                        url: url,
                        userId: currentUser.uid,
                        folderId: currentFolder.id,
                        name: file.name,
                        createdAt: database.getCurrentTimeStamp(),
                    });
                } catch (e) {
                    alert(e.message);
                }
            }
        ); // ------------
    };

    return (
        <>
            <label className='btn btn-outline-primary m-0'>
                <FontAwesomeIcon icon={faFileUpload} />
                {/* file inputs are hard to style so the convention is to insert it into a label tag and then hide it  */}
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
