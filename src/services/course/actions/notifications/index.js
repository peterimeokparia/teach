import {
add,
update,
remove,
get,
getById } from 'services/course/api';

export const LOAD_PUSH_NOTIFICATION_USERS_BEGIN = "LOAD PUSH NOTIFICATION USERS BEGIN";  
export const LOAD_PUSH_NOTIFICATION_USERS_SUCCESS = "LOAD PUSH NOTIFICATION USERS SUCCESS";
export const LOAD_PUSH_NOTIFICATION_USERS_ERROR = "LOAD PUSH NOTIFICATION USERS ERROR";
export const LOAD_PUSH_NOTIFICATION_USER_BEGIN = "LOAD PUSH NOTIFICATION USER BEGIN";  
export const LOAD_PUSH_NOTIFICATION_USER_SUCCESS = "LOAD PUSH NOTIFICATION USER SUCCESS";
export const LOAD_PUSH_NOTIFICATION_USER_ERROR = "LOAD PUSH NOTIFICATION USER ERROR";
export const ADD_PUSH_NOTIFICATION_USER_BEGIN = "ADD PUSH NOTIFICATION USER BEGIN";
export const ADD_PUSH_NOTIFICATION_USER_SUCCESS = "ADD PUSH NOTIFICATION USER SUCCESS";
export const ADD_PUSH_NOTIFICATION_USER_ERROR = "ADD PUSH NOTIFICATION USER ERROR";
export const UPDATE_PUSH_NOTIFICATION_USER_BEGIN = "UPDATE PUSH NOTIFICATION USER BEGIN";
export const UPDATE_PUSH_NOTIFICATION_USER_SUCCESS = "UPDATE PUSH NOTIFICATION USER SUCCESS";
export const UPDATE_PUSH_NOTIFICATION_USER_ERROR = "UPDATE PUSH NOTIFICATION USER ERROR";
export const SEND_PUSH_NOTIFICATION_MESSAGE_BEGIN = "SEND PUSH NOTIFICATION MESSAGE BEGIN";
export const SEND_PUSH_NOTIFICATION_MESSAGE_SUCCESS = "SEND PUSH NOTIFICATION MESSAGE SUCCESS";
export const SEND_PUSH_NOTIFICATION_MESSAGE_ERROR = "SEND PUSH NOTIFICATION MESSAGE ERROR";
export const RETRY_PUSH_NOTIFICATION_MESSAGE_BEGIN = "RETRY PUSH NOTIFICATION MESSAGE BEGIN";
export const RETRY_PUSH_NOTIFICATION_MESSAGE_SUCCESS = "RETRY PUSH NOTIFICATION MESSAGE SUCCESS";  
export const RETRY_PUSH_NOTIFICATION_MESSAGE_ERROR = "RETRY PUSH NOTIFICATION MESSAGE ERROR";
export const SELECTED_PUSH_NOTIFICATION_SUBSCRIBERS = "SELECTED PUSH NOTIFICATION SUBSCRIBERS";
export const DELETE_PUSH_NOTIFICATION_USER_BEGIN = "DELETE PUSH NOTIFICATION USER BEGIN";
export const DELETE_PUSH_NOTIFICATION_USER_SUCCESS = "DELETE PUSH NOTIFICATION USER SUCCESS";
export const DELETE_PUSH_NOTIFICATION_USER_ERROR = "DELETE PUSH NOTIFICATION USER ERROR";

export const loadSubscribedPushNotificationUsers = ( ) => {
    return dispatch => {
        dispatch({ type: LOAD_PUSH_NOTIFICATION_USERS_BEGIN });
        return get(`/notifications`)
          .then( pushnotification => { 
                dispatch({ type: LOAD_PUSH_NOTIFICATION_USERS_SUCCESS, payload: pushnotification }); 
           }).catch( error => { dispatch({ type: LOAD_PUSH_NOTIFICATION_USERS_ERROR , error });
        }); 
    };
};

export const loadSubscribedPushNotificationUserByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_PUSH_NOTIFICATION_USER_BEGIN });
         return getById( userId, `/notifications/subscribedUser/byId?userId=` )
          .then( pushnotification => { 
                dispatch({ type: LOAD_PUSH_NOTIFICATION_USER_SUCCESS, payload: pushnotification }); 
           }).catch( error => { dispatch({ type: LOAD_PUSH_NOTIFICATION_USER_ERROR , error });
        });
    };
};

export const subscribePushNotificationUser = ( pushNotificationUser ) => {
    return dispatch  => {
         dispatch({ type: ADD_PUSH_NOTIFICATION_USER_BEGIN });
         return add( pushNotificationUser, `/notifications/subscribe/user` )
          .then( pushnotificationuser => { 
                dispatch({ type: ADD_PUSH_NOTIFICATION_USER_SUCCESS, payload: pushnotificationuser }); 
           }).catch( error => { dispatch({ type: ADD_PUSH_NOTIFICATION_USER_ERROR , error });
        }); 
    };
};

export const savePushNotificationUser = ( pushNotificationUser ) => {
   return dispatch => {
        dispatch({ type: UPDATE_PUSH_NOTIFICATION_USER_BEGIN });
        return update( pushNotificationUser, `/notifications/subscribe/user/` )
         .then( pushnotificationuser => {  
             dispatch({        
              type: UPDATE_PUSH_NOTIFICATION_USER_SUCCESS, payload: pushnotificationuser }); 
          }).catch( error => { dispatch({ type: UPDATE_PUSH_NOTIFICATION_USER_ERROR , error }); 
        });
   };
};

export const deletePushNotificationUser = pushNotificationUser => {
   return dispatch => {
       dispatch({ type: DELETE_PUSH_NOTIFICATION_USER_BEGIN });
        return remove( pushNotificationUser, `/notifications/subscribe/user/` )
        .then( pushnotificationuser => {
            dispatch({ type: DELETE_PUSH_NOTIFICATION_USER_SUCCESS, payload: pushnotificationuser });
        }).catch( error => { dispatch( { type: DELETE_PUSH_NOTIFICATION_USER_ERROR , error } ); } );
   };
};

export const sendPushNotificationMessage = ( users, message ) => {
    return dispatch => {
        dispatch({ type: SEND_PUSH_NOTIFICATION_MESSAGE_BEGIN });
        return users?.forEach(user => {
            return update( { _id: user?._id,  user: user, message: message,  messages: user?.messages }, `/notifications/sendPushNotifications/user/` )
             .then( status => {
                dispatch({ type: SEND_PUSH_NOTIFICATION_MESSAGE_SUCCESS, payload: status });
                return status;
            }).catch( error => { dispatch({ type: SEND_PUSH_NOTIFICATION_MESSAGE_ERROR , error }); });  
        });
    };
};

export const retryPushNotificationMessage = ( users, message, failedNotification ) => {
    return dispatch => {
        dispatch({ type: RETRY_PUSH_NOTIFICATION_MESSAGE_BEGIN });
        return users?.forEach(user => {
            return update( { _id: user?._id,  user: user, message: message,  messages: user?.messages, failedNotification }, `/notifications/retryPushNotifications/user/` )
             .then( status => {
                dispatch({ type: RETRY_PUSH_NOTIFICATION_MESSAGE_SUCCESS, payload: status });
                return status;
            }).catch( error => { 
                dispatch( { type: RETRY_PUSH_NOTIFICATION_MESSAGE_ERROR , error }); }
            );  
        });
    };
};

export const getSelectedPushNotificationUsers = ( selectedUsers, pushNotificationSubscribers ) => {
    return dispatch => {
        let selectedPushNotificationSubscribers  = pushNotificationSubscribers?.filter( pushuser => { return selectedUsers.find(selecteduser => selecteduser?._id === pushuser?.userId);  });

        dispatch({ type: SELECTED_PUSH_NOTIFICATION_SUBSCRIBERS, payload: selectedPushNotificationSubscribers });
     };
};