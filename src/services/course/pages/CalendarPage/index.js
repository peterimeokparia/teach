import { 
connect } from 'react-redux';

import {
eventEnum, 
getCalendarColor } from 'Services/course/Pages/CalendarPage/helpers';

import { 
navigate } from '@reach/router';

import {
loadSubscribedPushNotificationUsers } from 'Services/course/Actions/Notifications';

import {
addNewTimeLine,    
saveTimeLine } from 'Services/course/Actions/TimeLines'; 

import { 
setCalendarEventType,
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
getCalendarPageHeading } from 'Services/course/Pages/CalendarPage/helpers';

// import { 
// momentLocalizer } from "react-big-calendar";

// const localizer = momentLocalizer(moment);

//Updates to events: title, start time and end time should cascade down to time line items

import Calendar from 'Services/course/helpers/Calendar';
import CalendarEvent from 'Services/course/helpers/CalendarEvent';
import FullCalendar from '@fullcalendar/react';
import rrulePlugin from "@fullcalendar/rrule";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listWeek from "@fullcalendar/list";
import ConsultationForm from 'Services/course/Pages/CalendarPage/Components/ConsultationForm';
import Modal from "react-modal";
import moment from "moment";
import SessionScheduling from 'Services/course/Pages/CalendarPage/Components/TimeLines/SessionScheduling';
import OnlineTutoringRequestForm from 'Services/course/Pages/CalendarPage/Components/OnlineTutoringRequestForm';
import Scheduling from 'Services/course/Pages/CalendarPage/Components/Scheduling/index.js';
import useBuildEventDataHook from "./hooks/useBuildEventDataHook";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/list/main.css";

moment.locale("en-GB");

const CalendarPage = ({
    operatorBusinessName,
    pushNotificationSubscribers,
    operator,
    addEvent,
    saveEvent,
    loadCourses,
    loadAllEvents,
    calendarEventType,
    setCalendarEventType,
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
    courses }) => {
    if ( ! user?.userIsValidated  ){
        navigate(`/${operatorBusinessName}/login`);
    };
        
    let {
        eventDataObj,
        isModalOpen,
        component,
        scheduledStudents,
        calendarSlotInfo,
        handleSelect,
        setModalOpen,
        setScheduledStudents,
    } = useBuildEventDataHook( calendarEventType, events, calendarId );
 
function addNewCalendarEvent( calendarEventData ) {
    setModalOpen(false); // Need to set up groups and group management.
    let testAdminUsers =  [ userId, '603d37814967c605df1bb450', '6039cdc8560b6e1314d7bccc' ]; // refactor

    saveEventData(calendar, calendarEventData, testAdminUsers, calendarEventType, operator?._id);
};

const closeModal = () => {
    setModalOpen(false);
};

const openModal = () => {
    setModalOpen(true);
};

const handleEventClick = (info) => {
    navigate( `/${operatorBusinessName}/${calendarEventType}/calendar/${calendarId}/${user._id}/${info?.event?.id}`);
};

function saveEventData(calendar, calendarEventData, testAdminUsers, calendarEventType, operatorId){
    let color = getCalendarColor( calendars );

    let calendarEventConfig = { 
        calendar, 
        calendarEventData, 
        testAdminUsers, 
        calendarEventType, 
        operatorId, 
        pushNotificationSubscribers, 
        user, 
        users,
        userId,
        color 
    };

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

function renderSwitch( param ) {
    switch ( param ) {

        case eventEnum.NewEvent:
            return <Scheduling
                        slotInfo={calendarSlotInfo}
                        schedulingData
                        submitEventButtonText={"Add New Event"}
                        handleSubmit={addNewCalendarEvent} 
                    />; 
        case eventEnum.ConsultationForm:
            return <Modal isOpen={isModalOpen} onRequestClose={closeModal}> 
                        <ConsultationForm 
                            user={user}
                            slotInfo={calendarSlotInfo}
                            courses={courses}
                            handleSubmit={addNewCalendarEvent}
                        /> 
                    </Modal>;
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
                    </Modal>;
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
                    </Modal>;
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
                        events={ eventDataObj }
                        eventClick={handleEventClick}
                    />
                    <FullCalendar defaultView="listWeek" plugins={[listWeek, dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]} events={ eventDataObj } initialView='listWeek' />
                    </div>;

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
); };

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
    loadCourses,
    setCalendarEventType
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
});

export default connect(mapState, mapDispatch)(CalendarPage);




