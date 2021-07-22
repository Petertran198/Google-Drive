import React, { useState } from 'react';
// To import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Import icon
import { faFile } from '@fortawesome/free-solid-svg-icons';
export default function File({ file }) {
    const [isHovering, setIsHovering] = useState(false);
    return (
        <>
            <a
                href={file.url}
                target='_blank'
                className='d-block text-truncate w-100 text-center text-dark border p-2 rounded bg-white '
                onMouseLeave={() =>
                    setTimeout(function () {
                        setIsHovering(false);
                    }, 50)
                }
                onMouseEnter={() => setIsHovering(true)}
            >
                <FontAwesomeIcon
                    icon={faFile}
                    style={{ height: '25px', width: '25px' }}
                />
                {file.name}
            </a>
            {isHovering == true && (
                <div className='text-center bg-dark text-light w-100'>
                    {file.name}
                </div>
            )}
        </>
    );
}
