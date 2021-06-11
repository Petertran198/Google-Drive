import React from 'react';
// To import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Import icon
import { faFile } from '@fortawesome/free-solid-svg-icons';

export default function File({ file }) {
    return (
        <>
            <a
                href={file.url}
                target='_blank'
                className='d-block text-truncate w-100 text-center text-light border p-1 rounded bg-dark '
            >
                <FontAwesomeIcon
                    icon={faFile}
                    style={{ height: '25px', width: '25px' }}
                />{' '}
                <br />
                {file.name}
            </a>
        </>
    );
}
