import {
add,
update,
remove,
get,
incrementSession,
decrementSessionCount,
autoRenew } from 'services/course/api';

export const DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS = "DECREMENT SESSION COUNT FOR PACKAGE OPTIONS"; 
export const INCREMENT_SESSION_COUNT = "INCREMENT SESSION COUNT";
export const ERROR_DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS = "ERROR DECREMENT SESSION COUNT FOR PACKAGE OPTIONS"; 
export const ERROR_INCREMENTING_SESSION_COUNT = "ERROR INCREMENTING SESSION COUNT";
export const ADD_SESSION_BEGIN = "ADD SESSION BEGIN";
export const ADD_SESSION_SUCCESS = "ADD SESSION SUCCESS";
export const ADD_SESSION_ERROR = "ADD SESSION ERROR";
export const LOAD_SESSIONS_BEGIN = "LOAD SESSIONS BEGIN";
export const LOAD_SESSIONS_SUCCESS = "LOAD SESSIONS SUCCESS";
export const LOAD_SESSIONS_ERROR = "LOAD SESSIONS ERROR";
export const SAVE_SESSION_BEGIN = "SAVE SESSION BEGIN";
export const SAVE_SESSION_SUCCESS = "SAVE SESSION SUCCESS";
export const SAVE_SESSION_ERROR = "SAVE SESSION ERROR";
export const DELETE_SESSION_BEGIN = "DELETE SESSION BEGIN";
export const DELETE_SESSION_SUCCESS = "DELETE SESSION SUCCESS";
export const DELETE_SESSION_ERROR = "DELETE SESSION ERROR";
export const AUTO_RENEW_PACKAGE_SUCCESS = "AUTO RENEW PACKAGE SUCCESS";
export const AUTO_RENEW_PACKAGE_ERROR = "AUTO RENEW PACKAGE ERROR";
export const LAST_LOGGEDIN_USER = "LAST_LOGGEDIN_USER"; 

export const addNewSession = (session) => {
    return dispatch => {
        dispatch({ type: ADD_SESSION_BEGIN });
        add({ ...session }, '/sessions')
            .then(response => {
                dispatch({ type: ADD_SESSION_SUCCESS, payload: response });
            }).catch( error => {
                dispatch({ type: ADD_SESSION_ERROR , error });
        });
    };
};

export const loadSessions = () => {
    return dispatch => {
        dispatch({ type: LOAD_SESSIONS_BEGIN });
        get('/sessions')
            .then( users => {
                dispatch({ type: LOAD_SESSIONS_SUCCESS, payload: users });
            })
            .catch( error => {
                dispatch({ type: LOAD_SESSIONS_ERROR , error });
        });
    };
};

export const saveSession = ( sessionId, session ) => {
    return dispatch => {
        dispatch({ type: SAVE_SESSION_BEGIN });
          return update({...session, _id: sessionId}, `/sessions/`)
          .then( session => {  
              dispatch({        
               type: SAVE_SESSION_SUCCESS, payload: session }); 
           }).catch( error => {
               dispatch({ type: SAVE_SESSION_ERROR , error });
        });
    };
 };
 
export const deleteSession = session => {
    return dispatch => {
        return remove( session, `/sessions/` )
        .then( () => {
            dispatch({ type: DELETE_SESSION_SUCCESS, payload: session });
        })
        .catch( error => {
            dispatch({ type: DELETE_SESSION_ERROR , error });
        });
    };
};

export const setAutoRenewPackageStatus = ( currentUser ) => {
    return dispatch => {
       dispatch({ type: AUTO_RENEW_PACKAGE_SUCCESS, payload: currentUser });
    };
};

export const incrementSessionCount = ( session ) => { 
    return dispatch => {
        return incrementSession( session )
           .then(resp => {
                 dispatch({ type: INCREMENT_SESSION_COUNT ,  payload: resp });
                 return resp;
            })
            .catch(error => {
                dispatch({ type: ERROR_INCREMENTING_SESSION_COUNT, error });
                return error;
        } );             
    };
};

export const decrementSessionCountForPackageOptions = ( session ) => { 
    return dispatch => {        
            return decrementSessionCount( session )
             .then(resp => {
                dispatch({ type: DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS,  payload: resp });
             }).catch(error => {
                dispatch({ type: ERROR_DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS,  error });
        });
    };
};

export const autoRenewSessionPackages = ( currentUser, session ) => {
    return dispatch => { 
        return autoRenew( currentUser, session )
            .then( response => {
                dispatch({ type: AUTO_RENEW_PACKAGE_SUCCESS, payload: response });
            }).catch( error => {
                dispatch({ type: AUTO_RENEW_PACKAGE_ERROR, payload: { error, currentUser }         
            });
    });
    };
};


