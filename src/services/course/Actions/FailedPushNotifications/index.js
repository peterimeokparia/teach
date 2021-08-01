import {
add,
update,
get,
remove,
getById } from 'services/course/api';

export const ADD_FAILEDPUSHNOTIFICATION_BEGIN = "ADD FAILEDPUSHNOTIFICATION BEGIN";
export const ADD_FAILEDPUSHNOTIFICATION_SUCCESS = "ADD FAILEDPUSHNOTIFICATION SUCCESS";          
export const ADD_FAILEDPUSHNOTIFICATION_ERROR = "ADD FAILEDPUSHNOTIFICATION ERROR";         
export const LOAD_FAILEDPUSHNOTIFICATIONS_BEGIN = "LOAD FAILEDPUSHNOTIFICATIONS BEGIN";
export const LOAD_FAILEDPUSHNOTIFICATIONS_SUCCESS = "LOAD FAILEDPUSHNOTIFICATIONS SUCCESS";
export const LOAD_FAILEDPUSHNOTIFICATIONS_ERROR = "LOAD FAILEDPUSHNOTIFICATIONS ERROR";
export const SAVE_FAILEDPUSHNOTIFICATION_SUCCESS = "SAVE FAILEDPUSHNOTIFICATION SUCCESS"; 
export const SAVE_FAILEDPUSHNOTIFICATION_BEGIN = "SAVE FAILEDPUSHNOTIFICATION BEGIN";
export const SAVE_FAILEDPUSHNOTIFICATION_ERROR = "SAVE FAILEDPUSHNOTIFICATION ERROR"; 
export const DELETE_FAILEDPUSHNOTIFICATION_SUCCESS = "DELETE FAILEDPUSHNOTIFICATION SUCCESS";
export const DELETE_FAILEDPUSHNOTIFICATION_ERROR = "DELETE FAILEDPUSHNOTIFICATION ERROR";

export const addFailedPushNotification = ( failednotification ) => {
    return dispatch => {
        dispatch({ type: ADD_FAILEDPUSHNOTIFICATION_BEGIN });
        return add( failednotification, `/retryfailedonlinequestionspushnotificationsqueue/push` )
        .then( response => { 
            dispatch({        
                type: ADD_FAILEDPUSHNOTIFICATION_SUCCESS, payload: response });        
    }).catch( error => {
        dispatch({ type: ADD_FAILEDPUSHNOTIFICATION_ERROR , error });
    });
  };
};

export const saveFailedPushNotification = ( failednotification ) => {
    return dispatch => {
         dispatch({ type: SAVE_FAILEDPUSHNOTIFICATION_BEGIN });
         return update( failednotification, `/retryfailedonlinequestionspushnotificationsqueue/push/` )
          .then( response => {
              dispatch({ type: SAVE_FAILEDPUSHNOTIFICATION_SUCCESS, payload: response }); 
           }).catch( error => {
                dispatch({ type: SAVE_FAILEDPUSHNOTIFICATION_ERROR , error });
        }); 
    };
};

export const loadFailedPushNotifications = ( ) => {
    return dispatch => {
         dispatch({ type: LOAD_FAILEDPUSHNOTIFICATIONS_BEGIN });
         return get(`/retryfailedonlinequestionspushnotificationsqueue/push`)
          .then( failednotifications  => { 
             dispatch({ type: LOAD_FAILEDPUSHNOTIFICATIONS_SUCCESS, payload: failednotifications }); 
           }).catch( error => {
             dispatch({ type: LOAD_FAILEDPUSHNOTIFICATIONS_ERROR , error });
        });       
    };
};

export const loadFailedPushNotificationsByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_FAILEDPUSHNOTIFICATIONS_BEGIN });
         return getById( userId, `/retryfailedonlinequestionspushnotificationsqueue/push/user?userId=`)
          .then( failednotifications  => { 
                dispatch({ type: LOAD_FAILEDPUSHNOTIFICATIONS_SUCCESS, payload: failednotifications });
           }).catch( error => {
                dispatch({ type: LOAD_FAILEDPUSHNOTIFICATIONS_ERROR , error });
        });       
    };
};

export const deleteFailedPushNotification = failednotification => {
    return dispatch => {
         return remove( failednotification, `/retryfailedonlinequestionspushnotificationsqueue/push/` )
         .then( () => {
             dispatch({ type: DELETE_FAILEDPUSHNOTIFICATION_SUCCESS, payload: failednotification });
         }).catch( error => {
            dispatch({ type: DELETE_FAILEDPUSHNOTIFICATION_ERROR , error });
        });
    };
};


