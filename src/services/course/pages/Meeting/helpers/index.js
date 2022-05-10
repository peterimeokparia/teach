import { 
navigate } from '@reach/router';

import { 
lastLoggedInUser } from 'services/course/actions/users';

import { 
role } from 'services/course/helpers/PageHelpers';

import Swal from 'sweetalert2';

let newMeetingTimerHandle = null;

export async function enablePlatformForStudentRole( config, selectedUser ){
    if ( !config ) return;

    let currentMeeting = await getMeetings(config?.currentUser, config?.loadMeetingsByMeetingId);  

    if ( currentMeeting?._id ) {
        config?.loadUserByEmail(config?.currentUser)
        .then(user => {
            if ( ( currentMeeting ) && ( user?.lessonInProgress ) && ( user?.meetingId === selectedUser?.meetingId ) ) {
                joinInProgressMeeting( user, currentMeeting, config?.saveMeeting, newMeetingTimerHandle); 
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
    let inviteeToUpdate = getMeetingInvitees( user, currentMeeting, updateCurrentUserTimerHandle);

    saveMeetingAction( inviteeToUpdate?.meetingId, { ...currentMeeting, usersWhoJoinedTheMeeting:[ ...currentMeeting?.usersWhoJoinedTheMeeting, user?._id ]});
}

export function getMeetingInvitees( user, currentMeeting, updateCurrentUserTimerHandle){
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
    return {
        inviteeToUpdate,
    };
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

export function waititingForMeetingToStartBeforeJoining( user, lessonInProgress, config ){
    let timeOutPeriod = 15000; 
    
    if ( newMeetingTimerHandle ) {
        clearTimeout( newMeetingTimerHandle );
    }

    newMeetingTimerHandle = setInterval( updateCurrentUserAfterASetInterval, timeOutPeriod, user, config, newMeetingTimerHandle );
    
    if ( !lessonInProgress ) {
        newMeetingInvitePromoMessage( config?.lessonPlanUrl, newMeetingTimerHandle );
    }
};

export const newMeetingInvitePromoMessage = ( lessonPlan, newMeetingTimerHandle ) => {
    Swal.fire({
        title: "Please wait. Your meeting has not started.",
        icon: 'info',
        html: '<div><p> While you wait,<br></br> earn points, gift cards and rewards. <br></br> Invite your friends to use the platform. </p></div>',
        showCancelButton: true,
        showConfirmButton: ( true ),
        confirmButtonText: 'Go to meeting.',
        confirmButtonColor: '#20c997',
        cancelButtonText: 'Next time'
        }).then( (response) => {
        if ( response?.value ) {
            // clean
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
            return;
        }
        return;
    } 
};

export function showJoinMeetingPopupAfterTheTutorStartsTheMeeting( props ){
    let {
        selectedCourseFromLessonPlanCourseDropDown, 
        currentUser, 
        operatorBusinessName, 
        meetings,
        saveMeeting
    } = props;

    let meetingHasStartedMessage = `Your lesson has started. Please join the following course: ${ selectedCourseFromLessonPlanCourseDropDown?.name }.`;        
    let cancellationUrl =  `/${operatorBusinessName}/users`;
   
    if ( currentUser?.lessonInProgress && currentUser?.inviteeSessionUrl ) { 
        joinMeetingPopupMessage( meetingHasStartedMessage, currentUser?.lessonInProgress, currentUser?.inviteeSessionUrl, cancellationUrl, newMeetingTimerHandle );
        joinInProgressMeeting( currentUser, meetings, saveMeeting, newMeetingTimerHandle );
        if ( newMeetingTimerHandle ) {
            clearTimeout( newMeetingTimerHandle );
            newMeetingTimerHandle =  undefined;
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