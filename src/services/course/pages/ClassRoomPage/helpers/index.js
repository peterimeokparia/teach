import { 
navigate } from '@reach/router';

import { 
role } from '../../../helpers/PageHelpers';

import { 
toast } from 'react-toastify';

import{
updateUser } from 'Services/course/Api';

import {
joinInProgressMeeting,
getMeetings,
newMeetingInvitePromoMessage } from 'Services/course/Pages/Meeting/helpers';

import Swal from 'sweetalert2';

export const sendEmailMessage = ( listOfStudents, url, sendEmailAction ) => {
    listOfStudents.forEach( student => {
        let messageOptions = emailMessageOptions( student, url );

        sendEmailAction(
            messageOptions?.from,
            student?.email,
            messageOptions?.subject,
            messageOptions?.messageBody,
            messageOptions?.userId
        );
    });
};

export const emailMessageOptions = (currentUser, invitationUrl) => {
    return {
        from: "teachpadsconnect247@gmail.com",
        subject: "Hey! Join my lesson!",
        messageBody: invitationUrl,
        userId: currentUser?._id
    };
};

export const emailInputOptions = {
    name:"inputO",
    type:"email",
    placeHolder:"Invite your friends!"
};

const getCurrentPageUrl = () => window.location.href; 

export const getLessonPlanUrls = ( operatorBusinessName, selectedUserId ) => {
    const lessonPlanUrl = `/${operatorBusinessName}/LessonPlan/classRoom/${selectedUserId}`;
    return {
        lessonPlanUrl,
        lessonPageUrl: 'http://localhost:3000' + lessonPlanUrl
    };
};

export function navigateToStudentDetailPage( futureLink, userNavigationHistoryAction ){
    userNavigationHistoryAction( getCurrentPageUrl() );
    navigate(futureLink);
};

export const getSelectedUser = ( users, selectedUserId ) => {
    return users?.find(user => user?._id === selectedUserId);
};

export const getStudentsSubscribedToCoursesByThisTutor = ( users, courseList, userId ) => {
    return users?.filter(usr => usr?.role === "Student" && 
        ( coursesCreatedByTheSelectedTutor( courseList, userId )?.find( course => usr?.courses?.includes( course?._id))))
};

export const getListOfCoursesForTheSelectedStudent = ( courseList, user, selectedTutorId ) => {
    return [ { _id: 'Select',  name: 'Select' }, ...listOfCourses( courseList, user, selectedTutorId ) ]
};

export const getListOfLessonsForTheSelectedStudent = ( user, lessonList, courseSelected ) => {
    return [ {  title: ( user?.role === "Tutor" ? "Add New Lesson" : "" ), 
                description:( user?.role === "Tutor" ? "Add New Lesson" : "" ) 
             }, 
                ...listOfLessons( lessonList, courseSelected ) 
            ];
}

export const toggleBetweenAttendanceGradeDisplay = () => {
    return [ { _id: "Courses", name: 'Display Courses' },  { _id: "Grade",  name: 'Add New Grade' }, {_id: "Attendance", name: 'Mark Attendance'} ];
};

export const validationBeforeEnablingTeachPlatform = (currentCourse, currentUser, role, listOfStudents ) => {
    if ( ! currentCourse ) {
        toast.error("Please select a course before joining your lesson.");
        return;
    }
    if ( currentUser?.role === role.Tutor && listOfStudents?.length === 0 ) {
        toast.error("Please invite a student.");
        return;  
    }
    if ( currentUser?.role === role.Tutor && !( currentCourse ) ) {
        toast.error("Please select a course.");
        return;  
    }
};

function listOfCourses( courseList, user, seletedTutorId ){
    return ( user?.role === role.Tutor ) 
            ? coursesCreatedByTheSelectedTutor( courseList, seletedTutorId )?.filter(course => course) 
            : coursesStudentIsEnrolledIn( courseList, user )?.filter( course => course);
};

function coursesCreatedByTheSelectedTutor( courseList, userId ){
    return courseList?.filter(course =>  course?.createdBy === userId );
};

function listOfLessons( lessonList, courseSelected ) {
    return lessonList?.filter(lesson => lesson?.courseId === courseSelected?._id);
};

function coursesStudentIsEnrolledIn( courseList, user  ){
    return courseList?.filter(course =>  user?.courses?.includes( course?._id)); 
};

