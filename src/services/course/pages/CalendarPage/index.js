import 
React, { 
useState, 
useEffect } from "react";

import { 
connect } from 'react-redux';

import {
eventEnum } from 'Services/course/Pages/CalendarPage/helpers';

import { 
navigate } from '@reach/router';

import {
loadSubscribedPushNotificationUsers } from 'Services/course/Actions/Notifications';

import {
addNewTimeLine,    
saveTimeLine } from 'Services/course/Actions/TimeLines'; 

import { 
addCalendarEvent,
saveCalendarEvent,
loadAllCalendarEvents } from 'Services/course/Actions/Calendar';

import {
getPushNotificationUsersByOperatorId,
getCalendarEventsByUserIdSelector,     
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCalendarsByOperatorId,
getTimeLinesByOperatorId } from 'Services/course/Selectors';

import {
studentsOption,
getTimeLineItemDetailsFromCalendarEvents } from 'Services/course/Pages/CalendarPage/helpers';

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

import { 
momentLocalizer } from "react-big-calendar";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const CalendarPage = ({
operatorBusinessName,
pushNotificationSubscribers,
operator,
calendarEventType,
calendar,
calendars,
pushNotUsers,
addCalendarEvent,
saveCalendarEvent,
loadAllCalendarEvents,
loadSubscribedPushNotificationUsers,
timeLines,
users,
user,
userId,
addNewTimeLine,
saveTimeLine,
}) => {

const [isModalOpen, setModalOpen] = useState(false);
const [eventData, setEventData] = useState(undefined);
const [component, setComponent] = useState(eventEnum);
const [calendarSlotInfo, setCalendarSlotInfo ] = useState(undefined)
const [ scheduledStudents, setScheduledStudents ] = useState([]);

useEffect(( ) => {
    loadAllCalendarEvents();
    loadSubscribedPushNotificationUsers();
},[ loadAllCalendarEvents,loadSubscribedPushNotificationUsers ]);

if ( ! user?.userIsValidated || ! operator ){
    navigate(`/${operatorBusinessName}/login`);
}

const handleSelect = (slotInfo) => {

    let [start, end, startStr, endStr] = Object.entries(slotInfo)

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

function addNewCalendarEvent(formData) {
    setModalOpen(false);
    let testAdminUsers =  [ userId, '603d37814967c605df1bb450', '6039cdc8560b6e1314d7bccc' ]; // refactor
    let emailAddresses = Object.values(users).filter(user => testAdminUsers.includes(user?._id))?.map(user => user?.email);
    let eventCount = (calendar?.calendarEvents?.length === undefined) ? 1 : (calendar?.calendarEvents?.length + 1);
    saveEventData(calendar, formData?.event, eventCount, formData, emailAddresses, testAdminUsers, calendarEventType);
};

const closeModal = () => {
    setModalOpen(false);
};

const openModal = () => {
    setModalOpen(true);
};

function saveEventData(calendar, event, eventCount, formData, emailAddresses, testAdminUsers, calendarEventType){
  
    try {
        let timeLineExists = timeLines?.find(timeline => timeline?.timeLineName === calendarEventType );

        alert(JSON.stringify(users))

        let config = {
            title: event?.title, 
            frequency: ( event?.rrule ) ? event?.rrule?.freq : undefined,
            duration: event?.duration, 
            calendarEventType,
            calendars,
            eventId: `${userId}_${eventCount}`,  
            calendarId: calendar?._id, 
            isRecurringEvent: ( event?.rrule ) ? true : event?.recurringEvent,
            users: users,
            timeLines,
            startTime: ( event?.rrule ) ? event?.rrule?.dtstart : event?.start,
            endTime: ( event?.rrule ) ? event?.rrule?.until : event?.end,
            initialDateStartTime: ( event?.rrule ) ? event?.rrule?.dtstart : event?.start,
            initialDateEndTime: ( event?.rrule ) ? event?.rrule?.until : event?.end
        }

        let timeLine = getTimeLineItemDetailsFromCalendarEvents( config );

        if ( calendar?.calendarEvents ) {            
                saveCalendarEvent(
                { ...calendar, calendarEvents: [...calendar?.calendarEvents, {...event, id:`${userId}_${eventCount}`, formData: { location: formData?.location, formData: formData?.formData } }] },
                    event,
                    user,
                    pushNotificationSubscribers?.filter(subscriber => testAdminUsers.includes( subscriber?.userId ) ),
                    emailAddresses
                );
                    if ( !timeLineExists ) {        
                        addNewTimeLine( timeLine?.timeLineName, timeLine?.groups, timeLine?.items, operator?._id );
                    } else {
                        saveTimeLine( timeLine );
                    }

        } else {
                addCalendarEvent(
                {   userId,
                    calendarEventType, 
                    operatorId: operator?._id,
                    calendarEvents: [ {
                    id:`${userId}_${eventCount}`,
                    userId,
                    calendarId: calendar?._id,
                    calendarEventType,
                    formData: { location: formData?.location, formData: formData?.formData },
                    ...event 
                }] },
                    user,
                    pushNotificationSubscribers?.filter(subscriber => testAdminUsers?.includes( subscriber?.userId ) ),
                    emailAddresses
                );
                if ( !timeLineExists ) {
                    addNewTimeLine( timeLine?.timeLineName, timeLine?.groups, timeLine?.items, operator?._id );
                } else {
                    saveTimeLine( timeLine );
                }
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
                        formData
                        submitEventButtonText={"Add New Event"}
                        handleSubmit={addNewCalendarEvent} 
                    /> 
            case eventEnum.ConsultationForm:
                return <Modal isOpen={isModalOpen} onRequestClose={closeModal}> 
                            <ConsultationForm 
                                user={user}
                                slotInfo={calendarSlotInfo}
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
                                    formData={scheduledStudents}
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
                                    formData={scheduledStudents}
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
                            events={calendar?.calendarEvents}
                            eventClick={handleEventClick}
                        />
                        <FullCalendar defaultView="listWeek" plugins={[listWeek, dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]} events={calendar?.calendarEvents} initialView='listWeek' />
                        </div>
    }
}
return (    
<div>
<h2>{`Hello ${user?.firstname}`}</h2>
    {
        renderSwitch( component )
    }
<button onClick={openModal}>Back</button> 
</div>
)};

const mapDispatch = {
    addCalendarEvent,
    saveCalendarEvent,
    loadAllCalendarEvents,
    loadSubscribedPushNotificationUsers,
    addNewTimeLine,
    saveTimeLine
};

const mapState = ( state, ownProps )  => ({
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    user: state?.users?.user,
    calendar: getCalendarEventsByUserIdSelector(state, ownProps),
    calendars: getCalendarsByOperatorId(state, ownProps),
    pushNotUsers: state?.notifications?.pushNotificationSubscribers,
    pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
    timeLines: getTimeLinesByOperatorId(state, ownProps)
})

export default connect(mapState, mapDispatch)(CalendarPage);