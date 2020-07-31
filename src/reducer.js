import produce from 'immer';
import { ADD_NEW_POD } from './actions';
import {ADD_COURSE_BEGIN, ADD_COURSE_SUCCESS, ADD_COURSE_ERROR, LOAD_COURSES_BEGIN, LOAD_COURSES_SUCCESS,
          LOAD_COURSES_ERROR, OPEN_NEW_COURSE_MODAL, CLOSE_NEW_COURSE_MODAL, ADD_NEW_LESSON_SUCCESS, ADD_NEW_LESSON_BEGIN,
            ADD_NEW_LESSON_ERROR, LOAD_LESSONS_BEGIN, LOAD_LESSONS_SUCCESS, LOAD_LESSONS_ERROR } from './services/course/actions';



const initialState = {
    pods: [],
    courses: [],
    saveInProgress: false,
    onSaveError: null,
    coursesLoading: false,
    onCoursesError: null,
    isModalOpen: false,
    lessons: [],
    saveLessonInProgress: false,
    onSaveLessonError: null,
    lessonsLoading: false,
    onLessonsLoadingError: null
};

const reducer = produce((draft, action) => {
    switch(action.type){
        case ADD_NEW_POD:
          draft.pods.push(action.payload)   
        return;
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
        case ADD_NEW_LESSON_BEGIN:
            draft.saveLessonInProgress = true;
            draft.onSaveLessonError = null;
        return;
        case ADD_NEW_LESSON_SUCCESS:
               draft.lessons.push( action.payload );
               draft.saveLessonInProgress = false;
         return;
         case ADD_NEW_LESSON_ERROR:
             draft.onSaveLessonError = action.error;
             draft.saveLessonInProgress = false;
        return;
        case LOAD_LESSONS_BEGIN:
            draft.lessonsLoading = true;
        return;
        case LOAD_LESSONS_SUCCESS:
             draft.lessonsLoading = false;
             draft.lessons = action.payload;   
        return;
        case LOAD_LESSONS_ERROR:
             draft.onLessonsLoadingError = action.error;
             draft.lessonsLoading = false;
        return;

        default:
        return;

    }
    
}, initialState);


export default reducer;