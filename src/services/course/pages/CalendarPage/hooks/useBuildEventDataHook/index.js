import { 
useState, 
useEffect } from "react";

import { 
useDispatch } from 'react-redux';

import {
eventEnum } from 'services/course/pages/CalendarPage/helpers';

import {
loadSubscribedPushNotificationUsers } from 'services/course/actions/notifications';

import { 
setCalendarEventType,
loadAllCalendars } from 'services/course/actions/calendar';

import {  
loadAllEvents } from 'services/course/actions/event';

import { 
loadCourses } from "services/course/actions/courses";

import {
role } from 'services/course/helpers/PageHelpers';

function useBuildEventDataHook( calendarEventType, events, calendarId, user ) {
    const [ isModalOpen, setModalOpen] = useState(false);
    const [ component, setComponent] = useState(eventEnum);
    const [ calendarSlotInfo, setCalendarSlotInfo ] = useState(undefined);
    const [ scheduledStudents, setScheduledStudents ] = useState([]);    
    const dispatch = useDispatch();

    useEffect(( ) => {
        dispatch( loadCourses() );
        dispatch( loadAllCalendars() );
        dispatch( loadAllEvents() );
        dispatch( loadSubscribedPushNotificationUsers() );
        dispatch( setCalendarEventType( calendarEventType ) );
    },[ loadAllCalendars, loadSubscribedPushNotificationUsers, loadAllEvents, loadCourses, calendarEventType, dispatch ]);

    let eventDataObj = null;

    if ( events?.length > 0  ) {
        let filteredEvents = events?.filter(evnt => evnt?.calendarId === calendarId );

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