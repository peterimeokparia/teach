import {
add,
update,
remove,
get,
getById } from 'services/course/api';

export const ADD_NEW_MEETING_BEGIN = "ADD NEW MEETING BEGIN";
export const ADD_NEW_MEETING_SUCCESS = "ADD NEW MEETING SUCCESS";
export const ADD_NEW_MEETING_ERROR = "ADD NEW MEETING ERROR";
export const LOAD_MEETINGS_BEGIN = "LOAD MEETINGS BEGIN";
export const LOAD_MEETINGS_SUCCESS = "LOAD MEETINGS SUCCESS";
export const LOAD_MEETINGS_ERROR = "LOAD MEETINGS ERROR";
export const SAVE_MEETING_BEGIN = "SAVE MEETING BEGIN";
export const SAVE_MEETING_SUCCESS = "SAVE MEETING SUCCESS";
export const SAVE_MEETING_ERROR = "SAVE MEETING ERROR";
export const DELETE_MEETING_SUCCESS = "DELETE MEETING SUCCESS";
export const DELETE_MEETING_BEGIN = "DELETE MEETING BEGIN";
export const DELETE_MEETING_ERROR = "DELETE MEETING ERROR";
export const UPDATE_INVITEE_LIST = "UPDATE INVITEE LIST";
export const LAST_LOGGEDIN_USER = "LAST_LOGGEDIN_USER";
export const LOAD_SINGLE_MEETING_SUCCESS = "LOAD SINGLE MEETING SUCCESS";
export const START_NEW_MEETING = "START NEW MEETING";
export const WAIT_FOR_MEETING_TO_START = "WAIT FOR MEETING TO START";
export const END_MEETING = "END MEETING";

export const addNewMeeting = ( meetingConfig ) => {
    return dispatch => {
        dispatch({ type: ADD_NEW_MEETING_BEGIN }); 
        return add( meetingConfig, '/meetings')
            .then( meeting => { 
                dispatch({type: ADD_NEW_MEETING_SUCCESS, payload: meeting }); 
                return meeting;
            }).catch( error => {
                dispatch({ type: ADD_NEW_MEETING_ERROR , error });
        });
    };
};

export const saveMeeting = ( meetingId, meeting ) => {
    return dispatch => {
        return update( { ...meeting, _id: meetingId }, `/meetings/` )
        .then( meeting => {  
            dispatch({        
            type: SAVE_MEETING_SUCCESS, payload: meeting }); 
        }).catch( error => {
            dispatch({ type: SAVE_MEETING_ERROR , error });
        });
    };
};

export const loadMeetings = () => {
    return dispatch => {
        dispatch({ type: LOAD_MEETINGS_BEGIN });
        get(`/meetings`)
        .then( meeting => {
            dispatch({ type: LOAD_MEETINGS_SUCCESS, payload: meeting });
        }).catch( error => {
            dispatch({ type: LOAD_MEETINGS_ERROR , error });
        });
    };
};

export const loadMeetingsByMeetingId = ( meetingId ) => { 
    return dispatch => {
        return getById( meetingId, `/meetings/meeting?meetingId=`)
        .then( meeting => {
            dispatch({ type: LOAD_SINGLE_MEETING_SUCCESS, payload: meeting });
            return meeting;
        }).catch( error => {
            dispatch({ type: LOAD_MEETINGS_ERROR , error });
            return error;
        });
    };
};

export const startMeeting = ( meeting ) => { 
    return dispatch => {
        dispatch({ type: START_NEW_MEETING, payload: meeting });
    };
};

export const waitForMeetingToStartBeforeJoining = ( meeting ) => {
    return dispatch => {
        dispatch({ type: WAIT_FOR_MEETING_TO_START, payload: meeting });
    };
};

export const endMeeting = ( meeting ) => { 
    return dispatch => {
        dispatch({ type: END_MEETING, payload: meeting });
    };
};

export const deleteMeeting = meeting => {
    return dispatch => {
        dispatch({ type: DELETE_MEETING_BEGIN });
        return remove( meeting, `/meetings/`)
        .then( () => {
            dispatch({ type: DELETE_MEETING_SUCCESS, payload: meeting });
        }).catch( error => {
            dispatch({ type: DELETE_MEETING_ERROR , error });
        });
    };
};