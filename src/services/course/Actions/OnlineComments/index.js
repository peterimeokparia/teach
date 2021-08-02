import {
add,
update,
get,
remove,
getById } from 'services/course/api';

export const SET_ONLINECOMMENTS_MARKDOWN = "SET ONLINECOMMENTS MARKDOWN";
export const ADD_ONLINECOMMENTS_BEGIN = "ADD ONLINECOMMENTS BEGIN";
export const ADD_ONLINECOMMENTS_SUCCESS = "ADD ONLINECOMMENTS SUCCESS";
export const ADD_ONLINECOMMENTS_ERROR = "ADD ONLINECOMMENTS ERROR";
export const LOAD_ONLINECOMMENTS_BEGIN = "LOAD ONLINECOMMENTS BEGIN";
export const LOAD_ONLINECOMMENTS_SUCCESS = "LOAD ONLINECOMMENTS SUCCESS";
export const LOAD_LATEST_ONLINECOMMENTS_SUCCESS = "LOAD LATEST ONLINECOMMENTS SUCCESS";
export const LOAD_ONLINECOMMENTS_ERROR = "LOAD ONLINECOMMENTS ERROR";
export const DELETE_ONLINECOMMENTS_SUCCESS = "DELETE ONLINECOMMENTS SUCCESS";
export const DELETE_ONLINECOMMENTS_ERROR = "DELETE ONLINECOMMENTS ERROR";
export const RESET_ONLINECOMMENTS_ERROR = "RESET ONLINECOMMENTS ERROR";
export const SAVE_ONLINECOMMENTS_BEGIN = "SAVE ONLINECOMMENTS BEGIN";
export const SAVE_ONLINECOMMENTS_ERROR = "SAVE ONLINECOMMENTS ERROR";
export const SAVE_ONLINECOMMENTS_SUCCESS = "SAVE ONLINECOMMENTS SUCCESS";
export const SET_EXPLANATION_ANSWER_MARKDOWN = "SET EXPLANATION ANSWER MARKDOWN";

export const addNewOnlineComment = ( comment ) => {
    return ( dispatch, getState ) => {
        dispatch({ type: ADD_ONLINECOMMENTS_BEGIN });
        return add( comment, `/onlinecomments` )
        .then( response => { 
            dispatch({        
                type: ADD_ONLINECOMMENTS_SUCCESS, payload: response });        
    }).catch( error => {
        dispatch({ type: ADD_ONLINECOMMENTS_ERROR , error });
    });
  };
};

export const saveOnlineComment = ( comment ) => {
    return dispatch => {
         dispatch({ type: SAVE_ONLINECOMMENTS_BEGIN });
         return update( comment, `/onlinecomments/` )
          .then( response => {
              dispatch({ type: SAVE_ONLINECOMMENTS_SUCCESS, payload: response }); 
              dispatch({ type: LOAD_LATEST_ONLINECOMMENTS_SUCCESS, payload: response }); 
           }).catch( error => {
                dispatch({ type: SAVE_ONLINECOMMENTS_ERROR , error });
        }); 
    };
};

export const loadOnlineComments = ( ) => {
    return dispatch => {
         dispatch({ type: LOAD_ONLINECOMMENTS_BEGIN });
         return get(`/onlinecomments`)
          .then( comment  => { 
             dispatch({ type: LOAD_ONLINECOMMENTS_SUCCESS, payload: comment }); 
           }).catch( error => {
             dispatch({ type: LOAD_ONLINECOMMENTS_ERROR , error });
        });       
    };
};

export const loadOnlineCommentsByQuestionId = ( questionId ) => {
    return dispatch => {
         dispatch({ type: LOAD_ONLINECOMMENTS_BEGIN });
         return getById( questionId, `/onlinecomments/question?questionId=`) // fix in router
          .then( comment  => { 
                dispatch({ type: LOAD_ONLINECOMMENTS_SUCCESS, payload: comment });
                dispatch({ type: LOAD_LATEST_ONLINECOMMENTS_SUCCESS, payload: comment });
           }).catch( error => {
                dispatch({ type: LOAD_ONLINECOMMENTS_ERROR , error });
           });       
    };
};

export const loadOnlineCommentsByAnswerId = ( answerId ) => {
    return dispatch => {
         dispatch({ type: LOAD_ONLINECOMMENTS_BEGIN });
         return getById( answerId, `/onlinecomments/answer?answerId=`) // fix in router
          .then( comment  => { 
                dispatch({ type: LOAD_ONLINECOMMENTS_SUCCESS, payload: comment });
                dispatch({ type: LOAD_LATEST_ONLINECOMMENTS_SUCCESS, payload: comment });
           }).catch( error => {
                dispatch({ type: LOAD_ONLINECOMMENTS_ERROR , error });
           });       
    };
};

export const loadOnlineCommentsByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_ONLINECOMMENTS_BEGIN });
         return getById( userId, `/onlinecomments/comments/user?userId=`)
          .then( comment  => { 
                dispatch({ type: LOAD_ONLINECOMMENTS_SUCCESS, payload: comment });
                dispatch({ type: LOAD_LATEST_ONLINECOMMENTS_SUCCESS, payload: comment });
           }).catch( error => {
                dispatch({ type: LOAD_ONLINECOMMENTS_ERROR , error });
        });       
    };
};

export const deleteOnlineComment = comment => {
    return dispatch => {
         return remove( comment, `/onlinecomments/` )
         .then( () => {
             dispatch({ type: DELETE_ONLINECOMMENTS_SUCCESS, payload: comment });
         }).catch( error => {
            dispatch({ type: DELETE_ONLINECOMMENTS_ERROR , error });
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
        };
        timerHandle = setTimeout(() => {
            console.log("...saving markdown text"); 
           dispatch(saveAction( getState()[teachObjectType][teachObjectType][ teachObject?._id ] ));
        }, 2000);  
    };
};
