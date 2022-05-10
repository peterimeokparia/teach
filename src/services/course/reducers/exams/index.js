import produce from 'immer';

import {
ADD_EXAM_BEGIN, 
ADD_EXAM_SUCCESS, 
ADD_EXAM_ERROR, 
SAVE_EXAM_BEGIN,
SAVE_EXAM_SUCCESS, 
SAVE_EXAM_ERROR,
LOAD_EXAMS_BEGIN,
LOAD_EXAMS_SUCCESS,
LOAD_EXAMS_ERROR, 
DELETE_EXAM_SUCCESS } from '../../actions/exams';

const initialState = {
    exams: {},
    latestExam: {},
    courseTutor: {},
    saveInProgress: false,
    onSaveError: null,
    examsLoading: false,
    onExamError: null,
    isModalOpen: false
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_EXAM_BEGIN:
        case SAVE_EXAM_BEGIN:     
            draft.saveInProgress = true;
            draft.onSaveError = null;
        return;
        case ADD_EXAM_SUCCESS:
        case SAVE_EXAM_SUCCESS:     
             draft.saveInProgress = false;
             draft.exams[action.payload._id] = action.payload;
             draft.latestExam[action.payload._id] = action.payload;
             draft.isModalOpen = false;
        return;
        case ADD_EXAM_ERROR:
        case SAVE_EXAM_ERROR:     
             draft.onSaveError = action.error;
             draft.saveInProgress = false;
        return;
        case LOAD_EXAMS_BEGIN:
             draft.examsLoading = true;
        return;
        case LOAD_EXAMS_SUCCESS:
             draft.examsLoading = false;
             action.payload?.forEach( exam => {
                draft.exams[exam._id] = exam;
             });  
        return;
        case LOAD_EXAMS_ERROR:
             draft.onExamError = action.error;
             draft.examsLoading = false;
        return; 
        case DELETE_EXAM_SUCCESS:
             delete draft.exams[action.payload._id];
        return; 
        default:
        return;
        
    }
}, initialState);

export default reducer;