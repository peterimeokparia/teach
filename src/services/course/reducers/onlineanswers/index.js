import produce from 'immer';

import { 
ADD_ONLINEANSWERS_BEGIN,
ADD_ONLINEANSWERS_SUCCESS,            
ADD_ONLINEANSWERS_ERROR,      
LOAD_ONLINEANSWERS_BEGIN, 
LOAD_ONLINEANSWERS_SUCCESS,
LOAD_LATEST_ONLINEANSWERS_SUCCESS, 
LOAD_ONLINEANSWERS_ERROR,
SAVE_ONLINEANSWERS_SUCCESS, 
SAVE_ONLINEANSWERS_BEGIN, 
SAVE_ONLINEANSWERS_ERROR, 
RESET_ONLINEANSWERS_ERROR, 
DELETE_ONLINEANSWERS_SUCCESS, 
DELETE_ONLINEANSWERS_ERROR, 
SET_ONLINEANSWERS_MARKDOWN } from '../../actions/onlineanswers';

const initialState = {
    onlineAnswers: {},
    latestOnlineAnswers: {},
    answerMarkDown: {},
    saveInProgress: false,
    onSaveError: null,
    onlineAnswersLoading: false,
    onAnswersLoadingError: null,
    togglePreviewMode: false,
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_ONLINEANSWERS_BEGIN:
        case SAVE_ONLINEANSWERS_BEGIN:
             draft.saveInProgress = true;
             draft.onSaveError = null;
        return;
        case ADD_ONLINEANSWERS_SUCCESS:
        case SAVE_ONLINEANSWERS_SUCCESS:    
             draft.onlineAnswers[action.payload._id] = action.payload; 
             draft.saveInProgress = false;
        return;
        case ADD_ONLINEANSWERS_ERROR:
        case SAVE_ONLINEANSWERS_ERROR:
             draft.saveInProgress = false;    
             draft.onSaveError = action.error;
        return;
        case LOAD_ONLINEANSWERS_BEGIN:
             draft.onlineAnswersLoading = true;
        return;
        case LOAD_ONLINEANSWERS_SUCCESS:
             draft.onlineAnswersLoading = false;
             action.payload?.forEach( answer => {
                draft.onlineAnswers[ answer._id ] = answer;
              });  
        return;
        case LOAD_LATEST_ONLINEANSWERS_SUCCESS:
             draft.onlineAnswersLoading = false;
             draft.latestOnlineAnswers[ action.payload._id ] = action.payload;
        return;
        case LOAD_ONLINEANSWERS_ERROR:
             draft.onAnswersLoadingError = action.error;
             draft.onlineAnswersLoading = false;
        return; 
        case SET_ONLINEANSWERS_MARKDOWN:
             if ( draft.onlineAnswers[action.payload.teachObject?._id] ) {
                draft.onlineAnswers[action.payload.teachObject?._id].markDownContent = action.payload.markDownContent; 
             }    
        return;
        case RESET_ONLINEANSWERS_ERROR:
             draft.onSaveError = null;
       return; 
       case DELETE_ONLINEANSWERS_SUCCESS:
            delete draft.onlineAnswers[action.payload?._id];
       return; 
       case DELETE_ONLINEANSWERS_ERROR:
             draft.onAnswersLoadingError = action.error;
             draft.onlineAnswersLoading = false;
        return; 
       default:

    return;
    
    }
}, initialState);

export default reducer;