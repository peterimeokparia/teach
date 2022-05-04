import produce from 'immer';

import { 
ADD_FULLTEXTSEARCH_BEGIN,
ADD_FULLTEXTSEARCH_SUCCESS,            
ADD_FULLTEXTSEARCH_ERROR,      
LOAD_FULLTEXTSEARCHES_BEGIN, 
LOAD_FULLTEXTSEARCHES_SUCCESS,
LOAD_FULLTEXTSEARCHES_ERROR,
SAVE_FULLTEXTSEARCH_SUCCESS, 
SAVE_FULLTEXTSEARCH_BEGIN, 
SAVE_FULLTEXTSEARCH_ERROR, 
DELETE_FULLTEXTSEARCH_BEGIN,
DELETE_FULLTEXTSEARCH_SUCCESS, 
SET_FULLTEXTSEARCH_CONTENT } from '../../actions/fulltextsearches';

const initialState = {
    fullTextSearches: {},
    saveInProgress: false,
    onSaveError: null,
    fullTextSearchesLoading: false,
    fullTextSearchesLoadingError: null
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_FULLTEXTSEARCH_BEGIN:
        case SAVE_FULLTEXTSEARCH_BEGIN:
        case DELETE_FULLTEXTSEARCH_BEGIN:
             draft.saveInProgress = true;
             draft.onSaveError = null;
        return;
        case ADD_FULLTEXTSEARCH_SUCCESS:
        case SAVE_FULLTEXTSEARCH_SUCCESS:        
             draft.fullTextSearches[action.payload._id] = action.payload; 
             draft.saveInProgress = false;
        return;
        case ADD_FULLTEXTSEARCH_ERROR:
        case SAVE_FULLTEXTSEARCH_ERROR:
             draft.saveInProgress = false;    
             draft.onSaveError = action.error;
        return;
        case LOAD_FULLTEXTSEARCHES_BEGIN:
             draft.fullTextSearchesLoading = true;
        return;
        case LOAD_FULLTEXTSEARCHES_SUCCESS:
             draft.fullTextSearchesLoading = false;
             action.payload?.forEach( search => {
                draft.fullTextSearches[ search._id ] = search;
              });  
        return;
        case LOAD_FULLTEXTSEARCHES_ERROR:
             draft.fullTextSearchesLoadingError = action.error;
             draft.fullTextSearchesLoading = false;
        return; 
        case SET_FULLTEXTSEARCH_CONTENT:
             if ( draft.fullTextSearches[action.payload.teachObject?._id] ) {
                draft.fullTextSearches[action.payload.teachObject?._id].fullTextSearchContent = action.payload.fullTextSearchContent; 
             }    
        return;
        case DELETE_FULLTEXTSEARCH_SUCCESS:
            delete draft.fullTextSearches[action.payload?._id];
            draft.saveInProgress = false;
       return;      
       default:
    return;
    
    }
}, initialState);

export default reducer;