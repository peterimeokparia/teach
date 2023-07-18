import produce from 'immer';

import {
ADD_SESSION_BEGIN,
ADD_SESSION_SUCCESS,
ADD_SESSION_ERROR,
LOAD_SESSIONS_BEGIN,
LOAD_SESSIONS_SUCCESS,
LOAD_SESSIONS_ERROR,
SAVE_SESSION_BEGIN,
SAVE_SESSION_SUCCESS,
SAVE_SESSION_ERROR,
DELETE_SESSION_SUCCESS,
DELETE_SESSION_ERROR,
DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS,
INCREMENT_SESSION_COUNT,
ERROR_DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS, 
ERROR_INCREMENTING_SESSION_COUNT,
AUTO_RENEW_PACKAGE_SUCCESS,
AUTO_RENEW_PACKAGE_ERROR,
SET_IN_SESSION,
SET_HIDE_MEETING_STAGE,  
SET_FULL_MEETING_STAGE, 
SET_VIDEO_MODAL_MODE_ON, 
SET_ICON_ON_COLOR, 
TOGGLE_MEETING_PANEL } from '../../actions/sessions';

const initialState = {
    sessions:{},
    sessionsLoading: false,
    onSessionsError: null, 
    saveInProgress: false,
    onSaveError: false,
    autoRenewedPackageSuccess: false,
    autoRenewPackageError: null,
    inSession: false,
    hideMeetingStage: false, 
    fullMeetingStage: false,
    videoModalModeOn: false, 
    iconOnColor: false,
    meetingPanel: false
};

const reducer =  produce( (draft, action) => {
    switch(action.type){

        case ADD_SESSION_BEGIN:
        case SAVE_SESSION_BEGIN:     
            draft.saveInProgress = true;
            draft.onSaveError = null;
        return;
        case ADD_SESSION_SUCCESS:
        case SAVE_SESSION_SUCCESS:     
            draft.saveInProgress = false;
            draft.sessions[action.payload._id] = action.payload;
        return;
        case ADD_SESSION_ERROR:
        case SAVE_SESSION_ERROR:
             draft.onSaveError = action.error;
             draft.saveInProgress = false;
        return;
        case LOAD_SESSIONS_BEGIN:
            draft.sessionsLoading = true;
        return;
        case LOAD_SESSIONS_SUCCESS:
            action.payload?.forEach(session => {
                draft.sessions[session?._id] = session;
            });
        return;    
        case LOAD_SESSIONS_ERROR:
             draft.onSessionsError = action.error;
             draft.sessionsLoading = false;
        return;
        case DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS:
        case INCREMENT_SESSION_COUNT:        
             draft.sessions[action.payload._id] = action.payload;
        return;    
        case ERROR_DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS:
             draft.sessionDecrementError = action.error;
        return;
        case ERROR_INCREMENTING_SESSION_COUNT:
             draft.sessionIncrementError = action.error;                            
        return;
        case DELETE_SESSION_SUCCESS:
             delete draft.sessions[action.payload._id];
        return;
        case DELETE_SESSION_ERROR:
             draft.onSessionsError = action.error;
        return;
        case AUTO_RENEW_PACKAGE_SUCCESS:
             draft.autoRenewedPackageSuccess = (action.payload?.User?.paymentStatus === "approved");
        return;    
        case AUTO_RENEW_PACKAGE_ERROR:   
            draft.onSessionsError = action.payload.error;  
        return; 
        case SET_IN_SESSION:   
            draft.inSession = action.payload;  
        return;
        case SET_HIDE_MEETING_STAGE:   
            draft.hideMeetingStage = action.payload;  
        return;
        case SET_FULL_MEETING_STAGE:   
            draft.fullMeetingStage = action.payload;  
        return;
        case SET_VIDEO_MODAL_MODE_ON:   
            draft.videoModalModeOn = action.payload;  
        return;
        case SET_ICON_ON_COLOR:   
            draft.iconOnColor = action.payload;  
        return;
        case TOGGLE_MEETING_PANEL:   
            draft.meetingPanel = !draft.meetingPanel;  
        return;
        default:
        return;

    } 
}, initialState);

export default reducer;