import produce from 'immer';

import { 
ADD_COURSE_OUTCOME_INSIGHT_BEGIN,
ADD_COURSE_OUTCOME_INSIGHT_SUCCESS,   
ADD_COURSE_OUTCOME_INSIGHT_ERROR,      
LOAD_COURSE_OUTCOME_INSIGHT_BEGIN, 
LOAD_COURSE_OUTCOME_INSIGHT_SUCCESS,
LOAD_COURSE_OUTCOME_INSIGHT_ERROR,
SAVE_COURSE_OUTCOME_INSIGHT_SUCCESS, 
SAVE_COURSE_OUTCOME_INSIGHT_BEGIN, 
SAVE_COURSE_OUTCOME_INSIGHT_ERROR, 
DELETE_COURSE_OUTCOME_INSIGHT_SUCCESS, 
DELETE_COURSE_OUTCOME_INSIGHT_ERROR } from 'services/course/actions/courseOutcomeInsights';

const initialState = {
     courseOutcomeInsights:{}, 
     saveInProgress: false,
     onSaveError: null,
     courseOutcomeInsightsLoading: false,
     oncourseOutcomeInsightsLoadingError: null,
     iscourseOutcomeInsightsModalOpen: false,
};

const reducer = produce((draft, action) => {
    switch(action.type){
         
     case ADD_COURSE_OUTCOME_INSIGHT_BEGIN:
     case SAVE_COURSE_OUTCOME_INSIGHT_BEGIN:
          draft.saveInProgress = true;
          draft.onSaveError = null;
     return;
     case ADD_COURSE_OUTCOME_INSIGHT_SUCCESS:   
     case SAVE_COURSE_OUTCOME_INSIGHT_SUCCESS:
          draft.courseOutcomeInsights[action.payload._id] = action.payload; 
          draft.saveInProgress = false;
     return;
     case ADD_COURSE_OUTCOME_INSIGHT_ERROR:
     case SAVE_COURSE_OUTCOME_INSIGHT_ERROR:
          draft.saveInProgress = false;    
          draft.onSaveError = action.error;
     return;
     case LOAD_COURSE_OUTCOME_INSIGHT_BEGIN:
          draft.courseOutcomeInsightsLoading = true;
     return;
     case LOAD_COURSE_OUTCOME_INSIGHT_SUCCESS:
          action.payload?.forEach( builder => {
               draft.courseOutcomeInsights[ builder._id ] = builder;
          });  
          draft.courseOutcomeInsightsLoading = false;
     return;
     case LOAD_COURSE_OUTCOME_INSIGHT_ERROR:
          draft.oncourseOutcomeInsightsLoadingError = action.error;
          draft.courseOutcomeInsightsLoading = false;
     return; 
     case DELETE_COURSE_OUTCOME_INSIGHT_SUCCESS:
          delete draft.courseOutcomeInsights[action.payload?._id];  
     return; 
     case DELETE_COURSE_OUTCOME_INSIGHT_ERROR:
          draft.oncourseOutcomeInsightsLoadingError = action.error;
          draft.courseOutcomeInsightsLoading = false;
     return; 
     default:
    return;

    }
}, initialState);

export default reducer;