import { ACTIONS } from './useFolder';
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
            };
        }
        case ACTIONS.SET_CHILD_FOLDERS: {
            return {
                ...state,
                childFolders: action.payload.childFolders,
            };
        }
        default:
            return state;
    }
}
