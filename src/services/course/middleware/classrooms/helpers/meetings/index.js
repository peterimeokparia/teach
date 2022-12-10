import { updateUser } from 'services/course/api';
import { loadUsers, updateCurrentUser, lastLoggedInUser } from 'services/course/actions/users';
import { addNewMeeting } from 'services/course/actions/meetings';
import { role } from 'services/course/helpers/PageHelpers';
import { navigate } from '@reach/router';
import { incrementSessionCount } from 'services/course/actions/sessions';
import { saveEventData } from 'services/course/pages/CalendarPage/helpers/events';
import { eventEnum } from 'services/course/pages/CalendarPage/helpers';
import { addNewMeetingNote } from 'services/course/actions/meetingNotes';
import { addCalendar } from 'services/course/actions/calendar';
import { addEvent } from 'services/course/actions/event';
import { initializeMeetingProps } from 'services/course/middleware/classrooms/helpers/meetings/helpers';
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
      title: ( (meetingId && meetingId !== "") ) ? "Please join your meeting." : "Please wait. Your meeting has not started.",
      icon: 'info',
      html: '<div><p>Earn points, gift cards and rewards. <br></br> Invite your friends to use the platform. </p></div>',
      showCancelButton: false,
      showConfirmButton: ( true ),
      confirmButtonText: ( meetingId !== "" ) ? 'Please join meeting.' : 'Please wait.',
      confirmButtonColor:  ( meetingId !== "" ) ? '#20c997' : '#ff0000',
      }).then( (response) => {
      if ( response?.value && meetingId ) {
        navigate(`${lessonUrl}/${meetingId}`);
      } else {
        return;
      }
  });  
};

export function addNewMeetingEventToCalendar( meetingEvent, store ){
  let { 
    currentUser, meetingId,courseId, lessonId,eventProps
  } = initializeMeetingProps( meetingEvent, store );

  if (  currentUser?.role === role.Tutor  ) {
    saveStudentMeetingToCalendar( store, meetingEvent, eventProps, meetingId, courseId, lessonId );
    saveTutorsMeetingToCalendar( store, meetingEvent, eventProps, meetingId, courseId, lessonId );
  }
}

function saveStudentMeetingToCalendar( store, meetingEvent, eventProps, meetingId, courseId, lessonId ){
  let { calendarEventData: newCalendarEventData, calendars } = eventProps;
  let studentsCalendar = calendars?.find( calendar =>  calendar?.calendarEventType === eventEnum.Student );

  meetingEvent?.invitees.map( user => {
    saveEventData({ ...eventProps, meetingId, user, userId: user?._id, calendar: studentsCalendar, calendarEventData: {...newCalendarEventData, courseId, lessonId, meetingId }, addCalendar, addEvent}, store );
  });
}

function saveTutorsMeetingToCalendar( store, meetingEvent, eventProps, meetingId, courseId, lessonId ){
  let { calendarEventData: newCalendarEventData, calendars } = eventProps;
  let tutorsCalendar = calendars?.find( calendar =>  calendar?.calendarEventType === eventEnum.NewEvent);

  saveEventData({ ...eventProps, meetingId, calendar: tutorsCalendar, calendarEventData: {...newCalendarEventData, courseId, lessonId, meetingId  }, addCalendar, addEvent}, store );
}

function createMeetingNotes( store, notesConfig ) {
  store.dispatch( addNewMeetingNote( notesConfig ) );  
}

function noMeetingAttendants( meeting ){
  return meeting?.invitees?.length === 0; 
}
