import produce from 'immer';

import { 
ADD_NEW_LOG_BEGIN,
ADD_NEW_LOG_SUCCESS,
ADD_NEW_LOG_ERROR,
LOAD_LOGS_BEGIN,
LOAD_LOGS_SUCCESS,
LOAD_LOGS_ERROR,
SAVE_LOG_BEGIN,
SAVE_LOG_SUCCESS,
SAVE_LOG_ERROR } from '../../actions/lessons/logforteach';

const initialState = {
    logs: {},
    saveLogInProgress: false,
    onSaveLogError: null,
    logsLoading: false,
    onLogLoadingError: null
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_NEW_LOG_BEGIN:
        case SAVE_LOG_BEGIN:
            draft.saveLogInProgress = true;
            draft.onSaveLogError = null;
        return;
        case ADD_NEW_LOG_SUCCESS:
        case SAVE_LOG_SUCCESS:    
            draft.saveLogInProgress = false;
            draft.onSaveLogError = null;
            draft.logs[action.payload._id] = action.payload; 
            draft.saveLogInProgress = false;
        return;
        case ADD_NEW_LOG_ERROR:
        case SAVE_LOG_ERROR:
            draft.saveLogInProgress = false;    
            draft.onSaveLogError = action.error;
        return;
        case LOAD_LOGS_BEGIN:
            draft.logsLoading = true;
            draft.onLogsLoadingError = null;
        return;
        case LOAD_LOGS_SUCCESS:
             draft.logsLoading = false;
             draft.onLogsLoadingError = null;
             action.payload?.forEach( log => {
                draft.logs[log._id] = log;
             });  
        return;
        case LOAD_LOGS_ERROR:
             draft.onLogsLoadingError = action.error;
             draft.logsLoading = false;
        return; 
        default:
          
    }
}, initialState);

export default reducer;