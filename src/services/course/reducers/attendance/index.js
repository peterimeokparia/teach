import produce from 'immer';

import { 
LOAD_ATTENDANCE_BEGIN,
LOAD_ATTENDANCE_SUCCESS,
LOAD_ATTENDANCE_ERROR,
MARK_ATTENDANCE_BEGIN,
MARK_ATTENDANCE_SUCCESS,
MARK_ATTENDANCE_ERROR,
SAVE_ATTENDANCE_BEGIN,
SAVE_ATTENDANCE_SUCCESS,
SAVE_ATTENDANCE_ERROR } from '../../actions/attendance';

const initialState = {
    attendanceCollection:{},
    attendance:{},
    isLoading: false,
    onError: null,
    saveAttendanceInProgress: false,
    onSaveAttendanceError: null
};

const reducer =  produce( (draft, action) => {
    switch(action.type){

       case MARK_ATTENDANCE_BEGIN:    
             draft.isLoading = true;
             draft.onError = false;  
        return; 
        case MARK_ATTENDANCE_SUCCESS:    
             draft.attendanceCollection[action.payload._id] = action.payload;  
        return;
        case MARK_ATTENDANCE_ERROR:    
             draft.isLoading = false;
             draft.onError = action.error;  
        return; 
        case LOAD_ATTENDANCE_BEGIN:    
             draft.isLoading = true;
             draft.onError = null;
        return;
        case LOAD_ATTENDANCE_SUCCESS:
             draft.isLoading = false;
             draft.onError = null;
             action.payload?.forEach(element => {
                draft.attendanceCollection[element._id] = element;  
             });      
        return;
        case LOAD_ATTENDANCE_ERROR:
             draft.isLoading = false;    
             draft.onError = action.error;  
        return;
        case SAVE_ATTENDANCE_BEGIN:
             draft.saveAttendanceInProgress = true;
             draft.onSaveAttendanceError = null;
        return; 
        case SAVE_ATTENDANCE_SUCCESS:    
             console.log(action.payload);
             draft.attendanceCollection[action.payload._id] = action.payload;
             draft.attendance =  action.payload;
             draft.saveAttendanceInProgress = false;
         return;   
         case SAVE_ATTENDANCE_ERROR:
             draft.saveAttendanceInProgress = false;    
             draft.onSaveAttendanceError = action.error;
        return;     
        default:
        return;  

    };
}, initialState);

export default reducer;