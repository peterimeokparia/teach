import produce from 'immer';

import { 
ADD_ONLINESURVEY_BEGIN,
ADD_ONLINESURVEY_SUCCESS,            
ADD_ONLINESURVEY_ERROR,      
LOAD_ONLINESURVEYS_BEGIN, 
LOAD_ONLINESURVEYS_SUCCESS,
LOAD_LATEST_ONLINESURVEY_SUCCESS, 
LOAD_ONLINESURVEYS_ERROR,
SAVE_ONLINESURVEY_SUCCESS, 
SAVE_ONLINESURVEY_BEGIN, 
SAVE_ONLINESURVEY_ERROR, 
RESET_ONLINESURVEY_ERROR, 
DELETE_ONLINESURVEY_SUCCESS } from '../../actions/onlinesurveys';

const initialState = {
    onlineSurveys: {},
    latestOnlineSurveys: {},
    saveInProgress: false,
    onSaveError: null,
    onlineSurveysLoading: false,
    onSurveysLoadingError: null
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_ONLINESURVEY_BEGIN:
        case SAVE_ONLINESURVEY_BEGIN:
             draft.saveInProgress = true;
             draft.onSaveError = null;
        return;
        case ADD_ONLINESURVEY_SUCCESS:
        case SAVE_ONLINESURVEY_SUCCESS:    
             draft.onlineSurveys[action.payload._id] = action.payload; 
             draft.saveInProgress = false;
        return;
        case ADD_ONLINESURVEY_ERROR:
        case SAVE_ONLINESURVEY_ERROR:
             draft.saveInProgress = false;    
             draft.onSaveError = action.error;
        return;
        case LOAD_ONLINESURVEYS_BEGIN:
             draft.onlineSurveysLoading = true;
        return;
        case LOAD_ONLINESURVEYS_SUCCESS:
             draft.onlineSurveysLoading = false;
             action.payload?.forEach( survey => {
                draft.onlineSurveys[ survey._id ] = survey;
              });  
        return;
        case LOAD_LATEST_ONLINESURVEY_SUCCESS:
             draft.onlineSurveysLoading = false;
             draft.latestOnlineSurveys[ action.payload._id ] = action.payload;
        return;
        case LOAD_ONLINESURVEYS_ERROR:
             draft.onSurveysLoadingError = action.error;
             draft.onlineSurveysLoading = false;
        return; 
        case RESET_ONLINESURVEY_ERROR:
             draft.onSaveError = null;
       return; 
       case DELETE_ONLINESURVEY_SUCCESS:
            delete draft.onlineSurveys[action.payload?._id];
       return; 
      default:
    return;
    
    }
}, initialState);

export default reducer;