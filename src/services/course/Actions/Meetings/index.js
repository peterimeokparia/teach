import {
add,
update,
remove,
get,
getById,
updateUser } from 'Services/course/Api';

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

export const addNewMeeting = (
invitees, 
userId,
sessions,
timeStarted,
courseId,
lessonId,
courseTitle,
lessonTitle,
lessonPlanUrl,
currentUser, 
usersWhoJoinedTheMeeting ) => {
return dispatch => {
    dispatch({ type: ADD_NEW_MEETING_BEGIN })
        return add({ 
            invitees, 
            userId,
            sessions,
            timeStarted,
            courseId,
            lessonId,
            courseTitle,
            lessonTitle,
            lessonPlanUrl,
            currentUser,
            usersWhoJoinedTheMeeting
        }, '/meetings')
        .then( meeting => { 
            currentUser.meetings.push(meeting?._id );
            updateUser({
                ...currentUser, 
                meetingId: meeting?._id, 
                meetings: currentUser.meetings
            });
            dispatch({ type: LAST_LOGGEDIN_USER, payload: {
                ...currentUser, 
                meetingId: meeting?._id, 
                meetings: currentUser.meetings
            }});
                
            if (  meeting?.invitees ) {
                meeting.invitees.forEach(user => {
                    updateUser({
                        ...user, 
                        meetingId: meeting?._id, 
                        meetings: user.meetings
                    });   
                });
            }
            dispatch({type: ADD_NEW_MEETING_SUCCESS, payload: meeting }) 
        }).catch( error => {
            dispatch({ type: ADD_NEW_MEETING_ERROR , error })
        });
    };
};

export const saveMeeting = ( meetingId, meeting ) => {
    return dispatch => {
        return update( { ...meeting, _id: meetingId }, `/meetings/` )
        .then( meeting => {  
            dispatch({        
            type: SAVE_MEETING_SUCCESS, payload: meeting }) 
        }).catch( error => {
            dispatch({ type: SAVE_MEETING_ERROR , error })
        });
    };
};

export const loadMeetings = () => {
    return dispatch => {
        dispatch({ type: LOAD_MEETINGS_BEGIN })
        get(`/meetings`)
        .then( meeting => {
            dispatch({ type: LOAD_MEETINGS_SUCCESS, payload: meeting });
        }).catch( error => {
            dispatch({ type: LOAD_MEETINGS_ERROR , error })
        });
    }
}

export const loadMeetingsByMeetingId = ( meetingId ) => { 
    return dispatch => {
        dispatch({ type: LOAD_MEETINGS_BEGIN })
        return getById( meetingId, `/meetings/meeting?meetingId=`)
        .then( meeting => {
            dispatch({ type: LOAD_SINGLE_MEETING_SUCCESS, payload: meeting });
            return meeting;
        }).catch( error => {
            dispatch({ type: LOAD_MEETINGS_ERROR , error });
            return error;
        });
    }
}

export const deleteMeeting = meeting => {
    return dispatch => {
        dispatch({ type: DELETE_MEETING_BEGIN })
        return remove( meeting, `/meetings/`)
        .then( () => {
            dispatch({ type: DELETE_MEETING_SUCCESS, payload: meeting });
        }).catch( error => {
            dispatch({ type: DELETE_MEETING_ERROR , error })
        });
    }
}


