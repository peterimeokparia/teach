import {
updateUser } from 'services/course/api';

import {
eventEnum } from 'services/course/pages/CalendarPage/helpers';

import {
addEvent } from 'services/course/actions/event';

import {
addCalendar } from 'services/course/actions/calendar';

import {
automateEventCreation } from 'services/course/pages/CalendarPage/helpers/events';
    
import {
saveEventData } from 'services/course/pages/CalendarPage/helpers/events';

export const addLessonEventToCalendar = ( lessonObj, store ) => {
    
    try {

        let {
            operatorBusinessName,
            currentUser,
            courseId,
            lessonId,
            calendars,
            calendar,
            lesson,
            lessonTitle,
            selectedCourse,
            selectedTutorId,
            courseTitle,
            title,
            location,
            recurringEvent,
            allDay,
            startDateTime,
            duration,
            testAdminUsers// refactor - create admin groups & roles etc
        } = lessonObj;
 
            let event = {
                title,
                backgroundColor: "pink",
                textColor: "blue",
                url: "",
                location,
                startDateTime,
                recurringEvent, 
                allDay
            };

            const calendarEventData = automateEventCreation( event, undefined, duration, courseId, lessonId );

            const pushNotificationSubscribers = Object.values( store?.getState()?.notifications?.pushNotificationSubscribers )?.filter( subscriber => subscriber?.operatorId === currentUser?.operatorId );
        
            let eventProps = {
                calendarEventData, 
                testAdminUsers, 
                calendarEventType: eventEnum.Lessons,
                calendars,
                user: currentUser,
                users: Object.values( store.getState()?.users?.users ),
                userId: currentUser?._id,
                courseId, 
                lessonId,
                pushNotificationSubscribers,
                operatorId: currentUser?.operatorId 
            };
        
            let lessonCalendar = calendars?.find( calendar =>  calendar?.calendarEventType === eventEnum.Lessons );
        
                saveEventData({
                    ...eventProps,
                    calendar: lessonCalendar,
                    calendarEventData,
                    addCalendar,
                    addEvent
                }, store );
            
    } catch (error) {

        throw Error(`Problem with adding a lesson event: ${ error }`);
    }
};
   