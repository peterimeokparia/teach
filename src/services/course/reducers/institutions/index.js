import produce from 'immer';

import { 
ADD_INSTITUTIONS_BEGIN,
ADD_INSTITUTIONS_SUCCESS,            
ADD_INSTITUTIONS_ERROR,      
LOAD_INSTITUTIONS_BEGIN, 
LOAD_INSTITUTIONS_SUCCESS,
LOAD_INSTITUTIONS_ERROR,
SAVE_INSTITUTIONS_SUCCESS, 
SAVE_INSTITUTIONS_BEGIN, 
SAVE_INSTITUTIONS_ERROR, 
DELETE_INSTITUTIONS_SUCCESS, 
DELETE_INSTITUTIONS_ERROR } from 'services/course/actions/institutions';

const initialState = {
     institutions: {},
     saveInProgress: false,
     onSaveError: null,
     institutionsLoading: false,
     onInstitutionsLoadingError: null
};

const reducer = produce((draft, action) => {
    switch(action.type){
        case ADD_INSTITUTIONS_BEGIN:
        case SAVE_INSTITUTIONS_BEGIN:
             draft.saveInProgress = true;
             draft.onSaveError = null;
        return;
        case ADD_INSTITUTIONS_SUCCESS:
        case SAVE_INSTITUTIONS_SUCCESS:    
             draft.institutions[action.payload._id] = action.payload; 
             draft.saveInProgress = false;
        return;
        case ADD_INSTITUTIONS_ERROR:
        case SAVE_INSTITUTIONS_ERROR:
             draft.saveInProgress = false;    
             draft.onSaveError = action.error;
        return;
        case LOAD_INSTITUTIONS_BEGIN:
             draft.institutionsLoading = true;
        return;
        case LOAD_INSTITUTIONS_SUCCESS:
             draft.institutionsLoading = false;
             action.payload?.forEach( institution => {
                draft.institutions[ institution._id ] = institution;
              });  
        return;
        case LOAD_INSTITUTIONS_ERROR:
             draft.onInstitutionsLoadingError = action.error;
             draft.institutionsLoading = false;
        return;  
        case DELETE_INSTITUTIONS_SUCCESS:
               delete draft.institutions[action.payload?._id];  
        return; 
        case DELETE_INSTITUTIONS_ERROR:
             draft.onInstitutionsLoadingError = action.error;
             draft.institutionsLoading = false;
       return; 
       default:
     return;
    }
}, initialState);

export default reducer;