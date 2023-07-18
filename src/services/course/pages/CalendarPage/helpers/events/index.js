

import { newCalendarEventData } from 'services/course/pages/CalendarPage/helpers';
import { addCalendar } from 'services/course/actions/calendar';
import { addEvent } from 'services/course/actions/event';
import { getCalendarColor } from 'services/course/pages/CalendarPage/helpers';
import Calendar from 'services/course/helpers/Calendar';
import CalendarEvent from 'services/course/helpers/CalendarEvent';
import moment from "moment";

export const automateEventCreation = ( event, meetingId, durationHrs ) => {
    let { title, backgroundColor, textColor, url, location, courseId, lessonId, startDateTime, recurringEvent, allDay  } = event;

    let endDateTime = startDateTime;
    let start = startDateTime.format('YYYY-MM-DDTHH:mm:ss');
    let end = endDateTime?.add(durationHrs, 'hours').format('YYYY-MM-DDTHH:mm:ss');
    let duration = moment( new Date() ).add(durationHrs, 'hours').diff( moment( new Date() ) );
    let newEvent = { title, recurringEvent, allDay, start, end, duration, backgroundColor, textColor, url  };
    
    return newCalendarEventData( newEvent, location, undefined, undefined, meetingId, courseId, lessonId );
};

export function saveEventData( eventProps, store ){
    let { calendar, calendarEventData, testAdminUsers, calendarEventType, courseId,
        lessonId, meetingId, operatorId, calendars, user, users, userId,  //pushNotificationSubscribers,
        addEvent, addCalendar
    } = eventProps;

    let color = getCalendarColor( calendars );

    let calendarEventConfig = { calendar, calendarEventData, courseId, lessonId, meetingId, testAdminUsers, calendarEventType, operatorId, 
        user, users, userId, color  //pushNotificationSubscribers,  
    };

    let props = { addEvent, addCalendar, calendarEventConfig, calendar };

    switch (arguments?.length) {

        case 2:
            saveEventDataWithStoreDispatchingAction( { ...props, store } );
            break;
        default:
            saveEventDataWithoutStoreDispatchingAction( props );
            break;

    }
};

function saveEventDataWithoutStoreDispatchingAction( props ){

    let { addEvent, addCalendar, calendarEventConfig, calendar } = props;

    try {    

        let eventData = new CalendarEvent( calendarEventConfig )?.eventDataObject();

        addEvent( eventData );

        // if ( calendar  ) {  
        //     addEvent( eventData );
        // } else {
        //     let calendarConfig = {
        //         calendar: new Calendar( calendarEventConfig )?.calendar(),
        //         event: new CalendarEvent( calendarEventConfig )?.eventDataObject()
        //     };
            
        //    addCalendar( calendarConfig );
        // }
    } catch (error) {
        throw Error(`CalendarPage: saveEventData: ${error}`);   
    }
}

function saveEventDataWithStoreDispatchingAction( props ){

    let { addEvent, addCalendar, calendarEventConfig, calendar, store } = props;

    try {

        let eventData = new CalendarEvent( calendarEventConfig )?.eventDataObject();

        store.dispatch( addEvent( eventData ) );

        // if ( calendar  ) {  
        //     store.dispatch( addEvent( eventData ) );
        // } else {
        //     let calendarConfig = {
        //         calendar: new Calendar( calendarEventConfig )?.calendar(),
        //         event: eventData
        //     };
            
        //    store.dispatch( addCalendar( calendarConfig ) );
        // }
    } catch (error) {
        throw Error(`CalendarPage: saveEventData: ${error}`);   
    }
}