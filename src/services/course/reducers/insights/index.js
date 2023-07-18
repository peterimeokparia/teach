import produce from 'immer';

import { 
ADD_INSIGHT_BEGIN,
ADD_INSIGHT_SUCCESS,   
ADD_INSIGHT_ERROR,      
LOAD_INSIGHT_BEGIN, 
LOAD_INSIGHT_SUCCESS,
LOAD_INSIGHT_ERROR,
SAVE_INSIGHT_SUCCESS, 
SAVE_INSIGHT_BEGIN, 
SAVE_INSIGHT_ERROR, 
DELETE_INSIGHT_SUCCESS, 
DELETE_INSIGHT_ERROR,
TOGGLE_INSIGHT_MODAL,
TOGGLE_MAX_DIALOG, 
TOGGLE_MAX_FIELD_DIALOG } from 'services/course/actions/insights';

const initialState = {
     insights:{}, 
     saveInProgress: false,
     onSaveError: null,
     insightsLoading: false,
     onInsightsLoadingError: null,
     isInsightsModalOpen: false,
     isMaxQuestionDialogOpen: false,
     isMaxFieldDialogOpen: false
};

const reducer = produce((draft, action) => {
    switch(action.type){
         
     case ADD_INSIGHT_BEGIN:
     case SAVE_INSIGHT_BEGIN:
          draft.saveInProgress = true;
          draft.onSaveError = null;
     return;
     case ADD_INSIGHT_SUCCESS:   
     case SAVE_INSIGHT_SUCCESS:
          draft.insights[action.payload._id] = action.payload; 
          draft.saveInProgress = false;
     return;
     case ADD_INSIGHT_ERROR:
     case SAVE_INSIGHT_ERROR:
          draft.saveInProgress = false;    
          draft.onSaveError = action.error;
     return;
     case LOAD_INSIGHT_BEGIN:
          draft.insightsLoading = true;
     return;
     case LOAD_INSIGHT_SUCCESS:
          action.payload?.forEach( builder => {
               draft.insights[ builder._id ] = builder;
          });  
          draft.insightsLoading = false;
     return;
     case LOAD_INSIGHT_ERROR:
          draft.onInsightsLoadingError = action.error;
          draft.insightsLoading = false;
     return; 
     case DELETE_INSIGHT_SUCCESS:
          delete draft.insights[action.payload?._id];  
     return; 
     case DELETE_INSIGHT_ERROR:
          draft.onInsightsLoadingError = action.error;
          draft.insightsLoading = false;
     return; 
     case TOGGLE_INSIGHT_MODAL:
          draft.isInsightsModalOpen = !draft.isInsightsModalOpen;  
     return; 
     case TOGGLE_MAX_DIALOG:
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