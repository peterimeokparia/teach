import { 
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import {
loadSubscribedPushNotificationUsers } from 'services/course/actions/notifications';

import {
addNewTimeLine,    
saveTimeLine } from 'services/course/actions/timelines'; 

import { 
setCalendarEventType,
addCalendar,
saveCalendar,
loadAllCalendars } from 'services/course/actions/calendar';

import { 
addEvent,
saveEvent,    
loadAllEvents } from 'services/course/actions/event';

import { 
loadCourses } from "services/course/actions/courses";

import {
getCoursesByOperatorId,    
getEventsByOperatorId,
getPushNotificationUsersByOperatorId,
getCalendarEventsByUserIdSelector,     
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCalendarsByOperatorId,
getTimeLinesByOperatorId } from 'services/course/selectors';

import {
eventEnum,
studentsOption,
getCalendarPageHeading,
userCanAddOrEditEvent } from 'services/course/pages/CalendarPage/helpers';

import {
role } from 'services/course/helpers/PageHelpers';

import { 
saveEventData  } from "services/course/pages/CalendarPage/helpers/events";

// import { 
// momentLocalizer } from "react-big-calendar";
// const localizer = momentLocalizer(moment);
import Calendar from 'services/course/helpers/Calendar';
import CalendarEvent from 'services/course/helpers/CalendarEvent';
import FullCalendar from '@fullcalendar/react';
import rrulePlugin from "@fullcalendar/rrule";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listWeek from "@fullcalendar/list";
import ConsultationForm from 'services/course/pages/CalendarPage/components/ConsultationForm';
import Modal from "react-modal";
import moment from "moment";
import SessionScheduling from 'services/course/pages/CalendarPage/components/TimeLines/SessionScheduling';
import OnlineTutoringRequestForm from 'services/course/pages/CalendarPage/components/OnlineTutoringRequestForm';
import Scheduling from 'services/course/pages/CalendarPage/components/Scheduling/index.js';
import useBuildEventDataHook from "services/course/pages/CalendarPage/hooks/useBuildEventDataHook";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/list/main.css";
import "./style.css";

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
    } = useBuildEventDataHook( calendarEventType, events, calendarId, user );
    
function addNewCalendarEvent( calendarEventData ) {
    setModalOpen(false); // Need to set up groups and group management.
    
    let testAdminUsers =  [ userId, '603d37814967c605df1bb450', '6039cdc8560b6e1314d7bccc' ]; // refactor

    let saveEventProps = {
        addEvent,
        addCalendar,
        calendar, 
        calendarEventData, 
        testAdminUsers, 
        calendarEventType, 
        operatorId: operator?._id,
        pushNotificationSubscribers, 
        user, 
        users,
        userId
    };

    saveEventData( saveEventProps );
};

const closeModal = () => {
    setModalOpen(false);
};

const openModal = () => {
    setModalOpen(true);
};

const handleEventClick = ( info ) => {
    if ( calendarEventType === eventEnum.NewEvent ) {
        // navigate(`/${operatorBusinessName}/personal/${eventEnum.NewEvent}/calendar/${personalCalendar._id}/user/${user._id}`);
        // navigate( `/${operatorBusinessName}/${calendarEventType}/calendar/${calendarId}/${user._id}/${info?.event?.id}`);
        return;
    } else {
        if ( userCanAddOrEditEvent( info, user ) ) {
            navigate( `/${operatorBusinessName}/${calendarEventType}/calendar/${calendarId}/${user._id}/${info?.event?.id}`);
            return;
        }
    }
};

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
            case eventEnum.TutorCalendar:
                return <Modal isOpen={isModalOpen} onRequestClose={closeModal}> 
                            <SessionScheduling 
                                scheduledStudents={scheduledStudents}
                                onChange={setScheduledStudents}
                                options={studentsOption(users)}
                            > 
                            {(user.role === role.Student ) && 
                                <ConsultationForm 
                                    user={user}
                                    slotInfo={calendarSlotInfo}
                                    courses={courses}
                                    handleSubmit={addNewCalendarEvent}
                                />  
                            } 
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
<div className="calendar">
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
    
    
    
    
    