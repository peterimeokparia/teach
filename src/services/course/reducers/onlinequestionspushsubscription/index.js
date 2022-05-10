import produce from 'immer';

import { 
ADD_NEW_ONLINE_QUESTION_PUSH_SUBSCRIPTION_BEGIN,
ADD_NEW_ONLINE_QUESTION_PUSH_SUBSCRIPTION_SUCCESS,
ADD_NEW_ONLINE_QUESTION_PUSH_SUBSCRIPTION_ERROR,
LOAD_ONLINE_QUESTION_PUSH_SUBSCRIPTIONS_BEGIN,
LOAD_ONLINE_QUESTION_PUSH_SUBSCRIPTIONS_SUCCESS,    
LOAD_ONLINE_QUESTION_PUSH_SUBSCRIPTIONS_ERROR,
SAVE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_BEGIN,
SAVE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_SUCCESS,
SAVE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_ERROR,
DELETE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_SUCCESS } from '../../actions/onlinequestionspushsubscription';

const initialState = {
    onlineQuestionsPushSubscriptions: {},
    saveOnlineQuestionsPushSubscriptionInProgress: false,
    onSaveOnlineQuestionsPushSubscriptionError: null,
    onlineQuestionsPushSubscriptionLoading: false,
    onOnlineQuestionsPushSubscriptionLoadingError: null,
};

const reducer = produce((draft, action) => {
    switch(action.type){
        
        case ADD_NEW_ONLINE_QUESTION_PUSH_SUBSCRIPTION_BEGIN:
        case SAVE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_BEGIN:
            draft.saveOnlineQuestionsPushSubscriptionInProgress = true;
            draft.onSaveOnlineQuestionsPushSubscriptionError = null;
        return;
        case ADD_NEW_ONLINE_QUESTION_PUSH_SUBSCRIPTION_SUCCESS:
        case SAVE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_SUCCESS:    
            draft.saveOnlineQuestionsPushSubscriptionInProgress = false;
            draft.onSaveOnlineQuestionsPushSubscriptionError = null;
            draft.onlineQuestionsPushSubscriptions[action.payload._id] = action.payload; 
            draft.saveOnlineQuestionsPushSubscriptionInProgress = false;
        return;
        case ADD_NEW_ONLINE_QUESTION_PUSH_SUBSCRIPTION_ERROR:
        case SAVE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_ERROR:
            draft.saveOnlineQuestionsPushSubscriptionInProgress = false;    
            draft.onSaveOnlineQuestionsPushSubscriptionError = action.error;
        return;
        case LOAD_ONLINE_QUESTION_PUSH_SUBSCRIPTIONS_BEGIN:
            draft.onlineQuestionsPushSubscriptionsLoading = true;
            draft.onOnlineQuestionsPushSubscriptionLoadingError = null;
        return;
        case LOAD_ONLINE_QUESTION_PUSH_SUBSCRIPTIONS_SUCCESS:
             draft.onlineQuestionsPushSubscriptionsLoading = false;
             draft.onOnlineQuestionsPushSubscriptionLoadingError = null;
             action.payload?.forEach( subscription => {
                draft.onlineQuestionsPushSubscriptions[subscription._id] = subscription;
             });  
        return;
        case LOAD_ONLINE_QUESTION_PUSH_SUBSCRIPTIONS_ERROR:
             draft.onOnlineQuestionsPushSubscriptionLoadingError = action.error;
             draft.onlineQuestionsPushSubscriptionsLoading = false;
        return; 
       case DELETE_ONLINE_QUESTION_PUSH_SUBSCRIPTION_SUCCESS:
            delete draft.onlineQuestionsPushSubscriptions[action.payload?._id];
       return;  
      default:

    }
}, initialState);

export default reducer;