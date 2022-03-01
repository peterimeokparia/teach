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
getTimeLinesByOperatorId,
getPublishedForms } from 'services/course/selectors';

import {
eventEnum,
studentsOption,
getCalendarPageHeading,
userCanAddOrEditEvent } from 'services/course/pages/CalendarPage/helpers';

import {
role } from 'services/course/helpers/PageHelpers';

import { 
saveEventData  } from "services/course/pages/CalendarPage/helpers/events";

import { 
elementMeta } from "services/course/pages/QuestionsPage/helpers";

import {
loadFormBuilders,
addNewFormBuilder,
saveFormBuilder } from 'services/course/actions/formbuilders';

import {
goToForms } from 'services/course/pages/Users/helpers';

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
import Forms from 'services/course/pages/CalendarPage/components/Forms';
import Scheduling from 'services/course/pages/CalendarPage/components/Scheduling/index.js';
import useBuildEventDataHook from "services/course/pages/CalendarPage/hooks/useBuildEventDataHook";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/list/main.css";
import "./style.css";
import { object } from 'services/editor/etherpad-lite/src/tests/frontend/lib/underscore';

moment.locale("en-GB");

const CalendarPage = ({
    operatorBusinessName,
    pushNotificationSubscribers,
    operator,
    addEvent,
    saveEvent,
    loadCourses,
    loadAllEvents,
    loadFormBuilders,
    addNewFormBuilder,
    saveFormBuilder,
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
    publishedForms,
    formBuilders,
    formType,
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

    switch ( calendarEventType ) {
        case eventEnum.ReportForms:
        case eventEnum.QuizzForms:
            navigateToFormDetailsPage( info );  
            return;
        case eventEnum.NewEvent: 
            navigateToPersonalCalendarEventDetailsPage( info );
            return;
        case eventEnum.ConsultationForm:  
        case eventEnum.SessionScheduling:
        case eventEnum.TutorCalendar:
            navigateToSchedulingEventDetailsPage( info );
            return;
        default:
            break;
    }
}

function navigateToFormDetailsPage( info ){

    const currentEventId = info?.event?.id; 
    const currentEventObject = events?.find( event => event?._id === currentEventId );
    const selectedFormBuilderObject = currentEventObject?.schedulingData[0];
    const formName = selectedFormBuilderObject?.formName;
    const selectedUserId = userId;
    const selectedUser = users?.find( user => user?._id === selectedUserId );
    const currentUser = user;

    let formProps = {
        operatorBusinessName, 
        currentUser, 
        formName, 
        events, 
        currentUser,
        selectedUser,
        currentEventId,
        calendarEventType, 
        addNewFormBuilder,
        formBuilders
    };

    goToForms( formProps );
}

function navigateToPersonalCalendarEventDetailsPage( info ){
    let meetingId = info?.event?.title?.split('_')[1];
    navigate( `/${operatorBusinessName}/${calendarEventType}/boardeditor/${calendarId}/${user?._id}/${meetingId}`); 
}

function navigateToSchedulingEventDetailsPage( info ){
    if ( userCanAddOrEditEvent( info, user ) ) {
        navigate( `/${operatorBusinessName}/${calendarEventType}/calendar/${calendarId}/${user._id}/${info?.event?.id}`);
    }
}

function renderSwitch( param ) {
    switch ( param ) {

        case eventEnum.NewEvent:
            return <Modal isOpen={isModalOpen} onRequestClose={closeModal}> <Scheduling
                        slotInfo={calendarSlotInfo}
                        schedulingData
                        submitEventButtonText={"Add New Event"}
                        handleSubmit={addNewCalendarEvent} 
                    />
                    </Modal>;
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
        case eventEnum.ReportForms:
        case eventEnum.QuizzForms:    
            return <Modal isOpen={isModalOpen} onRequestClose={closeModal}> 
                        <Forms
                            reportProps={ { events, currentUser: user, selectedUserId: userId, publishedForms, calendarEventType, calendarId, addNewFormBuilder } }
                            operatorBusinessName={operatorBusinessName}
                            slotInfo={calendarSlotInfo}
                            handleSubmit={addNewCalendarEvent}
                        />
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
                        weekNumbers={true}
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
                    <FullCalendar  
                        defaultView="listWeek" 
                        plugins={[listWeek, dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]} 
                        events={ eventDataObj } 
                        initialView='listWeek' 
                    />
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
    setCalendarEventType,
    loadFormBuilders,
    addNewFormBuilder,
    saveFormBuilder,
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
    publishedForms: getPublishedForms(state, ownProps),
    formBuilders: Object.values( state?.formBuilders?.formBuilders)
});

export default connect(mapState, mapDispatch)(CalendarPage);
    
    
    
    
    