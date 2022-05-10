import {
useDispatch } from 'react-redux';

import {
newCalendarEventData } from 'services/course/pages/CalendarPage/helpers';

import { 
addCalendar } from 'services/course/actions/calendar';

import { 
addEvent } from 'services/course/actions/event';

import {
getCalendarColor } from 'services/course/pages/CalendarPage/helpers';

import Calendar from 'services/course/helpers/Calendar';
import CalendarEvent from 'services/course/helpers/CalendarEvent';
import moment from "moment";

export const automateEventCreation = ( event, meetingId, durationHrs, courseId, lessonId ) => {
  
    let { title, backgroundColor, textColor, url, location, startDateTime, recurringEvent, allDay  } = event;

    let endDateTime = startDateTime;
    let start = startDateTime.format('YYYY-MM-DDTHH:mm:ss');
    let end = endDateTime?.add(durationHrs, 'hours').format('YYYY-MM-DDTHH:mm:ss');
    let duration = moment( new Date() ).add(durationHrs, 'hours').diff( moment( new Date() ) )

    let newEvent = {
        title,
        recurringEvent,
        allDay,
        start,
        end,
        duration,
        backgroundColor, 
        textColor, 
        url        
    };
    
    return newCalendarEventData( newEvent, location, undefined, undefined, meetingId, courseId, lessonId );
};

export function saveEventData( eventProps, store ){

    let {
        calendar, 
        calendarEventData, 
        testAdminUsers, 
        calendarEventType, 
        courseId,
        lessonId,
        operatorId,
        calendars,
        user,
        users,
        userId,
        //pushNotificationSubscribers,
        addEvent,
        addCalendar
    } = eventProps;

    let color = getCalendarColor( calendars );

    let calendarEventConfig = { 
        calendar, 
        calendarEventData, 
        courseId,
        lessonId,
        testAdminUsers, 
        calendarEventType, 
        operatorId, 
        //pushNotificationSubscribers, 
        user, 
        users,
        userId,
        color 
    };

    let props = { addEvent, addCalendar, calendarEventConfig, calendar };

    switch (arguments?.length) {
        case 2:
            saveEventDataWithStoreDispatchingAction( { ...props, store } )
            break;
        default:
            saveEventDataWithoutStoreDispatchingAction( props );
            break;
    }
};

function saveEventDataWithoutStoreDispatchingAction( props ){
    
    let { 
        addEvent, 
        addCalendar, 
        calendarEventConfig, 
        calendar,
    } = props;

    try {
        
        if ( calendar  ) {  
            addEvent( new CalendarEvent( calendarEventConfig )?.eventDataObject() );
        } else {
            let calendarConfig = {
                calendar: new Calendar( calendarEventConfig )?.calendar(),
                event: new CalendarEvent( calendarEventConfig )?.eventDataObject()
            };
            
           addCalendar( calendarConfig );
        }
    } catch (error) {
        throw Error(`CalendarPage: saveEventData: ${error}`);   
    }
}

function saveEventDataWithStoreDispatchingAction( props ){
    
    let { addEvent, addCalendar, calendarEventConfig, calendar, store } = props;

    try {
        
        if ( calendar  ) {  
            store.dispatch( addEvent( new CalendarEvent( calendarEventConfig )?.eventDataObject() ) );
        } else {
            let calendarConfig = {
                calendar: new Calendar( calendarEventConfig )?.calendar(),
                event: new CalendarEvent( calendarEventConfig )?.eventDataObject()
            };
            
           store.dispatch( addCalendar( calendarConfig ) );
        }
    } catch (error) {
        throw Error(`CalendarPage: saveEventData: ${error}`);   
    }
}