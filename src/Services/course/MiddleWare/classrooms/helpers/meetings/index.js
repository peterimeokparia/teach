import{
updateUser } from 'Services/course/Api';

import{
incrementSessionCount } from 'Services/course/Actions/Sessions';

import{
loadUsers,
updateCurrentUser,
lastLoggedInUser,
updateUserInvitationUrl } from 'Services/course/Actions/Users';

import{
loadMeetingsByMeetingId,
addNewMeeting,
saveMeeting } from 'Services/course/Actions/Meetings';

import { 
role } from 'Services/course/helpers/PageHelpers';
    
    import Swal from 'sweetalert2';
    
    export const addCurentMeeting = ( props, store ) => {
        try {
            let { meetingProps, currentUser } = props;
    
            store.dispatch(  
                addNewMeeting( { ...meetingProps } ) )
                    .then(meeting => {
                        updateUser( { ...currentUser, meetingId: meeting?._id } );
                        store.dispatch( updateCurrentUser( { ...currentUser, meetingId: meeting?._id } ) );
                        store.dispatch( lastLoggedInUser( { ...currentUser, meetingId: meeting?._id } ) );
                        store.dispatch( loadUsers() );
                    }).catch( error => { console.log( error ); } );
        } catch (error) {
            throw Error(`Problem with adding a calendar event: ${ error }`);
        }
    };
    
    export const endCurrentMeeting = ( props, store ) => {
        try {
            handleMeetings( props, store );
        } catch (error) {
            throw Error(`Problem with adding a calendar time line group: ${ error }`);
        }
    };
    
    function handleMeetings( props, store ){
        let usersWhoJoinedTheMeeting = [];
      
        let { tutor, currentUser } = props;
      
        try {
        store?.dispatch( loadMeetingsByMeetingId( tutor?.meetingId ) )
          .then(meeting => {
            updateMeetingStatus(currentUser, store );
              if ( currentUser?.role === role.Tutor ) {
                incrementSessionCountForMeetingUsers( currentUser, meeting, usersWhoJoinedTheMeeting, store );
                store?.dispatch( saveMeeting(tutor?.meetingId, { ...meeting, timeEnded: Date.now(), 
                  usersWhoJoinedTheMeeting: ( meeting.usersWhoJoinedTheMeeting === undefined )
                    ? usersWhoJoinedTheMeeting
                    : (meeting?.usersWhoJoinedTheMeeting.includes(currentUser?._id) 
                        ? [ ...meeting?.usersWhoJoinedTheMeeting, ...usersWhoJoinedTheMeeting ] 
                        : [ ...meeting?.usersWhoJoinedTheMeeting, currentUser?._id, ...usersWhoJoinedTheMeeting ]) 
                }) );
              }
            })
            .catch( error => {
              throw Error(`handleMeetings: loadMeetingsByMeetingId: ${error}`);
          });  
        } catch (error) {
              console.error( error );
              throw Error(`handleMeetings: loadMeetingsByMeetingId: ${error}`);
          }
      };
      
      function incrementSessionCountForMeetingUsers( currentUser, meeting, usersWhoJoinedTheMeeting, store ){
        let setInvitationUrl = "", nameOfLessonInProgress = "", lessonInProgress = false, meetingId = "";
      
        if ( meeting && currentUser?.role === role.Tutor ) { 
          currentUser = { ...currentUser, timeMeetingEnded: Date.now() , setInvitationUrl, nameOfLessonInProgress, lessonInProgress, meetingId };
          store?.dispatch( updateUserInvitationUrl( currentUser, setInvitationUrl, nameOfLessonInProgress, lessonInProgress, meetingId) );  
          meeting?.invitees?.forEach( user => {
            let session = meeting?.sessions?.find(session => session?.userId === user?._id );
      
            verifyMeetingStatusBeforeIncrementingSessionCount( user, usersWhoJoinedTheMeeting, session, store );
            store?.dispatch( updateUserInvitationUrl(user, setInvitationUrl, nameOfLessonInProgress, lessonInProgress, meetingId) );  
          });
        }
      };
      
      function verifyMeetingStatusBeforeIncrementingSessionCount( invitee, usersWhoJoinedTheMeeting, session, store ) {
        Swal.fire({
          title: 'Please Verify Meeting Attendees',
          icon: 'warning',
          html:`<div> ${invitee?.firstname}. </div> <div> ${invitee?.email}. </div> <div>Attended ?</div>`,
          showCancelButton: true,
          confirmButtonText: 'Attended',
          confirmButtonColor: '#673ab7',
          cancelButtonText: 'Did not attend'
        }).then( (response) => {
            if ( response?.value ) {
               usersWhoJoinedTheMeeting = [ ...usersWhoJoinedTheMeeting, invitee ];
                handleIncrementingSessionCountForMeetingInvitees( session, store );
            } 
        });
      };
      
      function handleIncrementingSessionCountForMeetingInvitees( session, store ){
        if ( session ) {
            store.dispatch( incrementSessionCount( session ) );
        }
      };
    
      function updateMeetingStatus( user, store ){
        let setInvitationUrl = "", nameOfLessonInProgress = "", lessonInProgress = false, meetingId = "";
      
        if ( user.role === role.Tutor ) {
            user = { ...user, timeMeetingEnded: Date.now() , setInvitationUrl, nameOfLessonInProgress, lessonInProgress, meetingId };
            updateUser(user)
            .then( user => {
                store.dispatch( lastLoggedInUser( user ) );
            })
             .catch( error => console.log( error ));
          }
      
         if ( user.role === role.Student ) {
              user = { ...user, timeMeetingEnded: Date.now() , setInvitationUrl, nameOfLessonInProgress, lessonInProgress, meetingId };
              store.dispatch( lastLoggedInUser( user ));
          }
      };
        