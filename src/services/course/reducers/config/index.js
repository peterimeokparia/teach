import produce from 'immer';

import { 
ADD_CONFIG_BEGIN,
ADD_CONFIG_SUCCESS,
ADD_CONFIG_ERROR,
SAVE_CONFIG_BEGIN,
SAVE_CONFIG_SUCCESS,
SAVE_CONFIG_ERROR,
LOAD_CONFIGS_BEGIN,
LOAD_CONFIGS_SUCCESS,
LOAD_CONFIGS_ERROR,
DELETE_CONFIG_BEGIN,
DELETE_CONFIG_SUCCESS,
DELETE_CONFIG_ERROR } from 'services/course/actions/config';

const initialState = {
     configs:{},
     config:{},
     isAdding: false,
     isSaving: false,
     isLoading: false,
     onError: null,
};

const reducer =  produce( (draft, action) => {
     switch(action.type){

          case ADD_CONFIG_BEGIN:
          case SAVE_CONFIG_BEGIN:     
               draft.isAdding = true;
               draft.isSaving = true;
               draft.onError = null;  
          return;
          case ADD_CONFIG_SUCCESS: 
          case SAVE_CONFIG_SUCCESS:
               draft.isAdding = false;
               draft.isSaving = false;
               draft.onError = null;  
               draft.config = action.payload;   
               draft.configs[action.payload?._id] = action.payload;  
          return;
          case ADD_CONFIG_ERROR:
          case SAVE_CONFIG_ERROR:     
               draft.isAdding = false;
               draft.isSaving = false;
               draft.onError = action.error;  
          return;
          case LOAD_CONFIGS_BEGIN:    
               draft.isLoading = true;
               draft.onError = null;
          return;
          case LOAD_CONFIGS_SUCCESS:
               draft.isLoading = false;
               draft.onError = null;
               action.payload?.forEach(element => {
                    draft.configs[element._id] = element;  
               });              
          return;
          case LOAD_CONFIGS_ERROR:
               draft.isLoading = false;    
               draft.onError = action.error;  
          return;
          case DELETE_CONFIG_BEGIN:
               draft.isDeleting = true;
               draft.onError = null;
          return;
          case DELETE_CONFIG_SUCCESS:
               draft.isDeleting = false;
               draft.onError = null;
               delete draft.configs[action.payload?._id];
          return;
          case DELETE_CONFIG_ERROR:
               draft.isDeleting = false;
               draft.onError = action.error;
          return;  
          default:
     }
}, initialState);

export default reducer;