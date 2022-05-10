import {
newCalendarEventData  } from 'services/course/pages/CalendarPage/helpers';

function useAddEventToCalendar( props ){

    let {
        type,
        start,
        end,
        duration,
        operatorBusinessName,
        addNewCalendarEvent,
        user,
        calendarEventType, 
        calendarId, 
        courseId,
        lessonId, 
        classRoomId,
        addNotes
    } = props;

    function addEventToCalendar( event, formName ) {

        addNewCalendarEvent( newCalendarEventData( event, 'location', [ { formName } ], undefined, undefined, courseId, lessonId ) );

    }

    return{ addEventToCalendar };
}

export default useAddEventToCalendar;