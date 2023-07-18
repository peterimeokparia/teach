import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { eventEnum } from 'services/course/pages/CalendarPage/helpers';
import { loadSubscribedPushNotificationUsers } from 'services/course/actions/notifications';
import { setCalendarEventType, loadAllCalendars } from 'services/course/actions/calendar';
import { loadAllEvents } from 'services/course/actions/event';
import { loadCourses } from "services/course/actions/courses";
import { role } from 'services/course/helpers/PageHelpers';

function useBuildEventDataHook( calendarEventProps ) {

    let {  userId, courseId, lessonId, calendarEventType, events, courses,  calendarId, user } = Object( calendarEventProps );

    const [ isModalOpen, setModalOpen] = useState(false);
    const [ component, setComponent] = useState(eventEnum);
    const [ calendarSlotInfo, setCalendarSlotInfo ] = useState(undefined);
    const [ tutorId, setTutorId ] = useState(undefined);
    const [ scheduledStudents, setScheduledStudents ] = useState([]);    
    const dispatch = useDispatch();


    useEffect(( ) => {
     if ( courses?.length > 0 && courseId && !tutorId ) {
        setTutorId( courses?.find(item => item?._id === courseId )?.createdBy );
     }
    });

    useEffect(( ) => {
        dispatch( loadCourses() );
        dispatch( loadAllCalendars() );
        dispatch( loadAllEvents() );
        dispatch( loadSubscribedPushNotificationUsers() );
        dispatch( setCalendarEventType( calendarEventType ) );
    },[ calendarEventType, dispatch ]);

    let eventDataObj = null;

    if ( events?.length > 0  ) { 
        let filteredEvents = filterEventsByCalendarType( calendarEventProps );
   
        if ( filteredEvents ) {
            eventDataObj = filteredEvents?.map(eventData => (  getEventData( eventData )  ));
        }
    };

function getEventData( eventData ) {
    let eventDataObject = null;

    if ( ( eventData?.event?.recurringEvent === true ) ) {
        eventDataObject = {
            id: eventData?._id, 
            title: eventData?.event?.title, 
            allDay:  eventData?.event?.allDay,
            start: eventData?.event?.start, 
            end: eventData?.event?.end,
            backgroundColor: eventData?.event?.backgroundColor,
            textColor: eventData?.event?.textColor,
            url: eventData?.event?.url,
            rrule: {
                freq: eventData?.event?.rrule?.freq,
                // interval: eventData?.event?.rrule?.interval,
                dtstart: eventData?.event?.rrule?.dtstart,
                until: eventData?.event?.rrule?.until
            },
            userId: eventData?.userId,
            calendarId: eventData?.calendarId,   
            duration: 1,    
        };
    }
    else {
        eventDataObject = {
            id: eventData?._id, 
            title: eventData?.event?.title,
            allDay:  eventData?.event?.allDay,
            start: eventData?.event?.start, 
            end: eventData?.event?.end,
            backgroundColor: eventData?.event?.backgroundColor,
            textColor: eventData?.event?.textColor,
            url: eventData?.event?.url,
            duration:  1,
            userId: eventData?.userId,
            calendarId: eventData?.calendarId,  
        };
    };
    return eventDataObject;
};

function filterEventsByCalendarType( calendarEventProps ) { // refactor
    let {  userId, courseId, lessonId, calendarEventType, events, calendarId, user } = Object( calendarEventProps );

    let courseCreator = courses?.find(item => item?._id === courseId )?.createdBy;

    switch ( calendarEventType ) {
        case eventEnum.NewEvent:
            return events?.filter(evnt => evnt?.calendarId === calendarId );
        case eventEnum.ConsultationForm:
            return events?.filter(evnt => evnt?.calendarId === calendarId );
        case eventEnum.TutorCalendar:
            //if ( user?.role === role.Tutor ) {// }
            return events?.filter(evnt => evnt?.calendarId === calendarId );  
        case eventEnum.SessionScheduling:
            return events?.filter(evnt => evnt?.calendarId === calendarId );  
        case eventEnum.OnlineTutoringRequest:
            return events?.filter(evnt => evnt?.calendarId === calendarId );
        case eventEnum.ReportForms:
            return events?.filter(evnt => evnt?.calendarId === calendarId );     
        case eventEnum.QuizzForms:
            return events?.filter(evnt => evnt?.calendarId === calendarId );    
        case eventEnum.Lessons:
        // case eventEnum.NewEvent:
        // alert('courseCreator')
        // alert(courseCreator)
        // alert(JSON.stringify(events?.filter(evnt => evnt?.courseId === courseId && evnt?.lessonId === lessonId && [ user?._id, courseCreator ].includes(evnt?.userId)  )?.length))
            return events?.filter(evnt => evnt?.courseId === courseId && evnt?.lessonId === lessonId && [ user?._id, courseCreator, '6165117e729ccf50b9ac7e64' ].includes(evnt?.userId)  );      
            //return events?.filter(evnt => evnt?.courseId === courseId && evnt?.lessonId === lessonId && [ user?._id ].includes(evnt?.userId)  );    
        default:
            return events?.filter(evnt => evnt?.calendarId === calendarId );

    };
}

const handleSelect = ( slotInfo ) => {
    switch ( calendarEventType ) {

        case eventEnum.NewEvent:
            setComponent( eventEnum.NewEvent );
            setCalendarSlotInfo( slotInfo );  
            setModalOpen( true );
            return;
        case eventEnum.ConsultationForm:
            setComponent( eventEnum.ConsultationForm );
            setCalendarSlotInfo( slotInfo );
            setModalOpen( true );
            return;
        case eventEnum.TutorCalendar:
            if ( user?.role === role.Tutor ) {
                setComponent( eventEnum.TutorCalendar );
                setCalendarSlotInfo( slotInfo );
                setModalOpen( true );
            }
            return;  
        case eventEnum.SessionScheduling:
            setComponent( eventEnum.SessionScheduling );
            setCalendarSlotInfo( slotInfo );
            setModalOpen( true );
            return;    
        case eventEnum.OnlineTutoringRequest:
            setComponent( eventEnum.OnlineTutoringRequest );
            setCalendarSlotInfo( slotInfo );
            setModalOpen( true );
            return;
        case eventEnum.ReportForms:
            setComponent( eventEnum.ReportForms );
            setCalendarSlotInfo( slotInfo );
            setModalOpen( true );
            return;       
        case eventEnum.QuizzForms:
            setComponent( eventEnum.QuizzForms );
            setCalendarSlotInfo( slotInfo );
            setModalOpen( true );
            return;       
        case eventEnum.Lessons:
            setComponent( eventEnum.Lessons );
            setCalendarSlotInfo( slotInfo );
            setModalOpen( true );
            return;       
        default:
            return;

    };
};

return {
        eventDataObj,
        isModalOpen,
        component,
        scheduledStudents,
        calendarSlotInfo,
        handleSelect: ( slotInfo ) => handleSelect( slotInfo ),
        setModalOpen: ( val ) => setModalOpen( val ),
        setScheduledStudents: ( val ) => setScheduledStudents( val )
}; };

export default useBuildEventDataHook;