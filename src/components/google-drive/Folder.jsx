import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function Folder({ folder }) {
    // folder params is the folder that is gonna render
    const folderBoxShadow = {
        boxShadow: '0 1px 1px 1px #002',
        textDecoration: 'none',
        maxWidth: '150px',
    };
    return (
        <Button
            as={Link}
            variant='dark'
            className='text-light text-truncate w-100'
            style={folderBoxShadow}
        >
            <FontAwesomeIcon icon={faFolder} /> {folder.name}
        </Button>
    );
}
