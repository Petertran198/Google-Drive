import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import useFolder from '../../hooks/folder/useFolder';
import AddFolderButton from './AddFolderButton';
import Folder from './Folder';
import FolderBreadCrumbs from './FolderBreadCrumbs';

export default function Dashboard() {
    const { folderId } = useParams();
    const { folder, childFolders } = useFolder(folderId);

    return (
        <Container>
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
