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
getCalendarByCalendarEventType,     
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCalendarsByOperatorId,
getTimeLinesByOperatorId,
getPublishedForms, 
getLessonsByCourseIdSelector} from 'services/course/selectors';

import {
eventEnum,
studentsOption,
getCalendarPageHeading,
userCanAddOrEditEvent, 
formNames } from 'services/course/pages/CalendarPage/helpers';

import {
addNotes,
loadAllNotes } from 'services/course/actions/notes';

import { 
saveEventData  } from "services/course/pages/CalendarPage/helpers/events";

import { 
renderSwitch  } from "services/course/pages/CalendarPage/helpers/calendar";

import { 
elementMeta } from "services/course/pages/QuestionsPage/helpers";

import {
loadFormBuilders,
addNewFormBuilder,
saveFormBuilder } from 'services/course/actions/formbuilders';

import {
goToForms } from 'services/course/pages/Users/helpers';

import {
handleLessons } from 'services/course/pages/CalendarPage/helpers/lessons';

import { 
forceReload } from 'services/course/helpers/ServerHelper';

import Calendar from 'services/course/helpers/Calendar';
import CalendarEvent from 'services/course/helpers/CalendarEvent';
import useBuildEventDataHook from "services/course/pages/CalendarPage/hooks/useBuildEventDataHook";
import useLessonHook from "services/course/pages/CalendarPage/hooks/useLessonHook";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/list/main.css";
import "./style.css";
//import moment from "moment";
//moment.locale("en-GB");

const CalendarPage = ({
    operatorBusinessName,
    pushNotificationSubscribers,
    operator,
    addEvent,
    addNotes,
    loadAllNotes,
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
    courseId,
    lessonId, 
    classRoomId,
    addNewTimeLine,
    saveTimeLine,
    publishedForms,
    formBuilders,
    formType,
    courses,
    lessons,
    allNotes }) => {

    if ( ! user?.userIsValidated  ){
        navigate(`/${operatorBusinessName}/login`);
    };

    const operatorId = operator?._id;
        
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

    let {
        renderLessonModal,
        setRenderLessonModal,
        lessonProps,
        setLessonProps
    } = useLessonHook();
    
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
        operatorId,
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
        case eventEnum.Lessons:
            navigateToLessonPage( info );  
            return;
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

function renderEventContent( eventInfo ){
    return (
        <div>
            <p>{eventInfo?.event?.title}</p>
            <img src={eventInfo?.event?.url}></img>
        </div>
    )
}

function navigateToFormDetailsPage( info ){

    const calendarInfo = getCalendarInfo( info );
    const currentEventId = calendarInfo?.currentEventId; 
    const currentEventObject = calendarInfo?.currentEventObject;
    const selectedFormBuilderObject = calendarInfo?.selectedFormBuilderObject;
    const formName = calendarInfo?.formName;
    const selectedUserId = calendarInfo?.selectedUserId;
    const selectedUser = calendarInfo?.selectedUser;
    const currentUser = calendarInfo?.currentUser;

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

function getCalendarInfo( info ){
    const currentEventId = info?.event?.id; 
    const currentEventObject = events?.find( event => event?._id === currentEventId );
    const selectedFormBuilderObject = currentEventObject?.schedulingData[0];
    const formName = selectedFormBuilderObject?.formName;
    const selectedUserId = userId;
    const selectedUser = users?.find( user => user?._id === selectedUserId );
    const currentUser = user;

    return {
        currentEventId,
        currentEventObject,
        selectedFormBuilderObject,
        formName,
        selectedUserId,
        selectedUser,
        currentUser
    };
}

function navigateToLessonPage( info ){

    const calendarInfo = getCalendarInfo( info );
    const currentEventId = calendarInfo?.currentEventId; 
    const currentEventObject = calendarInfo?.currentEventObject;
    const selectedFormBuilderObject = calendarInfo?.selectedFormBuilderObject;
    const formName = calendarInfo?.formName;
    const selectedUserId = calendarInfo?.selectedUserId;
    const selectedUser = calendarInfo?.selectedUser;
    const currentUser = calendarInfo?.currentUser;
    const title = calendarInfo?.formName;

    let lessonProps = {
        formNames,
        allNotes,
        currentEventId,
        formName,
        selectedUser,
        currentUser,
        title,
        courseId,
        lessonId,
        userId: currentUser?._id,
        markDownContent: null,
        content: null,
        noteDate: Date.now,
        operatorId,
        eventId: currentEventId,
        operatorBusinessName,
        addNotes,
        loadAllNotes
    }
    setLessonProps( lessonProps );
    setModalOpen( true );
    setRenderLessonModal( true );
    return;
}

function handleCalendarModalReloadOnClose(){
    closeModal();
    forceReload();
}

let renderSwitchProps = {
    operatorBusinessName,
    operatorId,
    isModalOpen,
    closeModal,
    calendarSlotInfo,
    addNewCalendarEvent,
    addNotes,
    user,
    users,
    courses,
    lessons,
    scheduledStudents,
    setScheduledStudents,
    studentsOption,
    events, 
    userId, 
    publishedForms, 
    calendarEventType, 
    calendarId, 
    courseId,
    lessonId, 
    classRoomId,
    addNewFormBuilder,
    eventDataObj,
    component,
    formNames,
    handleEventClick,
    handleSelect,
    renderEventContent,
    lessonProps,
    renderLessonModal
};

return (    
    <div className="calendar">
        <h2>{ `Hello ${user?.firstname}` }</h2>
        <h2>{ getCalendarPageHeading( calendarEventType ) }</h2>
            { ( renderLessonModal ) 
                ?  handleLessons( renderSwitchProps )
                :  renderSwitch( renderSwitchProps )   
            }
        <button onClick={() => handleCalendarModalReloadOnClose()}>Back</button> 
    </div>
    ); 
};

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
    loadAllNotes,
    addNotes
};

const mapState = ( state, ownProps )  => ({
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    user: state?.users?.user,
    calendar: getCalendarByCalendarEventType(state, ownProps),
    calendars: getCalendarsByOperatorId(state, ownProps),
    events: getEventsByOperatorId(state, ownProps),
    pushNotUsers: state?.notifications?.pushNotificationSubscribers,
    pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
    timeLines: getTimeLinesByOperatorId(state, ownProps),
    courses: getCoursesByOperatorId(state, ownProps),
    lessons: getLessonsByCourseIdSelector(state, ownProps),
    publishedForms: getPublishedForms(state, ownProps),
    formBuilders: Object.values( state?.formBuilders?.formBuilders ),
    allNotes: Object.values( state?.notes?.notes )
});

export default connect(mapState, mapDispatch)(CalendarPage);
    
    
    
    
    