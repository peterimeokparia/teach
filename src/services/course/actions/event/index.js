import{
add,
get,
update,
remove, 
getById,
getEventsByUserId } from 'services/course/api';

export const ADD_EVENT_BEGIN = "ADD EVENT BEGIN";
export const ADD_EVENT_SUCCESS = "ADD EVENT SUCCESS";
export const ADD_EVENT_ERROR = "ADD EVENT ERROR";
export const SAVE_EVENT_BEGIN = "SAVE EVENT BEGIN";
export const SAVE_EVENT_SUCCESS = "SAVE EVENT SUCCESS";
export const SAVE_TIMELINE_EVENTS = "SAVE TIMELINE EVENTS";
export const SAVE_EVENT_ERROR = "SAVE EVENT ERROR";
export const LOAD_EVENTS = "LOAD EVENTS";
export const LOAD_EVENTS_BEGIN = "LOAD EVENTS BEGIN";
export const LOAD_EVENTS_SUCCESS = "LOAD EVENTS SUCCESS";
export const LOAD_EVENTS_ERROR = "LOAD EVENTS ERROR";
export const TOGGLE_NEW_EVENT_INPUT = "TOGGLE NEW EVENT INPUT";
export const LAST_LOGGEDIN_USER = "LAST LOGGEDIN USER";
export const SAVE_USER_SUCCESS = "SAVE USER SUCCESS";
export const DELETE_EVENT_BEGIN = "DELETE EVENT BEGIN";
export const DELETE_EVENT_SUCCESS = "DELETE EVENT SUCCESS";
export const DELETE_EVENT_ERROR = "DELETE EVENT ERROR";
export const TOGGLE_EVENT_EDIT_FORM = "TOGGLE_EVENT_EDIT_FORM";

export const addEvent = ( eventConfig ) => {
    return dispatch => {
        dispatch({ type: ADD_EVENT_BEGIN });
        return add({ ...eventConfig?.event }, '/event')
            .then(calendarEventData => {
                dispatch({ type: ADD_EVENT_SUCCESS, payload: { calendarEventData, eventConfig } });
                return calendarEventData; 
            })
            .catch( error => {
                dispatch({ type: ADD_EVENT_ERROR, payload: error });
                console.log( error );
                return error;
            });
    };
};

export const saveEvent = ( calendarEvent, currentUser, pushNotificationUser, emailAddresses )  => {
    return dispatch => {
         dispatch({ type: SAVE_EVENT_BEGIN });
         return update( calendarEvent, `/event/` )
            .then( calendarEventData => {  
                dispatch({ type: SAVE_EVENT_SUCCESS, payload: { calendarEventData, calendarEvent, currentUser, pushNotificationUser, emailAddresses } });
                return calendarEventData; 
             })
            .catch( error => {
                 dispatch({ type: SAVE_EVENT_ERROR , error });
                 return error;
            });  
    };
 };

 export const saveTimeLineEvents = ( calendarEvent, currentUser, pushNotificationUser, emailAddresses ) => {
    return dispatch => {
        return update( calendarEvent, `/event/` )
        .then( calendarEventData => {  
            dispatch({ type: SAVE_TIMELINE_EVENTS, payload: { calendarEventData, calendarEvent, currentUser, pushNotificationUser, emailAddresses } });
            return calendarEventData; 
        })
        .catch( error => {
            dispatch({ type: SAVE_EVENT_ERROR , error });
            return error;
        });  
    }
 };

 export const deleteEvent = ( event, currentUser, pushNotificationUser ) => {
    return dispatch => {
        dispatch({ type: DELETE_EVENT_BEGIN });
         return remove( event, `/event/` )
         .then( resp => {
            dispatch({ type: DELETE_EVENT_SUCCESS, payload:{ resp, event, currentUser, pushNotificationUser }} ); 
            return event;
         }).catch( error => {
            dispatch({ type: DELETE_EVENT_ERROR , error });
            return error;
        });
    };
};

export const loadAllEvents = () => {
    return dispatch => {
        dispatch({ type: LOAD_EVENTS_BEGIN });
        return get(`/event`)
         .then( calendarEvent => {
             dispatch({ type: LOAD_EVENTS_SUCCESS, payload: calendarEvent });
             return calendarEvent;
         }).catch( error => {
            dispatch({ type: LOAD_EVENTS_ERROR , error });
            return error;
        });
    };
};

export const loadEventsByCalendarId = ( calendarId ) => {
    return dispatch => {
        dispatch({ type: LOAD_EVENTS_BEGIN });
        return getById(calendarId, `/event?eventId=`)
         .then( calendarEvent => {
             dispatch({ type: LOAD_EVENTS_SUCCESS, payload: calendarEvent });
             return calendarEvent;
         })
         .catch( error => {
            dispatch({ type: LOAD_EVENTS_ERROR , error });
            return error;
        });
    };
};

export const loadEventsByUserId = ( remoteUser ) => {
    return dispatch => {
        return getEventsByUserId( remoteUser?._id )
         .then( calendarEvent => {
            dispatch({ type: LOAD_EVENTS_SUCCESS, payload: calendarEvent });
            return calendarEvent;
        })
        .catch( error => {
            dispatch({ type: LOAD_EVENTS_ERROR , error });
            return error;
        });
    };
};


