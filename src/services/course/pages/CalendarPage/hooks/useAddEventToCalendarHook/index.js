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

        addNewCalendarEvent( newCalendarEventData( event, 'location', [ { formName } ], undefined, undefined ) );

    }

    return{ addEventToCalendar };
}

export default useAddEventToCalendar;






// event = {
//     title: ( type === formNames.Board ) ? `${courseTitle}` : `${lessonTitle}`,
//     backgroundColor: ( type === formNames.Board ) ? "pink" : "yellow",
//     textColor: ( type === formNames.Board ) ? "blue" : "black",
//     url:"",
//     // url:"https://picsum.photos/200",
//     recurringEvent: false,
//     allDay: false,
//     start,
//     end,
//     duration
// };