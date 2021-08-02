import {
add,
update,
get,
getById,
updateUser } from 'services/course/api';

export const LOAD_ASSIGNMENTS_BEGIN = "LOAD ASSIGNMENTS BEGIN";
export const LOAD_ASSIGNMENTS_SUCCESS = "LOAD ASSIGNMENTS SUCCESS";
export const LOAD_ASSIGNMENTS_ERROR = "LOAD ASSIGNMENTS ERROR";
export const SAVE_ASSIGNMENT_BEGIN = "SAVE ASSIGNMENT BEGIN";
export const SAVE_ASSIGNMENT_SUCCESS = "SAVE ASSIGNMENT SUCCESS";
export const SAVE_ASSIGNMENT_ERROR = "SAVE ASSIGNMENT ERROR";
export const ADD_ASSIGNMENT_BEGIN = "ADD ASSIGNMENT BEGIN";
export const ADD_ASSIGNMENT_SUCCESS = "ADD ASSIGNMENT SUCCESS"; 
export const ADD_ASSIGNMENT_ERROR = "ADD ASSIGNMENT ERROR";
export const DELETE_ASSIGNMENT_SUCCESS = "DELETE ASSIGNMENT SUCCESS";
export const DELETE_ASSIGNMENT_BEGIN = "DELETE ASSIGNMENT BEGIN";
export const DELETE_ASSIGNMENT_ERROR = "DELETE ASSIGNMENT ERROR";
export const LAST_LOGGEDIN_USER = "LAST LOGGEDIN USER";

export const addNewAssignment = ( user, operator, assignment ) => {    
    return dispatch => {   
        dispatch({ type: ADD_ASSIGNMENT_BEGIN });
        return add( { ...assignment,  operatorId: operator?._id }, '/assignments')
        .then(assignment => {
            if (assignment?.createdBy === user._id ) {
                user = { ...user, assignments: [ ...user.assignments, assignment._id ]  };
                updateUser( user );
            };    
            dispatch({ type: ADD_ASSIGNMENT_SUCCESS, payload: assignment }); 
            dispatch({ type: LAST_LOGGEDIN_USER, payload: user });  
            //toDo: Send push & email messages to students & parents every time attendance is taken. 
            //dispatch( sendPushNotificationMessage( pushNotificationUser?.
            // filter(pushuser => pushuser?.userId === student?._id), {title:'Attendance Taken!', body:`Attendance taken for course: ${ course?.name }`}) )
        }).catch(error => { 
            dispatch({ type: ADD_ASSIGNMENT_ERROR, error });
        });
    };
};

export const saveAssignment = ( assignment ) => {
    return dispatch => {
            dispatch({ type: SAVE_ASSIGNMENT_BEGIN });
        return update( assignment, `/assignments/` )
        .then( assignment => {  
            dispatch({        
            type: SAVE_ASSIGNMENT_SUCCESS, payload: assignment });
        }).catch( error => {
            dispatch({ type: SAVE_ASSIGNMENT_ERROR , error });
        }); 
    };
};

export const loadAssignments = ( ) => {
    return dispatch => {
            dispatch({ type: LOAD_ASSIGNMENTS_BEGIN });
        return get(`/assignments`)
        .then( assignment  => { 
            dispatch({ type: LOAD_ASSIGNMENTS_SUCCESS, payload: assignment }); 
        }).catch( error => {
            dispatch({ type: LOAD_ASSIGNMENTS_ERROR , error });
        });       
    };
};

export const loadAssignmentsByAssignmentId = ( lessonId ) => {
    return dispatch => {
        dispatch({ type: LOAD_ASSIGNMENTS_BEGIN });
        return getById( lessonId, `/assignments?assignmentId=`)
        .then( assignment  => { 
            dispatch({ type: LOAD_ASSIGNMENTS_SUCCESS, payload: assignment }); 
        }).catch( error => {
            dispatch({ type: LOAD_ASSIGNMENTS_ERROR , error });
        });       
    };
};