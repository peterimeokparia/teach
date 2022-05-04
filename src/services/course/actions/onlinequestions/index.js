import {
add,
update,
get,
remove,
getById } from 'services/course/api';

export const SET_ONLINEQUESTION_MARKDOWN = "SET ONLINEQUESTION MARKDOWN";
export const ADD_ONLINEQUESTION_BEGIN = "ADD ONLINEQUESTION BEGIN";
export const ADD_ONLINEQUESTION_SUCCESS = "ADD ONLINEQUESTION SUCCESS";
export const ADD_ONLINEQUESTION_ERROR = "ADD ONLINEQUESTION ERROR";
export const LOAD_ONLINEQUESTIONS_BEGIN = "LOAD QUESTIONS BEGIN";
export const LOAD_ONLINEQUESTIONS_SUCCESS = "LOAD QUESTIONS SUCCESS";
export const LOAD_LATEST_ONLINEQUESTION_SUCCESS = "LOAD LATEST ONLINEQUESTION SUCCESS";
export const LOAD_ONLINEQUESTIONS_ERROR = "LOAD QUESTIONS ERROR";
export const DELETE_ONLINEQUESTION_BEGIN = "DELETE ONLINEQUESTION BEGIN";
export const DELETE_ONLINEQUESTION_SUCCESS = "DELETE ONLINEQUESTION SUCCESS";
export const DELETE_ONLINEQUESTION_ERROR = "DELETE ONLINEQUESTION ERROR"; // fix in reducer
export const RESET_ONLINEQUESTION_ERROR = "RESET ONLINEQUESTION ERROR";
export const SAVE_ONLINEQUESTION_BEGIN = "SAVE ONLINEQUESTION BEGIN";
export const SAVE_ONLINEQUESTION_ERROR = "SAVE ONLINEQUESTION ERROR";
export const SAVE_ONLINEQUESTION_SUCCESS = "SAVE ONLINEQUESTION SUCCESS";
export const SET_EXPLANATION_ANSWER_MARKDOWN = "SET EXPLANATION ANSWER MARKDOWN";
export const SET_ONLINEQUESTION_FILE_UPLOAD_META = "SET ONLINEQUESTION FILE UPLOAD META";
export const SET_ONLINEQUESTION_MARKDOWN_DATA = "SET ONLINEQUESTION MARKDOWN DATA";
export const QUESTION_META = "QUESTION META";
export const ONLINE_QUESTION_COURSEID = "ONLINE_QUESTION_COURSEID";
export const TOGGLE_CONTENT_CHANGED = "TOGGLE CONTENT CHANGED";
export const DELETE_QUESTION_SUCCESS = "DELETE QUESTION SUCCESS";

export const addNewOnlineQuestion = ( question ) => {
    return dispatch => {
        dispatch({ type: ADD_ONLINEQUESTION_BEGIN });
        return add( question, `/onlinequestions` )
        .then( response => { 
            dispatch({        
                type: ADD_ONLINEQUESTION_SUCCESS, payload: response });        
    }).catch( error => {
        dispatch({ type: ADD_ONLINEQUESTION_ERROR , error });
    });
  };
};

export const saveOnlineQuestions = ( question ) => {
    return dispatch => {
         dispatch({ type: SAVE_ONLINEQUESTION_BEGIN });
         return update( question, `/onlinequestions/` )
          .then( response => { 
              dispatch({ type: SAVE_ONLINEQUESTION_SUCCESS, payload: response }); 
              dispatch({ type: LOAD_LATEST_ONLINEQUESTION_SUCCESS, payload: response }); 
           }).catch( error => {
                dispatch({ type: SAVE_ONLINEQUESTION_ERROR , error });
        }); 
    };
};

export const loadOnlineQuestions = ( ) => {
    return dispatch => {
         dispatch({ type: LOAD_ONLINEQUESTIONS_BEGIN });
         return get(`/onlinequestions`)
          .then( questions  => { 
             dispatch({ type: LOAD_ONLINEQUESTIONS_SUCCESS, payload: questions });
           }).catch( error => {
             dispatch({ type: LOAD_ONLINEQUESTIONS_ERROR , error });
        });       
    };
};

export const loadOnlineQuestionsByQuestionId = ( questionId ) => {
    return dispatch => {
         dispatch({ type: LOAD_ONLINEQUESTIONS_BEGIN });
         return getById( questionId, `/onlinequestions/question/question?questionId=`)
          .then( questions  => { 
                dispatch({ type: LOAD_ONLINEQUESTIONS_SUCCESS, payload: questions });
                dispatch({ type: LOAD_LATEST_ONLINEQUESTION_SUCCESS, payload: questions });
           }).catch( error => {
                dispatch({ type: LOAD_ONLINEQUESTIONS_ERROR , error });
           });       
    };
};

export const loadOnlineQuestionsByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_ONLINEQUESTIONS_BEGIN });
         return getById( userId, `/onlinequestions/question/user?userId=`)
          .then( questions  => { 
                dispatch({ type: LOAD_ONLINEQUESTIONS_SUCCESS, payload: questions });
                dispatch({ type: LOAD_LATEST_ONLINEQUESTION_SUCCESS, payload: questions });
           }).catch( error => {
                dispatch({ type: LOAD_ONLINEQUESTIONS_ERROR , error });
        });       
    };
};

export const deleteOnlineQuestion = question => {
    return dispatch => {
        dispatch({ type: DELETE_ONLINEQUESTION_BEGIN });
         return remove( question, `/onlinequestions/` )
         .then( res => {
            dispatch({ type: DELETE_QUESTION_SUCCESS, payload: question });
         }).catch( error => {
            dispatch({ type: DELETE_ONLINEQUESTION_ERROR , error });
        });
    };
};

export const fileUploadMeta = fileUploadMeta => ({
    type: SET_ONLINEQUESTION_FILE_UPLOAD_META,
    payload: fileUploadMeta
});

export const questionMeta = questionMeta => ({
    type: QUESTION_META,
    payload: questionMeta
});

export const onlineQuestionCourseId = courseId => ({
     type: ONLINE_QUESTION_COURSEID,
     payload: courseId
});

export const saveQuestionMiddleWare = ( onlineQuestion ) => ({
    type: SAVE_ONLINEQUESTION_SUCCESS,
    payload: onlineQuestion
});

export const toggleContentChanged = () => ({
    type: TOGGLE_CONTENT_CHANGED
});

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
            const latestTeachObjectData = getState()[teachObjectType][teachObjectType][ teachObject?._id ]; 
            
            dispatch(saveAction( latestTeachObjectData ));
        }, 2000);  
    };
};
