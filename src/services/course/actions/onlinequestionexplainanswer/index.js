import {
add,
update,
get,
remove,
getById } from 'services/course/api';

export const EXPLAINER_MARKDOWN = "EXPLAINER MARKDOWN";
export const SET_EXPLAINER_ANSWER_MARKDOWN = "SET EXPLAINER ANSWER MARKDOWN";
export const SET_EXPLAINER_ANSWER_FILE_UPLOAD_META = "SET EXPLAINER ANSWER FILE UPLOAD META";
export const ADD_EXPLAINER_ANSWER_BEGIN = "ADD EXPLAINER ANSWER BEGIN";
export const ADD_EXPLAINER_ANSWER_SUCCESS = "ADD EXPLAINER ANSWER SUCCESS";
export const ADD_EXPLAINER_ANSWER_ERROR = "ADD EXPLAINER ANSWER ERROR";
export const LOAD_EXPLAINER_ANSWERS_BEGIN = "LOAD EXPLAINER ANSWERS BEGIN";
export const LOAD_EXPLAINER_ANSWERS_SUCCESS = "LOAD EXPLAINER ANSWERS SUCCESS";
export const LOAD_EXPLAINER_ANSWERS_ERROR = "LOAD EXPLAINER ANSWERS ERROR";
export const DELETE_EXPLAINER_ANSWER_BEGIN = "DELETE EXPLAINER ANSWER BEGIN";
export const DELETE_EXPLAINER_ANSWER_SUCCESS = "DELETE EXPLAINER ANSWER SUCCESS";
export const DELETE_EXPLAINER_ANSWER_ERROR = "DELETE EXPLAINER ANSWER ERROR";
export const SAVE_EXPLAINER_ANSWER_BEGIN = "SAVE EXPLAINER ANSWER BEGIN";
export const SAVE_EXPLAINER_ANSWER_ERROR = "SAVE EXPLAINER ANSWER ERROR";
export const SAVE_EXPLAINER_ANSWER_SUCCESS = "SAVE EXPLAINER ANSWER SUCCESS";

export const addNewExplainerOnlineQuestionAnswer = question => { 
    return dispatch => {
        dispatch({ type: ADD_EXPLAINER_ANSWER_BEGIN });
        return add( question, `/onlinequestionexplainanswer` )
        .then( response => { dispatch({       
            type: ADD_EXPLAINER_ANSWER_SUCCESS, payload: response });        
    }).catch( error => {
        dispatch({ type: ADD_EXPLAINER_ANSWER_ERROR , error });
    });
  };
};

export const saveExplainerOnlineQuestionAnswer = ( question ) => {
    return dispatch => {
         dispatch({ type: SAVE_EXPLAINER_ANSWER_BEGIN });
         return update( question, `/onlinequestionexplainanswer/` )
          .then( response => {
            dispatch({ type: SAVE_EXPLAINER_ANSWER_SUCCESS, payload: response }); 
           }).catch( error => {
            dispatch({ type: SAVE_EXPLAINER_ANSWER_ERROR , error });
        }); 
    };
};

export const loadExplainerOnlineQuestionAnswers = () => {
    return dispatch => {
         dispatch({ type: LOAD_EXPLAINER_ANSWERS_BEGIN });
         return get(`/onlinequestionexplainanswer`)
          .then( questions  => { 
             dispatch({ type: LOAD_EXPLAINER_ANSWERS_SUCCESS, payload: questions });
           }).catch( error => {
             dispatch({ type: LOAD_EXPLAINER_ANSWERS_ERROR , error });
        });       
    };
};

export const loadExplainerOnlineQuestionAnswerByQuestionId = ( questionId ) => {
    return dispatch => {
         dispatch({ type: LOAD_EXPLAINER_ANSWERS_BEGIN });
         return getById( questionId, `/onlinequestionexplainanswer?questionId=`)
          .then( questions  => { 
            dispatch({ type: LOAD_EXPLAINER_ANSWERS_SUCCESS, payload: questions });
           }).catch( error => {
            dispatch({ type: LOAD_EXPLAINER_ANSWERS_ERROR , error });
        });       
    };
};

export const deleteExplainerOnlineQuestionAnswer = question => {
    return dispatch => {
        dispatch({ type: DELETE_EXPLAINER_ANSWER_BEGIN });
         return remove( question, `/onlinequestionexplainanswer/` )
         .then( res => {
            dispatch({ type: DELETE_EXPLAINER_ANSWER_SUCCESS, payload: question });
         }).catch( error => {
            dispatch({ type: DELETE_EXPLAINER_ANSWER_ERROR , error });
        });
    };
};

