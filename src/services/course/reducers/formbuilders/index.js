import produce from 'immer';

import { 
ADD_FORMBUILDER_BEGIN,
ADD_FORMBUILDER_SUCCESS,            
ADD_FORMBUILDER_ERROR,      
LOAD_FORMBUILDER_BEGIN, 
LOAD_FORMBUILDER_SUCCESS,
LOAD_FORMBUILDER_ERROR,
SAVE_FORMBUILDER_SUCCESS, 
SAVE_FORMBUILDER_BEGIN, 
SAVE_FORMBUILDER_ERROR, 
DELETE_FORMBUILDER_SUCCESS, 
DELETE_FORMBUILDER_ERROR } from 'services/course/actions/formbuilders';

const initialState = {
     formBuilders:{}, 
     saveInProgress: false,
     onSaveError: null,
     formBuildersLoading: false,
     onFormBuildersLoadingError: null,
     builders: {}
};

const reducer = produce((draft, action) => {
    switch(action.type){
     case ADD_FORMBUILDER_BEGIN:
     case SAVE_FORMBUILDER_BEGIN:
          draft.saveInProgress = true;
          draft.onSaveError = null;
     return;
     case ADD_FORMBUILDER_SUCCESS:
     case SAVE_FORMBUILDER_SUCCESS:  
          draft.formBuilders[action.payload._id] = action.payload; 
          draft.saveInProgress = false;
     return;
     case ADD_FORMBUILDER_ERROR:
     case SAVE_FORMBUILDER_ERROR:
          draft.saveInProgress = false;    
          draft.onSaveError = action.error;
     return;
     case LOAD_FORMBUILDER_BEGIN:
          draft.formBuildersLoading = true;
     return;
     case LOAD_FORMBUILDER_SUCCESS:
          action.payload?.forEach( builder => {
               draft.formBuilders[ builder._id ] = builder;
          });  
          draft.builders = action.payload; 
          draft.formBuildersLoading = false;
     return;
     case LOAD_FORMBUILDER_ERROR:
          draft.onFormBuildersLoadingError = action.error;
          draft.formBuildersLoading = false;
     return; 
     case DELETE_FORMBUILDER_SUCCESS:
          delete draft.formBuilders[action.payload?._id];  
     return; 
     case DELETE_FORMBUILDER_ERROR:
          draft.onFormBuildersLoadingError = action.error;
          draft.formBuildersLoading = false;
     return; 
     default:
    return;

    }
}, initialState);

export default reducer;