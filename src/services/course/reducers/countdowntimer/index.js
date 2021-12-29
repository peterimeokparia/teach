import produce from 'immer';

import { 
ADD_TIME_BEGIN,
ADD_TIME_SUCCESS,            
ADD_TIME_ERROR,      
LOAD_TIME_BEGIN, 
LOAD_TIME_SUCCESS,
LOAD_LATEST_TIME_SUCCESS, 
LOAD_TIME_ERROR,
SAVE_TIME_SUCCESS, 
SAVE_TIME_BEGIN, 
SAVE_TIME_ERROR, 
RESET_TIME_ERROR, 
DELETE_TIME_SUCCESS, 
DELETE_TIME_ERROR } from 'services/course/actions/countdowntimer';

const initialState = {
    timers: {},
    currentTimer:{},
    saveInProgress: false,
    onSaveError: null,
    timersLoading: false,
    onTimersLoadingError: null
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_TIME_BEGIN:
        case SAVE_TIME_BEGIN:
             draft.saveInProgress = true;
             draft.onSaveError = null;
        return;
        case ADD_TIME_SUCCESS:
        case SAVE_TIME_SUCCESS:  
             draft.currentTimer[ action.payload?.formUuId ] = action.payload    
             draft.saveInProgress = false;
        return;
        case ADD_TIME_ERROR:
        case SAVE_TIME_ERROR:
             draft.saveInProgress = false;    
             draft.onSaveError = action.error;
        return;
        case LOAD_TIME_BEGIN:
             draft.timersLoading = true;
        return;
        case LOAD_TIME_SUCCESS:
             draft.timersLoading = false;
             action.payload?.forEach( timerinfo => {
                draft.timers[ timerinfo._id ] = timerinfo;
                draft.currentTimer[ timerinfo?._id ] = timerinfo;
              });  
        return;
        case LOAD_LATEST_TIME_SUCCESS:
             draft.timersLoading = false;
             draft.currentTimer[ action.payload._id ] = action.payload;
        return;
        case LOAD_TIME_ERROR:
             draft.onTimersLoadingError = action.error;
             draft.timersLoading = false;
        return; 
        case RESET_TIME_ERROR:
             draft.onSaveError = null;
       return; 
       case DELETE_TIME_SUCCESS:
            delete draft.timers[action.payload?._id];  
       return; 
       case DELETE_TIME_ERROR:
             draft.onTimersLoadingError = action.error;
             draft.timersLoading = false;
        return; 
       default:
    return;

    }
}, initialState);

export default reducer;