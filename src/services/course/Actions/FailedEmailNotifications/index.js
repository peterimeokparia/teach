import {
add,
update,
get,
remove,
getById } from 'services/course/api';
    
export const ADD_FAILEDEMAILNOTIFICATION_BEGIN = "ADD FAILEDEMAILNOTIFICATION BEGIN";
export const ADD_FAILEDEMAILNOTIFICATION_SUCCESS = "ADD FAILEDEMAILNOTIFICATION SUCCESS";          
export const ADD_FAILEDEMAILNOTIFICATION_ERROR = "ADD FAILEDEMAILNOTIFICATION ERROR";         
export const LOAD_FAILEDEMAILNOTIFICATIONS_BEGIN = "LOAD FAILEDEMAILNOTIFICATIONS BEGIN";
export const LOAD_FAILEDEMAILNOTIFICATIONS_SUCCESS = "LOAD FAILEDEMAILNOTIFICATIONS SUCCESS";
export const LOAD_FAILEDEMAILNOTIFICATIONS_ERROR = "LOAD FAILEDEMAILNOTIFICATIONS ERROR";
export const SAVE_FAILEDEMAILNOTIFICATION_SUCCESS = "SAVE FAILEDEMAILNOTIFICATION SUCCESS"; 
export const SAVE_FAILEDEMAILNOTIFICATION_BEGIN = "SAVE FAILEDEMAILNOTIFICATION BEGIN";
export const SAVE_FAILEDEMAILNOTIFICATION_ERROR = "SAVE FAILEDEMAILNOTIFICATION ERROR"; 
export const DELETE_FAILEDEMAILNOTIFICATION_SUCCESS = "DELETE FAILEDEMAILNOTIFICATION SUCCESS";
export const DELETE_FAILEDEMAILNOTIFICATION_ERROR  = "DELETE FAILEDEMAILNOTIFICATION ERROR";

export const addFailedEmailNotification = ( failednotification ) => {
    return dispatch => {
        dispatch({ type: ADD_FAILEDEMAILNOTIFICATION_BEGIN });
        return add( failednotification, `/retryfailedonlinequestionsemailnotificationsqueue/email` )
        .then( response => { 
            dispatch({        
                type: ADD_FAILEDEMAILNOTIFICATION_SUCCESS, payload: response });        
    }).catch( error => {
        dispatch({ type: ADD_FAILEDEMAILNOTIFICATION_ERROR , error });
    });
    };
};

export const saveFailedEmailNotification = ( failednotification ) => {
    return dispatch => {
            dispatch({ type: SAVE_FAILEDEMAILNOTIFICATION_BEGIN });
            return update( failednotification, `/retryfailedonlinequestionsemailnotificationsqueue/email/` )
            .then( response => {
                dispatch({ type: SAVE_FAILEDEMAILNOTIFICATION_SUCCESS, payload: response }); 
            }).catch( error => {
                dispatch({ type: SAVE_FAILEDEMAILNOTIFICATION_ERROR , error });
        }); 
    };
};

export const loadFailedEmailNotifications = ( ) => {
    return dispatch => {
            dispatch({ type: LOAD_FAILEDEMAILNOTIFICATIONS_BEGIN });
            return get(`/retryfailedonlinequestionsemailnotificationsqueue/email`)
            .then( failednotifications  => { 
                dispatch({ type: LOAD_FAILEDEMAILNOTIFICATIONS_SUCCESS, payload: failednotifications }); 
            }).catch( error => {
                dispatch({ type: LOAD_FAILEDEMAILNOTIFICATIONS_ERROR , error });
        });       
    };
};

export const loadFailedEmailNotificationsByUserId = ( userId ) => {
    return dispatch => {
            dispatch({ type: LOAD_FAILEDEMAILNOTIFICATIONS_BEGIN });
            return getById( userId, `/retryfailedonlinequestionsemailnotificationsqueue/email/user?userId=`)
            .then( failednotifications  => { 
                dispatch({ type: LOAD_FAILEDEMAILNOTIFICATIONS_SUCCESS, payload: failednotifications });
            }).catch( error => {
                dispatch({ type: LOAD_FAILEDEMAILNOTIFICATIONS_ERROR , error });
        });       
    };
};

export const deleteFailedEmailNotification = failednotification => {
    return dispatch => {
            return remove( failednotification, `/retryfailedonlinequestionsemailnotificationsqueue/email/` )
            .then( () => {
                dispatch({ type: DELETE_FAILEDEMAILNOTIFICATION_SUCCESS, payload: failednotification });
            }).catch( error => {
            dispatch({ type: DELETE_FAILEDEMAILNOTIFICATION_ERROR , error });
        });
    };
};

    
    