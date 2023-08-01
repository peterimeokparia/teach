import produce from 'immer';

import { 
ADD_NEW_CONCEPT_SUCCESS, 
ADD_NEW_CONCEPT_BEGIN,            
ADD_NEW_CONCEPT_ERROR, 
LOAD_CONCEPTS_BEGIN, 
LOAD_CONCEPTS_SUCCESS, 
LOAD_CONCEPTS_ERROR,
SAVE_CONCEPT_SUCCESS, 
SAVE_CONCEPT_BEGIN, 
SAVE_CONCEPT_ERROR, 
RESET_CONCEPT_ERROR, 
DELETE_CONCEPT_SUCCESS,  
SET_CONCEPT_MARKDOWN,
TOGGLE_CONCEPT_MODAL,
TOGGLE_CONCEPTS,
SET_SELECTED_CONCEPT,
SET_CONCEPT_LINK,
SET_CURRENT_CONCEPT } from 'services/course/actions/concepts';

const initialState = {
    concepts: {},
    conceptLink:{},
    selectedConcept:{}, //check
    currentConcept:{},
    concepts: false,
    saveConceptInProgress: false,
    onSaveConceptError: null,
    conceptsLoading: false,
    onConceptsLoadingError: null,
    conceptModal:false
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_NEW_CONCEPT_BEGIN:
        case SAVE_CONCEPT_BEGIN:
            draft.saveConceptInProgress = true;
            draft.onSaveConceptError = null;
        return;
        case ADD_NEW_CONCEPT_SUCCESS:
        case SAVE_CONCEPT_SUCCESS:    
            draft.saveConceptInProgress = false;
            draft.onSaveConceptError = null;
            draft.concepts[action.payload._id] = action.payload; 
            draft.saveConceptInProgress = false;
        return;
        case ADD_NEW_CONCEPT_ERROR:
        case SAVE_CONCEPT_ERROR:
            draft.saveConceptInProgress = false;    
            draft.onSaveConceptError = action.payload;
        return;
        case LOAD_CONCEPTS_BEGIN:
            draft.conceptsLoading = true;
            draft.onConceptsLoadingError = null;
        return;
        case LOAD_CONCEPTS_SUCCESS:
            draft.conceptsLoading = false;
            draft.onConceptsLoadingError = null;
            action.payload?.forEach( lesson => {
                draft.concepts[lesson._id] = lesson;
            });  
        return;
        case LOAD_CONCEPTS_ERROR:
            draft.onConceptsLoadingError = action.error;
            draft.conceptsLoading = false;
        return; 
        case SET_CONCEPT_MARKDOWN:
            if ( draft.concepts[action.payload.teachObject?._id] ) {
                draft.concepts[action.payload.teachObject?._id].markDownContent = action.payload.markDownContent; 
            }
        return;
        case SET_CONCEPT_LINK:
            draft.conceptLink = action?.payload;
        return;  
        case RESET_CONCEPT_ERROR:
            draft.onSaveConceptError = null;
        return; 
        case TOGGLE_CONCEPTS:
            draft.concepts = !draft.concepts;
        return;
        case SET_SELECTED_CONCEPT:
        case SET_CURRENT_CONCEPT:    
            let selected = action?.payload;
            draft.selectedConcept = selected;
            draft.currentConcept = selected;
        return;
        case TOGGLE_CONCEPT_MODAL:
            draft.conceptModal = !draft.conceptModal;
        case DELETE_CONCEPT_SUCCESS:
            delete draft.concepts[action.payload?._id];
        return;
     default:
          
    }
}, initialState);

export default reducer;
