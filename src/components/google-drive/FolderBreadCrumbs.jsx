import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { ROOT_FOLDER } from '../../hooks/folder/useFolder';
export default function FolderBreadCrumbs({ currentFolder }) {
    let folderPathing;

    if (currentFolder && currentFolder === ROOT_FOLDER) {
        folderPathing = [];
    } else {
        folderPathing = [ROOT_FOLDER]; // else the path will include the root_folder
    }

    if (currentFolder) {
        folderPathing = [...folderPathing, ...currentFolder.path];
    }

    console.log(folderPathing);
    return (
        // listProps is a bootstrap method to change styling
        <Breadcrumb
            className='flex-grow-1'
            listProps={{ className: 'bg-white pl-0 m-0' }}
        >
            {folderPathing.map((folder, index) => {
                return (
                    <Breadcrumb.Item key={folder.id}>
                        <Link
                            as={Link}
                            to={folder.id ? `/folder/${folder.id}` : '/'}
                        >
                            {' '}
                            {folder.name}
                        </Link>
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
}

// //import React from 'react';
// import { Breadcrumb } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { ROOT_FOLDER } from '../../hooks/folder/useFolder';

// export default function FolderBreadCrumbs({ currentFolder }) {
//     let folderPathing = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
//     if (currentFolder) {
//         folderPathing = [...folderPathing, ...currentFolder.folderPathing];
//     }

//     return (
//         <Breadcrumb
//             className='flex-grow-1'
//             listProps={{ className: 'bg-white pl-0 m-0' }}
//         >
//             {folderPathing.map((folder, index) => (
//                 <Breadcrumb.Item
//                     key={folder.id}
//                     linkAs={Link}
//                     linkProps={{
//                         to: {
//                             pathname: folder.id ? `/folder/${folder.id}` : '/',
//                             state: {
//                                 folder: { ...folder, folderPathing: folderPathing.slice(1, index) },
//                             },
//                         },
//                     }}
//                     className='text-truncate d-inline-block'
//                     style={{ maxWidth: '150px' }}
//                 >
//                     {folder.name}
//                 </Breadcrumb.Item>
//             ))}
//             {currentFolder && (
//                 <Breadcrumb.Item
//                     className='text-truncate d-inline-block'
//                     style={{ maxWidth: '200px' }}
//                     active
//                 >
//                     {currentFolder.name}
//                 </Breadcrumb.Item>
//             )}
//         </Breadcrumb>
//     );
// }
