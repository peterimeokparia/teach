import produce from 'immer';

import { 
ADD_FORMFIELDPOINTS_BEGIN,
ADD_FORMFIELDPOINTS_SUCCESS,            
ADD_FORMFIELDPOINTS_ERROR,      
LOAD_FORMFIELDPOINTS_BEGIN, 
LOAD_FORMFIELDPOINTS_SUCCESS,
LOAD_LATEST_FORMFIELDPOINTS_SUCCESS, 
LOAD_FORMFIELDPOINTS_ERROR,
SAVE_FORMFIELDPOINTS_SUCCESS, 
SAVE_FORMFIELDPOINTS_BEGIN, 
SAVE_FORMFIELDPOINTS_ERROR, 
RESET_FORMFIELDPOINTS_ERROR, 
DELETE_FORMFIELDPOINTS_SUCCESS, 
DELETE_FORMFIELDPOINTS_ERROR } from 'services/course/actions/formquestionpoints';

const initialState = {
    studentsCummulativePointsRecieved:{},
    formFieldPoints: {},
    latestFormFieldPoints:{},
    formFieldExplanationPoints:{},
    saveInProgress: false,
    onSaveError: null,
    formFieldPointsLoading: false,
    onFormFieldPointsLoadingError: null
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_FORMFIELDPOINTS_BEGIN:
        case SAVE_FORMFIELDPOINTS_BEGIN:
             draft.saveInProgress = true;
             draft.onSaveError = null;
        return;
        case ADD_FORMFIELDPOINTS_SUCCESS:
        case SAVE_FORMFIELDPOINTS_SUCCESS:  
             draft.studentsCummulativePointsRecieved[ action.payload?.userId ] = action.payload    
             draft.saveInProgress = false;
        return;
        case ADD_FORMFIELDPOINTS_ERROR:
        case SAVE_FORMFIELDPOINTS_ERROR:
             draft.saveInProgress = false;    
             draft.onSaveError = action.error;
        return;
        case LOAD_FORMFIELDPOINTS_BEGIN:
             draft.formFieldPointsLoading = true;
        return;
        case LOAD_FORMFIELDPOINTS_SUCCESS:
             draft.formFieldPointsLoading = false;
             action.payload?.forEach( field => {
                draft.formFieldPoints[ field._id ] = field;
                draft.studentsCummulativePointsRecieved[ field?._id ] = field;
              });  
        return;
        case LOAD_LATEST_FORMFIELDPOINTS_SUCCESS:
             draft.formFieldPointsLoading = false;
             draft.latestFormFieldPoints[ action.payload._id ] = action.payload;
        return;
        case LOAD_FORMFIELDPOINTS_ERROR:
             draft.onFormFieldPointsLoadingError = action.error;
             draft.formFieldPointsLoading = false;
        return; 
        case RESET_FORMFIELDPOINTS_ERROR:
             draft.onSaveError = null;
       return; 
       case DELETE_FORMFIELDPOINTS_SUCCESS:
            delete draft.formFieldPoints[action.payload?._id];  
       return; 
       case DELETE_FORMFIELDPOINTS_ERROR:
             draft.onFormFieldPointsLoadingError = action.error;
             draft.formFieldPointsLoading = false;
        return; 
       default:
    return;

    }
}, initialState);

export default reducer;