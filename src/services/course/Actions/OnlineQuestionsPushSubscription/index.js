import {
add,
remove,
update,
getById } from 'services/course/api';

export const ADD_NEW_ONLINE_QUESTION_PUSH_SUBSCRIPTION_BEGIN = "ADD NEW ONLINE QUESTION PUSH SUBSCRIPTION BEGIN";
export const ADD_NEW_ONLINE_QUESTION_PUSH_SUBSCRIPTION_SUCCESS = "ADD NEW ONLINE QUESTION PUSH SUBSCRIPTION SUCCESS";
export const ADD_NEW_ONLINE_QUESTION_PUSH_SUBSCRIPTION_ERROR = "ADD NEW ONLINE QUESTION PUSH SUBSCRIPTION ERROR";
export const LOAD_ONLINE_QUESTION_PUSH_SUBSCRIPTIONS_BEGIN = "LOAD ONLINE QUESTION PUSH SUBSCRIPTIONS BEGIN";
export const LOAD_ONLINE_QUESTION_PUSH_SUBSCRIPTIONS_SUCCESS = "LOAD ONLINE QUESTION PUSH SUBSCRIPTIONS SUCCESS";
export const LOAD_ONLINE_QUESTION_PUSH_SUBSCRIPTIONS_ERROR = "LOAD ONLINE QUESTION PUSH SUBSCRIPTIONS ERROR";
export const SAVE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_BEGIN = "SAVE ONLINE QUESTION PUSH SUBSCRIPTION BEGIN";
export const SAVE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_SUCCESS = "SAVE ONLINE QUESTION PUSH SUBSCRIPTION SUCCESS";
export const SAVE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_ERROR = "SAVE ONLINE QUESTION PUSH SUBSCRIPTION ERROR";
export const DELETE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_SUCCESS = "DELETE ONLINE QUESTION PUSH SUBSCRIPTION SUCCESS";
export const DELETE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_BEGIN = "DELETE ONLINE QUESTION PUSH SUBSCRIPTION BEGIN";
export const DELETE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_ERROR = "DELETE ONLINE QUESTION PUSH SUBSCRIPTION ERROR";

export const addNewOnlineQuestionPushSubscription = ( onlineQuestionPushSubscription ) => {
    return dispatch => {
        dispatch({ type: ADD_NEW_ONLINE_QUESTION_PUSH_SUBSCRIPTION_BEGIN });
        return add(onlineQuestionPushSubscription, '/onlinequestionpushsubscribers')  
        .then( onlineQuestionPushSubscription => { 
            dispatch({ type: ADD_NEW_ONLINE_QUESTION_PUSH_SUBSCRIPTION_SUCCESS, payload: onlineQuestionPushSubscription }); 
        }).catch( error => {
            dispatch({ type: ADD_NEW_ONLINE_QUESTION_PUSH_SUBSCRIPTION_ERROR , error });
        });
    };
};

export const saveOnlineQuestionPushSubscription = ( onlineQuestionPushSubscription ) => {
   return dispatch => {
        dispatch({ type: SAVE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_BEGIN });
        return update( onlineQuestionPushSubscription, `/onlinequestionpushsubscribers/` )
            .then( onlineQuestionPushSubscription => {  
                dispatch({        
                type: SAVE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_SUCCESS, payload: onlineQuestionPushSubscription }); 
            }).catch( error => {
                dispatch({ type: SAVE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_ERROR , error });
        });  
   };
};

export const loadOnlineQuestionPushSubscriptions = ( questionId ) => {
    return dispatch => {
        dispatch({ type: LOAD_ONLINE_QUESTION_PUSH_SUBSCRIPTIONS_BEGIN });
        return getById( questionId, `/onlinequestionpushsubscribers/questions?questionId=`)
            .then( onlineQuestionPushSubscription => {
                dispatch({ type: LOAD_ONLINE_QUESTION_PUSH_SUBSCRIPTIONS_SUCCESS, payload: onlineQuestionPushSubscription });
            })
            .catch( error => {
                dispatch({ type: LOAD_ONLINE_QUESTION_PUSH_SUBSCRIPTIONS_ERROR , error });
        });
    };
}; 

export const deleteOnlineQuestionPushSubscription = onlineQuestionPushSubscription => {
    return dispatch => {
        dispatch({ type: DELETE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_BEGIN });
         return remove( onlineQuestionPushSubscription, `/onlinequestionpushsubscribers/` )
         .then( () => {
             dispatch({ type: DELETE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_SUCCESS, payload: onlineQuestionPushSubscription });
         }).catch( error => {
            dispatch({ type: DELETE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_ERROR , error });
        });
    };
};