export function inviteUsersToLearningSessionConfig( currentSessions, invitee, lessonPageUrl, courseLesson  ) {
    const usersSession = currentSessions?.find( currentSession => currentSession?.userId === invitee?._id ); 
    return {
        userHasExhaustedPackageSessions: ( usersSession?.numberOfSessions === usersSession?.totalNumberOfSessions && usersSession?.typeOfSession === "Package" ),
        inviteeSessionUrl: lessonPageUrl, 
        nameOfLessonInProgress: courseLesson?.title, 
        lessonInProgress: true,    
        user: { ...invitee, inviteeSessionUrl: lessonPageUrl, nameOfLessonInProgress: courseLesson?.title, lessonInProgress: true  }
    };
};

export function verifyInviteeList( props ) {
        let { 
               listOfStudents } = props;

        if ( ( !listOfStudents ) || ( listOfStudents?.length === 0 ) ) {
            Swal.fire({
                title: `Please invite students before starting a new teaching session.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Invite.',
                confirmButtonColor: '#673ab7',
                cancelButtonText: 'Not now.'
            }).then( (response) => {
              if ( response?.value ) {
                  return;
              } else { 
                  enableTeachPlatform( props );
              }
            }); 
    } else {
        enableTeachPlatform( props );
    }
};

function enableTeachPlatform( props ) {
    let { 
            listOfStudents, 
            sessions, 
            currentUser, 
            operatorBusinessName, 
            selectedUserId, 
            selectedCourseFromLessonPlanCourseDropDown, 
            selectedLessonFromLessonPlanDropDown, 
            addNewMeeting,
            pushNotificationSubscribers,
            updateCurrentUser,
            users,
            getSelectedPushNotificationUsers,
            updateCurrentTutor,
            setLessonInProgressStatus,
            sendEmails } = props;

    let selectedUser = (  selectedUserId === currentUser?._id) ? currentUser : getSelectedUser( users, selectedUserId );
    let url = getLessonPlanUrls( operatorBusinessName, selectedUserId );
    let  meetingProps = {
        userId: currentUser?._id,
        courseId: selectedCourseFromLessonPlanCourseDropDown?._id, 
        lessonId: selectedLessonFromLessonPlanDropDown?._id,
        sessions,
        courseTitle: selectedCourseFromLessonPlanCourseDropDown?.name,
        lessonTitle: selectedLessonFromLessonPlanDropDown?.title,
        meetingUrl: url?.lessonPlanUrl,
        timeStarted: Date.now(),
        timeEnded: Date.now(),
        usersWhoJoinedTheMeeting:[],
    }; 
    validationBeforeEnablingTeachPlatform( selectedCourseFromLessonPlanCourseDropDown, currentUser, role, listOfStudents );

    try {
         switch ( selectedUser?.role ) {
             case role.Tutor:    
                setLessonInProgressStatus();
                let meeting = inviteUsersToLearningSession( props ); 
                addNewMeeting( { ...meetingProps, invitees: meeting?.invitees, currentUser: meeting?.tutor })
                 .then( meeting => {
                    handleMeeting( meeting, selectedUser, url?.lessonPlanUrl, selectedLessonFromLessonPlanDropDown?.title, true );
                    updateCurrentUser( selectedUser );
                    getSelectedPushNotificationUsers( listOfStudents, pushNotificationSubscribers );
                    updateCurrentTutor( selectedUser ); 
                    sendEmailMessage( listOfStudents, url?.lessonPageUrl, sendEmails );
                    navigate( url?.lessonPlanUrl ); 
                 }) 
                 .catch(error => console.error( error ));  
                return;
            case role.Student:
                enablePlatformForStudentRole( props );
                updateCurrentTutor( selectedUser );
                return;
             default:
                waititingForMeetingToStartBeforeJoining( currentUser, currentUser?.lessonInProgress, selectedUserId );
                updateCurrentTutor( selectedUser ); 
                return;   
         };
    } catch (error) {
        throw Error(` enableTeachPlatform ${error}`);    
    }
};

function inviteUsersToLearningSession( props ){

    let { 
        listOfStudents,
        updateUserInvitationUrl, 
        sessions, 
        currentUser, 
        operatorBusinessName, 
        selectedUserId, 
        selectedLessonFromLessonPlanDropDown, 
        pushNotificationSubscribers,
        sendPushNotificationMessage } = props;

    let invitees = [], meetingConfig=undefined;  let url = getLessonPlanUrls( operatorBusinessName, selectedUserId );

    if ( currentUser?.role === role.Tutor  ) {
        meetingConfig = inviteUsersToLearningSessionConfig( sessions, currentUser, url?.lessonPageUrl, selectedLessonFromLessonPlanDropDown );   
    
        updateUserInvitationUrl( currentUser, meetingConfig.inviteeSessionUrl, meetingConfig.nameOfLessonInProgress, meetingConfig.lessonInProgress );
            listOfStudents.forEach(( invitee ) => { 
                let currentSession = inviteUsersToLearningSessionConfig( sessions, invitee, url?.lessonPageUrl, selectedLessonFromLessonPlanDropDown );    
    
                if ( ! currentSession?.userHasExhaustedPackageSessions ) {
                    invitees.push( currentSession.user ); 
                    updateUserInvitationUrl( invitee, currentSession.inviteeSessionUrl, currentSession.nameOfLessonInProgress, currentSession.lessonInProgress );  
                    let pushNotificationSubscriber = pushNotificationSubscribers?.filter( pushuser => pushuser?.userId === invitee?._id );
    
                    sendPushNotificationMessage( pushNotificationSubscriber, { title:`${currentSession.nameOfLessonInProgress} is in progress!`, body:`Click to join: ${ currentSession.nameOfLessonInProgress }` }); 
                }
            });
    }
        return { 
            tutor: meetingConfig?.user,  
            invitees 
        };
};

async function enablePlatformForStudentRole( props ){
    let { 
            selectedUserId, 
            saveMeeting,
            currentUser, 
            setUpdateUserTimerHandle,
            setNewMeetingTimerHandle,
            loadMeetingsByMeetingId,
            loadUserByEmail } = props;

    loadUserByEmail(currentUser)
    .then(user => {
        if ( user?.meetingId !== "") {
            getMeetings(user, loadMeetingsByMeetingId)
             .then(meeting => {
                if ( user?.meetingId === meeting?._id ){
                    joinInProgressMeeting( user, meeting, saveMeeting, setUpdateUserTimerHandle ); 
                } else {
                    waititingForMeetingToStartBeforeJoining( user, user?.lessonInProgress, setNewMeetingTimerHandle, selectedUserId );
                }
             })
            .catch( error => { 
                console.error(`There was a problem finding the meeting. Please wait for meeting to start before joining.${ error} `);
                waititingForMeetingToStartBeforeJoining( user, user?.lessonInProgress, selectedUserId );
            })
        } else {
            waititingForMeetingToStartBeforeJoining( user, user?.lessonInProgress, selectedUserId );
          return;            
        }          
    })
    .catch(error => {
        throw Error(` enablePlatformForStudentRole. ${error}`); 
    }); 
};

let newMeetingTimerHandle = null;

function waititingForMeetingToStartBeforeJoining( props ){
    let { 
        currentUser, 
        operatorBusinessName, 
        selectedUserId, 
        setNewMeetingTimerHandle,
        setAnimationForEmailInvitationEffect } = props;

    let url = getLessonPlanUrls( operatorBusinessName, selectedUserId );
    let timeOutPeriod = 15000; 
  
    if ( newMeetingTimerHandle ) {
        clearTimeout( newMeetingTimerHandle );
    }

    newMeetingTimerHandle = setInterval( updateCurrentUserAfterASetInterval, timeOutPeriod, newMeetingTimerHandle, props );
    
    if ( newMeetingTimerHandle ) {
        setNewMeetingTimerHandle( newMeetingTimerHandle );
    }

    if ( !currentUser?.lessonInProgress ) {
        newMeetingInvitePromoMessage( setAnimationForEmailInvitationEffect, url?.lessonPlanUrl, newMeetingTimerHandle );
    }
};

function updateCurrentUserAfterASetInterval( newMeetingTimerHandle, props ) {
    let { 
        currentUser, 
        setUpdateUserTimerHandle, 
        getCurrentUserById, 
        updateCurrentUser } = props

    if ( ! currentUser?.lessonInProgress ) {
        getCurrentUserById( currentUser );
        if ( currentUser?.lessonInProgress && newMeetingTimerHandle) {
            updateCurrentUser( currentUser );
            clearTimeout( newMeetingTimerHandle );
            clearTimeout( setUpdateUserTimerHandle );
            return;
        }
        return;
    } 
};

function handleMeeting(meeting, currentuser, inviteeSessionUrl, nameOfLessonInProgress, lessonInProgress ){
    updateUser({
        ...currentuser,
        inviteeSessionUrl,
        nameOfLessonInProgress, 
        lessonInProgress,
        meetingId: meeting?._id, 
        meetings: [ ...currentuser?.meetings, meeting?._id  ]
    });        
    if (  meeting?.invitees ) {
        meeting.invitees.forEach(user => {
            updateUser({
                ...user, 
                inviteeSessionUrl,
                nameOfLessonInProgress, 
                lessonInProgress,
                meetingId: meeting?._id, 
                meetings: [ ...user?.meetings, meeting?._id ]
            });   
        });
    }
};