import React, { useState, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
// To import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Import icon
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { database } from '../firebase/Firebase';
import { useAuth } from '../../contexts/AuthContext';
import { ROOT_FOLDER } from '../../hooks/folder/useFolder';
export default function AddFolderButton({ currentFolder }) {
    //Modal
    const [show, setShow] = useState(false);
    const folderNameRef = useRef('');
    const closeModal = () => setShow(false);
    const openModal = () => setShow(true);
    //To get currentUser to associate with folder
    const { currentUser } = useAuth();
    const handleSubmit = (e) => {
        e.preventDefault();
        closeModal();
        //Create Folder in Db
        // if we aren't in either the root folder or a another custom folder then return because u need to be in one to create one
        if (currentFolder == null) {
            return;
        }
        // we spread all the path leading up to the folder and THEN path.push will add currentfolder path to the path array
        const path = [...currentFolder.path];
        if (currentFolder !== ROOT_FOLDER) {
            // Only add to path if it isn't Root_folder since that is a made up folder
            path.push({ id: currentFolder.id, name: currentFolder.name });
        }
        database.folders.add({
            name: folderNameRef.current.value,
            parentFolderId: currentFolder.id, //ParentId is the id of the parent folder need it to find path
            path: path,
            userId: currentUser.uid, //UserId is to associate the folder with a user so it will only show folders that belongs to the user
            createdAt: database.getCurrentTimeStamp(),
        });
    };
    return (
        <>
            <Button variant='outline-primary' onClick={openModal} className='mr-2'>
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
