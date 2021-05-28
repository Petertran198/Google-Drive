import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
// To import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Import icon
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
export default function AddFolderButton() {
    // In charge of showing modal
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const openModal = () => setShowModal(true);

    return (
        <>
            <Button variant='primary' onClick={openModal}>
                <FontAwesomeIcon icon={faFolderPlus} />{' '}
            </Button>

            <Modal showModal={showModal} onHide={closeModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant='success' onClick={closeModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
