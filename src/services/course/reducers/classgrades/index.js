import produce from 'immer';

import { 
ADD_CLASSGRADE_BEGIN,
ADD_CLASSGRADE_SUCCESS,            
ADD_CLASSGRADE_ERROR,      
LOAD_CLASSGRADE_BEGIN, 
LOAD_CLASSGRADE_SUCCESS,
LOAD_CLASSGRADE_ERROR,
SAVE_CLASSGRADE_SUCCESS, 
SAVE_CLASSGRADE_BEGIN, 
SAVE_CLASSGRADE_ERROR, 
DELETE_CLASSGRADE_SUCCESS, 
DELETE_CLASSGRADE_ERROR } from 'services/course/actions/classgrades';

const initialState = {
     classGrades:{}, 
     saveInProgress: false,
     onSaveError: null,
     classGradesLoading: false
};

const reducer = produce((draft, action) => {
    switch(action.type){
     case ADD_CLASSGRADE_BEGIN:
     case SAVE_CLASSGRADE_BEGIN:
          draft.saveInProgress = true;
          draft.onSaveError = null;
     return;
     case ADD_CLASSGRADE_SUCCESS:
     case SAVE_CLASSGRADE_SUCCESS:  
          draft.classGrades[action.payload._id] = action.payload; 
          draft.saveInProgress = false;
     return;
     case ADD_CLASSGRADE_ERROR:
     case SAVE_CLASSGRADE_ERROR:
          draft.saveInProgress = false;    
          draft.onSaveError = action.error;
     return;
     case LOAD_CLASSGRADE_BEGIN:
          draft.classGradesLoading = true;
     return;
     case LOAD_CLASSGRADE_SUCCESS:
          action.payload?.forEach( grade => {
               draft.classGrades[ grade._id ] = grade;
          });  
          draft.classGradesLoading = false;
     return;
     case LOAD_CLASSGRADE_ERROR:
          draft.onclassGradesLoadingError = action.error;
          draft.classGradesLoading = false;
     return; 
     case DELETE_CLASSGRADE_SUCCESS:
          delete draft.classGrades[action.payload?._id];  
     return; 
     case DELETE_CLASSGRADE_ERROR:
          draft.onclassGradesLoadingError = action.error;
          draft.classGradesLoading = false;
     return; 
     default:
    return;

    }
}, initialState);

export default reducer;