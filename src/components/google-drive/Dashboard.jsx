import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import useFolder from '../../hooks/folder/useFolder';
import AddFolderButton from './AddFolderButton';
import Folder from './Folder';
import FolderBreadCrumbs from './FolderBreadCrumbs';

export default function Dashboard() {
    const { folderId } = useParams();
    const { folder, childFolders, error } = useFolder(folderId);
    if (error)
        return (
            <div
                className='text-center d-flex align-items-center justify-content-center text-danger'
                style={{ height: '90vh' }}
            >
                {error} Can not access.
            </div>
        );
    return (
        <Container>
            {error}
            <div className='d-flex align-items-center'>
                <FolderBreadCrumbs currentFolder={folder} />
            </div>
            <AddFolderButton currentFolder={folder} />
            {childFolders.length > 0 && (
                <div className='d-flex flex-wrap'>
                    {' '}
                    {childFolders.map((childFolder) => {
                        return (
                            <div
                                key={childFolder.id}
                                className='mt-3 mr-2'
                                style={{ maxWidth: '150px' }}
                            >
                                <Folder folder={childFolder} />
                            </div>
                        );
                    })}
                </div>
            )}
        </Container>
    );
}
