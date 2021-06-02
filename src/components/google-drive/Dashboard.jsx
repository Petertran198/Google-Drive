import React from 'react';
import { Container } from 'react-bootstrap';
import useFolder from '../../hooks/folder/useFolder';
import AddFolderButton from './AddFolderButton';
export default function Dashboard() {
    const { folder } = useFolder('MZQV8JEWUQP6ur1p2tKC');
    console.log(folder);
    return (
        <Container>
            Dashboard <br />
            <AddFolderButton currentFolder={folder} />
        </Container>
    );
}
