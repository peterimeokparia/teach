import {
add,
update,
get,
remove,
getById } from 'services/course/api';

export const ADD_ONLINESURVEY_BEGIN = "ADD ONLINESURVEY BEGIN";
export const ADD_ONLINESURVEY_SUCCESS = "ADD ONLINESURVEY SUCCESS";
export const ADD_ONLINESURVEY_ERROR = "ADD ONLINESURVEY ERROR";
export const LOAD_ONLINESURVEYS_BEGIN = "LOAD ONLINESURVEYS BEGIN";
export const LOAD_ONLINESURVEYS_SUCCESS = "LOAD ONLINESURVEYS SUCCESS";
export const LOAD_LATEST_ONLINESURVEY_SUCCESS = "LOAD LATEST ONLINESURVEY SUCCESS";
export const LOAD_ONLINESURVEYS_ERROR = "LOAD ONLINESURVEYS ERROR";
export const DELETE_ONLINESURVEY_SUCCESS = "DELETE ONLINESURVEY SUCCESS";
export const DELETE_ONLINESURVEY_ERROR = "DELETE ONLINESURVEY ERROR"; // fix in reducer
export const RESET_ONLINESURVEY_ERROR = "RESET ONLINESURVEY ERROR";
export const SAVE_ONLINESURVEY_BEGIN = "SAVE ONLINESURVEY BEGIN";
export const SAVE_ONLINESURVEY_ERROR = "SAVE ONLINESURVEY ERROR";
export const SAVE_ONLINESURVEY_SUCCESS = "SAVE ONLINESURVEY SUCCESS";

export const addNewOnlineSurvey = ( survey ) => {
    return dispatch => {
        dispatch({ type: ADD_ONLINESURVEY_BEGIN });
        return add( survey, `/onlinesurveys` )
        .then( response => { 
            dispatch({        
                type: ADD_ONLINESURVEY_SUCCESS, payload: response });        
    }).catch( error => {
        dispatch({ type: ADD_ONLINESURVEY_ERROR , error });
    });
  };
};

export const saveOnlineSurvey = ( survey ) => {
    return dispatch => {
         dispatch({ type: SAVE_ONLINESURVEY_BEGIN });
         return update( survey, `/onlinesurveys/` )
          .then( response => {
              dispatch({ type: SAVE_ONLINESURVEY_SUCCESS, payload: response }); 
              dispatch({ type: LOAD_LATEST_ONLINESURVEY_SUCCESS, payload: response }); 
           }).catch( error => {
                dispatch({ type: SAVE_ONLINESURVEY_ERROR , error });
        }); 
    };
};

export const loadOnlineSurveys = ( ) => {
    return dispatch => {
         dispatch({ type: LOAD_ONLINESURVEYS_BEGIN });
         return get(`/onlinesurveys`)
          .then( survey  => { 
             dispatch({ type: LOAD_ONLINESURVEYS_SUCCESS, payload: survey });
           }).catch( error => {
             dispatch({ type: LOAD_ONLINESURVEYS_ERROR , error });
        });       
    };
};

export const loadOnlineSurveysBySurveyId = ( surveyId ) => {
    return dispatch => {
         dispatch({ type: LOAD_ONLINESURVEYS_BEGIN });
         return getById( surveyId, `/onlinesurveys/survey/survey?surveyId=`)
          .then( survey  => { 
                dispatch({ type: LOAD_ONLINESURVEYS_SUCCESS, payload: survey });
                dispatch({ type: LOAD_LATEST_ONLINESURVEY_SUCCESS, payload: survey });
           }).catch( error => {
                dispatch({ type: LOAD_ONLINESURVEYS_ERROR , error });
           });       
    };
};

export const loadOnlineSurveysByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_ONLINESURVEYS_BEGIN });
         return getById( userId, `/onlinesurveys/survey/user?userId=`)
          .then( surveys  => { 
                dispatch({ type: LOAD_ONLINESURVEYS_SUCCESS, payload: surveys });
                dispatch({ type: LOAD_LATEST_ONLINESURVEY_SUCCESS, payload: surveys });
           }).catch( error => {
                dispatch({ type: LOAD_ONLINESURVEYS_ERROR , error });
        });       
    };
};

export const deleteOnlineSurveys = survey => {
    return dispatch => {
         return remove( survey, `/onlinesurveys/` )
         .then( () => {
             dispatch({ type: DELETE_ONLINESURVEY_SUCCESS, payload: survey });
         }).catch( error => {
            dispatch({ type: DELETE_ONLINESURVEY_ERROR , error });
        });
    };
};
