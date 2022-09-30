import produce from 'immer';

import { saveEditorMarkDownContent } from 'services/course/reducers/helpers/editor'; 

import { 
ADD_FORMFIELDS_BEGIN,
ADD_FORMFIELDS_SUCCESS,            
ADD_FORMFIELDS_ERROR,      
LOAD_FORMFIELDS_BEGIN, 
LOAD_FORMFIELDS_SUCCESS,
LOAD_LATEST_FORMFIELDS_SUCCESS, 
LOAD_FORMFIELDS_ERROR,
SAVE_FORMFIELDS_SUCCESS, 
SAVE_FORMFIELDS_BEGIN, 
SAVE_FORMFIELDS_ERROR, 
RESET_FORMFIELDS_ERROR, 
DELETE_FORMFIELDS_SUCCESS, 
DELETE_FORMFIELDS_ERROR, 
SET_FORMFIELDS_MARKDOWN,
SET_SELECTED_FORMFIELD } from 'services/course/actions/formfields';

const initialState = {
    formFields: {},
    formField: {},
    selectedFormField: {},
    latestFormFields:{},
    saveInProgress: false,
    onSaveError: null,
    formFieldsLoading: false,
    onFormFieldsLoadingError: null
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_FORMFIELDS_BEGIN:
        case SAVE_FORMFIELDS_BEGIN:
             draft.saveInProgress = true;
             draft.onSaveError = null;
        return;
        case ADD_FORMFIELDS_SUCCESS:
        case SAVE_FORMFIELDS_SUCCESS:    
             draft.formFields[action.payload._id] = action.payload; 
             draft.saveInProgress = false;
        return;
        case ADD_FORMFIELDS_ERROR:
        case SAVE_FORMFIELDS_ERROR:
             draft.saveInProgress = false;    
             draft.onSaveError = action.error;
        return;
        case SET_SELECTED_FORMFIELD:
             draft.selectedFormField = action.payload;
        return;
        case LOAD_FORMFIELDS_BEGIN:
             draft.formFieldsLoading = true;
        return;
        case LOAD_FORMFIELDS_SUCCESS:
             draft.formFieldsLoading = false;
             action.payload?.forEach( field => {
               draft.formFields[ field._id ] = field;
              });  
        return;
        case LOAD_LATEST_FORMFIELDS_SUCCESS:
             draft.formFieldsLoading = false;
             draft.latestFormFields[ action.payload._id ] = action.payload;
        return;
        case LOAD_FORMFIELDS_ERROR:
             draft.onFormFieldsLoadingError = action.error;
             draft.formFieldsLoading = false;
        return; 
        case SET_FORMFIELDS_MARKDOWN:
             saveEditorMarkDownContent( draft.formFields, action );
        return;
        case RESET_FORMFIELDS_ERROR:
             draft.onSaveError = null;
       return; 
       case DELETE_FORMFIELDS_SUCCESS:
            delete draft.formFields[action.payload?._id];  
       return; 
       case DELETE_FORMFIELDS_ERROR:
             draft.onFormFieldsLoadingError = action.error;
             draft.formFieldsLoading = false;
        return; 
       default:
    return;

    }
}, initialState);

export default reducer;