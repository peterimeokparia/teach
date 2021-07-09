import { 
navigate } from '@reach/router';

import { 
lastLoggedInUser } from 'Services/course/Actions/Users';

import { 
role } from 'Services/course/helpers/PageHelpers';

import Swal from 'sweetalert2';

export async function enablePlatformForStudentRole( config, selectedUser ){
    if ( !config ) return;

    let currentMeeting = await getMeetings(config?.currentUser, config?.loadMeetingsByMeetingId);  

    if ( currentMeeting?._id ) {
        config?.loadUserByEmail(config?.currentUser)
        .then(user => {
            if ( ( currentMeeting ) && ( user?.lessonInProgress ) && ( user?.meetingId === selectedUser?.meetingId ) ) {
                joinInProgressMeeting( user, currentMeeting, config?.saveMeeting, config?.setUpdateUserTimerHandle ); 
            } else {
                waititingForMeetingToStartBeforeJoining( user, user?.lessonInProgress, config );
              return;            
            }          
        })
        .catch(error => {
            throw Error(` enablePlatformForStudentRole. ${error}`); 
        }); 
    } else {
        waititingForMeetingToStartBeforeJoining( config?.currentUser, config?.currentUser?.lessonInProgress, config );
    }
};

export function joinInProgressMeeting( user, currentMeeting, saveMeetingAction, updateCurrentUserTimerHandle ){
    let inviteeToUpdate = ( user.role === role.Student ) ? currentMeeting?.invitees?.find(usr => usr._id === user?._id)
                                                         : user;   

    if ( updateCurrentUserTimerHandle ) {
        clearTimeout( updateCurrentUserTimerHandle );
    }

    if ( inviteeToUpdate && inviteeToUpdate?.timeMeetingEnded !== null ) {
         lastLoggedInUser(user);
         return;
    } 

    if ( inviteeToUpdate ) {
        inviteeToUpdate = { ...inviteeToUpdate, timeMeetingStarted: Date.now() };
    }
    saveMeetingAction( inviteeToUpdate?.meetingId, { ...currentMeeting, usersWhoJoinedTheMeeting:[ ...currentMeeting?.usersWhoJoinedTheMeeting, user?._id ]});
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

export function waititingForMeetingToStartBeforeJoining( user, lessonInProgress, config ){
    let timeOutPeriod = 15000; 
    
    if ( newMeetingTimerHandle ) {
        clearTimeout( newMeetingTimerHandle );
    }

    newMeetingTimerHandle = setInterval( updateCurrentUserAfterASetInterval, timeOutPeriod, user, config, newMeetingTimerHandle );
    
    if ( newMeetingTimerHandle ) {
        config.setNewMeetingTimerHandle( newMeetingTimerHandle );
    }

    if ( !lessonInProgress ) {
        newMeetingInvitePromoMessage( config?.setAnimationForEmailInvitationEffect, config?.lessonPlanUrl, newMeetingTimerHandle );
    }
};

export const newMeetingInvitePromoMessage = ( setInviteButtonAnimationEffect, lessonPlan, newMeetingTimerHandle ) => {
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
            if ( newMeetingTimerHandle ) {
                clearTimeout( newMeetingTimerHandle );
            }
        }
    });  
};

export function updateCurrentUserAfterASetInterval( meetingUser, config, newMeetingTimerHandle  ) {
    if ( ! meetingUser?.lessonInProgress ) {
        config?.getCurrentUserById( meetingUser );
        if ( meetingUser?.lessonInProgress && newMeetingTimerHandle) {
            config?.updateCurrentUser( meetingUser );
            clearTimeout( newMeetingTimerHandle );
            clearTimeout( config?.setUpdateUserTimerHandle );
            return;
        }
        return;
    } 
};

export function showJoinMeetingPopupAfterTheTutorStartsTheMeeting( props ){
    let {
        setUpdateUserTimerHandle, 
        selectedCourseFromLessonPlanCourseDropDown, 
        currentUser, 
        operatorBusinessName, 
        setNewMeetingTimerHandle, 
        meetings, 
        saveMeeting
    } = props;

    let meetingHasStartedMessage = `Your lesson has started. Please join the following course: ${ selectedCourseFromLessonPlanCourseDropDown?.name }.`;        
    let cancellationUrl =  `/${operatorBusinessName}/users`;

   

    if ( currentUser?.lessonInProgress && currentUser?.inviteeSessionUrl ) { 
        joinMeetingPopupMessage( meetingHasStartedMessage, currentUser?.lessonInProgress, currentUser?.inviteeSessionUrl, cancellationUrl, setUpdateUserTimerHandle );
        joinInProgressMeeting( currentUser, meetings, saveMeeting, setUpdateUserTimerHandle );
        if ( setUpdateUserTimerHandle ) {
            clearTimeout( setUpdateUserTimerHandle );
            setNewMeetingTimerHandle( undefined );
        }
    } 
};

export const joinMeetingPopupMessage = ( swalTitle, showConfirmationButton, onConfirmationNavigateToUrl, onCancelationNavigateToUrl, updateCurrentUserTimerHandle ) => {
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
        if ( updateCurrentUserTimerHandle ) {
            clearTimeout( updateCurrentUserTimerHandle );
        }
        navigate( onConfirmationNavigateToUrl );
    } else {
        if ( updateCurrentUserTimerHandle ) {
            clearTimeout( updateCurrentUserTimerHandle );
        }
        navigate( onCancelationNavigateToUrl );
    } })
    .catch(error =>{   
        throw Error(` joinMeetingPopupMessage. ${error}`);
     });              
};

export function updateMeetingStatus( user, lastLoggedInUserAction ){
    let setInvitationUrl = "", nameOfLessonInProgress = "", lessonInProgress = false, meetingId = "";
  
    if ( user.role === role.Tutor ) {
        user = { ...user, timeMeetingEnded: Date.now() , setInvitationUrl, nameOfLessonInProgress, lessonInProgress, meetingId };
        lastLoggedInUserAction( user );
      }
  
     if ( user.role === role.Student ) {
          user = { ...user, timeMeetingEnded: Date.now() , setInvitationUrl, nameOfLessonInProgress, lessonInProgress, meetingId };
          lastLoggedInUserAction( user );
      }
  };