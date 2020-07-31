import produce from 'immer';
import {ADD_COURSE_BEGIN, ADD_COURSE_SUCCESS, ADD_COURSE_ERROR, LOAD_COURSES_BEGIN, LOAD_COURSES_SUCCESS,
          OPEN_NEW_COURSE_MODAL, CLOSE_NEW_COURSE_MODAL, LOAD_COURSES_ERROR } from '../services/course/actions';



const initialState = {
    courses: [{'name': "",
    'price': 0,
    'id': 0}],
    saveInProgress: false,
    onSaveError: null,
    coursesLoading: false,
    onCoursesError: null,
    isModalOpen: false
};


const reducer = produce((draft, action) => {
    switch(action.type){
        case ADD_COURSE_BEGIN:
            draft.saveInProgress = true;
            draft.onSaveError = null;
        return;
        case ADD_COURSE_SUCCESS:
             draft.saveInProgress = false;
             draft.courses.push(action.payload)
             draft.isModalOpen = false;
        return;
        case ADD_COURSE_ERROR:
             draft.onSaveError = action.error;
             draft.saveInProgress = false;
        return;
        case LOAD_COURSES_BEGIN:
            draft.coursesLoading = true;
        return;
        case LOAD_COURSES_SUCCESS:
             draft.coursesLoading = false;
             draft.courses = action.payload;   
        return;
        case LOAD_COURSES_ERROR:
             draft.onCoursesError = action.error;
             draft.coursesLoading = false;
        return;
        case OPEN_NEW_COURSE_MODAL:
             draft.isModalOpen = true;
             draft.saveInProgress = false;
             draft.onSaveError = null;
        return;
        case CLOSE_NEW_COURSE_MODAL:
             draft.isModalOpen = false;
             draft.onSaveError = null;
        return;
        default:
        return;

    }
    
}, initialState);


export default reducer;