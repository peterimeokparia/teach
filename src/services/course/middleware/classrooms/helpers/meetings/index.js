import { updateUser } from 'services/course/api';
import { loadUsers, updateCurrentUser, lastLoggedInUser } from 'services/course/actions/users';
import { addNewMeeting } from 'services/course/actions/meetings';
import { role } from 'services/course/helpers/PageHelpers';
import { navigate } from '@reach/router';
import { getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';
import { getselectedTutor } from 'services/course/pages/ClassRoomPage/components/CourseLessonDropDownComponent/helpers';
import { incrementSessionCount } from 'services/course/actions/sessions';
import { automateEventCreation } from 'services/course/pages/CalendarPage/helpers/events';
import { saveEventData } from 'services/course/pages/CalendarPage/helpers/events';
import { eventEnum } from 'services/course/pages/CalendarPage/helpers';
import { addNewMeetingNote } from 'services/course/actions/meetingNotes';
import { addCalendar } from 'services/course/actions/calendar';
import { addEvent } from 'services/course/actions/event';
import Swal from 'sweetalert2';
import moment from 'moment';

export const addCurentMeeting = ( props, store ) => {
  try {
      let { meetingProps, currentUser } = props;

      if ( currentUser?.meetingId ) {
        let user = { ...currentUser, lessonInProgress: true, inviteeSessionUrl: meetingProps?.meetingUrl };

        updateUser( user );
        store.dispatch( lastLoggedInUser( user ) );
        store.dispatch( loadUsers() );
        return;
      }
      store.dispatch(addNewMeeting( { ...meetingProps } ) ).then( meeting => {
        if ( meeting?._id ) {
          let user = { ...currentUser, lessonInProgress: true, inviteeSessionUrl: meetingProps?.meetingUrl, meetingId: meeting?._id };

          updateUser( user );
          store.dispatch( updateCurrentUser( user ) );
          store.dispatch( lastLoggedInUser( user ) );
          store.dispatch( loadUsers() );
        }
      }).catch( error => { console.log( error ); } );
  } catch (error) {
    throw Error(`Problem with adding a new meeting: ${ error }`);
  }
};

export const endCurrentMeeting = ( props, store ) => {
  try {
    handleMeetings( props, store );
  } catch (error) {
    throw Error(`Problem with ending the current meeting: ${ error }`);
  }
};

let lessonUrl = null;

function handleMeetings( props, store ){
  let { tutor, currentUser, loadMeetingsByMeetingId, operatorBusinessName } = props;

  try {
    lessonUrl = currentUser?.inviteeSessionUrl;
    loadMeetingsByMeetingId( tutor?.meetingId ).then(meeting => {
      handleStudentMeeting( props, lessonUrl, meeting, store ); 
      handleTutorMeeting( props, lessonUrl, meeting, store );    
      updateMeetingStatus( currentUser, store );
      handleMeetingAttendeeVerification( currentUser, meeting, operatorBusinessName );
    }).catch( error => {
      throw Error(`handleMeetings: loadMeetingsByMeetingId: ${error}`);
    });  
  } catch (error) {
    console.error( error );
    throw Error(`handleMeetings: loadMeetingsByMeetingId: ${error}`);
  }
};

function handleMeetingAttendeeVerification( currentUser, meeting, operatorBusinessName ){
  if ( currentUser?.role === role.Tutor ) {
    navigate(`/${operatorBusinessName}/verifyattendees/${currentUser?._id}/meeting/${meeting?._id}`);
  }
}

function handleTutorMeeting( props, lessonUrl, meeting, store ){
  let { currentUser } = props;

  if ( currentUser?.role === role.Tutor && noMeetingAttendants( meeting ) ) {
    updateMeetingStatus( currentUser, store );
    endMeetingWithPromoMessage( lessonUrl );
    return;
  }
}

function handleStudentMeeting( props, lessonUrl, meeting, store ){
  let { tutor, currentUser } = props;

  if ( currentUser?.role === role.Student && currentUser?.meetingId === tutor?.meetingId && noMeetingAttendants( meeting ) ) {
    let session = meeting?.sessions?.find( session => session?.userId === currentUser?._id );
    
    handleIncrementingSessionCountForMeetingInvitees( session, store );
    updateMeetingStatus( currentUser, store );
    endMeetingWithPromoMessage( lessonUrl );
    return;
  }
}

function handleIncrementingSessionCountForMeetingInvitees( session, store ){
  if ( session ) {
    store.dispatch( incrementSessionCount( session ) );
  }
};

function updateMeetingStatus( user, store ){
  let setInvitationUrl = "", nameOfLessonInProgress = "", lessonInProgress = false, meetingId = "", lesson="", course="";

  if ( user.role === role.Tutor ) {
    user = { ...user, timeMeetingEnded: Date.now() , setInvitationUrl, nameOfLessonInProgress, lessonInProgress, meetingId, lesson, course };
    updateCurrentMeetingUser( user, store );
  }
  if ( user.role === role.Student ) {
    user = { ...user, timeMeetingEnded: Date.now() , setInvitationUrl, nameOfLessonInProgress, lessonInProgress, meetingId, lesson, course };
    updateCurrentMeetingUser( user );
  }
};
  
function updateCurrentMeetingUser( user, store ) {
  updateUser(user)
  .then( user => {
    store.dispatch( lastLoggedInUser( user ) );
  }).catch( error => console.log( error ));
};

export function endMeetingWithPromoMessage ( lessonUrl ) {
  Swal.fire({
      title: "Thank you. Your meeting has ended.",
      icon: 'info',
      html: '<div><p>Earn points, gift cards and rewards. <br></br> Invite your friends to use the platform. </p></div>',
      showCancelButton: false,
      showConfirmButton: false,
      confirmButtonText: "",
      confirmButtonColor: "",
      }).then( (response) => {
        navigate(`${lessonUrl}/thankyou`);
      });  
};

export function goToMeetingWithPromoMessage ( lessonUrl, meetingId ) {
  Swal.fire({
      title: ( meetingId !== "" ) ? "Please join your meeting." : "Please wait. Your meeting has not started.",
      icon: 'info',
      html: '<div><p>Earn points, gift cards and rewards. <br></br> Invite your friends to use the platform. </p></div>',
      showCancelButton: false,
      showConfirmButton: ( true ),
      confirmButtonText: ( meetingId !== "" ) ? 'Please join meeting.' : 'Please wait.',
      confirmButtonColor:  ( meetingId !== "" ) ? '#20c997' : '#ff0000',
      }).then( (response) => {
      if ( response?.value & ( meetingId !== "" ) ) {
        navigate(`${lessonUrl}/${meetingId}`);
      } else {
        return;
      }
  });  
};

export function addNewMeetingEventToCalendar( meetingEvent, store ){
  let selectedTutor = getselectedTutor( Object.values(store?.getState()?.users?.users), store?.getState()?.classrooms?.currentTutor?._id );
  let currentMeeting = Object.values( store?.getState()?.meetings?.meetings )?.find( meeting => meeting?._id === selectedTutor?.meetingId );
  let meeting = ( meetingEvent?._id ) ? meetingEvent : currentMeeting;
  let currentUser = meetingEvent?.currentUser;
  let userId = currentUser?._id;
  let operatorBusinessName = (meetingEvent?.operatorBusinessName) ? meetingEvent?.operatorBusinessName : getItemFromSessionStorage('operatorBusinessName');
  let operator = Object.values( store.getState()?.operators?.operators)?.find(operator => operator?.businessName === operatorBusinessName );
  let operatorId = (operator?._id) ? operator?._id : currentUser?.operatorId ;
  let users = Object.values( store?.getState()?.users?.users )?.filter( users => users?.operatorId === currentUser?.operatorId );
  let meetingId = ( meeting?._id ) ? meeting?._id : selectedTutor?.meetingId;
  let meetingStartTime = meetingEvent?.timeStarted; 
  let courseTitle = meetingEvent?.courseTitle;
  let lessonTitle = meetingEvent?.lessonTitle;
  let calendars = Object.values( store?.getState()?.calendar?.calendars )?.filter( calendar => calendar?.operatorId === currentUser?.operatorId );
  let title =  ( courseTitle && lessonTitle ) ? `${courseTitle}_${lessonTitle}_${meetingId}_${selectedTutor?.firstname}` : `${selectedTutor?.firstname}_${meetingId}`;
  let location = `${selectedTutor?.firstname} classroom`;
  let recurringEvent = false;
  let allDay = false;
  let startDateTime = moment(meetingStartTime)?.local(true);
  let durationHrs = 1;
  let testAdminUsers =  [ userId, '603d37814967c605df1bb450', '6039cdc8560b6e1314d7bccc' ]; // refactor
  let pushNotificationSubscribers = Object.values( store?.getState()?.notifications?.pushNotificationSubscribers )?.filter( subscriber => subscriber?.operatorId === meeting?.operator?._id );
  let event = { title, location, recurringEvent, allDay, startDateTime };
  let notesConfig = { meetingId, userId, title, markDownContent: "", notesUrl: "", videoUrl: "" }; 
  let newCalendarEventData = automateEventCreation( event, meetingId, durationHrs, undefined, undefined );
  let  eventProps = { calendarEventData: newCalendarEventData, testAdminUsers, calendarEventType: eventEnum.NewEvent,
                    calendars, user: currentUser, users, userId, pushNotificationSubscribers, operatorId };

  if ( currentUser?.role === role.Tutor && selectedTutor?._id === currentUser?._id ) {
      let tutorsCalendar = calendars?.find( calendar =>  calendar?.calendarEventType === eventEnum.NewEvent);

      saveEventData({ ...eventProps, calendar: tutorsCalendar, calendarEventData: newCalendarEventData, addCalendar, addEvent}, store);
      store.dispatch( addNewMeetingNote( notesConfig ) );
      if ( meetingAttendants( meetingEvent ) ) {
         saveStudentMeetingToCalendar( store, meetingEvent, eventProps, notesConfig );
      }
  }
  if ( currentUser?.role === role.Student ) {
      let studentsCalendar = calendars?.find( calendar =>  calendar?.calendarEventType === eventEnum.Student );

      saveEventData({...eventProps, calendar: studentsCalendar, calendarEventData: newCalendarEventData, addCalendar, addEvent }, store);
      store.dispatch( addNewMeetingNote( notesConfig ) );
  }
}

function saveStudentMeetingToCalendar( store, meetingEvent, eventProps, notesConfig ){
  let { calendarEventData: newCalendarEventData, calendars} = eventProps;

  meetingEvent?.invitees.forEach(student => { // premise: one calendar object with varying student event data then filter by student id
    if ( student ) {
      let studentsCalendar = calendars?.find( calendar =>  calendar?.calendarEventType === eventEnum.Student );

      saveEventData({ ...eventProps, calendar: studentsCalendar, calendarEventData: newCalendarEventData, addCalendar, addEvent}, store);
      store.dispatch( addNewMeetingNote( notesConfig ) );       
    }
  });
}

function noMeetingAttendants( meeting ){
  return meeting?.invitees?.length === 0; 
}

function meetingAttendants( meeting ){
  return meeting?.invitees?.length > 0; 
}
