import 
React, { 
useState, 
useEffect } from "react";

import { 
connect } from 'react-redux';

import {
eventEnum, getCalendarColor } from 'Services/course/Pages/CalendarPage/helpers';

import { 
navigate } from '@reach/router';

import {
loadSubscribedPushNotificationUsers } from 'Services/course/Actions/Notifications';

import {
addNewTimeLine,    
saveTimeLine } from 'Services/course/Actions/TimeLines'; 

import { 
addCalendar,
saveCalendar,
loadAllCalendars } from 'Services/course/Actions/Calendar';

import { 
addEvent,
saveEvent,    
loadAllEvents } from 'Services/course/Actions/Event';

import { 
loadCourses } from "Services/course/Actions/Courses";

import {
getCoursesByOperatorId,    
getEventsByOperatorId,
getPushNotificationUsersByOperatorId,
getCalendarEventsByUserIdSelector,     
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCalendarsByOperatorId,
getTimeLinesByOperatorId } from 'Services/course/Selectors';

import {
studentsOption,
getCalendarPageHeading,
getTimeLineItemDetailsFromCalendarEvents } from 'Services/course/Pages/CalendarPage/helpers';

import { 
momentLocalizer } from "react-big-calendar";

import FullCalendar from '@fullcalendar/react';
import rrulePlugin from "@fullcalendar/rrule";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listWeek from "@fullcalendar/list";
import ConsultationForm from 'Services/course/Pages/CalendarPage/Components/ConsultationForm';
import Modal from "react-modal";
import moment from "moment";
import SessionScheduling from 'Services/course/Pages/CalendarPage/Components/SessionScheduling';
import OnlineTutoringRequestForm from 'Services/course/Pages/CalendarPage/Components/OnlineTutoringRequestForm';
import Scheduling from 'Services/course/Pages/CalendarPage/Components/Scheduling/index.js';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar-like-google/lib/css/react-big-calendar.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/list/main.css";
import './style.css';
moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const CalendarPage = ({
operatorBusinessName,
pushNotificationSubscribers,
operator,
addEvent,
saveEvent,
loadCourses,
loadAllEvents,
calendarEventType,
calendar,
calendarId,
calendars,
events,
pushNotUsers,
addCalendar,
saveCalendar,
loadAllCalendars,
loadSubscribedPushNotificationUsers,
timeLines,
users,
user,
userId,
addNewTimeLine,
saveTimeLine,
courses,
}) => {

const [isModalOpen, setModalOpen] = useState(false);
const [eventData, setEventData] = useState(undefined);
const [component, setComponent] = useState(eventEnum);
const [calendarSlotInfo, setCalendarSlotInfo ] = useState(undefined)
const [ scheduledStudents, setScheduledStudents ] = useState([]);

useEffect(( ) => {
    loadCourses();
    loadAllCalendars();
    loadAllEvents();
    loadSubscribedPushNotificationUsers();
},[ loadAllCalendars, loadSubscribedPushNotificationUsers, loadAllEvents,loadCourses ]);

if ( ! user?.userIsValidated || ! operator ){
    navigate(`/${operatorBusinessName}/login`);
}

let testEventData = null;
if ( events?.length > 0  ) {
    testEventData = events?.filter(evnt => evnt?.calendarEventType === calendarEventType && evnt?.calendarId === calendarId )?.map(eventData => (  testEventDataFunc( eventData )  ));
}

function testEventDataFunc( eventData ) {
    let newObjectTest = null;

    if ( ( eventData?.event?.recurringEvent === true ) ) {
        newObjectTest = {
            id: eventData?._id, 
            title: eventData?.event?.title, 
            allDay:  eventData?.event?.allDay,
            start: eventData?.event?.start, 
            end: eventData?.event?.end,
                rrule: {
                    freq: eventData?.event?.rrule?.freq,
                    interval: eventData?.event?.rrule?.interval,
                    dtstart: eventData?.event?.rrule?.dtstart,
                    until: eventData?.event?.rrule?.until
                },
            userId: eventData?.event?.userId,
            calendarId: eventData?.event?.calendarId,   
            duration: 1,    
        }
    }
    else {
        newObjectTest = {
            id: eventData?._id, 
            title: eventData?.event?.title,
            allDay:  eventData?.event?.allDay,
            start: eventData?.event?.start, 
            end: eventData?.event?.end,
            duration:  1,
            userId: eventData?.event?.userId,
            calendarId: eventData?.event?.calendarId,  
        }
    }
    return newObjectTest;
}

const handleSelect = ( slotInfo ) => {

    const [ start, end, startStr, endStr ] =  Object.entries( slotInfo );

    switch ( calendarEventType ) {
        case eventEnum.NewEvent:
            setCalendarSlotInfo( slotInfo );  
            setEventData( slotInfo );   
            return;
        case eventEnum.ConsultationForm:
            setComponent( eventEnum.ConsultationForm );
            setCalendarSlotInfo( slotInfo );
            setModalOpen( true );
            setEventData( slotInfo );
            return;
        case eventEnum.SessionScheduling:
            setComponent( eventEnum.SessionScheduling );
            setCalendarSlotInfo( slotInfo );
            setModalOpen( true );
            setEventData( slotInfo );
            return;    
        case eventEnum.OnlineTutoringRequest:
            setComponent( eventEnum.OnlineTutoringRequest );
            setCalendarSlotInfo( slotInfo );
            setModalOpen( true );
            setEventData( slotInfo );
            return;        
        default:
            return;
    }
}

const handleEventClick = (info) => {
    navigate( `/${operatorBusinessName}/${calendarEventType}/calendar/${calendar?._id}/${user._id}/${info?.event?.id}`)
}

function addNewCalendarEvent( calendarEventData ) {
    setModalOpen(false);
    let testAdminUsers =  [ userId, '603d37814967c605df1bb450', '6039cdc8560b6e1314d7bccc' ]; // refactor
    let emailAddresses = Object.values(users).filter(user => testAdminUsers.includes(user?._id))?.map(user => user?.email);
    saveEventData(calendar, calendarEventData, emailAddresses, testAdminUsers, calendarEventType, operator?._id);
};

const closeModal = () => {
    setModalOpen(false);
};

const openModal = () => {
    setModalOpen(true);
};

function saveEventData(calendar, calendarEventData, emailAddresses, testAdminUsers, calendarEventType, operatorId){
  
    let event = calendarEventData?.event, location = calendarEventData?.location, schedulingData = calendarEventData?.schedulingData;
    let consultation = calendarEventData?.consultation;

    try {
    
        if ( calendar  ) { 
            
            let addEventConfig = {
                event: {
                    calendarId: calendar?._id, 
                    userId: user?._id,
                    event: { ...event, color: calendar?.color },
                    location,
                    schedulingData,
                    consultation,
                    calendarEventType,
                    operatorId,
                    color: calendar?.color 
                },
                currentUser: user, 
                pushNotificationUser: pushNotificationSubscribers?.filter(subscriber => testAdminUsers.includes( subscriber?.userId ) ),  
                emailAddresses
            }

            addEvent( addEventConfig );

        } else {

            let color = getCalendarColor( calendars );
            let calendarConfig = {
                calendar: {
                    userId,
                    calendarEventType,
                    operatorId,
                    firstName: users?.find(usr => usr?._id === userId)?.firstname,
                    color,
                }, 
                event: { ...event, color }, 
                location, 
                schedulingData, 
                consultation, 
                calendarEventType, 
                operatorId, 
                currentUser: user, 
                pushNotificationUser: pushNotificationSubscribers?.filter(subscriber => testAdminUsers?.includes( subscriber?.userId ) ), 
                emailAddresses
            }

            addCalendar( calendarConfig );
        }
    } catch (error) {
        console.log( error );    
    }
}

function renderSwitch( param ) {
    switch ( param ) {
        case eventEnum.NewEvent:
            return <Scheduling
                        slotInfo={calendarSlotInfo}
                        schedulingData
                        submitEventButtonText={"Add New Event"}
                        handleSubmit={addNewCalendarEvent} 
                    /> 
            case eventEnum.ConsultationForm:
                return <Modal isOpen={isModalOpen} onRequestClose={closeModal}> 
                            <ConsultationForm 
                                user={user}
                                slotInfo={calendarSlotInfo}
                                courses={courses}
                                handleSubmit={addNewCalendarEvent}
                            /> 
                        </Modal>
            case eventEnum.SessionScheduling:
                return <Modal isOpen={isModalOpen} onRequestClose={closeModal}> 
                            <SessionScheduling 
                                scheduledStudents={scheduledStudents}
                                onChange={setScheduledStudents}
                                options={studentsOption(users)}
                            > 
                                <Scheduling
                                    slotInfo={calendarSlotInfo}
                                    schedulingData={scheduledStudents}
                                    submitEventButtonText={"Schedule Session"}
                                    handleSubmit={addNewCalendarEvent} 
                                />  
                            </ SessionScheduling>
                        </Modal>
             case eventEnum.OnlineTutoringRequest:
                return <Modal isOpen={isModalOpen} onRequestClose={closeModal}> 
                            <OnlineTutoringRequestForm 
                                scheduledStudents={scheduledStudents}
                                onChange={setScheduledStudents}
                                options={studentsOption(users)}
                            > 
                                <Scheduling
                                    slotInfo={calendarSlotInfo}
                                    schedulingData={scheduledStudents}
                                    submitEventButtonText={"Schedule Session"}
                                    handleSubmit={addNewCalendarEvent} 
                                />  
                            </ OnlineTutoringRequestForm>
                        </Modal>
            default:
               return <div>
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, listWeek, interactionPlugin, rrulePlugin]}
                            navLinks={true}
                            headerToolbar={{
                                left: 'prev, next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                            }}
                            initialView='dayGridMonth'
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            weekends={true}
                            select={handleSelect}
                            events={ testEventData }
                            eventClick={handleEventClick}
                        />
                        <FullCalendar defaultView="listWeek" plugins={[listWeek, dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]} events={ testEventData } initialView='listWeek' />
                        </div>
    }
}
return (    
<div>
<h2>{ `Hello ${user?.firstname}` }</h2>
<h2>{ getCalendarPageHeading( calendarEventType ) }</h2>
    {
        renderSwitch( component )
    }
<button onClick={openModal}>Back</button> 
</div>
)};

const mapDispatch = {
    addCalendar,
    saveCalendar,
    addEvent,
    saveEvent,
    loadAllCalendars,
    loadAllEvents,
    loadSubscribedPushNotificationUsers,
    addNewTimeLine,
    saveTimeLine,
    loadCourses
};

const mapState = ( state, ownProps )  => ({
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    user: state?.users?.user,
    calendar: getCalendarEventsByUserIdSelector(state, ownProps),
    calendars: getCalendarsByOperatorId(state, ownProps),
    events: getEventsByOperatorId(state, ownProps),
    pushNotUsers: state?.notifications?.pushNotificationSubscribers,
    pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
    timeLines: getTimeLinesByOperatorId(state, ownProps),
    courses: getCoursesByOperatorId(state, ownProps),
})

export default connect(mapState, mapDispatch)(CalendarPage);