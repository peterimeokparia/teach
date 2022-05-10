import {
add,
update,
updateWithId,
remove,
get,
getById } from 'services/course/api';

export const ADD_TIME_BEGIN = "ADD TIME BEGIN";
export const ADD_TIME_SUCCESS = "ADD TIME SUCCESS";
export const ADD_TIME_ERROR = "ADD TIME ERROR";
export const LOAD_TIME_BEGIN = "LOAD TIME BEGIN";
export const LOAD_TIME_SUCCESS = "LOAD TIME SUCCESS";
export const LOAD_LATEST_TIME_SUCCESS = "LOAD LATEST TIME SUCCESS";
export const LOAD_TIME_ERROR = "LOAD TIME ERROR";
export const DELETE_TIME_BEGIN = "DELETE TIME BEGIN";
export const DELETE_TIME_ERROR = "DELETE TIME ERROR";
export const DELETE_TIME_SUCCESS = "DELETE TIME SUCCESS";
export const RESET_TIME_ERROR = "RESET TIME ERROR";
export const SAVE_TIME_BEGIN = "SAVE TIME BEGIN";
export const SAVE_TIME_ERROR = "SAVE TIME ERROR";
export const SAVE_TIME_SUCCESS = "SAVE TIME SUCCESS";
 
export const addTime = timeinfo => {
    return dispatch => {
        dispatch({ type: ADD_TIME_BEGIN });
        return add( timeinfo, '/testtimers')
        .then(timeinfo => {
            dispatch({ type: ADD_TIME_SUCCESS, payload: timeinfo });
        }).catch( error => {
            dispatch({ type: ADD_TIME_ERROR , error });
        });
    };
};

export const saveTime = ( timeinfo ) => {
    return dispatch => {
        dispatch({ type: SAVE_TIME_BEGIN });
        return update( timeinfo, `/testtimers/` )
            .then( timeinfo => {  
                dispatch({ type: SAVE_TIME_SUCCESS, payload: timeinfo }); 
            }).catch( error => {
            dispatch({ type: SAVE_TIME_ERROR , error });
        });  
    };
};

export const saveTimeByFormUuId = ( timeinfo ) => {
    return dispatch => {
        dispatch({ type: SAVE_TIME_BEGIN });
        return updateWithId( timeinfo, `/testtimers/` )
            .then( formfields => {  
                dispatch({ type: SAVE_TIME_SUCCESS, payload: timeinfo }); 
            }).catch( error => {
            dispatch({ type: SAVE_TIME_ERROR , error });
        });  
    };
};

export const loadTestTimers = ( ) => {
    return dispatch => {
        dispatch({ type: LOAD_TIME_BEGIN });
        return get(`/testtimers`)
            .then( timeinfo  => { 
                dispatch({ type: LOAD_TIME_SUCCESS, payload: timeinfo }); 
                dispatch({ type: LOAD_LATEST_TIME_SUCCESS, payload: timeinfo });
            }).catch( error => {
                dispatch({ type: LOAD_TIME_ERROR , error });
        });       
    };
    };

export const loadTestTimersByFormUuId = ( formUuId ) => {
    return dispatch => {
            dispatch({ type: LOAD_TIME_BEGIN });
            return getById( formUuId, `/testtimers/formUuId?formUuId=`)
            .then( timers  => { 
                dispatch({ type: LOAD_TIME_SUCCESS, payload: timers });
                dispatch({ type: LOAD_LATEST_TIME_SUCCESS, payload: timers });
            }).catch( error => {
                dispatch({ type: LOAD_TIME_ERROR , error });
            });       
    };
};

export const deleteTestTimer = formUuId => {
return dispatch => {
    dispatch({ type: DELETE_TIME_BEGIN });
        return remove( formUuId, `/testtimers/` )
        .then( (response ) => {
            dispatch({ type: DELETE_TIME_SUCCESS, payload: formUuId });
        }).catch( error => {
        dispatch({ type: DELETE_TIME_ERROR , error });
    });
};
};