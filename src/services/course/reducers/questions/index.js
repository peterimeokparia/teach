import produce from 'immer';

import { 
ADD_QUESTION_BEGIN,
ADD_QUESTION_SUCCESS,            
ADD_QUESTION_ERROR,      
LOAD_QUESTIONS_BEGIN, 
LOAD_QUESTIONS_SUCCESS,
LOAD_LATEST_QUESTION_SUCCESS, 
LOAD_QUESTIONS_ERROR,
SAVE_QUESTION_SUCCESS, 
SAVE_QUESTION_BEGIN, 
SAVE_QUESTION_ERROR, 
RESET_QUESTION_ERROR, 
DELETE_QUESTION_SUCCESS, 
SET_QUESTION_MARKDOWN,
SET_EXPLANATION_ANSWER_MARKDOWN,
SET_MARKDOWN_EDITOR  } from '../../actions/questions';

const initialState = {
    questions: {},
    latestQuestion: {},
    questionMarkDown: {},
    markDownEditors: {},
    studentExplanationAnswerMarkDown: {},
    explanationAnswerMarkDownKey:{},
    saveInProgress: false,
    onSaveError: null,
    questionsLoading: false,
    onQuestionsLoadingError: null,
    togglePreviewMode: false,
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_QUESTION_BEGIN:
        case SAVE_QUESTION_BEGIN:
             draft.saveInProgress = true;
             draft.onSaveError = null;
        return;
        case ADD_QUESTION_SUCCESS:
        case SAVE_QUESTION_SUCCESS:    
             draft.questions[action.payload._id] = action.payload; 
             draft.saveInProgress = false;
        return;
        case ADD_QUESTION_ERROR:
        case SAVE_QUESTION_ERROR:
             draft.saveInProgress = false;    
             draft.onSaveError = action.error;
        return;
        case LOAD_QUESTIONS_BEGIN:
             draft.questionsLoading = true;
        return;
        case LOAD_QUESTIONS_SUCCESS:
             draft.questionsLoading = false;
             action.payload?.forEach( question => {
                draft.questions[ question._id ] = question;
              });  
        return;
        case LOAD_LATEST_QUESTION_SUCCESS:
             draft.questionsLoading = false;
             draft.latestQuestion[ action.payload._id ] = action.payload;
        return;
        case LOAD_QUESTIONS_ERROR:
             draft.onQuestionsLoadingError = action.error;
             draft.questionsLoading = false;
        return; 
        case SET_QUESTION_MARKDOWN:
             if ( draft.questions[action.payload.teachObject?._id] ) {
                draft.questions[action.payload.teachObject?._id].markDownContent = action.payload.markDownContent; 
             }    
        return;
        case SET_EXPLANATION_ANSWER_MARKDOWN:
             if ( draft.questions[action.payload.teachObject?._id] ) {
                draft.questions[action.payload.teachObject?._id].markDownContent = action.payload.markDownContent; 
             }    
        return;
        case RESET_QUESTION_ERROR:
          draft.onSaveError = null;
        return; 
        case SET_MARKDOWN_EDITOR:
             draft.markDownEditors = action?.payload;
        return;  
        case DELETE_QUESTION_SUCCESS:
             delete draft.questions[action.payload?._id];
        return; 
        default:
    return;

    }
}, initialState);

export default reducer;