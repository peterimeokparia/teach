import {
add,
update,
remove,
get,
getById,
updateUser } from 'services/course/api';

export const LOAD_EXAMS_BEGIN = "LOAD EXAMS BEGIN";
export const LOAD_EXAMS_SUCCESS = "LOAD EXAMS SUCCESS"; 
export const LOAD_EXAMS_ERROR = "LOAD EXAMS ERROR";
export const ADD_EXAM_BEGIN = "ADD EXAM BEGIN";
export const ADD_EXAM_SUCCESS = "ADD EXAM SUCCESS";
export const ADD_EXAM_ERROR = "ADD EXAM ERROR";
export const SAVE_EXAM_BEGIN = "SAVE EXAM BEGIN";     
export const SAVE_EXAM_SUCCESS = "SAVE COURSE SUCCESS";
export const SAVE_EXAM_ERROR = "SAVE COURSE ERROR";
export const DELETE_EXAM_SUCCESS = "DELETE EXAM SUCCESS";
export const DELETE_EXAM_BEGIN = "DELETE EXAM BEGIN";
export const DELETE_EXAM_ERROR = "DELETE EXAM ERROR";
export const LAST_LOGGEDIN_USER = "LAST LOGGEDIN USER";

export const loadExams = ( ) => {
    return dispatch => {
         dispatch({ type: LOAD_EXAMS_BEGIN });
         return get(`/exams`)
          .then( exam  => { dispatch({ type: LOAD_EXAMS_SUCCESS, payload: exam }); 
        }).catch( error => { dispatch({ type: LOAD_EXAMS_ERROR , error }); });       
    };
};

export const loadExamsByExamId = ( examId ) => {
    return dispatch => {
         dispatch({ type: LOAD_EXAMS_BEGIN });
         return getById( examId, `/exams?examId=`)
          .then( examId  => { dispatch({ type: LOAD_EXAMS_SUCCESS, payload: examId }); 
        }).catch( error => { dispatch({ type: LOAD_EXAMS_ERROR , error }); });       
    };
};

export const addNewExam = ( user, operator, exam ) => {
    let userToUpdate;

    return dispatch => {
       dispatch({ type: ADD_EXAM_BEGIN });
       return add( { ...exam, operatorId: operator?._id }, '/exams')
        .then(exam => {
           if ( exam?.createdBy === user._id ) {
            userToUpdate = {...user, exams: user?.exams };
            userToUpdate.exams.push( exam._id );
           }
           updateUser( userToUpdate );
           dispatch({ type: ADD_EXAM_SUCCESS, payload: exam });    
           dispatch({ type: LAST_LOGGEDIN_USER, payload: user });  
        //dispatch( sendPushNotificationMessage( pushNotificationUser?.
        //filter(pushuser => pushuser?.userId === student?._id), {title:'Attendance Taken!', body:`Attendance taken for course: ${ course?.name }`}) )  
        }).catch(error => { dispatch({ type: ADD_EXAM_ERROR, error }); });
    };
};

export const saveExam = ( exam ) => {
   return dispatch => {
        dispatch({ type: SAVE_EXAM_BEGIN });
        return update( exam, '/exams/' )
         .then( exam => { dispatch({type: SAVE_EXAM_SUCCESS, payload: exam }); 
          }).catch( error => { dispatch({ type: SAVE_EXAM_ERROR , error }); });
   };
};

export const deleteExam = exam => {
   return dispatch => {
       dispatch({ type: DELETE_EXAM_BEGIN });
        return remove( exam, `/exams/` )
        .then( () => { dispatch({ type: DELETE_EXAM_SUCCESS, payload: exam });
        }).catch( error => { dispatch({ type: DELETE_EXAM_ERROR , error }); });
   };
};