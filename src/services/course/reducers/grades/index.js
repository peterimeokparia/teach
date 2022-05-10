import produce from 'immer';

import { 
ADD_NEW_GRADE_BEGIN,
ADD_NEW_GRADE_SUCCESS,
ADD_NEW_GRADE_ERROR,
SAVE_GRADE_BEGIN,
SAVE_GRADE_SUCCESS,
SAVE_GRADE_ERROR,
LOAD_GRADES_BEGIN,
LOAD_GRADES_SUCCESS,
LOAD_GRADES_ERROR } from '../../actions/grades';

const initialState = {
grades:{},
grade:{},
isLoading: false,
onError: null,
saveGradeInProgress: false,
onSaveGradeError: null
};

const reducer =  produce( (draft, action) => {
    switch(action.type){

       case ADD_NEW_GRADE_BEGIN:    
             draft.isLoading = true;
             draft.onError = false;  
        return; 
        case ADD_NEW_GRADE_SUCCESS:    
             draft.grades[action.payload?.grade?._id] = action.payload?.grade;  
        return;
        case ADD_NEW_GRADE_ERROR:    
             draft.isLoading = false;
             draft.onError = action.error;  
        return; 
        case LOAD_GRADES_BEGIN:    
             draft.isLoading = true;
             draft.onError = null;
        return;
        case LOAD_GRADES_SUCCESS:
             draft.isLoading = false;
             draft.onError = null;
             action.payload?.forEach(element => {
                draft.grades[element._id] = element;  
             });            
        return;
        case LOAD_GRADES_ERROR:
             draft.isLoading = false;    
             draft.onError = action.error;  
        return;
        case SAVE_GRADE_BEGIN:
             draft.saveGradeInProgress = true;
             draft.onSaveGradeError = null;
        return; 
        case SAVE_GRADE_SUCCESS:    
             console.log(action.payload);
             draft.grades[action.payload._id] = action.payload;
             draft.grade =  action.payload;
             draft.saveGradeInProgress = false;
         return;    
         case SAVE_GRADE_ERROR:
             draft.saveGradeInProgress = false;    
             draft.onSaveGradeError = action.error;
        return;     
        default:
        return;  
        
    }
}, initialState);

export default reducer;