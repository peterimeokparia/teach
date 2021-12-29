import produce from 'immer';

import { 
ADD_FORMBUILDER_BEGIN,
ADD_FORMBUILDER_SUCCESS,            
ADD_FORMBUILDER_ERROR,      
LOAD_FORMBUILDER_BEGIN, 
LOAD_FORMBUILDER_SUCCESS,
LOAD_FORMBUILDER_ERROR,
SAVE_FORMBUILDER_SUCCESS, 
LOAD_FORMBUILDER_SUCCESSS,
SAVE_FORMBUILDER_BEGIN, 
SAVE_FORMBUILDER_ERROR, 
DELETE_FORMBUILDER_SUCCESS, 
DELETE_FORMBUILDER_ERROR } from 'services/course/actions/formbuilders';

const initialState = {
     formBuilders:{}, 
     saveInProgress: false,
     onSaveError: null,
     formFieldsLoading: false,
     onFormFieldsLoadingError: null,
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
          draft.formFieldsLoading = true;
     return;
     case LOAD_FORMBUILDER_SUCCESS:
          draft.formFieldsLoading = false;
          action.payload?.forEach( builder => {
               draft.formBuilders[ builder._id ] = builder;
          });  
     return;
     case LOAD_FORMBUILDER_SUCCESSS:
          // alert('LOAD_FORMBUILDER_SUCCESSS LOAD_FORMBUILDER_SUCCESSS')
          draft.formFieldsLoading = false;
          draft.builders = action.payload;
          // if ( draft?.builders ){
          //      alert('Added LOAD_FORMBUILDER_SUCCESSS LOAD_FORMBUILDER_SUCCESSS')
          //      alert(JSON.stringify( draft?.builders ) )
          // }
          // action.payload?.forEach( builder => {
          //      draft.formBuilders[ builder._id ] = builder;
          // });  
     return;
     case LOAD_FORMBUILDER_ERROR:
          draft.onFormFieldsLoadingError = action.error;
          draft.formFieldsLoading = false;
     return; 
     case DELETE_FORMBUILDER_SUCCESS:
          delete draft.formBuilders[action.payload?._id];  
     return; 
     case DELETE_FORMBUILDER_ERROR:
          draft.onFormFieldsLoadingError = action.error;
          draft.formFieldsLoading = false;
     return; 
     default:
    return;

    }
}, initialState);

export default reducer;