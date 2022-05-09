import {
updateUser } from 'services/course/api';

import { 
navigate } from '@reach/router';

import{
sendEmails } from 'services/course/actions/emails';

import{
setLessonInProgressStatus } from 'services/course/actions/lessons';

import {
loadMeetingsByMeetingId,
addNewMeeting,  
saveMeeting } from 'services/course/actions/meetings'; 

import{
lastLoggedInUser,
updateUserInvitationUrl, 
loadUserByEmail,
getCurrentUserById,
updateCurrentUser } from 'services/course/actions/users';

import{ 
ADD_MEETING_EVENT_TO_CALENDAR,
updateCurrentTutor } from 'services/course/actions/classrooms';

import {
getSelectedPushNotificationUsers,
sendPushNotificationMessage } from 'services/course/actions/notifications';

import {
getMeetingInvitees } from 'services/course/pages/Meeting/helpers';

import {
emailMessageOptions,
getLessonPlanUrls,
getselectedTutor,
validationBeforeEnablingTeachPlatform,
inviteUsersToLearningSessionConfig } from 'services/course/pages/ClassRoomPage/components/CourseLessonDropDownComponent/helpers';

import { 
role } from 'services/course/helpers/PageHelpers';

import {
setItemInSessionStorage, 
getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';
    
import { 
LAST_LOGGEDIN_USER } from 'services/course/actions/users';

import {
automateEventCreation } from 'services/course/pages/CalendarPage/helpers/events';

import {
saveEventData } from 'services/course/pages/CalendarPage/helpers/events';

import { 
eventEnum } from 'services/course/pages/CalendarPage/helpers';

import {
addNewMeetingNote } from 'services/course/actions/meetingNotes';

import { 
addCalendar } from 'services/course/actions/calendar';

import { 
addEvent } from 'services/course/actions/event';

import Calendar from 'services/course/helpers/Calendar';
import CalendarEvent from 'services/course/helpers/CalendarEvent';
import moment from "moment";
import Swal from 'sweetalert2';

export const addNewClassRoomIdToStudentsAndTutors = ( classRoom, store ) => {
    classRoom?.classRoomUsers?.forEach(classroomuser => {
        let student = classroomuser?.value;

        updateUser( { ...student, classRooms: [ ...student?.classRooms, classRoom?.classroom?._id  ] });
    });

    let tutor = { ...classRoom.user, classRooms: [ ...classRoom.user.classRooms, classRoom?.classroom?._id ]};

    updateUser( tutor );
    store?.dispatch({ type: LAST_LOGGEDIN_USER, payload: tutor }); 
}; 

let listOfStudents = undefined;;
let sessions = undefined;
let operatorBusinessName = undefined;
let operator = undefined;
let selectedTutorId = undefined;
let selectedLessonFromLessonPlanDropDown = undefined;
let selectedCourseFromLessonPlanCourseDropDown = undefined;
let pushNotificationSubscribers = undefined;
let currentUser = undefined;
let users = undefined;
let selectedTutor = undefined;
let url = undefined;

export const enableTeachPlatform = ( meeting, store  ) => {
     listOfStudents = meeting?.listOfStudents;
     sessions = meeting?.sessions;
     operatorBusinessName = meeting?.operatorBusinessName;
     operator = Object.values( store?.getState()?.operators?.operators )?.find(ops => ops?.businessName === operatorBusinessName );
     selectedTutorId = meeting?.selectedTutorId;
     selectedLessonFromLessonPlanDropDown = store?.getState().lessons.selectedLessonFromLessonPlanDropDown;
     selectedCourseFromLessonPlanCourseDropDown = store?.getState().courses.selectedCourseFromLessonPlanCourseDropDown;
     pushNotificationSubscribers = Object.values( store?.getState()?.notifications?.pushNotificationSubscribers )?.filter( subscriber => subscriber?.operatorId === meeting?.operator?._id );
     currentUser = store?.getState()?.users?.user;
     users = Object.values( store?.getState()?.users?.users )?.filter( users => users?.operatorId === meeting?.operator?._id );
     selectedTutor = (  selectedTutorId === currentUser?._id) ? currentUser : getselectedTutor( users, selectedTutorId );
     url = getLessonPlanUrls( operatorBusinessName, selectedTutorId );

    let enablePlatformProps = {
        selectedTutorId, 
        selectedTutor,
        currentUser,
        listOfStudents,
        sessions, 
        operatorBusinessName, 
        selectedLessonFromLessonPlanDropDown,
        selectedCourseFromLessonPlanCourseDropDown, 
        pushNotificationSubscribers,
        store
    };

    let meetingProps = {
        userId: currentUser?._id,
        courseId: selectedCourseFromLessonPlanCourseDropDown?._id, 
        lessonId: selectedLessonFromLessonPlanDropDown?._id,
        sessions,
        courseTitle: selectedCourseFromLessonPlanCourseDropDown?.name,
        lessonTitle: selectedLessonFromLessonPlanDropDown?.title,
        meetingUrl: url?.lessonPlanUrl,
        usersWhoJoinedTheMeeting:[],
    }; 

    validationBeforeEnablingTeachPlatform( selectedCourseFromLessonPlanCourseDropDown, currentUser, role, listOfStudents );

    try {
            switch ( selectedTutor?.role ) {

                case role.Tutor:    
                store.dispatch(setLessonInProgressStatus());
                let meeting = inviteUsersToLearningSession( enablePlatformProps, store ); 
                store?.dispatch(addNewMeeting( { ...meetingProps, invitees: meeting?.invitees, currentUser: meeting?.tutor, operatorId: operator?._id }));  
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
};

function inviteUsersToLearningSession( props, store ){
    let { 
        listOfStudents,
        sessions, 
        currentUser, 
        operatorBusinessName, 
        selectedTutorId, 
        selectedLessonFromLessonPlanDropDown, 
        selectedCourseFromLessonPlanCourseDropDown,
        pushNotificationSubscribers } = props;

    let invitees = [], meetingConfig = undefined;  let url = getLessonPlanUrls( operatorBusinessName, selectedTutorId );

    if ( currentUser?.role === role.Tutor  ) {
        meetingConfig = inviteUsersToLearningSessionConfig( sessions, currentUser, url?.lessonPageUrl, selectedLessonFromLessonPlanDropDown );   
    
        let _currentUser = { 
            ...currentUser, 
            inviteeSessionUrl: meetingConfig?.inviteeSessionUrl, 
            nameOfLessonInProgress: meetingConfig?.nameOfLessonInProgress, 
            lessonInProgress: meetingConfig?.lessonInProgress, 
            lesson: selectedLessonFromLessonPlanDropDown?._id,
            course: selectedCourseFromLessonPlanCourseDropDown?._id 
        };

        store.dispatch(updateUserInvitationUrl(_currentUser));
        
            listOfStudents?.forEach(( invitee ) => { 
                let currentSession = inviteUsersToLearningSessionConfig( sessions, invitee?.value, url?.lessonPageUrl, selectedLessonFromLessonPlanDropDown );    
    
                if ( ! currentSession?.userHasExhaustedPackageSessions ) {
                    invitees.push( currentSession.user ); 

                    let _currentUser = { 
                        ...invitee?.value, 
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
        return { 
            tutor: meetingConfig?.user,  
            invitees 
        };
};

let newMeetingTimerHandle = null;

async function enablePlatformForStudentRole( props ){
    let { 
        selectedTutorId, 
        selectedTutor,
        currentUser,
        operatorBusinessName,
        store   } = props;

    store.dispatch(loadUserByEmail(currentUser))
    .then(user => {
        if ( user?.meetingId !== "") {
            store.dispatch(loadMeetingsByMeetingId( user?.meetingId ))
                .then(meeting => {
                if ( user?.meetingId === meeting?._id ){
                    joinMeeting( user, meeting, newMeetingTimerHandle, store ); 
                } else {
                    waitingForMeetingToStartBeforeJoining( { currentUser: user, operatorBusinessName, selectedTutorId, selectedTutor,  store } );
                }
                })
            .catch( error => { 
                console.error( `There was a problem finding the meeting. Please wait for meeting to start before joining.${ error} ` );
                waitingForMeetingToStartBeforeJoining( { currentUser: user, operatorBusinessName, selectedTutorId, selectedTutor, store } );
            });
        } else {
            waitingForMeetingToStartBeforeJoining( { currentUser: user, operatorBusinessName, selectedTutorId, selectedTutor, store } );
            return;            
        }          
    })
    .catch(error => {
        throw Error(` enablePlatformForStudentRole. ${error}`); 
    }); 
};

export function waitForMeetingBeforeJoining( props, store ) {
    waitingForMeetingToStartBeforeJoining( { ...props, store } );
};

let lessonPlanUrl = null;
function waitingForMeetingToStartBeforeJoining( props ){
    let { 
        currentUser, 
        operatorBusinessName, 
        selectedTutorId,
        selectedTutor,
        store } = props;

    let url = getLessonPlanUrls( getItemFromSessionStorage('operatorBusinessName'), selectedTutorId );
    let timeOutPeriod = 15000; 
    
    if ( getItemFromSessionStorage( 'newMeetingTimerHandle' )) {
        clearTimeout( getItemFromSessionStorage( 'newMeetingTimerHandle' ) );
    }

    setItemInSessionStorage( 'newMeetingTimerHandle', setInterval( updateCurrentUserAfterASetInterval, timeOutPeriod, url, currentUser, selectedTutor, store ));
    
    if ( currentUser && currentUser?.role === role.Student && !getItemFromSessionStorage('meetingId') ) {
        lessonPlanUrl = url?.lessonPlanUrl;
        goToMeetingWithPromoMessage( url?.lessonPlanUrl, "" );
    }
};

function updateCurrentUserAfterASetInterval( url, currentUser, selectedTutor, store ) {
    let meetingId = ( getItemFromSessionStorage('meetingId') ) ? getItemFromSessionStorage('meetingId') : undefined;

    if ( meetingId ) {
        store.dispatch(updateCurrentUser({ 
            ...currentUser, 
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

export function getUsersCurrentMeetingStatus( currentUser, store ){
    //goToMeetingWithPromoMessage(  lessonPlanUrl, "" );
    if ( getItemFromSessionStorage('meetingId') ) {
        return;
    }

    if ( currentUser && currentUser?.role === role.Tutor && currentUser?.meetingId !== "" ) {
        setItemInSessionStorage( 'meetingId', currentUser?.meetingId );
        return;
    }
};

function handleMeeting( meeting, currentuser, inviteeSessionUrl, nameOfLessonInProgress, lessonInProgress, lesson, course ){
    updateUser({
        ...currentuser,
        inviteeSessionUrl,
        nameOfLessonInProgress, 
        lessonInProgress,
        lesson: lesson?._id,
        course: course?._id,
        meetingId: meeting?._id, 
        meetings: [ ...currentuser?.meetings, meeting?._id  ]
    });        
    if (  meeting?.invitees?.length > 0 ) {
        meeting.invitees?.forEach(user => {
            updateUser({
                ...user, 
                inviteeSessionUrl,
                nameOfLessonInProgress, 
                lessonInProgress,
                lesson: lesson?._id,
                course: course?._id,
                meetingId: meeting?._id, 
                meetings: [ ...user?.meetings, meeting?._id ]
            });   
        });
    }
};

function joinMeeting(user, currentMeeting, updateCurrentUserTimerHandle, store){
    let inviteeToUpdate = getMeetingInvitees( user, currentMeeting, updateCurrentUserTimerHandle);

    store?.dispatch(saveMeeting( inviteeToUpdate?.meetingId, { ...currentMeeting, usersWhoJoinedTheMeeting:[ ...currentMeeting?.usersWhoJoinedTheMeeting, user?._id ]}));
    store.dispatch(lastLoggedInUser( { ...user, meetingId: currentMeeting?._id } ));
}

function sendEmailToMeetingInvitees( listOfStudents, url, store ){
    if ( listOfStudents?.length === 0 ) return;

    listOfStudents?.forEach( student => {
        let messageOptions = emailMessageOptions( student, url );

        store.dispatch(sendEmails(
            messageOptions?.from,
            student?.email,
            messageOptions?.subject,
            messageOptions?.messageBody,
            messageOptions?.userId
        ));
    });
};

function goToMeetingWithPromoMessage ( lessonUrl, meetingId ) {
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
    let selectedTutorId = selectedTutor?._id;
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
    let event = {
        title,
        location,
        recurringEvent,
        allDay,
        startDateTime,
    };
    let notesConfig = {
        meetingId,
        userId, 
        title,
        markDownContent: "",
        notesUrl: "",
        videoUrl: ""
    }; 
    let newCalendarEventData = automateEventCreation( event, meetingId, durationHrs, undefined, undefined );
    let  eventProps = {
        calendarEventData: newCalendarEventData, 
        testAdminUsers, 
        calendarEventType: eventEnum.NewEvent,
        calendars,
        user: currentUser,
        users,
        userId,
        pushNotificationSubscribers,
        operatorId 
    };

    if ( currentUser?.role === role.Tutor && selectedTutor?._id === currentUser?._id ) {
        let tutorsCalendar = calendars?.find( calendar =>  calendar?.calendarEventType === eventEnum.NewEvent);

        saveEventData({
            ...eventProps,
            calendar: tutorsCalendar,
            calendarEventData: newCalendarEventData,
            addCalendar,
            addEvent
        }, store);
        store.dispatch( addNewMeetingNote( notesConfig ) );
        if ( meetingEvent?.invitees?.length > 0 ) {
            meetingEvent?.invitees.forEach(student => {
                let studentsCalendar = calendars?.find( calendar =>  calendar?.calendarEventType === eventEnum.Student );
        
                saveEventData({
                    ...eventProps,
                    calendar: studentsCalendar,
                    calendarEventData: newCalendarEventData,
                    addCalendar,
                    addEvent
                }, store);
                store.dispatch( addNewMeetingNote( notesConfig ) );       
            });
        }
    }

    if ( currentUser?.role === role.Student ) {
        let studentsCalendar = calendars?.find( calendar =>  calendar?.calendarEventType === eventEnum.Student );
  
        saveEventData({
            ...eventProps,
            calendar: studentsCalendar,
            calendarEventData: newCalendarEventData,
            addCalendar,
            addEvent
        }, store);
        store.dispatch( addNewMeetingNote( notesConfig ) );
    }
};

export function handleAddingNewMeeting( meeting, store ){
    try {
        handleMeeting( meeting, selectedTutor, url?.lessonPlanUrl, selectedLessonFromLessonPlanDropDown?.title, true, selectedLessonFromLessonPlanDropDown, selectedCourseFromLessonPlanCourseDropDown );
        store.dispatch(getSelectedPushNotificationUsers( listOfStudents, pushNotificationSubscribers ));
        store.dispatch(updateCurrentTutor( { ...selectedTutor, meetingId: meeting?._id, lesson:selectedLessonFromLessonPlanDropDown?._id, course: selectedCourseFromLessonPlanCourseDropDown?._id } ));
        sendEmailToMeetingInvitees( listOfStudents, url?.lessonPageUrl, store );
        store.dispatch({ type: ADD_MEETING_EVENT_TO_CALENDAR, payload: { ...meeting, currentUser: { ...currentUser, meetingId: meeting?._id }, operatorBusinessName } });
        navigate( url?.lessonPlanUrl );   
    } catch (error) {
        console.warn( error );
    } 
};

