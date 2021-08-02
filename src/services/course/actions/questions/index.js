import {
add,
update,
get,
remove,
getById } from 'services/course/api';

export const SET_QUESTION_MARKDOWN = "SET_QUESTION_MARKDOWN";
export const ADD_QUESTION_BEGIN = "ADD QUESTION BEGIN";
export const ADD_QUESTION_SUCCESS = "ADD QUESTION SUCCESS";
export const ADD_QUESTION_ERROR = "ADD QUESTION ERROR";
export const LOAD_QUESTIONS_BEGIN = "LOAD QUESTIONS BEGIN";
export const LOAD_QUESTIONS_SUCCESS = "LOAD QUESTIONS SUCCESS";
export const LOAD_LATEST_QUESTION_SUCCESS = "LOAD LATEST QUESTION SUCCESS";
export const LOAD_QUESTIONS_ERROR = "LOAD QUESTIONS ERROR";
export const DELETE_QUESTION_SUCCESS = "DELETE QUESTION SUCCESS";
export const DELETE_QUESTION_ERROR = "DELETE QUESTION ERROR";
export const RESET_QUESTION_ERROR = "RESET QUESTION ERROR";
export const SAVE_QUESTION_BEGIN = "SAVE QUESTION BEGIN";
export const SAVE_QUESTION_ERROR = "SAVE QUESTION ERROR";
export const SAVE_QUESTION_SUCCESS = "SAVE QUESTION SUCCESS";
export const SET_EXPLANATION_ANSWER_MARKDOWN = "SET EXPLANATION ANSWER MARKDOWN";
export const SET_MARKDOWN_EDITOR = "SET MARKDOWN EDITOR";

export const addNewQuestion = ( questionData ) => {
    return dispatch => {
        dispatch({ type: ADD_QUESTION_BEGIN });
        return add( questionData, `/questions` )
        .then( response => { 
            dispatch({        
                type: ADD_QUESTION_SUCCESS, payload: response });        
                // dispatch( sendPushNotificationMessage( pushNotificationUser?.
                //     filter(pushuser => pushuser?.userId === student?._id), {title:'Attendance Taken!', body:`Attendance taken for course: ${ course?.name }`}) )
    }).catch( error => {
        dispatch({ type: ADD_QUESTION_ERROR , error });
    });
  };
};

export const saveQuestion = ( question ) => {
    return dispatch => {
         dispatch({ type: SAVE_QUESTION_BEGIN });
         return update( question, `/questions/` )
          .then( response => {
              dispatch({ type: SAVE_QUESTION_SUCCESS, payload: response }); 
              dispatch({ type: LOAD_LATEST_QUESTION_SUCCESS, payload: response }); 
           }).catch( error => {
                dispatch({ type: SAVE_QUESTION_ERROR , error });
        }); 
    };
};

export const loadQuestions = ( ) => {
    return dispatch => {
         dispatch({ type: LOAD_QUESTIONS_BEGIN });
         return get(`/questions`)
          .then( questions  => { 
             dispatch({ type: LOAD_QUESTIONS_SUCCESS, payload: questions }); 
           }).catch( error => {
             dispatch({ type: LOAD_QUESTIONS_ERROR , error });
        });       
    };
};

export const loadQuestionsByQuestionId = ( questionId ) => {
    return dispatch => {
         dispatch({ type: LOAD_QUESTIONS_BEGIN });
         return getById( questionId, `/questions/test?questionId=`)
          .then( questions  => { 
                dispatch({ type: LOAD_QUESTIONS_SUCCESS, payload: questions });
                dispatch({ type: LOAD_LATEST_QUESTION_SUCCESS, payload: questions });
           }).catch( error => {
                dispatch({ type: LOAD_QUESTIONS_ERROR , error });
           });       
    };
};

export const loadQuestionsByLessonId = ( lessonId ) => {
    return dispatch => {
         dispatch({ type: LOAD_QUESTIONS_BEGIN });
         return getById( lessonId, `/questions?lessonId=`)
          .then( questions  => { 
                dispatch({ type: LOAD_QUESTIONS_SUCCESS, payload: questions });
                dispatch({ type: LOAD_LATEST_QUESTION_SUCCESS, payload: questions });
           }).catch( error => {
                dispatch({ type: LOAD_QUESTIONS_ERROR , error });
        });       
    };
};

export const deleteQuestion = question => {
    return dispatch => {
         return remove( question, `/questions/` )
         .then( () => {
             dispatch({ type: DELETE_QUESTION_SUCCESS, payload: question });
         }).catch( error => {
            dispatch({ type: DELETE_QUESTION_ERROR , error });
        });
    };
};

export const setMarkDownEditor = ( markDownEditors ) => ({
    type: SET_MARKDOWN_EDITOR,
    payload: markDownEditors
});

