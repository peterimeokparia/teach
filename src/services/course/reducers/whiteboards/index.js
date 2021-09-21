import produce from 'immer';

import { 
ADD_WHITEBOARD_JSONDATA_BEGIN,
ADD_WHITEBOARD_JSONDATA_SUCCESS,            
ADD_WHITEBOARD_JSONDATA_ERROR,      
LOAD_WHITEBOARD_JSONDATA_BEGIN, 
LOAD_WHITEBOARD_JSONDATA_SUCCESS,
LOAD_LATEST_WHITEBOARD_JSONDATA_SUCCESS, 
LOAD_WHITEBOARD_JSONDATA_ERROR,
DELETE_WHITEBOARD_JSONDATA_SUCCESS, 
SAVE_WHITEBOARD_JSONDATA_BEGIN, 
SAVE_WHITEBOARD_JSONDATA_ERROR, 
SAVE_WHITEBOARD_JSONDATA_SUCCESS } from '../../actions/whiteBoards';

const initialState = {
    whiteBoardData: {},
    latestWhiteBoardData: {},
    saveInProgress: false,
    onSaveError: null,
    whiteBoardDataLoading: false,
    onWhiteBoardDataLoadingError: null
};

const reducer = produce((draft, action) => {
    switch(action.type){
         
        case ADD_WHITEBOARD_JSONDATA_BEGIN:
        case SAVE_WHITEBOARD_JSONDATA_BEGIN:
             draft.saveInProgress = true;
             draft.onSaveError = null;
        return;
        case ADD_WHITEBOARD_JSONDATA_SUCCESS:
        case SAVE_WHITEBOARD_JSONDATA_SUCCESS:    
             draft.whiteBoardData[action.payload._id] = action.payload; 
             draft.saveInProgress = false;
        return;
        case ADD_WHITEBOARD_JSONDATA_ERROR:
        case SAVE_WHITEBOARD_JSONDATA_ERROR:
             draft.saveInProgress = false;    
             draft.onSaveError = action.error;
        return;
        case LOAD_WHITEBOARD_JSONDATA_BEGIN:
             draft.whiteBoardDataLoading = true;
             draft.onWhiteBoardDataLoadingError = null;
        return;
        case LOAD_WHITEBOARD_JSONDATA_SUCCESS:
             draft.whiteBoardDataLoading = false;
             action.payload?.forEach( whiteBoardData => {
                draft.whiteBoardData[ whiteBoardData._id ] = whiteBoardData;
              });  
        return;
        case LOAD_LATEST_WHITEBOARD_JSONDATA_SUCCESS:
             draft.whiteBoardDataLoading = false;
             draft.latestWhiteBoardData[ action.payload._id ] = action.payload;
        return;
        case LOAD_WHITEBOARD_JSONDATA_ERROR:
             draft.onWhiteBoardDataLoadingError = action.error;
             draft.whiteBoardDataLoading = false;
        return; 
        case DELETE_WHITEBOARD_JSONDATA_SUCCESS:
             delete draft.whiteBoardData[action.payload?._id];
        return; 
        default:
    return;

    }
}, initialState);

export default reducer;