import produce from 'immer';

import { 
ADD_STUDENT_QUESTION_INSIGHT_BEGIN,
ADD_STUDENT_QUESTION_INSIGHT_SUCCESS,   
ADD_STUDENT_QUESTION_INSIGHT_ERROR,      
LOAD_STUDENT_QUESTION_INSIGHT_BEGIN, 
LOAD_STUDENT_QUESTION_INSIGHT_SUCCESS,
LOAD_STUDENT_QUESTION_INSIGHT_ERROR,
SAVE_STUDENT_QUESTION_INSIGHT_SUCCESS, 
SAVE_STUDENT_QUESTION_INSIGHT_BEGIN, 
SAVE_STUDENT_QUESTION_INSIGHT_ERROR, 
DELETE_STUDENT_QUESTION_INSIGHT_SUCCESS, 
DELETE_STUDENT_QUESTION_INSIGHT_ERROR,
TOGGLE_STUDENT_QUESTION_INSIGHT_MODAL,
TOGGLE_MAX_STUDENT_QUESTION_DIALOG, 
TOGGLE_MAX_FIELD_DIALOG,
DRAGGABLE_ITEM } from 'services/course/actions/studentQuestionInsights';

const initialState = {
     studentQuestionInsights: {}, 
     draggableItem:{},
     saveInProgress: false,
     onSaveError: null,
     studentQuestionInsightsLoading: false,
     onStudentQuestionInsightsLoadingError: null,
     isStudentQuestionInsightsModalOpen: false,
     isMaxQuestionDialogOpen: false,
     isMaxFieldDialogOpen: false
};

const reducer = produce((draft, action) => {
    switch(action.type){
         
     case ADD_STUDENT_QUESTION_INSIGHT_BEGIN:
     case SAVE_STUDENT_QUESTION_INSIGHT_BEGIN:
          draft.saveInProgress = true;
          draft.onSaveError = null;
     return;
     case ADD_STUDENT_QUESTION_INSIGHT_SUCCESS:   
     case SAVE_STUDENT_QUESTION_INSIGHT_SUCCESS:
          draft.studentQuestionInsights[action.payload._id] = action.payload; 
          draft.saveInProgress = false;
     return;
     case ADD_STUDENT_QUESTION_INSIGHT_ERROR:
     case SAVE_STUDENT_QUESTION_INSIGHT_ERROR:
          draft.saveInProgress = false;    
          draft.onSaveError = action.error;
     return;
     case LOAD_STUDENT_QUESTION_INSIGHT_BEGIN:
          draft.studentQuestionInsightsLoading = true;
     return;
     case LOAD_STUDENT_QUESTION_INSIGHT_SUCCESS:
          action.payload?.forEach( builder => {
               draft.studentQuestionInsights[ builder._id ] = builder;
          });  
          draft.studentQuestionInsightsLoading = false;
     return;
     case LOAD_STUDENT_QUESTION_INSIGHT_ERROR:
          draft.onStudentQuestionInsightsLoadingError = action.error;
          draft.studentQuestionInsightsLoading = false;
     return; 
     case DELETE_STUDENT_QUESTION_INSIGHT_SUCCESS:
          delete draft.studentQuestionInsights[action.payload?._id];  
     return; 
     case DELETE_STUDENT_QUESTION_INSIGHT_ERROR:
          draft.onStudentQuestionInsightsLoadingError = action.error;
          draft.studentQuestionInsightsLoading = false;
     return; 
     case TOGGLE_STUDENT_QUESTION_INSIGHT_MODAL:
          draft.isStudentQuestionInsightsModalOpen = !draft.isStudentQuestionInsightsModalOpen;  
     return; 
     case TOGGLE_MAX_STUDENT_QUESTION_DIALOG:
          draft.isMaxQuestionDialogOpen = action.payload; 
     return; 
     case TOGGLE_MAX_FIELD_DIALOG:
          draft.isMaxFieldDialogOpen = action.payload; 
     return; 
     case DRAGGABLE_ITEM: 
          draft.draggableItem[ action.payload?._id ] = action.payload;
          return
     default:
    return;

    }
}, initialState);

export default reducer;