import produce from 'immer';

import { 
ADD_NEW_OUTCOME_SUCCESS, 
ADD_NEW_OUTCOME_BEGIN,            
ADD_NEW_OUTCOME_ERROR, 
LOAD_OUTCOMES_BEGIN, 
LOAD_OUTCOMES_SUCCESS, 
LOAD_OUTCOMES_ERROR,
SAVE_OUTCOME_SUCCESS, 
SAVE_OUTCOME_BEGIN, 
SAVE_OUTCOME_ERROR, 
RESET_OUTCOME_ERROR, 
DELETE_OUTCOME_SUCCESS,  
SET_OUTCOME_MARKDOWN,
TOGGLE_FURTHER_STUDY_MODAL,
TOGGLE_CONCEPTS,
SET_SELECTED_OUTCOME,
SET_OUTCOME_LINK,
SET_CURRENT_OUTCOME } from 'services/course/actions/outcomes';

const initialState = {
    outcomes: {},
    outcomeLink:{},
    selectedOutcome:{}, //check
    currentOutcome:{},
    concepts: false,
    saveOutcomeInProgress: false,
    onSaveOutcomeError: null,
    outcomesLoading: false,
    onOutcomesLoadingError: null,
    furtherStudyModal:false
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_NEW_OUTCOME_BEGIN:
        case SAVE_OUTCOME_BEGIN:
            draft.saveOutcomeInProgress = true;
            draft.onSaveOutcomeError = null;
        return;
        case ADD_NEW_OUTCOME_SUCCESS:
        case SAVE_OUTCOME_SUCCESS:    
            draft.saveOutcomeInProgress = false;
            draft.onSaveOutcomeError = null;
            draft.outcomes[action.payload._id] = action.payload; 
            draft.saveOutcomeInProgress = false;
        return;
        case ADD_NEW_OUTCOME_ERROR:
        case SAVE_OUTCOME_ERROR:
            draft.saveOutcomeInProgress = false;    
            draft.onSaveOutcomeError = action.payload;
        return;
        case LOAD_OUTCOMES_BEGIN:
            draft.outcomesLoading = true;
            draft.onOutcomesLoadingError = null;
        return;
        case LOAD_OUTCOMES_SUCCESS:
            draft.outcomesLoading = false;
            draft.onOutcomesLoadingError = null;
            action.payload?.forEach( lesson => {
                draft.outcomes[lesson._id] = lesson;
            });  
        return;
        case LOAD_OUTCOMES_ERROR:
            draft.onOutcomesLoadingError = action.error;
            draft.outcomesLoading = false;
        return; 
        case SET_OUTCOME_MARKDOWN:
            if ( draft.outcomes[action.payload.teachObject?._id] ) {
                draft.outcomes[action.payload.teachObject?._id].markDownContent = action.payload.markDownContent; 
            }
        return;
        case SET_OUTCOME_LINK:
            draft.outcomeLink = action?.payload;
        return;  
        case RESET_OUTCOME_ERROR:
            draft.onSaveOutcomeError = null;
        return; 
        case TOGGLE_CONCEPTS:
            draft.concepts = !draft.concepts;
        return;
        case SET_SELECTED_OUTCOME:
        case SET_CURRENT_OUTCOME:    
            let selected = action?.payload;

            draft.selectedOutcome = selected;
            draft.currentOutcome = selected;
        return;
        case TOGGLE_FURTHER_STUDY_MODAL:
            draft.furtherStudyModal = !draft.furtherStudyModal;
        return;    
        case DELETE_OUTCOME_SUCCESS:
            delete draft.outcomes[action.payload?._id];
        return;
     default:
          
    }
}, initialState);

export default reducer;
