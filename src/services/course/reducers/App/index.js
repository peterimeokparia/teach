import produce from 'immer';

import { 
TOGGLE_PREVIEW_MODE, 
UPLOAD_FILE_SUCCESS } from '../../actions/app';

const initialState = {
    previewMode : false,
    selectedFile: null
};

const reducer = produce((draft, action) => {
    switch ( action.type ) {

    case UPLOAD_FILE_SUCCESS:
        draft.selectedFile = action.payload;
    return;
    case TOGGLE_PREVIEW_MODE:
        draft.previewMode = ! draft.previewMode;
    return;
    default:
    break;
    
    }
}, initialState);

export default reducer;