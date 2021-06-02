import React from 'react';
import { Container } from 'react-bootstrap';
import useFolder from '../../hooks/folder/useFolder';
import AddFolderButton from './AddFolderButton';
import Folder from './Folder';
export default function Dashboard() {
    const { folder, childFolders } = useFolder('MZQV8JEWUQP6ur1p2tKC');
    console.log(childFolders);
    console.log(folder);
    return (
        <Container>
            Dashboard <br />
            <AddFolderButton currentFolder={folder} />
            {childFolders.length > 0 && (
                <div className='d-flex flex-wrap'>
                    {' '}
                    {childFolders.map((childFolder) => {
                        return (
                            <div
                                key={childFolders.id}
                                style={{ maxWidth: '250px' }}
                                className='p-2'
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
