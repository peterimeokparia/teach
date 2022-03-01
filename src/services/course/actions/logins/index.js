import {
add,
update,
remove,
get,
getById,
getPagedData } from 'services/course/api';

export const ADD_NEW_LOGIN_BEGIN = "ADD NEW LOGIN BEGIN";
export const ADD_NEW_LOGIN_SUCCESS = "ADD NEW LOGIN SUCCESS";
export const ADD_NEW_LOGIN_ERROR = "ADD NEW LOGIN ERROR";
export const LOAD_LOGINS_BEGIN = "LOAD LOGINS BEGIN";
export const LOAD_LOGINS_SUCCESS = "LOAD LOGINS SUCCESS";
export const LOAD_LOGINS_ERROR = "LOAD LOGINS ERROR";
export const SAVE_LOGIN_BEGIN = "SAVE LOGIN BEGIN";
export const SAVE_LOGIN_SUCCESS = "SAVE LOGIN SUCCESS";
export const SAVE_LOGIN_ERROR = "SAVE LOGIN ERROR";
export const DELETE_LOGIN_SUCCESS = "DELETE LOGIN SUCCESS";
export const DELETE_LOGIN_BEGIN = "DELETE LOGIN BEGIN";
export const DELETE_LOGIN_ERROR = "DELETE LOGIN ERROR";
export const LOAD_SINGLE_USERS_LOGIN_SESSION_SUCCESS = "LOAD SINGLE USERS LOGIN SESSION SUCCESS";

export const addNewLoginSession = ( loginConfig ) => {
    return dispatch => {
        dispatch({ type: ADD_NEW_LOGIN_BEGIN }); 
        return add( loginConfig, '/logins')
            .then( login => { 
                dispatch({type: ADD_NEW_LOGIN_SUCCESS, payload: login }); 
                return login;
            }).catch( error => {
                dispatch({ type: ADD_NEW_LOGIN_ERROR , error });
        });
    };
};

export const saveLoginSession = ( loginId, loginConfig ) => {
    return dispatch => {
        return update( { ...loginConfig, _id: loginId }, `/logins/` )
        .then( login => {  
            dispatch({        
            type: SAVE_LOGIN_SUCCESS, payload: login }); 
        }).catch( error => {
            dispatch({ type: SAVE_LOGIN_ERROR , error });
        });
    };
};

export const loadLoginSessions = () => {
    return dispatch => {
        dispatch({ type: LOAD_LOGINS_BEGIN });
        get(`/logins`)
        .then( login => {
            dispatch({ type: LOAD_LOGINS_SUCCESS, payload: login });
        }).catch( error => {
            dispatch({ type: LOAD_LOGINS_ERROR , error });
        });
    };
};

export const loadPagedLoginSessions = ( userId, page, limit ) => { 
    return dispatch => {
        return getPagedData( `/logins/pagedRoute?id=${userId}&page=${page}&limit=${limit}`)
        .then( login => {
            dispatch({ type: LOAD_LOGINS_SUCCESS, payload: login });
            return login;
        }).catch( error => {
            dispatch({ type: LOAD_LOGINS_ERROR , error });
            return error;
        });
    };
};

export const loadLoginSessionsByUserId = ( userId ) => { 
    return dispatch => {
        return getById( userId, `/logins/userId?userId=`)
        .then( login => {
            dispatch({ type: LOAD_SINGLE_USERS_LOGIN_SESSION_SUCCESS, payload: login });
            return login;
        }).catch( error => {
            dispatch({ type: LOAD_LOGINS_ERROR , error });
            return error;
        });
    };
};

export const deleteLoginSession = login => {
    return dispatch => {
        dispatch({ type: DELETE_LOGIN_BEGIN });
        return remove( login, `/logins/`)
        .then( () => {
            dispatch({ type: DELETE_LOGIN_SUCCESS, payload: login });
        }).catch( error => {
            dispatch({ type: DELETE_LOGIN_ERROR , error });
        });
    };
};