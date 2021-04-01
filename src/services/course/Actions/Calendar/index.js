import {
add,
get,
update,
updateUser,
remove, 
getById,
sendEmail, 
getCalendarEventsByUserId } from 'Services/course/Api';

import {
sendPushNotificationMessage
} from 'Services/course/Actions/Notifications';

export const ADD_NEW_CALENDAR_EVENT_BEGIN = "ADD NEW CALENDAR EVENT BEGIN";
export const ADD_NEW_CALENDAR_EVENT_SUCCESS = "ADD NEW CALENDAR EVENT SUCCESS";
export const ADD_NEW_CALENDAR_EVENT_ERROR = "ADD NEW CALENDAR EVENT ERROR";
export const SAVE_CALENDAR_EVENT_BEGIN = "SAVE CALENDAR EVENT BEGIN";
export const SAVE_CALENDAR_EVENT_SUCCESS = "SAVE CALENDAR EVENT SUCCESS";
export const SAVE_CALENDAR_EVENT_ERROR = "SAVE CALENDAR EVENT ERROR";
export const LOAD_CALENDAR_EVENTS = "LOAD CALENDAR EVENTS";
export const LOAD_CALENDAR_EVENTS_BEGIN = "LOAD CALENDAR EVENTS BEGIN";
export const LOAD_CALENDAR_EVENTS_SUCCESS = "LOAD CALENDAR EVENTS SUCCESS";
export const LOAD_CALENDAR_EVENTS_ERROR = "LOAD CALENDAR EVENTS ERROR";
export const TOGGLE_CALENDAR_NEW_EVENT_INPUT = "TOGGLE CALENDAR NEW EVENT INPUT";
export const LAST_LOGGEDIN_USER = "LAST LOGGEDIN USER";
export const SAVE_USER_SUCCESS = "SAVE USER SUCCESS";
export const DELETE_CALENDAR_EVENT_BEGIN = "DELETE CALENDAR EVENT BEGIN";
export const DELETE_CALENDAR_EVENT_SUCCESS = "DELETE CALENDAR EVENT SUCCESS";
export const DELETE_CALENDAR_EVENT_ERROR = "DELETE CALENDAR EVENT ERROR";
export const TOGGLE_EVENT_EDIT_FORM = "TOGGLE_EVENT_EDIT_FORM";

// NNN notify the current tutor as well as all administrators of new calendar events and changes made by tutors
/// We know whose available at what date & time to take students or schedule for ad hoc online sessions
export const addCalendarEvent = ( calendarEventInfo, currentEvent, currentUser, pushNotificationUser, emailAddresses ) => {
    let userData = { ...currentUser };
    return dispatch => {
            dispatch({ type: ADD_NEW_CALENDAR_EVENT_BEGIN });
       return add({ ...calendarEventInfo }, '/calendar')
       .then(calendarEventData => {
            userData.calendarEvents.push( calendarEventData?._id );
            dispatch({ type: ADD_NEW_CALENDAR_EVENT_SUCCESS, payload: calendarEventData});
            updateUser( userData )
            .then(user => { 
                dispatch({ type: LAST_LOGGEDIN_USER, payload: user });
                dispatch({ type: SAVE_USER_SUCCESS, payload: user }) 
            });
                dispatch(sendPushNotificationMessage( 
                    pushNotificationUser, { 
                    title:`${ currentUser?.firstname } Added New Calendar Event!`, 
                    body:`New Calendar Event: ${ currentEvent?.title } ${ currentEvent?.start }` 
                })); 
                emailAddresses.forEach(email => {
                    sendEmail(
                        "teachpadsconnect247@gmail.com", 
                        email, 
                        "New Calendar Event!",
                        `View Event: http://localhost:3000/boomingllc/accountverification/${calendarEventData?._id}`,  /// change
                        currentUser?._id
                    )
                });
                return calendarEventData; 
        })
        .catch( error => {
            dispatch({ type: ADD_NEW_CALENDAR_EVENT_ERROR, payload: error });
            console.log( error );
            return error;
        })
    }
};

