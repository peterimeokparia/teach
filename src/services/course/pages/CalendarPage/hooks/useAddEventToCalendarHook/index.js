import { newCalendarEventData  } from 'services/course/pages/CalendarPage/helpers';

function useAddEventToCalendar( props ){
    let { addNewCalendarEvent, courseId, lessonId } = props;

    function addEventToCalendar( event, formName ) {
        addNewCalendarEvent( newCalendarEventData( event, 'location', [ { formName } ], undefined, undefined, courseId, lessonId ) );
    }
    return{ addEventToCalendar };
}

export default useAddEventToCalendar;