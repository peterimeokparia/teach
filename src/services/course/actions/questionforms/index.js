import {
add,
update,
get,
remove,
getById } from 'services/course/api';

export const ADD_QUESTIONFORMS_BEGIN = "ADD QUESTIONFORMS BEGIN";
export const ADD_QUESTIONFORMS_SUCCESS = "ADD QUESTIONFORMS SUCCESS";
export const ADD_QUESTIONFORMS_ERROR = "ADD QUESTIONFORMS ERROR";
export const LOAD_QUESTIONFORMS_BEGIN = "LOAD QUESTIONS BEGIN";
export const LOAD_QUESTIONFORMS_SUCCESS = "LOAD QUESTIONS SUCCESS";
export const LOAD_LATEST_QUESTIONFORMS_SUCCESS = "LOAD LATEST QUESTIONFORMS SUCCESS";
export const LOAD_QUESTIONFORMS_ERROR = "LOAD QUESTIONS ERROR";
export const DELETE_QUESTIONFORMS_SUCCESS = "DELETE QUESTIONFORMS SUCCESS";
export const DELETE_QUESTIONFORMS_ERROR = "DELETE QUESTIONFORMS ERROR";
export const RESET_QUESTIONFORMS_ERROR = "RESET QUESTIONFORMS ERROR";
export const SAVE_QUESTIONFORMS_BEGIN = "SAVE QUESTIONFORMS BEGIN";
export const SAVE_QUESTIONFORMS_ERROR = "SAVE QUESTIONFORMS ERROR";
export const SAVE_QUESTIONFORMS_SUCCESS = "SAVE QUESTIONFORMS SUCCESS";
export const QUESTIONFORM_META = "QUESTIONFORM META";
export const QUESTIONFORM_COURSEID = "QUESTIONFORM COURSEID";
export const SET_QUESTIONFORMS_MARKDOWN = "SET QUESTIONFORMS MARKDOWN";
export const SET_MULTIPLECHOICE_EXPLANATION_ANSWER_MARKDOWN = "SET MULTIPLECHOICE EXPLANATION ANSWER MARKDOWN";
export const SET_EXPLANATION_ANSWER_MARKDOWN = "SET EXPLANATION ANSWER MARKDOWN";

export const addNewFormQuestion = ( question ) => {
    return dispatch => {
        dispatch({ type: ADD_QUESTIONFORMS_BEGIN });
        return add( question, `/questionforms` )
        .then( response => { 
            dispatch({        
                type: ADD_QUESTIONFORMS_SUCCESS, payload: response });        
    }).catch( error => {
        dispatch({ type: ADD_QUESTIONFORMS_ERROR , error });
    });
  };
};

export const saveFormQuestion = ( question ) => {
    return dispatch => {
         dispatch({ type: SAVE_QUESTIONFORMS_BEGIN });
         return update( question, `/questionforms/` )
          .then( response => {
              dispatch({ type: SAVE_QUESTIONFORMS_SUCCESS, payload: response }); 
              dispatch({ type: LOAD_LATEST_QUESTIONFORMS_SUCCESS, payload: response }); 
           }).catch( error => {
                dispatch({ type: SAVE_QUESTIONFORMS_ERROR , error });
        }); 
    };
};

export const loadFormQuestions = ( ) => {
    return dispatch => {
         dispatch({ type: LOAD_QUESTIONFORMS_BEGIN });
         return get(`/questionforms`)
          .then( questions  => { 
             dispatch({ type: LOAD_QUESTIONFORMS_SUCCESS, payload: questions });
           }).catch( error => {
             dispatch({ type: LOAD_QUESTIONFORMS_ERROR , error });
        });       
    };
};

export const loadFormQuestionsByQuestionId = ( questionId ) => {
    return dispatch => {
         dispatch({ type: LOAD_QUESTIONFORMS_BEGIN });
         return getById( questionId, `/questionforms/question?questionId=`)
          .then( questions  => { 
                dispatch({ type: LOAD_QUESTIONFORMS_SUCCESS, payload: questions });
                dispatch({ type: LOAD_LATEST_QUESTIONFORMS_SUCCESS, payload: questions });
           }).catch( error => {
                dispatch({ type: LOAD_QUESTIONFORMS_ERROR , error });
           });       
    };
};

export const loadFormQuestionsByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_QUESTIONFORMS_BEGIN });
         return getById( userId, `/questionforms/question/user?userId=`)
          .then( questions  => { 
                dispatch({ type: LOAD_QUESTIONFORMS_SUCCESS, payload: questions });
                dispatch({ type: LOAD_LATEST_QUESTIONFORMS_SUCCESS, payload: questions });
           }).catch( error => {
                dispatch({ type: LOAD_QUESTIONFORMS_ERROR , error });
        });       
    };
};

export const deleteFormQuestion = question => {
    return dispatch => {
         return remove( question, `/questionforms/` )
         .then( () => {
             dispatch({ type: DELETE_QUESTIONFORMS_SUCCESS, payload: question });
         }).catch( error => {
            dispatch({ type: DELETE_QUESTIONFORMS_ERROR , error });
        });
    };
};

export const questionFormMeta = questionMeta => ({
    type: QUESTIONFORM_META,
    payload: questionMeta
});

export const questionFormCourseId = courseId => ({
     type: QUESTIONFORM_COURSEID,
     payload: courseId
})

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
