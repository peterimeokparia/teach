import produce from 'immer';

import { saveEditorMarkDownContent } from 'services/course/reducers/helpers/editor'; 

import { 
ADD_EXPLAINER_ANSWER_BEGIN,
ADD_EXPLAINER_ANSWER_SUCCESS,            
ADD_EXPLAINER_ANSWER_ERROR,      
LOAD_EXPLAINER_ANSWERS_BEGIN, 
LOAD_EXPLAINER_ANSWERS_SUCCESS,
LOAD_EXPLAINER_ANSWERS_ERROR,
SAVE_EXPLAINER_ANSWER_BEGIN, 
SAVE_EXPLAINER_ANSWER_SUCCESS, 
SAVE_EXPLAINER_ANSWER_ERROR, 
DELETE_EXPLAINER_ANSWER_BEGIN,
DELETE_EXPLAINER_ANSWER_SUCCESS, 
DELETE_EXPLAINER_ANSWER_ERROR, 
SET_EXPLAINER_ANSWER_MARKDOWN,
SET_EXPLAINER_ANSWER_FILE_UPLOAD_META } from '../../actions/onlinequestionexplainanswer';

const initialState = {
    onlineQuestionsExplainerAnswers: {},
    fileUploadMeta: {},
    saveInProgress: false,
    onSaveError: null,
    onlineQuestionsExplainerAnswersLoading: false,
    onlineQuestionsExplainerAnswersLoadingError: null
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_EXPLAINER_ANSWER_BEGIN:
        case SAVE_EXPLAINER_ANSWER_BEGIN:
        case DELETE_EXPLAINER_ANSWER_BEGIN:
             draft.saveInProgress = true;
             draft.onSaveError = null;
        return;
        case ADD_EXPLAINER_ANSWER_SUCCESS:
        case SAVE_EXPLAINER_ANSWER_SUCCESS:
             draft.onlineQuestionsExplainerAnswers[action.payload._id] = action.payload; 
             draft.saveInProgress = false;
        return;
        case ADD_EXPLAINER_ANSWER_ERROR:
        case SAVE_EXPLAINER_ANSWER_ERROR:
             draft.saveInProgress = false;    
             draft.onSaveError = action.error;
        return;
        case LOAD_EXPLAINER_ANSWERS_BEGIN:
             draft.onlineQuestionsExplainerAnswersLoading = true;
        return;
        case LOAD_EXPLAINER_ANSWERS_SUCCESS:
             draft.onlineQuestionsExplainerAnswersLoading = false;
             action.payload?.forEach( question => {
                draft.onlineQuestionsExplainerAnswers[ question._id ] = question;
              });  
        return;
        case LOAD_EXPLAINER_ANSWERS_ERROR:
             draft.onlineQuestionsExplainerAnswersLoadingError = action.error;
             draft.onlineQuestionsExplainerAnswersLoading = false;
        return; 
        case SET_EXPLAINER_ANSWER_MARKDOWN:
             saveEditorMarkDownContent( draft.onlineQuestionsExplainerAnswers, action );
        return;
        case DELETE_EXPLAINER_ANSWER_SUCCESS:
             delete draft.onlineQuestionsExplainerAnswers[action?.payload?._id];
             draft.saveInProgress = false;
       return;
        case DELETE_EXPLAINER_ANSWER_ERROR:
             draft.onSaveError = null;
       return; 
       case SET_EXPLAINER_ANSWER_FILE_UPLOAD_META:
            draft.fileUploadMeta = action.payload;   
       return; 
       default:
    return;
    
    }
}, initialState);

export default reducer;