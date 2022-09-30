import { LESSONNOTES, addNotes } from 'services/course/actions/notes';
import { eventEnum } from 'services/course/pages/CalendarPage/helpers';
import { addEvent } from 'services/course/actions/event';
import { addCalendar } from 'services/course/actions/calendar';
import { automateEventCreation } from 'services/course/pages/CalendarPage/helpers/events';
import { saveEventData } from 'services/course/pages/CalendarPage/helpers/events';
import { role } from 'services/course/helpers/PageHelpers';

export const addLessonEventToCalendar = ( lessonObj, store ) => {
    try {
        let {
            currentUser,
            courseId,
            lessonId,
            calendars,
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

export function createTutorsLessonNote( lessonObj, store ) {
    try {
        const currentUser = store.getState().users.user;
        const lessonNoteProps = {
            title: lessonObj?.title,
            courseId: lessonObj?.courseId,
            lessonId: lessonObj?._id,
            userId: currentUser?._id,
            markDownContent: null,
            content: null,
            operatorId: currentUser?.operatorId,
            eventId: lessonObj?.event?._id,
            noteType: LESSONNOTES
        };

        if ( currentUser?.role === role.Tutor ) {
            store.dispatch( addNotes( lessonNoteProps ) );
        }
    } catch (error) {
        console.error( `problem creating tutor's lesson note${error}`);
    }
}
   