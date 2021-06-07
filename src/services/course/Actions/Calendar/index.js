import {
add,
get,
update,
remove, 
getById,
getCalendarsByUserId 
} from 'Services/course/Api';

import {
sendPushNotificationMessage
} from 'Services/course/Actions/Notifications';
import { addEvent } from '../Event';

export const ADD_NEW_CALENDAR_BEGIN = "ADD NEW CALENDAR BEGIN";
export const ADD_NEW_CALENDAR_SUCCESS = "ADD NEW CALENDAR SUCCESS";
export const ADD_NEW_CALENDAR_ERROR = "ADD NEW CALENDAR ERROR";
export const SAVE_CALENDAR_BEGIN = "SAVE CALENDAR BEGIN";
export const SAVE_CALENDAR_SUCCESS = "SAVE CALENDAR SUCCESS";
export const SAVE_CALENDAR_ERROR = "SAVE CALENDAR ERROR";
export const LOAD_CALENDARS = "LOAD CALENDARS";
export const LOAD_CALENDARS_BEGIN = "LOAD CALENDARS BEGIN";
export const LOAD_CALENDARS_SUCCESS = "LOAD CALENDARS SUCCESS";
export const LOAD_CALENDARS_ERROR = "LOAD CALENDARS ERROR";
export const TOGGLE_CALENDAR_NEW_INPUT = "TOGGLE CALENDAR NEW INPUT";
export const LAST_LOGGEDIN_USER = "LAST LOGGEDIN USER";
export const SAVE_USER_SUCCESS = "SAVE USER SUCCESS";
export const DELETE_CALENDAR_BEGIN = "DELETE CALENDAR BEGIN";
export const DELETE_CALENDAR_SUCCESS = "DELETE CALENDAR SUCCESS";
export const DELETE_CALENDAR_ERROR = "DELETE CALENDAR ERROR";
export const TOGGLE_EVENT_EDIT_FORM = "TOGGLE_EVENT_EDIT_FORM";

export const addCalendar = ( newCalendar ) => {
    return dispatch => {
            dispatch({ type: ADD_NEW_CALENDAR_BEGIN });
       return add({ ...newCalendar?.calendar }, '/calendar')
        .then(calendarData => {
            dispatch({ type: ADD_NEW_CALENDAR_SUCCESS, payload: calendarData});
            if ( newCalendar?.event ) {
                let eventConfig = {
                    event: {
                        calendarId: calendarData?._id, 
                        userId: newCalendar?.currentUser?._id,
                        event: newCalendar?.event,
                        location: newCalendar?.location,
                        schedulingData: newCalendar?.schedulingData,
                        consultation: newCalendar?.consultation,
                        calendarEventType: newCalendar?.calendarEventType,
                        operatorId: newCalendar?.operatorId,
                        color: newCalendar?.color
                    },
                    currentUser: newCalendar?.currentUser, 
                    pushNotificationUser: newCalendar?.pushNotificationUser, 
                    emailAddresses: newCalendar?.emailAddresses 
                };

                dispatch( addEvent( eventConfig ) );
            }
            
            dispatch(saveCalendar({
                ...calendarData, 
                timeLineGroup: { 
                    id: calendarData?._id, 
                    title: `${calendarData?.firstName}_${calendarData?._id}`, 
                    rightTitle: `${calendarData?.firstName}_${calendarData?._id}`, 
                    color: calendarData?.color 
                }
            }));
            return calendarData; 
        })
        .catch( error => {
            dispatch({ type: ADD_NEW_CALENDAR_ERROR, payload: error });
            console.log( error );
            return error;
        });
    };
};

export const saveCalendar = ( calendar )  => {
    return dispatch => {
         dispatch({ type: SAVE_CALENDAR_BEGIN });
         return update( calendar, `/calendar/` )
             .then( calendaData => {  
                 dispatch({ type: SAVE_CALENDAR_SUCCESS, payload: calendaData });
                 return calendaData; 
             })
             .catch( error => {
                 dispatch({ type: SAVE_CALENDAR_ERROR , error });
                 return error;
         });  
    };
 };

 export const deleteCalendar = ( calendar, currentUser, pushNotificationUser ) => {
    return dispatch => {
        dispatch({ type: DELETE_CALENDAR_BEGIN });
         return remove( calendar, `/calendar/` )
         .then( resp => {
             dispatch({ type: DELETE_CALENDAR_SUCCESS, payload: resp });
             dispatch(sendPushNotificationMessage( 
                pushNotificationUser, { 
                title:`${ currentUser?.firstname } Deleted A Calendar!`, 
                body:`Deleted Calendar: ${ calendar?._id }` 
            })); 
             return calendar;
         }).catch( error => {
            dispatch({ type: DELETE_CALENDAR_ERROR , error });
            return error;
        });
    };
};

export const loadAllCalendars = () => {
    return dispatch => {
        dispatch({ type: LOAD_CALENDARS_BEGIN });
        return get(`/calendar`)
         .then( calendar => {
             dispatch({ type: LOAD_CALENDARS_SUCCESS, payload: calendar });
             return calendar;
         }).catch( error => {
            dispatch({ type: LOAD_CALENDARS_ERROR , error });
            return error;
        });
    };
};

export const loadCalendarsByCalendarId = ( calendarId ) => {
    return dispatch => {
        dispatch({ type: LOAD_CALENDARS_BEGIN });
        return getById(calendarId, `/calendar?calendarId=`)
         .then( calendar => {
             dispatch({ type: LOAD_CALENDARS_SUCCESS, payload: calendar });
             return calendar;
         })
         .catch( error => {
            dispatch({ type: LOAD_CALENDARS_ERROR , error });
            return error;
        });
    };
};

export const loadCalendarsByUserId = ( remoteUser ) => {
    return dispatch => {
        return getCalendarsByUserId( remoteUser?._id )
         .then( calendar => {
            dispatch({ type: LOAD_CALENDARS_SUCCESS, payload: calendar });
            return calendar;
        })
        .catch( error => {
            dispatch({ type: LOAD_CALENDARS_ERROR , error });
            return error;
        });
    };
};

export const toggleCalendarNewEventForm = () => ({
    type: TOGGLE_CALENDAR_NEW_INPUT
});