export const saveCalendarEvent = ( calendarEvent, currentEvent, currentUser, pushNotificationUser, emailAddresses )  => {
    return dispatch => {
         dispatch({ type: SAVE_CALENDAR_EVENT_BEGIN })
         return update( calendarEvent, `/calendar/` )
             .then( event => {  
                 dispatch({ type: SAVE_CALENDAR_EVENT_SUCCESS, payload: event });
                 dispatch(sendPushNotificationMessage( 
                    pushNotificationUser, { 
                    title:`${ currentUser?.firstname } Modified Calendar Event!`, 
                    body:`Modified Calendar Event: ${ currentEvent?.title } Event StartTime: ${ (currentEvent?.rrule) ? currentEvent?.rrule?.dtstart : currentEvent?.start }` 
                })); 
                emailAddresses.forEach(email => {
                    sendEmail(
                        "teachpadsconnect247@gmail.com",
                        email, 
                        "Modifiied Calendar Event(s)!",
                        `View Event: http://localhost:3000/boomingllc/accountverification/${event?._id}`,  /// change
                        currentUser?._id
                    )
                });
                 return event; 
             })
             .catch( error => {
                 dispatch({ type: SAVE_CALENDAR_EVENT_ERROR , error });
                 return error;
         });  
    };
 };

 export const deleteCalendar = ( calendar, currentUser, pushNotificationUser ) => {
    alert('in deleteCalendarEvent')
    return dispatch => {
        dispatch({ type: DELETE_CALENDAR_EVENT_BEGIN })
         return remove( calendar, `/calendar/` )
         .then( resp => {
             dispatch({ type: DELETE_CALENDAR_EVENT_SUCCESS, payload: resp });
             dispatch(sendPushNotificationMessage( 
                pushNotificationUser, { 
                title:`${ currentUser?.firstname } Deleted A Calendar!`, 
                body:`Deleted Calendar: ${ calendar?._id }` 
            })); 
             return calendar;
         }).catch( error => {
            dispatch({ type: DELETE_CALENDAR_EVENT_ERROR , error });
            return error;
        });
    }
}

//  export const deleteCalendarEvent = ( calendarEvent, currentUser, pushNotificationUser ) => {
//     alert('in deleteCalendarEvent')
//     return dispatch => {
//         dispatch({ type: DELETE_CALENDAR_EVENT_BEGIN })
//          return remove( calendarEvent, `/calendar/` )
//          .then( event => {
//              dispatch({ type: DELETE_CALENDAR_EVENT_SUCCESS, payload: event });
//              dispatch(sendPushNotificationMessage( 
//                 pushNotificationUser, { 
//                 title:`${ currentUser?.firstname } Modified Calendar Event!`, 
//                 body:`Modified Calendar Event: ${ event?.title } ${ event?.start }` 
//             })); 
//              return calendarEvent;
//          }).catch( error => {
//             dispatch({ type: DELETE_CALENDAR_EVENT_ERROR , error });
//             return error;
//         });
//     }
// }

export const loadAllCalendarEvents = () => {
    return dispatch => {
        dispatch({ type: LOAD_CALENDAR_EVENTS_BEGIN });
        return get(`/calendar`)
         .then( calendarEvent => {
             dispatch({ type: LOAD_CALENDAR_EVENTS_SUCCESS, payload: calendarEvent });
             return calendarEvent;
         }).catch( error => {
            dispatch({ type: LOAD_CALENDAR_EVENTS_ERROR , error });
            return error;
        });
    }
}

export const loadCalendarEventsByCalendarId = ( calendarId ) => {
    return dispatch => {
        dispatch({ type: LOAD_CALENDAR_EVENTS_BEGIN });
        return getById(calendarId, `/calendar?calendarId=`)
         .then( calendarEvent => {
             dispatch({ type: LOAD_CALENDAR_EVENTS_SUCCESS, payload: calendarEvent });
             return calendarEvent;
         })
         .catch( error => {
            dispatch({ type: LOAD_CALENDAR_EVENTS_ERROR , error });
            return error;
        });
    }
}

export const loadCalendarEventsByUserId = ( remoteUser ) => {
    return dispatch => {
        return getCalendarEventsByUserId( remoteUser?._id )
         .then( calendarEvent => {
            dispatch({ type: LOAD_CALENDAR_EVENTS_SUCCESS, payload: calendarEvent });
            return calendarEvent;
        })
        .catch( error => {
            dispatch({ type: LOAD_CALENDAR_EVENTS_ERROR , error });
            return error;
        });
    }
}

export const toggleCalendarNewEventForm = () => ({
    type: TOGGLE_CALENDAR_NEW_EVENT_INPUT
 });
