import produce from 'immer';

import { 
ADD_OUTCOME_INSIGHT_BEGIN,
ADD_OUTCOME_INSIGHT_SUCCESS,   
ADD_OUTCOME_INSIGHT_ERROR,      
LOAD_OUTCOME_INSIGHT_BEGIN, 
LOAD_OUTCOME_INSIGHT_SUCCESS,
LOAD_OUTCOME_INSIGHT_ERROR,
SAVE_OUTCOME_INSIGHT_SUCCESS, 
SAVE_OUTCOME_INSIGHT_BEGIN, 
SAVE_OUTCOME_INSIGHT_ERROR, 
DELETE_OUTCOME_INSIGHT_SUCCESS, 
DELETE_OUTCOME_INSIGHT_ERROR,
TOGGLE_OUTCOME_INSIGHT_MODAL,
TOGGLE_MAX_OUTCOME_DIALOG, 
TOGGLE_MAX_FIELD_DIALOG } from 'services/course/actions/outcomeInsights';

const initialState = {
     outcomeInsights:{}, 
     saveInProgress: false,
     onSaveError: null,
     outcomeInsightsLoading: false,
     onOutcomeInsightsLoadingError: null,
     isOutcomeInsightsModalOpen: false,
     isMaxOutcomeDialogOpen: false,
     isMaxFieldDialogOpen: false
};

const reducer = produce((draft, action) => {
    switch(action.type){
         
     case ADD_OUTCOME_INSIGHT_BEGIN:
     case SAVE_OUTCOME_INSIGHT_BEGIN:
          draft.saveInProgress = true;
          draft.onSaveError = null;
     return;
     case ADD_OUTCOME_INSIGHT_SUCCESS:   
     case SAVE_OUTCOME_INSIGHT_SUCCESS:
          draft.outcomeInsights[action.payload._id] = action.payload; 
          draft.saveInProgress = false;
     return;
     case ADD_OUTCOME_INSIGHT_ERROR:
     case SAVE_OUTCOME_INSIGHT_ERROR:
          draft.saveInProgress = false;    
          draft.onSaveError = action.error;
     return;
     case LOAD_OUTCOME_INSIGHT_BEGIN:
          draft.outcomeInsightsLoading = true;
     return;
     case LOAD_OUTCOME_INSIGHT_SUCCESS:
          action.payload?.forEach( builder => {
               draft.outcomeInsights[ builder._id ] = builder;
          });  
          draft.outcomeInsightsLoading = false;
     return;
     case LOAD_OUTCOME_INSIGHT_ERROR:
          draft.onOutcomeInsightsLoadingError = action.error;
          draft.outcomeInsightsLoading = false;
     return; 
     case DELETE_OUTCOME_INSIGHT_SUCCESS:
          delete draft.outcomeInsights[action.payload?._id];  
     return; 
     case DELETE_OUTCOME_INSIGHT_ERROR:
          draft.onOutcomeInsightsLoadingError = action.error;
          draft.outcomeInsightsLoading = false;
     return; 
     case TOGGLE_OUTCOME_INSIGHT_MODAL:
          draft.isOutcomeInsightsModalOpen = !draft.isOutcomeInsightsModalOpen;  
     return; 
     case TOGGLE_MAX_OUTCOME_DIALOG:
          draft.isMaxOutcomeDialogOpen = action.payload; 
     return; 
     case TOGGLE_MAX_FIELD_DIALOG:
          draft.isMaxFieldDialogOpen = action.payload; 
     return; 
     default:
    return;

    }
}, initialState);

export default reducer;