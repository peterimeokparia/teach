import produce from 'immer';

import {
ADD_CLASSROOM_BEGIN, 
ADD_CLASSROOM_SUCCESS, 
ADD_CLASSROOM_ERROR, 
LOAD_CLASSROOMS_BEGIN, 
LOAD_CLASSROOMS_SUCCESS, 
OPEN_NEW_CLASSROOM_MODAL,
CLOSE_NEW_CLASSROOM_MODAL, 
LOAD_CLASSROOMS_ERROR,
SAVE_CLASSROOM_BEGIN,
SAVE_CLASSROOM_SUCCESS, 
SAVE_CLASSROOM_ERROR, 
DELETE_CLASSROOM_SUCCESS,
RESET_CLASSROOM_USER_ERROR,
UPDATE_CURRENT_CLASSROOM_LESSON_PLAN,
UPDATE_CURRENT_CLASSROOM_TUTOR,
TOGGLE_SIDEBAR_DROPDOWN_MENU,
ENABLE_TEACH_PLATFORM } from '../../actions/classrooms';

const initialState = {
    classrooms: {},
    classRoomLessonPlan: {},
    meeting: {},
    currentTutor: {},
    displaySideBarDropDown: false,
    saveInProgress: false,
    onSaveError: null,
    classroomsLoading: false,
    onClassRoomError: null,
    isModalOpen: false
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
             draft.classrooms[action.payload?.classroom?._id] = action.payload?.classroom;
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
        case UPDATE_CURRENT_CLASSROOM_LESSON_PLAN:
             draft.classRoomLessonPlan[ action?.payload?.selectedTutor?._id ] = action?.payload;
        return;     
        case TOGGLE_SIDEBAR_DROPDOWN_MENU:
             draft.displaySideBarDropDown = (!draft.displaySideBarDropDown);
        return; 
        case ENABLE_TEACH_PLATFORM:
             draft.meeting = action.payload;
         return;
         case UPDATE_CURRENT_CLASSROOM_TUTOR:
              draft.currentTutor = action.payload;
          return;
        default:
        return;

    }
}, initialState);

export default reducer;