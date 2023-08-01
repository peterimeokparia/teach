import produce from 'immer';

import { 
ADD_NEW_OUTCOME_VERB_LIST_SUCCESS, 
ADD_NEW_OUTCOME_VERB_LIST_BEGIN,            
ADD_NEW_OUTCOME_VERB_LIST_ERROR, 
LOAD_OUTCOME_VERB_LIST_BEGIN, 
LOAD_OUTCOME_VERB_LIST_SUCCESS, 
LOAD_OUTCOME_VERB_LIST_ERROR,
SAVE_OUTCOME_VERB_LIST_SUCCESS, 
SAVE_OUTCOME_VERB_LIST_BEGIN, 
SAVE_OUTCOME_VERB_LIST_ERROR, 
RESET_CONCEPT_ERROR, 
DELETE_OUTCOME_VERB_LIST_BEGIN,
DELETE_OUTCOME_VERB_LIST_SUCCESS,  
DELETE_OUTCOME_VERB_LIST_ERROR,
SET_OUTCOME_VERB_LIST_MARKDOWN
} from 'services/course/actions/outcomeVerbList';

const initialState = {
    outcomeVerbList: {},
    conceptLink:{},
    selectedOutcomeVerbList:{}, //check
    currentOutcomeVerbList:{},
    concepts: false,
    saveOutcomeVerbListInProgress: false,
    onSaveOutcomeVerbListError: null,
    outcomeVerbListsLoading: false,
    onOutcomeVerbListsLoadingError: null,
    conceptModal:false
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_NEW_OUTCOME_VERB_LIST_BEGIN:
        case SAVE_OUTCOME_VERB_LIST_BEGIN:
            draft.saveOutcomeVerbListInProgress = true;
            draft.onSaveOutcomeVerbListError = null;
        return;
        case ADD_NEW_OUTCOME_VERB_LIST_SUCCESS:
        case SAVE_OUTCOME_VERB_LIST_SUCCESS:    
            draft.saveOutcomeVerbListInProgress = false;
            draft.onSaveOutcomeVerbListError = null;
            draft.outcomeVerbList[action.payload._id] = action.payload; 
            draft.saveOutcomeVerbListInProgress = false;
        return;
        case ADD_NEW_OUTCOME_VERB_LIST_ERROR:
        case SAVE_OUTCOME_VERB_LIST_ERROR:
            draft.saveOutcomeVerbListInProgress = false;    
            draft.onSaveOutcomeVerbListError = action.payload;
        return;
        case LOAD_OUTCOME_VERB_LIST_BEGIN:
            draft.outcomeVerbListsLoading = true;
            draft.onOutcomeVerbListsLoadingError = null;
        return;
        case LOAD_OUTCOME_VERB_LIST_SUCCESS:
            draft.outcomeVerbListsLoading = false;
            draft.onOutcomeVerbListsLoadingError = null;
            action.payload?.forEach( lesson => {
                draft.outcomeVerbList[lesson._id] = lesson;
            });  
        return;
        case LOAD_OUTCOME_VERB_LIST_ERROR:
            draft.onOutcomeVerbListsLoadingError = action.error;
            draft.outcomeVerbListsLoading = false;
        return; 
        case SET_OUTCOME_VERB_LIST_MARKDOWN:
            if ( draft.outcomeVerbList[action.payload.teachObject?._id] ) {
                draft.outcomeVerbList[action.payload.teachObject?._id].markDownContent = action.payload.markDownContent; 
            }
        return;
        case DELETE_OUTCOME_VERB_LIST_SUCCESS:
            delete draft.outcomeVerbList[action.payload?._id];
        return;
     default:
          
    }
}, initialState);

export default reducer;
