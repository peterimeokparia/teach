import { setLessonInProgressStatus } from 'services/course/actions/lessons';
import { role } from 'services/course/helpers/PageHelpers';
import { loadMeetingsByMeetingId, addNewMeeting, saveMeeting } from 'services/course/actions/meetings'; 
import { updateCurrentTutor } from 'services/course/actions/classrooms';
import { goToMeetingWithPromoMessage } from 'services/course/middleware/classrooms/helpers/meetings';
import { getLessonPlanUrls, inviteUsersToLearningSessionConfig } from 'services/course/pages/ClassRoomPage/components/CourseLessonDropDownComponent/helpers';
import { lastLoggedInUser, updateUserInvitationUrl, loadUserByEmail, getCurrentUserById, updateCurrentUser } from 'services/course/actions/users';
import { sendPushNotificationMessage } from 'services/course/actions/notifications';
import { setItemInSessionStorage, getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';
import { getMeetingInvitees } from 'services/course/pages/Meeting/helpers';

export function directUsersToMeeting( enablePlatformProps, meetingProps  ){
   let { selectedTutorId, selectedTutor, currentUser, operatorBusinessName, store } = enablePlatformProps;

    try {
        switch ( selectedTutor?.role ) {  // change 
            case role.Tutor:    
                handleMeeting( store, enablePlatformProps, meetingProps );  
                return;
            case role.Student:
                enablePlatformForStudentRole( enablePlatformProps  );
                store.dispatch(updateCurrentTutor( selectedTutor ));
                return;
            default:
                waitingForMeetingToStartBeforeJoining( { currentUser, operatorBusinessName, selectedTutorId, selectedTutor, store } );
                store.dispatch(updateCurrentTutor( selectedTutor )); 
                return;   
        };
    } catch (error) {
        throw Error(` enableTeachPlatform ${error}`);    
    }
}

function handleMeeting( store, enablePlatformProps, meetingProps ){
    let { operator } = enablePlatformProps;

    store.dispatch(setLessonInProgressStatus());
    let meeting = inviteUsersToLearningSession( enablePlatformProps, store ); 

    if( meeting ) {
        store?.dispatch(addNewMeeting( { ...meetingProps, invitees: meeting?.invitees, currentUser: meeting?.tutor, operatorId: operator?._id }));
    }
}

function inviteUsersToLearningSession( props, store ){
    let { 
        listOfStudents, sessions, currentUser, operatorBusinessName, selectedTutorId, 
        selectedLessonFromLessonPlanDropDown, selectedCourseFromLessonPlanCourseDropDown,
    } = props;

    let invitees = [], meetingConfig = undefined;  let url = getLessonPlanUrls( operatorBusinessName, selectedTutorId );

    try {
        if ( currentUser?.role === role.Tutor  ) {
            meetingConfig = inviteUsersToLearningSessionConfig( sessions, currentUser, url?.lessonPageUrl, selectedLessonFromLessonPlanDropDown );   

            let _currentUser = { ...currentUser, 
                inviteeSessionUrl: meetingConfig?.inviteeSessionUrl, 
                nameOfLessonInProgress: meetingConfig?.nameOfLessonInProgress, 
                lessonInProgress: meetingConfig?.lessonInProgress, 
                lesson: selectedLessonFromLessonPlanDropDown?._id,
                course: selectedCourseFromLessonPlanCourseDropDown?._id 
            };
    
            store.dispatch(updateUserInvitationUrl(_currentUser));
            handleUserInvitation( listOfStudents, props, invitees );
        }
    } catch (error) {
        alert(`Error: enableTeachPlatform - inviteUsersToLearningSession - ${error}`);
        console.error(`Error: enableTeachPlatform - inviteUsersToLearningSession - ${error}`);
    }
    return { 
        tutor: meetingConfig?.user,  invitees 
    };
};

function handleUserInvitation( listOfStudents, props, invitees ) {
    let { sessions, selectedTutorId, operatorBusinessName, store,  pushNotificationSubscribers,
        selectedLessonFromLessonPlanDropDown, selectedCourseFromLessonPlanCourseDropDown } = props;

        let url = getLessonPlanUrls( operatorBusinessName, selectedTutorId );

    listOfStudents?.forEach(( invitee ) => { 
        let currentSession = inviteUsersToLearningSessionConfig( sessions, invitee, url?.lessonPageUrl, selectedLessonFromLessonPlanDropDown );    

        if ( ! currentSession?.userHasExhaustedPackageSessions ) {
            invitees.push( currentSession.user ); 
            let _currentUser = { ...invitee, 
                inviteeSessionUrl: currentSession?.inviteeSessionUrl, 
                nameOfLessonInProgress: currentSession?.nameOfLessonInProgress, 
                lessonInProgress: currentSession?.lessonInProgress, 
                lesson: selectedLessonFromLessonPlanDropDown?._id, 
                course: selectedCourseFromLessonPlanCourseDropDown?._id 
            };

            store.dispatch(updateUserInvitationUrl(_currentUser));  
            let pushNotificationSubscriber = pushNotificationSubscribers?.filter( pushuser => pushuser?.userId === invitee?.value?._id );

            store.dispatch(sendPushNotificationMessage( pushNotificationSubscriber, { title:`${currentSession.nameOfLessonInProgress} is in progress!`, body:`Click to join: ${ currentSession.nameOfLessonInProgress }` })); 
        }
    });
}

let newMeetingTimerHandle = null;

async function enablePlatformForStudentRole( props ){
    let { selectedTutorId, selectedTutor, currentUser, operatorBusinessName, store } = props;

    store.dispatch(loadUserByEmail(currentUser)).then(user => { // change this... return object is not what I need??
        if ( user?.meetingId !== "") {
            loadMeetings( props );
        } else {
            waitingForMeetingToStartBeforeJoining( { currentUser: user, operatorBusinessName, selectedTutorId, selectedTutor, store } );
            return;            
        }          
    }).catch(error => {
        throw Error(` enablePlatformForStudentRole. ${error}`); 
    }); 
};

function loadMeetings( props ) {
    let { selectedTutorId, selectedTutor, currentUser, operatorBusinessName, store } = props;

    store.dispatch(loadMeetingsByMeetingId( currentUser?.meetingId )).then(meeting => {
        let inMeeting = joinMeeting( currentUser, meeting, newMeetingTimerHandle, store ); 

        if ( !inMeeting ) {
            waitingForMeetingToStartBeforeJoining( { currentUser, operatorBusinessName, selectedTutorId, selectedTutor,  store } );
        }
    }).catch( error => { 
        console.error( `There was a problem finding the meeting. Please wait for meeting to start before joining.${ error} ` );
        waitingForMeetingToStartBeforeJoining( { currentUser, operatorBusinessName, selectedTutorId, selectedTutor, store } );
    });
}

function joinMeeting(user, currentMeeting, updateCurrentUserTimerHandle, store){
    let inviteeToUpdate = getMeetingInvitees( user, currentMeeting, updateCurrentUserTimerHandle );

    if ( !(user?.meetingId === currentMeeting?._id) ) return false;
        store?.dispatch(saveMeeting( inviteeToUpdate?.meetingId, { ...currentMeeting, usersWhoJoinedTheMeeting:[ ...currentMeeting?.usersWhoJoinedTheMeeting, user?._id ]}));
        store.dispatch(lastLoggedInUser( { ...user, meetingId: currentMeeting?._id } ));
        return true;
}

export function waitingForMeetingToStartBeforeJoining( props ){
    let { selectedTutorId, selectedTutor, currentUser, store } = props;

    let url = getLessonPlanUrls( getItemFromSessionStorage('operatorBusinessName'), selectedTutorId ), timeOutPeriod = 15000; 
    
    if ( getItemFromSessionStorage( 'newMeetingTimerHandle' )) {
        clearTimeout( getItemFromSessionStorage( 'newMeetingTimerHandle' ) );
    }
    setItemInSessionStorage( 'newMeetingTimerHandle', setInterval( updateCurrentUserAfterASetInterval, timeOutPeriod, url, currentUser, selectedTutor, store ));
    if ( currentUser && currentUser?.role === role.Student && !getItemFromSessionStorage('meetingId') ) {
        goToMeetingWithPromoMessage( url?.lessonPlanUrl, "" );
    }
};

function updateCurrentUserAfterASetInterval( url, currentUser, selectedTutor, store ) {
    let meetingId = ( getItemFromSessionStorage('meetingId') ) ? getItemFromSessionStorage('meetingId') : undefined;

    if ( meetingId ) {
        store.dispatch(updateCurrentUser({...currentUser, 
            meetingId,
            lessonInProgress: true 
        }));

        if ( getItemFromSessionStorage( 'newMeetingTimerHandle' ) ) {
            clearTimeout( getItemFromSessionStorage( 'newMeetingTimerHandle' ));
            sessionStorage.removeItem( 'newMeetingTimerHandle' );
            goToMeetingWithPromoMessage( url?.lessonPlanUrl, meetingId );
        }
        return;
    } else {
       store.dispatch( getCurrentUserById( selectedTutor ) );
    }
};