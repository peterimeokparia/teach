import produce from 'immer';

import { 
ADD_QUESTION_INSIGHT_BEGIN,
ADD_QUESTION_INSIGHT_SUCCESS,   
ADD_QUESTION_INSIGHT_ERROR,      
LOAD_QUESTION_INSIGHT_BEGIN, 
LOAD_QUESTION_INSIGHT_SUCCESS,
LOAD_SINGLE_QUESTION_INSIGHT_SUCCESS,
LOAD_QUESTION_INSIGHT_ERROR,
SAVE_QUESTION_INSIGHT_SUCCESS, 
SAVE_QUESTION_INSIGHT_BEGIN, 
SAVE_QUESTION_INSIGHT_ERROR, 
DELETE_QUESTION_INSIGHT_SUCCESS, 
DELETE_QUESTION_INSIGHT_ERROR,
TOGGLE_QUESTION_INSIGHT_MODAL,
TOGGLE_MAX_QUESTION_DIALOG, 
TOGGLE_MAX_FIELD_DIALOG } from 'services/course/actions/questioninsights';

const initialState = {
     questionInsights:{}, 
     saveInProgress: false,
     onSaveError: null,
     questionInsightsLoading: false,
     onQuestionInsightsLoadingError: null,
     isQuestionInsightsModalOpen: false,
     isMaxQuestionDialogOpen: false,
     isMaxFieldDialogOpen: false
};

const reducer = produce((draft, action) => {
    switch(action.type){
         
     case ADD_QUESTION_INSIGHT_BEGIN:
     case SAVE_QUESTION_INSIGHT_BEGIN:
          draft.saveInProgress = true;
          draft.onSaveError = null;
     return;
     case ADD_QUESTION_INSIGHT_SUCCESS:   
     case SAVE_QUESTION_INSIGHT_SUCCESS:
          draft.questionInsights[action.payload._id] = action.payload; 
          draft.saveInProgress = false;
     return;
     case ADD_QUESTION_INSIGHT_ERROR:
     case SAVE_QUESTION_INSIGHT_ERROR:
          draft.saveInProgress = false;    
          draft.onSaveError = action.error;
     return;
     case LOAD_QUESTION_INSIGHT_BEGIN:
          draft.questionInsightsLoading = true;
     return;
     case LOAD_SINGLE_QUESTION_INSIGHT_SUCCESS:
          draft.questionInsights[ action.payload._id ] = action.payload;
     case LOAD_QUESTION_INSIGHT_SUCCESS:
          action.payload?.forEach( builder => {
               draft.questionInsights[ builder._id ] = builder;
          });  
          draft.questionInsightsLoading = false;
     return;
     case LOAD_QUESTION_INSIGHT_ERROR:
          draft.onQuestionInsightsLoadingError = action.error;
          draft.questionInsightsLoading = false;
     return; 
     case DELETE_QUESTION_INSIGHT_SUCCESS:
          delete draft.questionInsights[action.payload?._id];  
     return; 
     case DELETE_QUESTION_INSIGHT_ERROR:
          draft.onQuestionInsightsLoadingError = action.error;
          draft.questionInsightsLoading = false;
     return; 
     case TOGGLE_QUESTION_INSIGHT_MODAL:
          draft.isQuestionInsightsModalOpen = !draft.isQuestionInsightsModalOpen;  
     return; 
     case TOGGLE_MAX_QUESTION_DIALOG:
          draft.isMaxQuestionDialogOpen = action.payload; 
     return; 
     case TOGGLE_MAX_FIELD_DIALOG:
          draft.isMaxFieldDialogOpen = action.payload; 
     return; 
     default:
    return;

    }
}, initialState);

export default reducer;