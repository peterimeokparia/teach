import {
    add,
    update,
    remove,
    get,
    getById } from 'services/course/api';
    
    import {
    sendPushNotificationMessage } from 'services/course/actions/notifications';
    
    export const LOAD_ATTENDANCE_BEGIN = "LOAD ATTENDANCE BEGIN";
    export const LOAD_ATTENDANCE_SUCCESS = "LOAD ATTENDANCE SUCCESS";
    export const LOAD_ATTENDANCE_ERROR = "LOAD ATTENDANCE ERROR";
    export const MARK_ATTENDANCE_BEGIN = "MARK ATTENDANCE BEGIN";
    export const MARK_ATTENDANCE_SUCCESS = "MARK ATTENDANCE SUCCESS";
    export const MARK_ATTENDANCE_ERROR = "MARK ATTENDANCE ERROR";
    export const SAVE_ATTENDANCE_BEGIN = "SAVE ATTENDANCE BEGIN";
    export const SAVE_ATTENDANCE_SUCCESS = "SAVE ATTENDANCE SUCCESS";
    export const SAVE_ATTENDANCE_ERROR = "SAVE ATTENDANCE ERROR";
    export const DELETE_ATTENDANCE_BEGIN = "DELETE ATTENDANCE BEGIN";
    export const DELETE_ATTENDANCE_SUCCESS = "DELETE ATTENDANCE SUCCESS";
    export const DELETE_ATTENDANCE_ERROR = "DELETE ATTENDANCE ERROR";
    
    export const loadAttendance = ( ) => {
        return dispatch => {
             dispatch({ type: LOAD_ATTENDANCE_BEGIN });
             return get(`/attendance`)
              .then( attendance => { 
                    dispatch({ type: LOAD_ATTENDANCE_SUCCESS, payload: attendance }); 
               }).catch( error => {
                   dispatch({ type: LOAD_ATTENDANCE_ERROR , error });
            });
        };
    };
    
    export const loadAttendanceByStudentId = ( studentId ) => {
        return dispatch => {
             dispatch({ type: LOAD_ATTENDANCE_BEGIN });
             return getById( studentId, `/attendance?studentId=` )
              .then( attendance => { 
                   dispatch({ type: LOAD_ATTENDANCE_SUCCESS, payload: attendance }); 
               }).catch( error => {
                   dispatch({ type: LOAD_ATTENDANCE_ERROR , error });
               });
        };
    };
    
    export const markAttendance = ( student, course, attendanceData, pushNotificationUser ) => {
        return dispatch  => {
             dispatch({ type: MARK_ATTENDANCE_BEGIN });
                return add( attendanceData, `/attendance` )
                    .then( attendance => { 
                        dispatch({ type: MARK_ATTENDANCE_SUCCESS, payload: attendance });
                        dispatch( sendPushNotificationMessage( pushNotificationUser?.filter(pushuser => pushuser?.userId === student?._id), {title:'Attendance Taken!', body:`Attendance taken for course: ${ course?.name }`}) );
                    }).catch( error => {
                        dispatch({ type: MARK_ATTENDANCE_ERROR , error });
                });
        };
    };
    
    export const saveAttendance = ( attendance ) => {
       return dispatch => {
            dispatch({ type: SAVE_ATTENDANCE_BEGIN });
            return update( attendance, `/attendance/` )
             .then( attendance => {  
                 dispatch({        
                  type: SAVE_ATTENDANCE_SUCCESS, payload: attendance }); 
              }).catch( error => {
                  dispatch({ type: SAVE_ATTENDANCE_ERROR , error });
              });   
       };
    };
    
    export const deleteAttendance = attendance => {
       return dispatch => {
           dispatch({ type: DELETE_ATTENDANCE_BEGIN });
            return remove( attendance, `/attendance/` )
            .then( () => {
                dispatch({ type: DELETE_ATTENDANCE_SUCCESS, payload: attendance });
            }).catch( error => {
                dispatch({ type: DELETE_ATTENDANCE_ERROR , error });
            });
       };
    };