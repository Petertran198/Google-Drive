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

        default:
            return state;
    }
}
