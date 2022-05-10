import produce from 'immer';

import { 
LOAD_PUSH_NOTIFICATION_USERS_BEGIN,
LOAD_PUSH_NOTIFICATION_USERS_SUCCESS,
LOAD_PUSH_NOTIFICATION_USERS_ERROR,
LOAD_PUSH_NOTIFICATION_USER_BEGIN,
LOAD_PUSH_NOTIFICATION_USER_SUCCESS,
LOAD_PUSH_NOTIFICATION_USER_ERROR,
ADD_PUSH_NOTIFICATION_USER_BEGIN,
ADD_PUSH_NOTIFICATION_USER_SUCCESS,
ADD_PUSH_NOTIFICATION_USER_ERROR,
UPDATE_PUSH_NOTIFICATION_USER_BEGIN,
UPDATE_PUSH_NOTIFICATION_USER_SUCCESS,
UPDATE_PUSH_NOTIFICATION_USER_ERROR,
SEND_PUSH_NOTIFICATION_MESSAGE_BEGIN,
SEND_PUSH_NOTIFICATION_MESSAGE_SUCCESS,  
SEND_PUSH_NOTIFICATION_MESSAGE_ERROR,
RETRY_PUSH_NOTIFICATION_MESSAGE_BEGIN,
RETRY_PUSH_NOTIFICATION_MESSAGE_SUCCESS,  
RETRY_PUSH_NOTIFICATION_MESSAGE_ERROR,
SELECTED_PUSH_NOTIFICATION_SUBSCRIBERS} from '../../actions/notifications';

const initialState = {
    pushNotificationSubscribers:{},
    pushNotificationSubscriber:{},
    retriedFailedPushMessages:{},
    selectedPushNotificationMessageSubscribers:{},
    isLoading: false,
    isSending: false,
    sendSuccessful: false,
    onError: null,
    savePushNotificationInProgress: false,
    onSavePushNotificationError: null
};

const reducer =  produce( (draft, action) => {
    switch(action.type){
         
       case SEND_PUSH_NOTIFICATION_MESSAGE_BEGIN:    
            draft.isSending = true;
            draft.onError = false;  
       return;
       case SEND_PUSH_NOTIFICATION_MESSAGE_SUCCESS:    
            draft.isSending = false;
            draft.onError = false;
            draft.sendSuccessful = true;  
       return;
       case SEND_PUSH_NOTIFICATION_MESSAGE_ERROR:    
            draft.isSending = false;
            draft.onError = false;
            draft.sendSuccessful = action.error;  
       return; 
       case RETRY_PUSH_NOTIFICATION_MESSAGE_BEGIN:    
            draft.isSending = true;
            draft.onError = false;  
       return;
       case RETRY_PUSH_NOTIFICATION_MESSAGE_SUCCESS:    
            draft.isSending = false;
            draft.onError = false;
            draft.sendSuccessful = true;  
            draft.retriedFailedPushMessages[ action.payload._id ] = action.payload;        
       return;
       case RETRY_PUSH_NOTIFICATION_MESSAGE_ERROR:    
            draft.isSending = false;
            draft.onError = false;
            draft.sendSuccessful = action.error;  
       return;       
       case ADD_PUSH_NOTIFICATION_USER_BEGIN:    
             draft.isLoading = true;
             draft.onError = false;  
        return; 
        case ADD_PUSH_NOTIFICATION_USER_SUCCESS:    
             draft.pushNotificationSubscribers[action.payload._id] = action.payload;  
             draft.pushNotificationSubscriber = action?.payload;
        return;
        case ADD_PUSH_NOTIFICATION_USER_ERROR:    
             draft.isLoading = false;
             draft.onError = action.error;  
        return; 
        case LOAD_PUSH_NOTIFICATION_USERS_BEGIN:    
             draft.isLoading = true;
             draft.onError = null;
        return;
        case LOAD_PUSH_NOTIFICATION_USERS_SUCCESS:
             draft.isLoading = false;
             draft.onError = null;
             action.payload?.forEach(element => {
                draft.pushNotificationSubscribers[element._id] = element;  
             });    
        return;
        case LOAD_PUSH_NOTIFICATION_USERS_ERROR:
             draft.isLoading = false;    
             draft.onError = action.error;  
        return;
        case LOAD_PUSH_NOTIFICATION_USER_BEGIN:    
             draft.isLoading = true;
             draft.onError = null;
        return;
        case LOAD_PUSH_NOTIFICATION_USER_SUCCESS:
             draft.isLoading = false;
             draft.onError = null;
             draft.pushNotificationSubscribers[action.payload._id] = action.payload;
             draft.pushNotificationSubscriber[action.payload._id] = action.payload;    
        return;
        case LOAD_PUSH_NOTIFICATION_USER_ERROR:
             draft.isLoading = false;    
             draft.onError = action.error;  
        return;
        case UPDATE_PUSH_NOTIFICATION_USER_BEGIN:
             draft.savePushNotificationInProgress = true;
             draft.onSavePushNotificationError = null;
        return; 
        case UPDATE_PUSH_NOTIFICATION_USER_SUCCESS:    
             draft.pushNotificationSubscribers[action.payload._id] = action.payload;
             draft.pushNotificationSubscriber =  action.payload;
             draft.savePushNotificationInProgress = false;
         return;    
         case UPDATE_PUSH_NOTIFICATION_USER_ERROR:
             draft.savePushNotificationInProgress = false;    
             draft.onSavePushNotificationError = action.error;
        return;     
        case SELECTED_PUSH_NOTIFICATION_SUBSCRIBERS:
             draft.selectedPushNotificationMessageSubscribers = action.payload;    
        return;     
        default:
        return; 
         
    }
}, initialState);

export default reducer;