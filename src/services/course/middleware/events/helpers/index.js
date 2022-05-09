import {
updateUser,
sendEmail } from 'services/course/api';

import {
saveEvent,
saveTimeLineEvents } from 'services/course/actions/event';

import {
sendPushNotificationMessage } from 'services/course/actions/notifications';
    
import {
getTimeLineItems, eventEnum} from 'services/course/pages/CalendarPage/helpers';

import {
SAVE_USER_SUCCESS,
LAST_LOGGEDIN_USER } from 'services/course/actions/users';
import { navigate } from '@reach/router';
    
    const emailMessageConfig = {
        sendersEmailAddress: "teachpadsconnect247@gmail.com",
        emailHeaderNewEvent: "New Calendar Event!",
        emailHeaderModifiedEvent: "Modifiied Calendar Event(s)!",
        emailHeaderDeletedEvent: "Deleted Calendar Event(s)!"
    };
    
export const addTimeLineItemsToEvent = ( calendarEvent, store ) => {
    let timeLineItems = getTimeLineItems( calendarEvent?.calendarEventData );

    store?.dispatch(saveEvent({
        ...calendarEvent?.calendarEventData, 
        timeLineItems }, 
        calendarEvent?.eventConfig?.currentUser, 
        calendarEvent?.eventConfig?.pushNotificationUser, 
        calendarEvent?.eventConfig?.emailAddresses
    ));
};
    
export const updateTimeLineItemsToMatchEventUpdates = ( calendarEventData, store ) => {
    let { currentUser, pushNotificationUser, emailAddresses } = calendarEventData;

    let { calendarEvent } = updateTimeLineItems( calendarEventData );

    store?.dispatch(saveTimeLineEvents(
        calendarEvent, 
        currentUser, 
        pushNotificationUser, 
        emailAddresses
    ));
};
    
export const updateTimeLineItems = ( _calendarEvent ) => {
    let eventData = {};
    
    let calendarEvent = {
    ..._calendarEvent?.calendarEventData, 
    timeLineItems: updateTimeLineEvents( _calendarEvent ) 
    };
    let currentUser = calendarEvent?.currentUser;
    let pushNotificationUser = calendarEvent?.pushNotificationUser;
    let emailAddresses = calendarEvent?.emailAddresses;

    eventData = {
        calendarEvent,
        currentUser,
        pushNotificationUser,
        emailAddresses
    };
    return eventData;
};

function updateTimeLineEvents( calendarEvent ) {
    let timeLineItems = [   ...calendarEvent?.calendarEventData?.timeLineItems  ];

    try {
        let clonedCalendarEvent = calendarEvent?.calendarEventData;

        clonedCalendarEvent = { ...clonedCalendarEvent, timeLineItems: [] };
        timeLineItems = getTimeLineItems( clonedCalendarEvent );
    } catch (error) {
        console.warn('There was a problem updating timeline events. Rollback changes.');
        return timeLineItems;
    }
    return timeLineItems;
};

export const sendUpdatesAfterAddingNewCalendarEvents = ( calendarEvent, store ) => {
    try {
        // store?.dispatch(sendPushNotificationMessage( 
        //     calendarEvent?.eventConfig?.pushNotificationUser, 
        //     { 
        //         title:`${ calendarEvent?.eventConfig?.currentUser?.firstname } Added New Calendar Event!`, 
        //         body:`New Calendar Event: ${ calendarEvent?.calendarEventData?.event?.title } ${ calendarEvent?.calendarEventData?.event?.start }` 
        //     })
        // ); 
        // calendarEvent?.eventConfig?.emailAddresses?.forEach(email => {
        //     sendEmail(
        //         emailMessageConfig?.sendersEmailAddress, 
        //         email, 
        //         emailMessageConfig?.emailHeaderNewEvent,
        //         `View Event: http://localhost:3000/boomingllc/accountverification/${calendarEvent?.calendarEventData?._id}`,  /// change
        //         calendarEvent?.eventConfig?.currentUser?._id
        //     );
        // });
        let currentUser = { 
            ...calendarEvent?.eventConfig.currentUser, 
            calendarEvents:[ ...calendarEvent?.eventConfig?.currentUser?.calendarEvents, 
            calendarEvent?.eventConfig?.calendarEventData?._id ]  
        };
        
        updateUser( currentUser  )
            .then(user => { 
                store?.dispatch({ type: LAST_LOGGEDIN_USER, payload: user });
                store?.dispatch({ type: SAVE_USER_SUCCESS, payload: user });             
            })
            .catch(error => { console.error( error ); });
    } catch (error) {
        console.error(`Problem with adding a calendar event: ${ error }`);
    }
};

export const sendUpdatesAfterModifyingCalendarEvents = ( event, store ) => {
    try {
        // store?.dispatch(sendPushNotificationMessage( 
        //     event?.pushNotificationUser, { 
        //     title:`${  event?.currentUser?.firstname } Modified Calendar Event!`, 
        //     body:`Modified Calendar Event: ${   event?.calendarEvent?.title } Event StartTime: ${ (  event?.calendarEvent?.rrule) ?   event?.calendarEvent?.rrule?.dtstart :   event?.calendarEvent?.start }` 
        // })); 
        // event?.emailAddresses?.forEach(email => {
        //     sendEmail(
        //         emailMessageConfig?.sendersEmailAddress, 
        //         email, 
        //         emailMessageConfig?.emailHeaderDeletedEvent,
        //         `View Event: http://localhost:3000/boomingllc/accountverification/${ event?.calendarEventData?._id}`,  /// change
        //         event?.currentUser?._id
        //     );
        // });
    } catch (error) {
        console.error(`Problem with modifying a calendar event: ${ error }`);
    }
};

export const sendUpdatesAfterDeletingCalendarEvents = ( event, store ) => {
    try { 
        // store?.dispatch(sendPushNotificationMessage( 
        //     event?.pushNotificationUser, { 
        //     title:`${ event?.currentUser?.firstname } Deleted A Calendar Event!`, 
        //     body:`Deleted Calendar Event: ${ event?.event?._id }` 
        // }));
        // sendEmail(
        //     emailMessageConfig?.sendersEmailAddress, 
        //     event?.currentUser?.email, 
        //     emailMessageConfig?.emailHeaderDeletedEvent,
        //     `View Event: http://localhost:3000/boomingllc/accountverification/${ event?.event?._id}`,  /// change
        //     event?.currentUser?._id
        // );
    } catch (error) {
        console.error(`Problem with deleting a calendar event: ${ error }`);
    }
};