import { navigate } from '@reach/router';
import { eventEnum, userCanAddOrEditEvent } from 'services/course/pages/CalendarPage/helpers';
import { goToForms } from 'services/course/pages/Users/helpers';

export function navigateOnCalendarClickEvent( calendarEventType, info, props ) {
    switch ( calendarEventType ) {
        case eventEnum.Lessons:
            navigateToLessonPage( info, props );  
            return;
        case eventEnum.ReportForms:
        case eventEnum.QuizzForms:
            navigateToFormDetailsPage( info, props );  
            return;
        case eventEnum.NewEvent: 
            navigateToPersonalCalendarEventDetailsPage( info, props );
            return;
        case eventEnum.ConsultationForm:  
        case eventEnum.SessionScheduling:
        case eventEnum.TutorCalendar:
            navigateToSchedulingEventDetailsPage( info, props );
            return;
        default:
            break;
    }
}

function navigateToFormDetailsPage( info, props ){
    let { operatorBusinessName, events, calendarEventType, addNewFormBuilder, formBuilders } = props;

    const calendarInfo = getCalendarInfo( info );
    const currentEventId = calendarInfo?.currentEventId; 
    const formName = calendarInfo?.formName;
    const selectedUser = calendarInfo?.selectedUser;
    const currentUser = calendarInfo?.currentUser;

    let formProps = {
        operatorBusinessName, formName, events, currentUser, selectedUser,
        currentEventId, calendarEventType, addNewFormBuilder, formBuilders
    };

    goToForms( formProps );
}

function navigateToPersonalCalendarEventDetailsPage( info, props ){
    let { operatorBusinessName, calendarEventType, calendarId, user } = props;

    let meetingId = info?.event?.title?.split('_')[1];

    navigate( `/${operatorBusinessName}/${calendarEventType}/boardeditor/${calendarId}/${user?._id}/${meetingId}`); 
}

function navigateToSchedulingEventDetailsPage( info, props ){
    let { operatorBusinessName, calendarEventType, calendarId, user } = props;

    if ( userCanAddOrEditEvent( info, user ) ) {
        navigate( `/${operatorBusinessName}/${calendarEventType}/calendar/${calendarId}/${user._id}/${info?.event?.id}`);
    }
}

function getCalendarInfo( info, props ){
    let { events, userId, users, user } = props;

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

function navigateToLessonPage( info, props ) {
    let {  formNames, allNotes, courseId, lessonId,
    operatorBusinessName, addNotes, loadAllNotes, operatorId,
    setLessonProps, setModalOpen, setRenderLessonModal  } = props;

    const calendarInfo = getCalendarInfo( info, props );
    const currentEventId = calendarInfo?.currentEventId; 
    const formName = calendarInfo?.formName;
    const selectedUser = calendarInfo?.selectedUser;
    const currentUser = calendarInfo?.currentUser;
    const title = calendarInfo?.formName;

    let lessonProps = {
        formNames, allNotes, currentEventId, formName, selectedUser, currentUser,
        title, courseId, lessonId, userId: currentUser?._id, markDownContent: null,
        content: null, noteDate: Date.now, operatorId, eventId: currentEventId,
        operatorBusinessName, addNotes, loadAllNotes
    };

    setLessonProps( lessonProps );
    setModalOpen( true );
    setRenderLessonModal( true );
    return;
}