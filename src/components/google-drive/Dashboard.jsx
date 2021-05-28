import React from 'react';
import { Container } from 'react-bootstrap';
import AddFolderButton from './AddFolderButton';
export default function Dashboard() {
    return (
        <Container>
            Dashboard <br />
            <AddFolderButton />
        </Container>
    );
}
