import {
add,
update,
get } from 'services/course/api';

export const ADD_NEW_LOG_BEGIN = "ADD NEW LOG BEGIN";
export const ADD_NEW_LOG_SUCCESS = "ADD NEW LOG SUCCESS";
export const ADD_NEW_LOG_ERROR = "ADD NEW LOG ERROR";
export const LOAD_LOGS_BEGIN = "LOAD LOGS BEGIN";
export const LOAD_LOGS_SUCCESS = "LOAD LOGS SUCCESS";
export const LOAD_LOGS_ERROR = "LOAD LOGS ERROR";
export const SAVE_LOG_BEGIN = "SAVE LOG BEGIN";
export const SAVE_LOG_SUCCESS = "SAVE LOG SUCCESS";
export const SAVE_LOG_ERROR = "SAVE LOG ERROR";

export const addNewLog = ( log ) => {
    return dispatch => {
        dispatch({ type: ADD_NEW_LOG_BEGIN });
        return add(log, '/logforteach')  
        .then( log => { 
            dispatch({ type: ADD_NEW_LOG_SUCCESS, payload: log }); 
        }).catch( error => {
            dispatch({ type: ADD_NEW_LOG_ERROR , error });
        });
    };
};

export const saveLog = ( log ) => {
   return dispatch => {
        dispatch({ type: SAVE_LOG_BEGIN });
        return update( log, `/logforteach/` )
            .then( log => {  
                dispatch({        
                type: SAVE_LOG_SUCCESS, payload: log }); 
            }).catch( error => {
                dispatch({ type: SAVE_LOG_ERROR , error });
        });  
   };
};

export const loadLogs = () => {
    return dispatch => {
        dispatch({ type: LOAD_LOGS_BEGIN });
        return get(`/logforteach`)
            .then( log => {
                dispatch({ type: LOAD_LOGS_SUCCESS, payload: log });
            })
            .catch( error => {
                dispatch({ type: LOAD_LOGS_ERROR , error });
        });
    };
};
