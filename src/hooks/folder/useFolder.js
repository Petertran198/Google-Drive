import { useReducer, useEffect } from 'react';
import { database } from '../../components/firebase/Firebase';
import { useAuth } from '../../contexts/AuthContext';
import folderReducer from './folderReducer'; // just put in new file to clean up code

export const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER_INFO: 'update-folder-info',
    SET_CHILD_FOLDERS: 'set-child-folders',
};

//Use to mimic our firebase  since root folder does not exist but we need it because of the way or app works
const ROOT_FOLDER = { name: 'ROOT', id: 'null', path: [] };

export default function useFolder(folderId = null, folder = null) {
    const { currentUser } = useAuth();
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

    //Handle updating child folders
    useEffect(() => {
        const unsubscribe = database.folders
            .where('parentFolderId', '==', folderId)
            .where('userId', '==', currentUser.uid)
            .orderBy('createdAt')
            .onSnapshot((snapShot) => {
                //listen and run code everytime a folder is changed or edited, snapshot contains the childFolders
                dispatch({
                    type: ACTIONS.SET_CHILD_FOLDERS,
                    payload: {
                        childFolders: snapShot.docs.map(
                            database.customFormatingSnapShot
                        ),
                    },
                });
            });
        return () => {
            // Unmouting needed for onSnapShot, aka remove listener when done and stop listening
            unsubscribe();
        };
    }, [folderId, currentUser]);

    return state;
}
