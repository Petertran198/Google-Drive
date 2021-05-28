import React, { useState, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
// To import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Import icon
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { database } from '../firebase/Firebase';
export default function AddFolderButton() {
    //Modal
    const [show, setShow] = useState(false);
    const folderNameRef = useRef('');
    const closeModal = () => setShow(false);
    const openModal = () => setShow(true);

    const handleSubmit = (e) => {
        closeModal();
        e.preventDefault();
        //Create Folder in Db
        database.folders.add({ name: folderNameRef.current.value });
    };
    return (
        <>
            <Button variant='primary' onClick={openModal}>
                <FontAwesomeIcon icon={faFolderPlus} />
            </Button>

            <Modal
                show={show}
                onHide={closeModal}
                //callback that fires after modal is finished transitioning in, focus on folder input field
                onEntered={() => folderNameRef.current.focus()}
            >
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className='mb-3' controlId='folderName'>
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control type='text' ref={folderNameRef} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant='success' type='submit'>
                            Add Folder
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
