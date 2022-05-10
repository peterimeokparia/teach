import produce from 'immer';

import { 
ADD_ONLINEQUESTION_BEGIN,
ADD_ONLINEQUESTION_SUCCESS,            
ADD_ONLINEQUESTION_ERROR,      
LOAD_ONLINEQUESTIONS_BEGIN, 
LOAD_ONLINEQUESTIONS_SUCCESS,
LOAD_LATEST_ONLINEQUESTION_SUCCESS, 
LOAD_ONLINEQUESTIONS_ERROR,
SAVE_ONLINEQUESTION_SUCCESS, 
SAVE_ONLINEQUESTION_BEGIN, 
SAVE_ONLINEQUESTION_ERROR, 
RESET_ONLINEQUESTION_ERROR, 
DELETE_ONLINEQUESTION_BEGIN,
DELETE_ONLINEQUESTION_SUCCESS, 
DELETE_QUESTION_SUCCESS,
SET_ONLINEQUESTION_MARKDOWN,
SET_EXPLANATION_ANSWER_MARKDOWN,
SET_ONLINEQUESTION_FILE_UPLOAD_META,
QUESTION_META, 
ONLINE_QUESTION_COURSEID,
TOGGLE_CONTENT_CHANGED } from '../../actions/onlinequestions';

const initialState = {
    onlineQuestions: {},
    latestOnlineQuestions: {},
    onlineQuestionCourseId: {},
    questionMarkDown: {},
    questionMeta: {},
    fileUploadMeta: {},
    saveInProgress: false,
    onSaveError: null,
    onlineQuestionsLoading: false,
    onQuestionsLoadingError: null,
    togglePreviewMode: false,
    contentUpdated: false
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_ONLINEQUESTION_BEGIN:
        case SAVE_ONLINEQUESTION_BEGIN:
        case DELETE_ONLINEQUESTION_BEGIN:
             draft.saveInProgress = true;
             draft.onSaveError = null;
        return;
        case ADD_ONLINEQUESTION_SUCCESS:
        case SAVE_ONLINEQUESTION_SUCCESS:        
             draft.onlineQuestions[action.payload._id] = action.payload; 
             draft.saveInProgress = false;
        return;
        case ADD_ONLINEQUESTION_ERROR:
        case SAVE_ONLINEQUESTION_ERROR:
             draft.saveInProgress = false;    
             draft.onSaveError = action.error;
        return;
        case LOAD_ONLINEQUESTIONS_BEGIN:
             draft.onlineQuestionsLoading = true;
        return;
        case LOAD_ONLINEQUESTIONS_SUCCESS:
             draft.onlineQuestionsLoading = false;
             action.payload?.forEach( question => {
                draft.onlineQuestions[ question._id ] = question;
              });  
        return;
        case LOAD_LATEST_ONLINEQUESTION_SUCCESS:
             draft.onlineQuestionsLoading = false;
             draft.latestOnlineQuestions[ action.payload._id ] = action.payload;
        return;
        case LOAD_ONLINEQUESTIONS_ERROR:
             draft.onQuestionsLoadingError = action.error;
             draft.onlineQuestionsLoading = false;
        return; 
        case SET_ONLINEQUESTION_MARKDOWN:
             if ( draft.onlineQuestions[action.payload.teachObject?._id] ) {
                draft.onlineQuestions[action.payload.teachObject?._id].markDownContent = action.payload.markDownContent; 
             }    
        return;
        case SET_EXPLANATION_ANSWER_MARKDOWN:
             if ( draft.onlineQuestions[action.payload.teachObject?._id] ) {
                draft.onlineQuestions[action.payload.teachObject?._id].answerExplanationMarkDownContent = action.payload.markDownContent; 
             }    
        return;
        case DELETE_QUESTION_SUCCESS:
             delete draft.onlineQuestions[action?.payload?._id];
             draft.saveInProgress = false;
       return;
        case RESET_ONLINEQUESTION_ERROR:
             draft.onSaveError = null;
       return; 
       case DELETE_ONLINEQUESTION_SUCCESS:
            delete draft.onlineQuestions[action.payload?._id];
            draft.saveInProgress = false;
       return; 
       case QUESTION_META:
            draft.questionMeta = action.payload;    // onlineQuestionId, seletedCourseId
       return; 
       case SET_ONLINEQUESTION_FILE_UPLOAD_META:
            draft.fileUploadMeta = action.payload;   
       return; 
       case ONLINE_QUESTION_COURSEID:
            draft.onlineQuestionCourseId = action.payload;
       return;
       case TOGGLE_CONTENT_CHANGED:
             draft.contentUpdated = !draft.contentUpdated;      
       default:
    return;
    
    }
}, initialState);

export default reducer;