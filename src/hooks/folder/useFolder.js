import React, { useReducer, useEffect } from 'react';
import folderReducer from './folderReducer'; // just put in new file to clean up code

const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
};

const ROOT_FOLDER = {};
export default function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(folderReducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: [],
    });

    //Select correct folder BUT reset all other data
    //The reason to update the folderId and folder is to prepopulate the breadcrumb url since folder contains the path another method will be used to actually populate everything else
    useEffect(() => {
        dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folder, folderId } });
    }, [folderId, folder]);
}
