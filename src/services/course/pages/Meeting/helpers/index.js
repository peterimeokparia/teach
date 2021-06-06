import { 
navigate } from '@reach/router';

import { 
lastLoggedInUser } from 'Services/course/Actions/Users';

import Swal from 'sweetalert2';

export function joinInProgressMeeting( user, currentMeeting, role, saveMeetingAction ){
    let inviteeToUpdate = currentMeeting?.invitees?.find(usr => usr._id === user?._id);

    if ( inviteeToUpdate && inviteeToUpdate?.timeMeetingEnded !== null ) {
         lastLoggedInUser(user);
         return;
    } 

    if ( inviteeToUpdate ) {
        inviteeToUpdate['timeMeetingStarted']= Date.now();
    }
    saveMeetingAction( user?.meetingId, { ...currentMeeting, usersWhoJoinedTheMeeting:[ ...currentMeeting?.usersWhoJoinedTheMeeting, user?._id ]});
}

export async function getMeetings( user, getMeetingByIdAction ) {
    let meeting;

    try {
        meeting = await getMeetingByIdAction(user?.meetingId);
    } catch (error) {
         return error;
    }
    return meeting;
}

let newMeetingTimerHandle = null;

export function waititingForMeetingToStartBeforeJoining( user, lessonPlan, lessonInProgress, setAnimationForEmailInvitationEffect, setUpdateUserTimerHandle, setNewMeetingTimerHandle, updateCurrentUser){
    let timeOutPeriod = 15000;
    
    if ( ! lessonInProgress ) {
        newMeetingInvitePromoMessage( setAnimationForEmailInvitationEffect, lessonPlan );
    }
    newMeetingTimerHandle = setInterval( updateCurrentUserAfterASetInterval, timeOutPeriod, user, updateCurrentUser);
    if ( ! setUpdateUserTimerHandle ) {
        setNewMeetingTimerHandle( newMeetingTimerHandle );
    }
}

export const newMeetingInvitePromoMessage = ( setInviteButtonAnimationEffect, lessonPlan ) => {
    Swal.fire({
        title: "Please wait. Your meeting has not started.",
        icon: 'info',
        html: '<div><p> While you wait,<br></br> earn points, gift cards and rewards. <br></br> Invite your friends to use the platform. </p></div>',
        showCancelButton: true,
        showConfirmButton: ( true ),
        confirmButtonText: 'Invite Your Friends',
        confirmButtonColor: '#20c997',
        cancelButtonText: 'Next time'
        }).then( (response) => {
        if ( response?.value ) {
            setInviteButtonAnimationEffect( true );
        } else {
            navigate(lessonPlan);
        }
    });  
};

export function updateCurrentUserAfterASetInterval( meetingUser, updateCurrentUser ) {
    if ( ! meetingUser?.lessonInProgress ) {
        updateCurrentUser( meetingUser );
    } 
}

export function showJoinMeetingPopupAfterTheTutorStartsTheMeeting( updateCurrentUserTimerHandle, selectedCourse, user, businessName, setNewMeetingTimerHandle, meetings, role, saveMeetingAction ){
    let meetingHasStartedMessage = `Your lesson has started. Please join the following course: ${ selectedCourse?.name }.`;        
    let cancellationUrl =  `/${businessName}/users`;

    if ( user?.lessonInProgress && user?.inviteeSessionUrl ) { 
        joinMeetingPopupMessage( meetingHasStartedMessage, user?.lessonInProgress, user?.inviteeSessionUrl, cancellationUrl );
        joinInProgressMeeting( user, meetings, role, saveMeetingAction );
        if ( updateCurrentUserTimerHandle ) {
            clearInterval( updateCurrentUserTimerHandle );
            setNewMeetingTimerHandle( null );
        }
    } 
}

export const joinMeetingPopupMessage = ( swalTitle, showConfirmationButton, onConfirmationNavigateToUrl, onCancelationNavigateToUrl ) => {
    Swal.fire({
    title: swalTitle,
    icon: 'warning',
    showCancelButton: true,
    showConfirmButton: ( showConfirmationButton ),
    confirmButtonText: 'Join',
    confirmButtonColor: '#673ab7',
    cancelButtonText: 'Next time'
    })
    .then( (response) => {
    if ( response?.value ) {
        navigate( onConfirmationNavigateToUrl );
    } else {
        navigate( onCancelationNavigateToUrl );
    } })
    .catch(error => console.log( error ));              
};