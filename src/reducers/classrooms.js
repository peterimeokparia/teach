import produce from 'immer';
import {
ADD_CLASSROOM_BEGIN, 
ADD_CLASSROOM_SUCCESS, 
ADD_CLASSROOM_ERROR, 
LOAD_CLASSROOMS_BEGIN, 
LOAD_CLASSROOMS_SUCCESS, 
OPEN_NEW_CLASSROOM_MODAL,
CLOSE_NEW_COURSE_MODAL,
OPEN_NEW_COURSE_MODAL, 
CLOSE_NEW_CLASSROOM_MODAL, 
LOAD_CLASSROOMS_ERROR,
SAVE_CLASSROOM_BEGIN,
SAVE_CLASSROOM_SUCCESS, 
SAVE_CLASSROOM_ERROR, 
DELETE_CLASSROOM_SUCCESS,
RESET_CLASSROOM_USER_ERROR,
DELETE_CLASSROOMS_BEGIN, 
DELETE_CLASSROOMS_ERROR,
TOGGLE_ADD_NEW_GRADE_FORM } from '../services/course/actions';



const initialState = {
    classrooms: {},
    saveInProgress: false,
    onSaveError: null,
    classroomsLoading: false,
    onClassRoomError: null,
    isModalOpen: false,
    displayGradeForm: false
};


const reducer = produce((draft, action) => {
    switch(action.type){
        case ADD_CLASSROOM_BEGIN:
        case SAVE_CLASSROOM_BEGIN:     
             draft.saveInProgress = true;
             draft.onSaveError = null;
        return;
        case ADD_CLASSROOM_SUCCESS:
        case SAVE_CLASSROOM_SUCCESS:     
             draft.saveInProgress = false;
             draft.classrooms[action.payload._id] = action.payload;
             draft.isModalOpen = false;
        return;
        case ADD_CLASSROOM_ERROR:
        case SAVE_CLASSROOM_ERROR:     
             draft.onSaveError = action.error;
             draft.saveInProgress = false;
        return;
        case DELETE_CLASSROOM_SUCCESS:
             delete draft.classrooms[action.payload._id];
        return; 
        case LOAD_CLASSROOMS_BEGIN:
            draft.classroomsLoading = true;
        return;
        case LOAD_CLASSROOMS_SUCCESS:
             draft.classroomsLoading = false;
             draft.classrooms = action.payload;   
        return;
        case LOAD_CLASSROOMS_ERROR:
             draft.onCoursesError = action.error;
             draft.classroomsLoading = false;
        return;
        case RESET_CLASSROOM_USER_ERROR:
             draft.onSaveError = null;
        return;
        case OPEN_NEW_CLASSROOM_MODAL:
             draft.isModalOpen = true;
             draft.saveInProgress = false;
             draft.onSaveError = null;
        return;
        case CLOSE_NEW_CLASSROOM_MODAL:
             draft.isModalOpen = false;
             draft.onSaveError = null;
        return;
        case TOGGLE_ADD_NEW_GRADE_FORM:
             draft.displayGradeForm = (! draft.displayGradeForm);
        return;
        default:
        return;

    }
    
}, initialState);


export default reducer;