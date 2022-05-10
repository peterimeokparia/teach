import {
add,
update,
remove,
get,
getById } from 'services/course/api';

export const SET_ONLINEANSWERS_MARKDOWN = "SET ONLINEANSWERS MARKDOWN";
export const ADD_ONLINEANSWERS_BEGIN = "ADD ONLINEANSWERS BEGIN";
export const ADD_ONLINEANSWERS_SUCCESS = "ADD ONLINEANSWERS SUCCESS";
export const ADD_ONLINEANSWERS_ERROR = "ADD ONLINEANSWERS ERROR";
export const LOAD_ONLINEANSWERS_BEGIN = "LOAD ONLINEANSWERS BEGIN";
export const LOAD_ONLINEANSWERS_SUCCESS = "LOAD ONLINEANSWERS SUCCESS";
export const LOAD_LATEST_ONLINEANSWERS_SUCCESS = "LOAD LATEST ONLINEANSWERS SUCCESS";
export const LOAD_ONLINEANSWERS_ERROR = "LOAD ONLINEANSWERS ERROR";
export const DELETE_ONLINEANSWERS_BEGIN = "DELETE ONLINEANSWERS BEGIN";
export const DELETE_ONLINEANSWERS_ERROR = "DELETE ONLINEANSWERS ERROR";
export const DELETE_ONLINEANSWERS_SUCCESS = "DELETE ONLINEANSWERS SUCCESS";
export const RESET_ONLINEANSWERS_ERROR = "RESET ONLINEANSWERS ERROR";
export const SAVE_ONLINEANSWERS_BEGIN = "SAVE ONLINEANSWERS BEGIN";
export const SAVE_ONLINEANSWERS_ERROR = "SAVE ONLINEANSWERS ERROR";
export const SAVE_ONLINEANSWERS_SUCCESS = "SAVE ONLINEANSWERS SUCCESS";
export const SET_EXPLANATION_ANSWER_MARKDOWN = "SET EXPLANATION ANSWER MARKDOWN";

export const addNewOnlineAnswer = ( answer ) => {
    return dispatch => {
        dispatch({ type: ADD_ONLINEANSWERS_BEGIN });
        return add( answer, `/onlineanswers` )
        .then( response => { 
            dispatch({        
                type: ADD_ONLINEANSWERS_SUCCESS, payload: response });        
                // send notifications & email
    }).catch( error => {
        dispatch({ type: ADD_ONLINEANSWERS_ERROR , error });
    });
  };
};

export const saveOnlineAnswer = ( answer ) => {
    return dispatch => {
         dispatch({ type: SAVE_ONLINEANSWERS_BEGIN });
        update( answer, `/onlineanswers/` )
          .then( response => {
              dispatch({ type: SAVE_ONLINEANSWERS_SUCCESS, payload: response }); 
              dispatch({ type: LOAD_LATEST_ONLINEANSWERS_SUCCESS, payload: response }); 
           }).catch( error => {
                dispatch({ type: SAVE_ONLINEANSWERS_ERROR , error });
        }); 
    };
};

export const loadOnlineAnswers = ( ) => {
    return dispatch => {
         dispatch({ type: LOAD_ONLINEANSWERS_BEGIN });
         return get(`/onlineanswers`)
          .then( answer  => { 
             dispatch({ type: LOAD_ONLINEANSWERS_SUCCESS, payload: answer });
           }).catch( error => {
             dispatch({ type: LOAD_ONLINEANSWERS_ERROR , error });
        });       
    };
};

export const loadOnlineAnswersByQuestionId = ( questionId ) => {
    return dispatch => {
         dispatch({ type: LOAD_ONLINEANSWERS_BEGIN });
         return getById( questionId, `/onlineanswers/question?questionId=`)
          .then( answer  => { 
                dispatch({ type: LOAD_ONLINEANSWERS_SUCCESS, payload: answer });
                dispatch({ type: LOAD_LATEST_ONLINEANSWERS_SUCCESS, payload: answer });
           }).catch( error => {
                dispatch({ type: LOAD_ONLINEANSWERS_ERROR , error });
           });       
    };
};

export const loadOnlineAnswersByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_ONLINEANSWERS_BEGIN });
         return getById( userId, `/onlineanswers/answer/user?userId=`)
          .then( answer  => { 
                dispatch({ type: LOAD_ONLINEANSWERS_SUCCESS, payload: answer });
                dispatch({ type: LOAD_LATEST_ONLINEANSWERS_SUCCESS, payload: answer });
           }).catch( error => {
                dispatch({ type: LOAD_ONLINEANSWERS_ERROR , error });
        });       
    };
};

export const deleteOnlineAnswer = question => {
    return dispatch => {
         return remove( question, `/onlineanswers/` )
         .then( () => {
             dispatch({ type: DELETE_ONLINEANSWERS_SUCCESS, payload: question });
         }).catch( error => {
            dispatch({ type: DELETE_ONLINEANSWERS_ERROR , error });
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
