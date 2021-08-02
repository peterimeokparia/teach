import {
add,
update,
remove,
get,
getById } from 'services/course/api';

export const ADD_ANSWERFORMS_BEGIN = "ADD ANSWERFORMS BEGIN";
export const ADD_ANSWERFORMS_SUCCESS = "ADD ANSWERFORMS SUCCESS";
export const ADD_ANSWERFORMS_ERROR = "ADD ANSWERFORMS ERROR";
export const LOAD_ANSWERFORMS_BEGIN = "LOAD ANSWERFORMS BEGIN";
export const LOAD_ANSWERFORMS_SUCCESS = "LOAD ANSWERFORMS SUCCESS";
export const LOAD_LATEST_ANSWERFORMS_SUCCESS = "LOAD LATEST ANSWERFORMS SUCCESS";
export const LOAD_ANSWERFORMS_ERROR = "LOAD ANSWERFORMS ERROR";
export const DELETE_ANSWERFORMS_BEGIN = "DELETE ANSWERFORMS BEGIN";
export const DELETE_ANSWERFORMS_ERROR = "DELETE ANSWERFORMS ERROR";
export const DELETE_ANSWERFORMS_SUCCESS = "DELETE ANSWERFORMS SUCCESS";
export const RESET_ANSWERFORMS_ERROR = "RESET ANSWERFORMS ERROR";
export const SAVE_ANSWERFORMS_BEGIN = "SAVE ANSWERFORMS BEGIN";
export const SAVE_ANSWERFORMS_ERROR = "SAVE ANSWERFORMS ERROR";
export const SAVE_ANSWERFORMS_SUCCESS = "SAVE ANSWERFORMS SUCCESS";
export const SET_ANSWERFORMS_MARKDOWN = "SET ANSWERFORMS MARKDOWN";
export const SET_EXPLANATION_ANSWER_MARKDOWN = "SET EXPLANATION ANSWER MARKDOWN";

export const addNewFormAnswer = ( answer ) => {
    return dispatch => {
        dispatch({ type: ADD_ANSWERFORMS_BEGIN });
        return add( answer, `/answerforms` )
        .then( response => { 
            dispatch({        
                type: ADD_ANSWERFORMS_SUCCESS, payload: response });        
                // send notifications & email
    }).catch( error => {
        dispatch({ type: ADD_ANSWERFORMS_ERROR , error });
    });
  };
};

export const saveFormAnswer = ( answer ) => {
    return dispatch => {
         dispatch({ type: SAVE_ANSWERFORMS_BEGIN });
        update( answer, `/answerforms/` )
          .then( response => {
              dispatch({ type: SAVE_ANSWERFORMS_SUCCESS, payload: response }); 
              dispatch({ type: LOAD_LATEST_ANSWERFORMS_SUCCESS, payload: response }); 
           }).catch( error => {
                dispatch({ type: SAVE_ANSWERFORMS_ERROR , error });
        }); 
    };
};

export const loadFormAnswers = ( ) => {
    return dispatch => {
         dispatch({ type: LOAD_ANSWERFORMS_BEGIN });
         return get(`/answerforms`)
          .then( answer  => { 
             dispatch({ type: LOAD_ANSWERFORMS_SUCCESS, payload: answer });
           }).catch( error => {
             dispatch({ type: LOAD_ANSWERFORMS_ERROR , error });
        });       
    };
};

export const loadFormAnswersByAnswerId = ( answerId ) => {
    return dispatch => {
         dispatch({ type: LOAD_ANSWERFORMS_BEGIN });
         return getById( answerId, `/answerforms/answer?answerId=`)
          .then( answer  => { 
                dispatch({ type: LOAD_ANSWERFORMS_SUCCESS, payload: answer });
                dispatch({ type: LOAD_LATEST_ANSWERFORMS_SUCCESS, payload: answer });
           }).catch( error => {
                dispatch({ type: LOAD_ANSWERFORMS_ERROR , error });
           });       
    };
};

export const loadFormAnswersByQuestionId = ( questionId ) => {
    return dispatch => {
         dispatch({ type: LOAD_ANSWERFORMS_BEGIN });
         return getById( questionId, `/answerforms/question?questionId=`)
          .then( answer  => { 
                dispatch({ type: LOAD_ANSWERFORMS_SUCCESS, payload: answer });
                dispatch({ type: LOAD_LATEST_ANSWERFORMS_SUCCESS, payload: answer });
           }).catch( error => {
                dispatch({ type: LOAD_ANSWERFORMS_ERROR , error });
           });       
    };
};

export const loadFormAnswersByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_ANSWERFORMS_BEGIN });
         return getById( userId, `/answerforms/answer/user?userId=`)
          .then( answer  => { 
                dispatch({ type: LOAD_ANSWERFORMS_SUCCESS, payload: answer });
                dispatch({ type: LOAD_LATEST_ANSWERFORMS_SUCCESS, payload: answer });
           }).catch( error => {
                dispatch({ type: LOAD_ANSWERFORMS_ERROR , error });
        });       
    };
};

export const deleteOnlineAnswer = answer => {
    return dispatch => {
         return remove( answer, `/answerforms/` )
         .then( () => {
             dispatch({ type: DELETE_ANSWERFORMS_SUCCESS, payload: answer });
         }).catch( error => {
            dispatch({ type: DELETE_ANSWERFORMS_ERROR , error });
        });
    };
};

let timerHandle = null;

export const setMarkDown = ( teachObject, markDownContent, teachObjectType="", actionType, saveAction  ) => {
    return ( dispatch, getState )  => {
        dispatch({ type: actionType, payload: {   
            teachObject,
            markDownContent
          }});

        if ( timerHandle ){
            clearTimeout( timerHandle );
        }
        timerHandle = setTimeout(() => {
            console.log("...saving markdown text"); 
           dispatch(saveAction( getState()[teachObjectType][teachObjectType][ teachObject?._id ] ));
        }, 2000);  
    };
};
