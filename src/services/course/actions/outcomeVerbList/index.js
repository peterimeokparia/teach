import {
add,
remove,
update,
getById } from 'services/course/api';

export const ADD_NEW_OUTCOME_VERB_LIST_BEGIN = "ADD NEW OUTCOME VERB LIST BEGIN";
export const ADD_NEW_OUTCOME_VERB_LIST_SUCCESS = "ADD NEW OUTCOME VERB LIST SUCCESS";
export const ADD_NEW_OUTCOME_VERB_LIST_ERROR = "ADD NEW OUTCOME VERB LIST ERROR";
export const LOAD_OUTCOME_VERB_LIST_BEGIN = "LOAD OUTCOME VERB LIST BEGIN";
export const LOAD_OUTCOME_VERB_LIST_SUCCESS = "LOAD OUTCOME VERB LIST SUCCESS";
export const LOAD_OUTCOME_VERB_LIST_ERROR = "LOAD OUTCOME VERB LIST ERROR";
export const SAVE_OUTCOME_VERB_LIST_BEGIN = "SAVE OUTCOME VERB LIST BEGIN";
export const SAVE_OUTCOME_VERB_LIST_SUCCESS = "SAVE OUTCOME VERB LIST SUCCESS";
export const SAVE_OUTCOME_VERB_LIST_ERROR = "SAVE OUTCOME VERB LIST ERROR";
export const DELETE_OUTCOME_VERB_LIST_SUCCESS = "DELETE OUTCOME VERB LIST SUCCESS";
export const DELETE_OUTCOME_VERB_LIST_BEGIN = "DELETE OUTCOME VERB LIST BEGIN";
export const DELETE_OUTCOME_VERB_LIST_ERROR = "DELETE OUTCOME VERB LIST ERROR";
export const SET_OUTCOME_VERB_LIST_MARKDOWN = "SET OUTCOME VERB LIST MARKDOWN";

export const addNewOutcomeVerbList = ( outcomeVerbList ) => {
    return dispatch => {
        dispatch({ type: ADD_NEW_OUTCOME_VERB_LIST_BEGIN });
        return add( outcomeVerbList, '/outcomeverblist')  
        .then( outcomeverblist => { 
            dispatch({ type: ADD_NEW_OUTCOME_VERB_LIST_SUCCESS, payload: outcomeverblist }); 
            return outcomeverblist;
        }).catch( error => {
            dispatch({ type: ADD_NEW_OUTCOME_VERB_LIST_ERROR , payload: { error, title: outcomeVerbList?.title } });
        });
    };
};

export const saveOutcomeVerbList = ( outcomeVerbList ) => {
   return dispatch => {
        dispatch({ type: SAVE_LESSON_DETAIL_LESSONPLAN_BEGIN });
        return update( outcomeVerbList, `/outcomeverblist/` )
            .then( outcomeverblist => {  
                dispatch({        
                type: SAVE_OUTCOME_VERB_LIST_SUCCESS, payload: outcomeverblist }); 
                return outcomeverblist;
            }).catch( error => {
                dispatch({ type: SAVE_OUTCOME_VERB_LIST_ERROR , error });
        });  
   };
};

export const loadOutcomeVerbListById = ( outcomeVerbListId ) => {
    return dispatch => {
        dispatch({ type: LOAD_OUTCOME_VERB_LIST_BEGIN });
        return getById( outcomeVerbListId, `/outcomeverblist?outcomeVerbListId=`)
            .then( outcomeverblist => {
                dispatch({ type: LOAD_OUTCOME_VERB_LIST_SUCCESS, payload: outcomeverblist });
                return outcomeverblist;
            })
            .catch( error => {
                dispatch({ type: LOAD_OUTCOME_VERB_LIST_ERROR , error });
        });
    };
};

export const deleteOutcomeVerbList = outcomeVerbList => {
    return dispatch => {
        dispatch({ type: DELETE_OUTCOME_VERB_LIST_BEGIN });
         return remove( outcomeVerbList, `/outcomeverblist/` )
         .then( () => {
             dispatch({ type: DELETE_OUTCOME_VERB_LIST_SUCCESS, payload: outcomeVerbList });
         }).catch( error => {
            dispatch({ type: DELETE_OUTCOME_VERB_LIST_ERROR , error });
        });
    };
};

