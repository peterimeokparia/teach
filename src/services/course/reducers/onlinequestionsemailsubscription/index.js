import produce from 'immer';

import { 
ADD_NEW_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_BEGIN,
ADD_NEW_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_SUCCESS,
ADD_NEW_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_ERROR,
LOAD_ONLINE_QUESTION_EMAIL_SUBSCRIPTIONS_BEGIN,
LOAD_ONLINE_QUESTION_EMAIL_SUBSCRIPTIONS_SUCCESS,    
LOAD_ONLINE_QUESTION_EMAIL_SUBSCRIPTIONS_ERROR,
SAVE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_BEGIN,
SAVE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_SUCCESS,
SAVE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_ERROR,
DELETE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_SUCCESS } from '../../actions/onlinequestionsemailsubscription';

const initialState = {
    onlineQuestionsEmailSubscriptions: {},
    saveOnlineQuestionsEmailSubscriptionInProgress: false,
    onSaveOnlineQuestionsEmailSubscriptionError: null,
    onlineQuestionsEmailSubscriptionLoading: false,
    onOnlineQuestionsEmailSubscriptionLoadingError: null,
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_NEW_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_BEGIN:
        case SAVE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_BEGIN:
            draft.saveOnlineQuestionsEmailSubscriptionInProgress = true;
            draft.onSaveOnlineQuestionsEmailSubscriptionError = null;
        return;
        case ADD_NEW_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_SUCCESS:
        case SAVE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_SUCCESS:    
            draft.saveOnlineQuestionsEmailSubscriptionInProgress = false;
            draft.onSaveOnlineQuestionsEmailSubscriptionError = null;
            draft.onlineQuestionsEmailSubscriptions[action.payload._id] = action.payload; 
            draft.saveOnlineQuestionsEmailSubscriptionInProgress = false;
        return;
        case ADD_NEW_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_ERROR:
        case SAVE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_ERROR:
            draft.saveOnlineQuestionsEmailSubscriptionInProgress = false;    
            draft.onSaveOnlineQuestionsEmailSubscriptionError = action.error;
        return;
        case LOAD_ONLINE_QUESTION_EMAIL_SUBSCRIPTIONS_BEGIN:
            draft.onlineQuestionsEmailSubscriptionsLoading = true;
            draft.onOnlineQuestionsEmailSubscriptionLoadingError = null;
        return;
        case LOAD_ONLINE_QUESTION_EMAIL_SUBSCRIPTIONS_SUCCESS:
             draft.onlineQuestionsEmailSubscriptionsLoading = false;
             draft.onOnlineQuestionsEmailSubscriptionLoadingError = null;
             action.payload?.forEach( subscription => {
                draft.onlineQuestionsEmailSubscriptions[subscription._id] = subscription;
             });  
        return;
        case LOAD_ONLINE_QUESTION_EMAIL_SUBSCRIPTIONS_ERROR:
             draft.onOnlineQuestionsEmailSubscriptionLoadingError = action.error;
             draft.onlineQuestionsEmailSubscriptionsLoading = false;
        return; 
       case DELETE_ONLINE_QUESTION_EMAIL_SUBSCRIPTION_SUCCESS:
            delete draft.onlineQuestionsEmailSubscriptions[action.payload?._id];
       return;  
      default:
          
    }
}, initialState);

export default reducer;