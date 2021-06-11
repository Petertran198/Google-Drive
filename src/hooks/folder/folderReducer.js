import { ACTIONS } from './useFolder';

//Each method in here update a single part of the folder object
export default function folderReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                ...state,
                folderId: action.payload.folderId,
                folder: action.payload.folder,
                childFiles: [],
                childFolders: [],
            };
        case ACTIONS.UPDATE_FOLDER_INFO: {
            return {
                ...state,
                folder: action.payload.folder,
                error: action.payload.error,
            };
        }
        case ACTIONS.SET_CHILD_FOLDERS: {
            return {
                ...state,
                childFolders: action.payload.childFolders,
            };
        }
        case ACTIONS.SET_CHILD_FILES: {
            return {
                ...state,
                childFiles: action.payload.childFiles,
            };
        }
        default:
            return state;
    }
}
