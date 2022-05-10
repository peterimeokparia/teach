import produce from 'immer';

import {
ADD_ASSIGNMENT_BEGIN, 
ADD_ASSIGNMENT_SUCCESS, 
ADD_ASSIGNMENT_ERROR, 
SAVE_ASSIGNMENT_BEGIN,
SAVE_ASSIGNMENT_SUCCESS, 
SAVE_ASSIGNMENT_ERROR, 
LOAD_ASSIGNMENTS_BEGIN,
LOAD_ASSIGNMENTS_SUCCESS,
LOAD_ASSIGNMENTS_ERROR,
DELETE_ASSIGNMENT_SUCCESS } from 'services/course/actions/assignments';

const initialState = {
     assignments: {},
     latestAssignment: {},
     courseTutor: {},
     saveInProgress: false,
     onSaveError: null,
     assignmentsLoading: false,
     oAssignmentError: null,
     isModalOpen: false
};

const reducer = produce((draft, action) => {
     switch(action.type){

          case ADD_ASSIGNMENT_BEGIN:
          case SAVE_ASSIGNMENT_BEGIN:     
               draft.saveInProgress = true;
               draft.onSaveError = null;
          return;
          case ADD_ASSIGNMENT_SUCCESS:
          case SAVE_ASSIGNMENT_SUCCESS:     
               draft.saveInProgress = false;
               draft.assignments[action.payload._id] = action.payload;
               draft.latestAssignment[action.payload._id] = action.payload;
               draft.isModalOpen = false;
          return;
          case ADD_ASSIGNMENT_ERROR:
          case SAVE_ASSIGNMENT_ERROR:     
               draft.onSaveError = action.error;
               draft.saveInProgress = false;
          return;
          case LOAD_ASSIGNMENTS_BEGIN:
               draft.assignmentsLoading = true;
          return;
          case LOAD_ASSIGNMENTS_SUCCESS:
               draft.assignmentsLoading = false;
               action.payload?.forEach( assignment => {
                    draft.assignments[assignment._id] = assignment;
               });  
          return;
          case LOAD_ASSIGNMENTS_ERROR:
               draft.oAssignmentError = action.error;
               draft.assignmentsLoading = false;
          return; 
          case DELETE_ASSIGNMENT_SUCCESS:
               delete draft.assignments[action.payload._id];
          return; 
          default:
          return;

     }
}, initialState);

export default reducer;