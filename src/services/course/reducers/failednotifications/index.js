import produce from 'immer';

import { 
ADD_FAILEDPUSHNOTIFICATION_BEGIN,
ADD_FAILEDPUSHNOTIFICATION_SUCCESS,            
ADD_FAILEDPUSHNOTIFICATION_ERROR,         
LOAD_FAILEDPUSHNOTIFICATIONS_BEGIN, 
LOAD_FAILEDPUSHNOTIFICATIONS_SUCCESS,
LOAD_FAILEDPUSHNOTIFICATIONS_ERROR,
SAVE_FAILEDPUSHNOTIFICATION_SUCCESS, 
SAVE_FAILEDPUSHNOTIFICATION_BEGIN, 
SAVE_FAILEDPUSHNOTIFICATION_ERROR, 
DELETE_FAILEDPUSHNOTIFICATION_SUCCESS } from '../../actions/failedpushnotifications';

import { 
ADD_FAILEDEMAILNOTIFICATION_BEGIN,
ADD_FAILEDEMAILNOTIFICATION_SUCCESS,            
ADD_FAILEDEMAILNOTIFICATION_ERROR,          
LOAD_FAILEDEMAILNOTIFICATIONS_BEGIN, 
LOAD_FAILEDEMAILNOTIFICATIONS_SUCCESS,
LOAD_FAILEDEMAILNOTIFICATIONS_ERROR,
SAVE_FAILEDEMAILNOTIFICATION_SUCCESS, 
SAVE_FAILEDEMAILNOTIFICATION_BEGIN, 
SAVE_FAILEDEMAILNOTIFICATION_ERROR, 
DELETE_FAILEDEMAILNOTIFICATION_SUCCESS } from '../../actions/failedemailnotifications';

const initialState = {
    failedPushNotifications: {},
    failedEmailNotifications: {},
    saveInProgress: false,
    onSaveError: null,
    failedNotificationsLoading: false,
    failedNotificationsLoadingError: null,
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_FAILEDPUSHNOTIFICATION_BEGIN:
        case SAVE_FAILEDPUSHNOTIFICATION_BEGIN:
        case ADD_FAILEDEMAILNOTIFICATION_BEGIN:
        case SAVE_FAILEDEMAILNOTIFICATION_BEGIN:    
             draft.saveInProgress = true;
             draft.onSaveError = null;
        return;
        case ADD_FAILEDPUSHNOTIFICATION_SUCCESS:
        case SAVE_FAILEDPUSHNOTIFICATION_SUCCESS:    
             console.log(action.payload);
             draft.failedPushNotifications[action.payload._id] = action.payload; 
             draft.saveInProgress = false;
        return;
        case ADD_FAILEDEMAILNOTIFICATION_SUCCESS:
        case SAVE_FAILEDEMAILNOTIFICATION_SUCCESS:        
             console.log(action.payload);
             draft.failedEmailNotifications[action.payload._id] = action.payload; 
             draft.saveInProgress = false;
        return;
        case ADD_FAILEDPUSHNOTIFICATION_ERROR:
        case SAVE_FAILEDPUSHNOTIFICATION_ERROR:
        case ADD_FAILEDEMAILNOTIFICATION_ERROR:
        case SAVE_FAILEDEMAILNOTIFICATION_ERROR:    
             draft.saveInProgress = false;    
             draft.onSaveError = action.error;
        return;
        case LOAD_FAILEDPUSHNOTIFICATIONS_BEGIN:
        case LOAD_FAILEDEMAILNOTIFICATIONS_BEGIN:     
             draft.failedNotificationsLoading = true;
        return;
        case LOAD_FAILEDPUSHNOTIFICATIONS_SUCCESS: 
             draft.failedNotificationsLoading = false;
             action.payload?.forEach( push => {
                draft.failedPushNotifications[ push._id ] = push;
              });  
        return;
        case LOAD_FAILEDEMAILNOTIFICATIONS_SUCCESS:     
             draft.failedNotificationsLoading = false;
             action.payload?.forEach( push => {
                draft.failedEmailNotifications[ push._id ] = push;
              });  
        return;
        case LOAD_FAILEDPUSHNOTIFICATIONS_ERROR:
        case LOAD_FAILEDEMAILNOTIFICATIONS_ERROR:     
             draft.failedNotificationsLoadingError = action.error;
             draft.failedNotificationsLoading = false;
        return; 
        case DELETE_FAILEDPUSHNOTIFICATION_SUCCESS:
               delete draft.failedPushNotifications[action.payload?._id];
        return;
        case DELETE_FAILEDEMAILNOTIFICATION_SUCCESS:
               delete draft.failedEmailNotifications[action.payload?._id];
        return;  
       default:
    return;
    
    }
}, initialState);

export default reducer;