import produce from 'immer';

import { 
ADD_ONLINECOMMENTS_BEGIN,
ADD_ONLINECOMMENTS_SUCCESS,            
ADD_ONLINECOMMENTS_ERROR,      
LOAD_ONLINECOMMENTS_BEGIN, 
LOAD_ONLINECOMMENTS_SUCCESS,
LOAD_LATEST_ONLINECOMMENTS_SUCCESS, 
LOAD_ONLINECOMMENTS_ERROR,
SAVE_ONLINECOMMENTS_SUCCESS, 
SAVE_ONLINECOMMENTS_BEGIN, 
SAVE_ONLINECOMMENTS_ERROR, 
RESET_ONLINECOMMENTS_ERROR,
SET_ONLINECOMMENTS_MARKDOWN, 
DELETE_ONLINECOMMENTS_SUCCESS,
DELETE_ONLINECOMMENTS_ERROR } from '../../actions/onlinecomments';

const initialState = {
    onlineComments: {},
    sortedComments:{},
    latestOnlineComments: {},
    commentMarkDown: {},
    saveInProgress: false,
    onSaveError: null,
    onlineCommentsLoading: false,
    onCommentsLoadingError: null,
    togglePreviewMode: false,
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_ONLINECOMMENTS_BEGIN:
        case SAVE_ONLINECOMMENTS_BEGIN:
             draft.saveInProgress = true;
             draft.onSaveError = null;
        return;
        case ADD_ONLINECOMMENTS_SUCCESS:
        case SAVE_ONLINECOMMENTS_SUCCESS:    
             console.log(action.payload);
             draft.onlineComments[action.payload._id] = action.payload; 
             draft.saveInProgress = false;
        return;
        case ADD_ONLINECOMMENTS_ERROR:
        case SAVE_ONLINECOMMENTS_ERROR:
             draft.saveInProgress = false;    
             draft.onSaveError = action.error;
        return;
        case LOAD_ONLINECOMMENTS_BEGIN:
             draft.onlineCommentsLoading = true;
        return;
        case LOAD_ONLINECOMMENTS_SUCCESS:
             draft.onlineCommentsLoading = false;
             action.payload?.forEach( comment => {
                draft.onlineComments[ comment._id ] = comment;
              }); 
        return;
        case LOAD_LATEST_ONLINECOMMENTS_SUCCESS:
             draft.onlineCommentsLoading = false;
             draft.latestOnlineComments[ action.payload._id ] = action.payload;
        return;
        case LOAD_ONLINECOMMENTS_ERROR:
             draft.onCommentsLoadingError = action.error;
             draft.onlineCommentsLoading = false;
        return; 
        case SET_ONLINECOMMENTS_MARKDOWN:
             if ( draft.onlineComments[action.payload.teachObject?._id] ) {
                draft.onlineComments[action.payload.teachObject?._id].markDownContent = action.payload.markDownContent; 
             }    
        return;
        case RESET_ONLINECOMMENTS_ERROR:
             draft.onSaveError = null;
       return; 
       case DELETE_ONLINECOMMENTS_SUCCESS:
            delete draft.onlineComments[action.payload?._id];
       return; 
       case DELETE_ONLINECOMMENTS_ERROR:
             draft.onCommentsLoadingError = action.error;
             draft.onlineCommentsLoading = false;
        return; 
       default:
    return;
    
    }
}, initialState);

export default reducer;