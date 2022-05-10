import produce from 'immer';

import { 
ADD_FORMFIELDANSWERS_BEGIN,
ADD_FORMFIELDANSWERS_SUCCESS,            
ADD_FORMFIELDANSWERS_ERROR,      
LOAD_FORMFIELDANSWERS_BEGIN, 
LOAD_FORMFIELDANSWERS_SUCCESS,
LOAD_LATEST_FORMFIELDANSWERS_SUCCESS, 
LOAD_FORMFIELDANSWERS_ERROR,
SAVE_FORMFIELDANSWERS_SUCCESS, 
SAVE_FORMFIELDANSWERS_BEGIN, 
SAVE_FORMFIELDANSWERS_ERROR, 
RESET_FORMFIELDANSWERS_ERROR, 
DELETE_FORMFIELDANSWERS_SUCCESS, 
DELETE_FORMFIELDANSWERS_ERROR, 
SET_FORMFIELDANSWERS_MARKDOWN,
STUDENTS_TOTAL_ANSWER_POINTS,
SAVE_FORMFIELDANSWERS_WITH_POINTS_SUCCESS } from 'services/course/actions/formfieldanswers';

const initialState = {
    formFieldAnswers: {},
    latestFormFieldAnswers:{},
    formFieldExplanationAnswers:{},
    studentsCummulativePointsRecieved:{},
    saveInProgress: false,
    onSaveError: null,
    formFieldAnswersLoading: false,
    onFormFieldAnswersLoadingError: null
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_FORMFIELDANSWERS_BEGIN:
        case SAVE_FORMFIELDANSWERS_BEGIN:
             draft.saveInProgress = true;
             draft.onSaveError = null;
        return;
        case ADD_FORMFIELDANSWERS_SUCCESS:
        case SAVE_FORMFIELDANSWERS_SUCCESS:    
        case SAVE_FORMFIELDANSWERS_WITH_POINTS_SUCCESS:
             draft.formFieldAnswers[action.payload._id] = action.payload; 
             draft.saveInProgress = false;
        return;
        case ADD_FORMFIELDANSWERS_ERROR:
        case SAVE_FORMFIELDANSWERS_ERROR:
             draft.saveInProgress = false;    
             draft.onSaveError = action.error;
        return;
        case LOAD_FORMFIELDANSWERS_BEGIN:
             draft.formFieldAnswersLoading = true;
        return;
        case LOAD_FORMFIELDANSWERS_SUCCESS:
             draft.formFieldAnswersLoading = false;
             action.payload?.forEach( field => {
                draft.formFieldAnswers[ field._id ] = field;
              });  
        return;
        case LOAD_LATEST_FORMFIELDANSWERS_SUCCESS:
             draft.formFieldAnswersLoading = false;
             draft.latestFormFieldAnswers[ action.payload._id ] = action.payload;
        return;
        case LOAD_FORMFIELDANSWERS_ERROR:
             draft.onFormFieldAnswersLoadingError = action.error;
             draft.formFieldAnswersLoading = false;
        return; 
        case SET_FORMFIELDANSWERS_MARKDOWN:
             if ( draft.formFieldAnswers[action.payload.teachObject?._id] ) {
                draft.formFieldAnswers[action.payload.teachObject?._id].markDownContent = action.payload.markDownContent; 
             }    
        return;
        case STUDENTS_TOTAL_ANSWER_POINTS:
             draft.studentsCummulativePointsRecieved[ action.payload?.userId ] = action.payload
        return;
        case RESET_FORMFIELDANSWERS_ERROR:
             draft.onSaveError = null;
       return; 
       case DELETE_FORMFIELDANSWERS_SUCCESS:
            delete draft.formFieldAnswers[action.payload?._id];  
       return; 
       case DELETE_FORMFIELDANSWERS_ERROR:
             draft.onFormFieldAnswersLoadingError = action.error;
             draft.formFieldAnswersLoading = false;
        return;     
       default:
    return;

    }
}, initialState);

export default reducer;