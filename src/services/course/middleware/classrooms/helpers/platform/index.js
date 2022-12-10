import { setLessonInProgressStatus } from 'services/course/actions/lessons';
import { role } from 'services/course/helpers/PageHelpers';
import { navigate } from '@reach/router';
import { loadMeetingsByMeetingId, addNewMeeting, saveMeeting } from 'services/course/actions/meetings'; 
import { updateCurrentTutor } from 'services/course/actions/classrooms';
import { goToMeetingWithPromoMessage } from 'services/course/middleware/classrooms/helpers/meetings';
import { getLessonPlanUrls, inviteUsersToLearningSessionConfig } from 'services/course/pages/ClassRoomPage/components/CourseLessonDropDownComponent/helpers';
import { lastLoggedInUser, updateUserInvitationUrl, loadUserByEmail, getCurrentUserById, updateCurrentUser } from 'services/course/actions/users';
import { sendPushNotificationMessage } from 'services/course/actions/notifications';
import { setItemInSessionStorage, getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';
import { getMeetingInvitees } from 'services/course/pages/Meeting/helpers';

export function directUsersToMeeting( enablePlatformProps, meetingProps  ){
    try {
        enablePlatformForTutor( enablePlatformProps, meetingProps );  
        enablePlatformForStudent( enablePlatformProps  );
    } catch (error) {
        throw Error(` enableTeachPlatform ${error}`);    
    }
}

function enablePlatformForTutor( enablePlatformProps, meetingProps ){

    let { store, operator, currentUser  } = Object(enablePlatformProps);

    if ( currentUser?.role !== role.Tutor ) return;

    store.dispatch(setLessonInProgressStatus());

    let meeting = inviteUsersToLearningSession( enablePlatformProps, store ); 

    if ( meeting ) {
        store?.dispatch(addNewMeeting( { ...meetingProps, invitees: meeting?.invitees, 
            currentUser: meeting?.tutor, operatorId: operator?._id }));
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
        let currentSession = inviteUsersToLearningSessionConfig( sessions, invitee, url?.lessonPageUrl, 
            selectedLessonFromLessonPlanDropDown );    

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

            let pushNotificationSubscriber = pushNotificationSubscribers?.
                filter( pushuser => pushuser?.userId === invitee?.value?._id );

            store.dispatch(sendPushNotificationMessage( pushNotificationSubscriber, 
                { title:`${currentSession.nameOfLessonInProgress} is in progress!`, 
                body:`Click to join: ${ currentSession.nameOfLessonInProgress }` })
            ); 
        }
    });
}

let newMeetingTimerHandle = null;

function enablePlatformForStudent( props ){

    let { currentUser, store } =  Object(props);;

    if ( currentUser?.role !== role.Student ) return;

    if ( currentUser?.meetingId && currentUser?.meetingId !== "" ) {
        store.dispatch( loadMeetingsByMeetingId(currentUser?.meetingId) );
    }

    loadMeetings( props, currentUser ); 
};

function loadMeetings( props, currentUser ) {
    let { selectedTutorId, selectedTutor, operatorBusinessName, store } = Object(props);

    let url = getLessonPlanUrls( operatorBusinessName, selectedTutorId );

    if ( !currentUser?.meetingId ) {
        waitingForMeetingToStartBeforeJoining( { currentUser, operatorBusinessName, selectedTutorId, selectedTutor,  store } );
        return;
    } 

    let currentMeeting = Object.values( store.getState()?.meetings?.meetings )?.find( meeting => meeting?._id === currentUser?.meetingId );

    if ( currentMeeting ) {
        joinMeeting( currentUser, currentMeeting, newMeetingTimerHandle, url?.lessonPlanUrl, store );
    }
}

function joinMeeting(user, currentMeeting, updateCurrentUserTimerHandle, lessonPlanUrl, store){
    let inviteeToUpdate = getMeetingInvitees( user, currentMeeting, updateCurrentUserTimerHandle );

    store?.dispatch(saveMeeting( inviteeToUpdate?.meetingId, { ...currentMeeting, usersWhoJoinedTheMeeting:[ ...currentMeeting?.usersWhoJoinedTheMeeting, user?._id ]}));
    navigate(`${lessonPlanUrl}/${currentMeeting?._id}`);
}

export function waitingForMeetingToStartBeforeJoining( props ){
    let { selectedTutorId, selectedTutor, currentUser, store } = props;

    let url = getLessonPlanUrls( getItemFromSessionStorage('operatorBusinessName'), selectedTutorId ), timeOutPeriod = 15000; 
    
    if ( getItemFromSessionStorage( 'newMeetingTimerHandle' )) {
        clearTimeout( getItemFromSessionStorage( 'newMeetingTimerHandle' ) );
    }

    setItemInSessionStorage( 'newMeetingTimerHandle', setInterval( updateCurrentUserAfterASetInterval, timeOutPeriod, url, currentUser, selectedTutor, store ));

    if ( currentUser && currentUser?.role === role.Student ) {
        goToMeetingWithPromoMessage( url?.lessonPlanUrl, currentUser?.meetingId );
        return;
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