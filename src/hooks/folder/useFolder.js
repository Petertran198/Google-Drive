import { useReducer, useEffect } from 'react';
import { database } from '../../components/firebase/Firebase';
import folderReducer from './folderReducer'; // just put in new file to clean up code

export const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER_INFO: 'update-folder-info',
};

//Use to mimic our firebase  since root folder does not exist but we need it because of the way or app works
const ROOT_FOLDER = { name: 'ROOT', id: 'null', path: [] };

export default function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(folderReducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: [],
    });

    //-------Select correct folder when both folderId and folder obj changes or prepopulate the folderId and folder with null and then let other useEffects update the other properties ex update_folder_info
    useEffect(() => {
        dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folder, folderId } });
    }, [folderId, folder]);

    //-------update folder info when folderId change
    useEffect(() => {
        // Only reason for folderId to be null is if it is the root folder since the root folder does not have an id and is a made up thing we made and  because every other folder has a folderId. Therefore we r saving the folder with no id as root folder
        if (folderId == null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER_INFO,
                payload: { folder: ROOT_FOLDER },
            });
        }
        const updateFolder = async () => {
            try {
                const folderSnapShot = await database.folders.doc(folderId).get();
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER_INFO,
                    payload: {
                        folder: database.customFormatingSnapShot(folderSnapShot),
                    },
                });
            } catch (e) {
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER_INFO,
                    payload: { folder: ROOT_FOLDER },
                });
            }
        };

        updateFolder();
    }, [folderId]);
    return state;
}
