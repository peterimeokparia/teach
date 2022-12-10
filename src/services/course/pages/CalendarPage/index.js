import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { addNewTimeLine, saveTimeLine } from 'services/course/actions/timelines'; 
import { addCalendar, saveCalendar, loadAllCalendars } from 'services/course/actions/calendar';
import { addEvent } from 'services/course/actions/event';
import { getCoursesByOperatorId, getEventsByOperatorId, getPushNotificationUsersByOperatorId, getCalendarByCalendarEventType,     
    getOperatorFromOperatorBusinessName, getUsersByOperatorId, getCalendarsByOperatorId, getTimeLinesByOperatorId,
    getPublishedForms, getLessonsByCourseIdSelector} from 'services/course/selectors';
import { eventEnum, studentsOption, getCalendarPageHeading, userCanAddOrEditEvent, formNames } from 'services/course/pages/CalendarPage/helpers';
import { navigateOnCalendarClickEvent  } from 'services/course/pages/CalendarPage/helpers/calendar/helpers';
import { addNotes, loadAllNotes } from 'services/course/actions/notes';
import { saveEventData  } from "services/course/pages/CalendarPage/helpers/events";
import { renderSwitch  } from "services/course/pages/CalendarPage/helpers/calendar";
import { addNewFormBuilder, saveFormBuilder } from 'services/course/actions/formbuilders';
import { goToForms } from 'services/course/pages/Users/helpers';
import { handleLessons } from 'services/course/pages/CalendarPage/helpers/lessons';
import { forceReload } from 'services/course/helpers/ServerHelper';
import useBuildEventDataHook from "services/course/pages/CalendarPage/hooks/useBuildEventDataHook";
import useLessonHook from "services/course/pages/CalendarPage/hooks/useLessonHook";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/list/main.css";
import "./style.css";

const CalendarPage = ({
    operatorBusinessName,
    pushNotificationSubscribers,
    operator,
    addEvent,
    addNotes,
    loadAllNotes,
    addNewFormBuilder,
    saveFormBuilder,
    calendarEventType,
    calendar,
    calendarId,
    calendars,
    events,
    addCalendar,
    saveCalendar,
    loadAllCalendars,
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
    courses,
    lessons,
    allNotes }) => {
    if ( ! user?.userIsValidated  ){
        navigate(`/${operatorBusinessName}/login`);
    };

    const operatorId = operator?._id;

    const calendarEventProps = {
        userId,
        courseId,
        lessonId,
        calendarEventType, 
        events, 
        courses,
        calendarId, 
        user
    };
        
    let {
        eventDataObj, isModalOpen, component, scheduledStudents,
        calendarSlotInfo, handleSelect, setModalOpen, setScheduledStudents,
    } = useBuildEventDataHook( calendarEventProps );

    let {
        renderLessonModal, setRenderLessonModal, lessonProps, setLessonProps
    } = useLessonHook();
    
function addNewCalendarEvent( calendarEventData ) {
    setModalOpen(false); // Need to set up groups and group management.
    
    let testAdminUsers =  [ userId, '603d37814967c605df1bb450', '6039cdc8560b6e1314d7bccc' ]; // refactor

    let saveEventProps = {
        addEvent, addCalendar, calendar, calendarEventData, testAdminUsers, 
        calendarEventType, operatorId, pushNotificationSubscribers, user, users, userId
    };

    saveEventData( saveEventProps );
};

const closeModal = () => {
    setModalOpen(false);
};

let props = {
    operatorBusinessName, events, calendarEventType, addNewFormBuilder, formBuilders,
    calendarId, user, events, calendarEventType, addNewFormBuilder, 
    formBuilders, userId, users,  formNames, allNotes, courseId, lessonId, 
    addNotes, loadAllNotes, operatorId, setLessonProps, setModalOpen, setRenderLessonModal 
};

const handleEventClick = ( info ) => {
    navigateOnCalendarClickEvent( calendarEventType, info, props ); 
};

function renderEventContent( eventInfo ){
    return (
        <div>
            <p>{eventInfo?.event?.title}</p>
            <img src={eventInfo?.event?.url} alt=''></img>
        </div>
    );
}

function handleCalendarModalReloadOnClose(){
    closeModal();
    forceReload();
}

let renderSwitchProps = {
    operatorBusinessName, operatorId, isModalOpen, closeModal, calendarSlotInfo, addNewCalendarEvent,
    addNotes, user, users, courses, lessons, scheduledStudents, setScheduledStudents, studentsOption,
    events, userId, publishedForms, calendarEventType, calendarId, courseId,lessonId, classRoomId,
    addNewFormBuilder, eventDataObj, component, formNames,handleEventClick, handleSelect, renderEventContent,
    lessonProps, renderLessonModal
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
    loadAllCalendars,
    addNewTimeLine,
    saveTimeLine,
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
    pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
    timeLines: getTimeLinesByOperatorId(state, ownProps),
    courses: getCoursesByOperatorId(state, ownProps),
    lessons: getLessonsByCourseIdSelector(state, ownProps),
    publishedForms: getPublishedForms(state, ownProps),
    formBuilders: Object.values( state?.formBuilders?.formBuilders ),
    allNotes: Object.values( state?.notes?.notes )
});

export default connect(mapState, mapDispatch)(CalendarPage);
    
    
    
    
    