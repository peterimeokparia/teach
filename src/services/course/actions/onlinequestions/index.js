import {
add,
update,
get,
remove,
getById } from 'services/course/api';

export const QUESTION_MARKDOWN = "QUESTION MARKDOWN";
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
export const DELETE_ONLINE_QUESTION_ELEMENTS = "DELETE ONLINE QUESTION ELEMENTS";
export const RESET_ONLINEQUESTION_ERROR = "RESET ONLINEQUESTION ERROR";
export const SAVE_ONLINEQUESTION_BEGIN = "SAVE ONLINEQUESTION BEGIN";
export const SAVE_ONLINEQUESTION_ERROR = "SAVE ONLINEQUESTION ERROR";
export const SAVE_ONLINEQUESTION_SUCCESS = "SAVE ONLINEQUESTION SUCCESS";
export const SAVE_ONLINEQUESTION_INSIGHTS_SUCCESS = "SAVE ONLINEQUESTION INSIGHTS SUCCESS";
export const SET_ONLINEQUESTION_FILE_UPLOAD_META = "SET ONLINEQUESTION FILE UPLOAD META";
export const SET_ONLINEQUESTION_MARKDOWN_DATA = "SET ONLINEQUESTION MARKDOWN DATA";
export const QUESTION_META = "QUESTION META";
export const ONLINE_QUESTION_COURSEID = "ONLINE_QUESTION_COURSEID";
export const TOGGLE_CONTENT_CHANGED = "TOGGLE CONTENT CHANGED";
export const UPDATE_ON_DELETE = "UPDATE ON DELETE";
export const DELETE_QUESTION_SUCCESS = "DELETE QUESTION SUCCESS";
export const SET_SELECTED_QUESTION = "SET SELECTED QUESTION";
export const SET_QUESTION_PROPERTIES = "SET QUESTION PROPERTIES";
export const SET_ONLINEQUESTION_CUMMULATIVE_POINTS = 'SET_ONLINEQUESTION_CUMMULATIVE_POINTS';
export const ADD_EXPLAINER_ANSWER = 'ADD EXPLAINER ANSWER';
export const ADD_NEW_QUESTION_FROM_EXISTING_SUCCESS = 'ADD NEW QUESTION FROM EXISTING SUCCESS'; 
export const SAVE_NEW_QUESTION_FROM_EXISTING_SUCCESS = 'SAVE NEW QUESTION FROM EXISTING SUCCESS';
export const SET_COPY_EXISTING_QUESTION = 'SET COPY EXISTING QUESTION';
export const SET_COPYING_EXISTING_QUESTION_PROPERTIES = 'SET COPYING EXISTING QUESTION PROPERTIES';
export const ADD_ONLINEQUESTION_MW = "ADD_ONLINEQUESTION_MW";
export const DELETE_ONLINEQUESTION_MW = "DELETE_ONLINEQUESTION_MW";
export const GO_TO_SELECTED_ONLINEQUESTION = "GO TO SELECTED ONLINEQUESTION";

export const addNewOnlineQuestion = ( question ) => {
    return dispatch => {
        dispatch({ type: ADD_ONLINEQUESTION_BEGIN });
        return add( question, `/onlinequestions` )
        .then( response => { 
        dispatch({ type: ADD_ONLINEQUESTION_SUCCESS, payload: response });        
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

export const saveMarkDowns = ( question ) => {
    return dispatch => {
         return update( question, `/onlinequestions/content` )
          .then( response => { 
              //dispatch({ type: SAVE_ONLINEQUESTION_SUCCESS, payload: response });  
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
         return getById( questionId, `/onlinequestions?questionId=`)
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

export const addNewExplainerOnlineQuestionAnswer = question => { 
    return dispatch => {
        dispatch({ type: ADD_ONLINEQUESTION_BEGIN });
        return add( question, `/onlinequestions` )
        .then( response => { dispatch({       
            type: ADD_EXPLAINER_ANSWER, payload: response });        
    }).catch( error => {
        dispatch({ type: ADD_ONLINEQUESTION_ERROR , error });
    });
  };
};

export const addNewOnlineQuestionFromExisting = ( question, updateData ) => {
    return dispatch => {
        dispatch({ type: ADD_ONLINEQUESTION_BEGIN });
        return add( question, `/onlinequestions` )
        .then( response => {
            updateData = { ...updateData, newQuestionId: response?._id }; 
            dispatch({type: ADD_NEW_QUESTION_FROM_EXISTING_SUCCESS, payload: { response, updateData } }); 
            dispatch({type: SET_COPY_EXISTING_QUESTION,  payload: false });       
    }).catch( error => {
        dispatch({ type: ADD_ONLINEQUESTION_ERROR , error });
    });
  };
};

export const goToSelectedOnlineQuestion = formBuilderQuestionProps => ({
    type: GO_TO_SELECTED_ONLINEQUESTION,
    payload: formBuilderQuestionProps
});

export const questionInsights = questionMeta => ({
    type: SAVE_ONLINEQUESTION_INSIGHTS_SUCCESS,
    payload: questionMeta
});

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

export const updateContentOnDelete = () => ({
    type: UPDATE_ON_DELETE
});


export const setCopyingExistingQuestion = ( isSet ) => ({
    type: SET_COPY_EXISTING_QUESTION,
    payload: isSet
});

export const toggleContentChanged = () => ({
    type: TOGGLE_CONTENT_CHANGED
});

export const setSelectedOnlineQuestion = ( onlineQuestion ) => ({
    type: SET_SELECTED_QUESTION,
    payload: onlineQuestion
});

export const setQuestionProperties = ( onlineQuestionProps ) => ({
    type: SET_QUESTION_PROPERTIES,
    payload: onlineQuestionProps
});

export const setCopyingQuestionProperties = ( onlineQuestionProps ) => ({
    type: SET_COPYING_EXISTING_QUESTION_PROPERTIES,
    payload: onlineQuestionProps
});