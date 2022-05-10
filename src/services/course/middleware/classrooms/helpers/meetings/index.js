import{
updateUser } from 'services/course/api';

import{
loadUsers,
updateCurrentUser,
lastLoggedInUser } from 'services/course/actions/users';

import{
addNewMeeting } from 'services/course/actions/meetings';

import { 
role } from 'services/course/helpers/PageHelpers';

import { 
navigate } from '@reach/router';

import{
incrementSessionCount } from 'services/course/actions/sessions';
    

import Swal from 'sweetalert2';


export const addCurentMeeting = ( props, store ) => {
  try {
      let { meetingProps, currentUser } = props;

      if ( currentUser?.meetingId ) {
        let user = {
        ...currentUser,
        lessonInProgress: true,
        inviteeSessionUrl: meetingProps?.meetingUrl
        };

        updateUser( user );
        store.dispatch( lastLoggedInUser( user ) );
        store.dispatch( loadUsers() );
        return;
      }

      store.dispatch(  
          addNewMeeting( { ...meetingProps } ) )
              .then(meeting => {
                if ( meeting?._id ) {
                   
                  let user = {
                    ...currentUser,
                    lessonInProgress: true,
                    inviteeSessionUrl: meetingProps?.meetingUrl,
                    meetingId: meeting?._id
                  };

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
    loadMeetingsByMeetingId( tutor?.meetingId )
      .then(meeting => {
        if ( currentUser?.role === role.Student
            && currentUser?.meetingId === tutor?.meetingId 
              && meeting?.invitees?.length === 0 ) {
          let session = meeting?.sessions?.find( session => session?.userId === currentUser?._id );
          
          handleIncrementingSessionCountForMeetingInvitees( session, store );
          updateMeetingStatus( currentUser, store );
          endMeetingWithPromoMessage( lessonUrl );
          return;
        }

        if ( currentUser?.role === role.Tutor && meeting?.invitees?.length === 0 ) {
          updateMeetingStatus( currentUser, store );
          endMeetingWithPromoMessage( lessonUrl );
          return;
        }

        updateMeetingStatus( currentUser, store );
    
        if ( currentUser?.role === role.Tutor ) {
            navigate(`/${operatorBusinessName}/verifyattendees/${currentUser?._id}/meeting/${meeting?._id}`);
          // endMeetingWithPromoMessage( lessonUrl );
        }
        }).catch( error => {
          throw Error(`handleMeetings: loadMeetingsByMeetingId: ${error}`);
    });  
  } catch (error) {
      console.error( error );
      throw Error(`handleMeetings: loadMeetingsByMeetingId: ${error}`);
  }
};

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
        navigate(`${lessonUrl}/thankyou`)
      });  
};
