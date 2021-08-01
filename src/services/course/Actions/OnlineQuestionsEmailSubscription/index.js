import {
add,
remove,
update,
getById } from 'services/course/api';

export const ADD_NEW_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_BEGIN = "ADD NEW ONLINE QUESTION EMAIL SUBSCRIPTION BEGIN";
export const ADD_NEW_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_SUCCESS = "ADD NEW ONLINE QUESTION EMAIL SUBSCRIPTION SUCCESS";
export const ADD_NEW_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_ERROR = "ADD NEW ONLINE QUESTION EMAIL SUBSCRIPTION ERROR";
export const LOAD_ONLINE_QUESTION_EMAIL_SUBSCRIPTIONS_BEGIN = "LOAD ONLINE QUESTION EMAIL SUBSCRIPTIONS BEGIN";
export const LOAD_ONLINE_QUESTION_EMAIL_SUBSCRIPTIONS_SUCCESS = "LOAD ONLINE QUESTION EMAIL SUBSCRIPTIONS SUCCESS";
export const LOAD_ONLINE_QUESTION_EMAIL_SUBSCRIPTIONS_ERROR = "LOAD ONLINE QUESTION EMAIL SUBSCRIPTIONS ERROR";
export const SAVE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_BEGIN = "SAVE ONLINE QUESTION EMAIL SUBSCRIPTION BEGIN";
export const SAVE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_SUCCESS = "SAVE ONLINE QUESTION EMAIL SUBSCRIPTION SUCCESS";
export const SAVE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_ERROR = "SAVE ONLINE QUESTION EMAIL SUBSCRIPTION ERROR";
export const DELETE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_SUCCESS = "DELETE ONLINE QUESTION EMAIL SUBSCRIPTION SUCCESS";
export const DELETE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_BEGIN = "DELETE ONLINE QUESTION EMAIL SUBSCRIPTION BEGIN";
export const DELETE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_ERROR = "DELETE ONLINE QUESTION EMAIL SUBSCRIPTION ERROR";

export const addNewOnlineQuestionEmailSubscription = ( onlineQuestionEmailSubscription ) => {
    return dispatch => {
        dispatch({ type: ADD_NEW_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_BEGIN });
        return add(onlineQuestionEmailSubscription, '/onlinequestionemailsubscribers')  
        .then( onlineQuestionEmailSubscription => { 
            dispatch({ type: ADD_NEW_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_SUCCESS, payload: onlineQuestionEmailSubscription });
        }).catch( error => {
            dispatch({ type: ADD_NEW_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_ERROR , error });
        });
    };
};

export const saveOnlineQuestionEmailSubscription = ( onlineQuestionEmailSubscription ) => {
   return dispatch => {
        dispatch({ type: SAVE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_BEGIN });
        return update( onlineQuestionEmailSubscription, `/onlinequestionemailsubscribers/` )
            .then( onlineQuestionEmailSubscription => {  
                dispatch({        
                type: SAVE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_SUCCESS, payload: onlineQuestionEmailSubscription }); 
            }).catch( error => {
                dispatch({ type: SAVE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_ERROR , error });
        });  
   };
};

export const loadOnlineQuestionEmailSubscriptions = ( questionId ) => {
    return dispatch => {
        dispatch({ type: LOAD_ONLINE_QUESTION_EMAIL_SUBSCRIPTIONS_BEGIN });
        return getById( questionId, `/onlinequestionemailsubscribers/questions?questionId=`)
            .then( onlineQuestionEmailSubscription => {
                dispatch({ type: LOAD_ONLINE_QUESTION_EMAIL_SUBSCRIPTIONS_SUCCESS, payload: onlineQuestionEmailSubscription });
            })
            .catch( error => {
                dispatch({ type: LOAD_ONLINE_QUESTION_EMAIL_SUBSCRIPTIONS_ERROR , error });
        });
    };
};

export const deleteOnlineQuestionEmailSubscription = onlineQuestionEmailSubscription => {
    return dispatch => {
        dispatch({ type: DELETE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_BEGIN });
         return remove( onlineQuestionEmailSubscription, `/onlinequestionemailsubscribers/` )
         .then( () => {
             dispatch({ type: DELETE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_SUCCESS, payload: onlineQuestionEmailSubscription });
         }).catch( error => {
            dispatch({ type: DELETE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_ERROR , error });
        });
    };
};