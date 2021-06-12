import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useFolder from '../../hooks/folder/useFolder';
import AddFolderButton from './AddFolderButton';
import Folder from './Folder';
import File from './File';
import FolderBreadCrumbs from './FolderBreadCrumbs';
import AddFileButton from './AddFileButton';
export default function Dashboard() {
    const { folderId } = useParams();
    const { folder, childFolders, error, childFiles } = useFolder(folderId);
    if (error)
        return (
            <div
                className='text-center d-flex align-items-center justify-content-center text-danger'
                style={{ height: '90vh' }}
            >
                {error}
            </div>
        );
    return (
        <Container>
            {error}
            <div className='d-flex align-items-center'>
                {/* currentFolder is the folder we currently in and will allow us to do stuff like reference it as the parent when we make a new folder/file */}
                <FolderBreadCrumbs currentFolder={folder} />
                <AddFolderButton currentFolder={folder} />
                <AddFileButton currentFolder={folder} />
            </div>
            {/*if there are folders display the label folder*/}
            {childFolders.length > 0 && (
                <h1 className='lead text-bolder'>Folders</h1>
            )}{' '}
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
            {/*Put hr tag to seperate the files and folder if there are any folders */}
            {childFolders.length > 0 && (
                <>
                    <hr />
                    <h1 className='lead text-bolder'>Files</h1>
                </>
            )}{' '}
            {childFiles.length > 0 && (
                <div className='d-flex flex-wrap'>
                    {' '}
                    {childFiles.map((file) => {
                        return (
                            <div className='mt-3 mr-2' style={{ maxWidth: '150px' }}>
                                <File file={file} />
                            </div>
                        );
                    })}
                </div>
            )}{' '}
        </Container>
    );
}
