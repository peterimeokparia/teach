import 
React, { 
useEffect, 
useState } from 'react';

import {
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import {
sendPushNotificationMessage,
getSelectedPushNotificationUsers,
loadSubscribedPushNotificationUsers } from 'Services/course/Actions/Notifications';

import{
markAttendance } from 'Services/course/Actions/Attendance';

import{
loadGrades,
addNewGrade } from 'Services/course/Actions/Grades';

import{
decrementSessionCountForPackageOptions, 
incrementSessionCount, 
autoRenewSessionPackages,
setAutoRenewPackageStatus, 
loadSessions } from 'Services/course/Actions/Sessions';

import {
loadMeetings,
loadMeetingsByMeetingId,    
addNewMeeting, 
saveMeeting } from 'Services/course/Actions/Meetings'; 

import {
getMeetings } from 'Services/course/Pages/Meeting/helpers';

import{  
loadLessons,
addNewLesson, 
saveLesson, 
getLessonVideoUrl, 
setLessonInProgressStatus } from 'Services/course/Actions/Lessons';

import{
loadUsers, 
updateCurrentUser,    
updateUserInvitationUrl, 
loadUserByEmail } from 'Services/course/Actions/Users';

import{
updateCurrentClassRoomLessonPlan,    
toggleClassRoomSideBarDropDownDisplay,    
updateCurrentTutor } from 'Services/course/Actions/ClassRooms';

import {
getSortedRecordsByDate,    
getCoursesByOperatorId,     
getUsersByOperatorId,    
getOperatorFromOperatorBusinessName,
getCoursesByCourseIdSelector,
getCoursesByCreatedByIdSelector,
getPushNotificationUsersByOperatorId } from 'Services/course/Selectors';

import { 
emailInputOptions, 
emailMessageOptions,
classRoomPageComponentConfig,
classRoomPageDisplayComponentConfig,
inviteStudentsToLearningSession,
validationBeforeEnablingTeachPlatform } from  './helpers';

import {
joinInProgressMeeting,
waititingForMeetingToStartBeforeJoining,
showJoinMeetingPopupAfterTheTutorStartsTheMeeting } from 'Services/course/Pages/Meeting/helpers';

import { 
addNewGradesForSelectedStudents } from 'Services/course/Pages/GradesPage/Components/AddStudentGrade/helpers';

import { 
markAttendanceForSelectedStudents } from 'Services/course/Pages/AttendancePage/Components/MarkAttendanceComponent/helpers';

import { 
role,
// cleanUrl 
} from 'Services/course/helpers/PageHelpers';

import ClassRoomComponent from './Components/ClassRoomComponent';
import 'react-toastify/dist/ReactToastify.css';

const ClassRoomPage = ({
operatorBusinessName,
operator,   
currentUser,
selectedUserId, 
updateCurrentTutor,
updateCurrentClassRoomLessonPlan,
users, 
courseId,
courses,
lessons,
meetings,
loadLessons,
loadMeetings,
saveMeeting,
loadUsers,
loadUserByEmail,
loadMeetingsByMeetingId,
loadGrades,
setLessonInProgressStatus,
addNewMeeting,
updateUserInvitationUrl,
allSessions,
pushNotificationSubscribers,
grades,
updateCurrentUser,
sendPushNotificationMessage,
getSelectedPushNotificationUsers,
loadSubscribedPushNotificationUsers,
selectedPushSubscribers,
toggleClassRoomSideBarDropDownDisplay,
toggleSideBarDisplay,
children }) => {
// const [ lessonUrl, setLessonUrl ] = useState("");
const [ currentCourse, setSelectedCourseFromCourseDropDownSelector ] = useState( undefined );
let   [ currentLesson, setSelectedLessonFromLessonDropDownSelector ] = useState( undefined );
const [ listOfStudents, setListOfStudents ] = useState([]);
const [ dropDownDisplayOption, setDropDownDisplayOption ] = useState( "" );
const [ sessions, setSessions ] = useState( undefined );
const [ setUpdateUserTimerHandle, setNewMeetingTimerHandle ] = useState(null);
const [ animateInvitationButton, setAnimationForEmailInvitationEffect ] = useState( false );
const lessonPlanUrl = `/${operatorBusinessName}/LessonPlan/classRoom/${selectedUserId}`;
const lessonPageUrl = 'http://localhost:3000' + lessonPlanUrl;
// const lessonTitle = cleanUrl( currentLesson?.title );

let displayComponentConfig = classRoomPageDisplayComponentConfig( 
    currentUser, 
    users, 
    courses, 
    lessons, 
    currentCourse, 
    selectedUserId );

useEffect(() => {    
    if ( currentCourse ) {
        loadLessons( currentCourse?._id );
    }

    listOfStudents.forEach( student => { loadGrades( student ); });  

    if ( (! listOfStudents[0]?.courses.includes(currentCourse?._id )) || (! displayComponentConfig?.selectedUser?.courses.includes( currentCourse?._id )) ) {
        setListOfStudents([]);
    }

    if ( currentUser?.role === role.Student && currentUser?.lessonInProgress ) {
        showJoinMeetingPopupAfterTheTutorStartsTheMeeting( setUpdateUserTimerHandle, currentCourse, currentUser, operatorBusinessName, setNewMeetingTimerHandle, meetings, role, saveMeeting );
    }

    loadUsers();
    loadMeetings();
    loadSubscribedPushNotificationUsers();
 });
// }, [ currentCourse, listOfStudents, displayComponentConfig.selectedUser.courses, currentUser, loadUsers, 
//     loadMeetings, loadSubscribedPushNotificationUsers, loadLessons, loadGrades, setUpdateUserTimerHandle, operatorBusinessName, 
//        meetings, saveMeeting ] );
// }, [ loadGrades, loadLessons, loadUsers, currentCourse, currentLesson, loadMeetings, loadSubscribedPushNotificationUsers, saveMeeting]);

if ( ! currentUser?.userIsValidated || ! operator ){
    navigate(`/${operatorBusinessName}/login`);
}

const setCourseFromDropDown = ( selectedCourseId ) => {
    if ( selectedCourseId ) {
        let course = courses?.find( crs => crs._id === selectedCourseId );

        setSelectedCourseFromCourseDropDownSelector( course );
        setSessions( allSessions?.filter( usersession => usersession?.courseId === selectedCourseId ));
    }
};

const setLessonFromDropDown = ( selectedLessonId ) => {
    if ( selectedLessonId ) {
        let lesson = lessons?.find( lsn => lsn._id === selectedLessonId );

        setSelectedLessonFromLessonDropDownSelector( lesson );
        // setLessonUrl(`/courses/${lesson?.courseId}/lessons/${lesson?._id}`);
    }
};

async function enableTeachPlatform() {
    validationBeforeEnablingTeachPlatform( currentCourse, currentUser, role, listOfStudents );
    let currentMeeting;

    try {      
        currentMeeting = await getMeetings(currentUser, loadMeetingsByMeetingId);  
        if ( currentMeeting?._id && currentUser?.role === role.Student ) { 
            loadUserByEmail(currentUser)
            .then(user => {
                if ( ( user?.lessonInProgress ) && ( user?.meetingId === displayComponentConfig?.selectedUser?.meetingId ) ) {
                    if ( currentMeeting ) {
                        joinInProgressMeeting( user, currentMeeting, role, saveMeeting );   
                    }
                } else {
                    waititingForMeetingToStartBeforeJoining( user, user?.lessonInProgress, setAnimationForEmailInvitationEffect, setUpdateUserTimerHandle, setNewMeetingTimerHandle, updateCurrentUser );
                    return;
                }          
            })
            .catch(error => {
                console.log( error );
        }); 
    } else {
        waititingForMeetingToStartBeforeJoining( currentUser, lessonPlanUrl, currentUser?.lessonInProgress, setAnimationForEmailInvitationEffect, setUpdateUserTimerHandle, setNewMeetingTimerHandle, updateCurrentUser );
        return;
    }      
    navigate( lessonPlanUrl ); 
    updateCurrentTutor( displayComponentConfig?.selectedUser ); 
    updateCurrentClassRoomLessonPlan( { selectedTutor: displayComponentConfig?.selectedUser, selectedCourse: currentCourse, selectedLesson: currentLesson } );
    if ( currentUser?.role === role.Tutor ) {
        setTeachSessionSettings( currentUser, currentCourse, currentLesson, sessions, listOfStudents, lessonPageUrl ); 
        getSelectedPushNotificationUsers( listOfStudents, pushNotificationSubscribers );
    }                    
    } catch (error) {
        console.log( error );      
    }
}

function setTeachSessionSettings( user, currentCourse, currentLesson, sessions, listOfStudents, lessonPageUrl ){
    setLessonInProgressStatus();
    let invitees = inviteStudentsToLearningSession( 
    user, 
    currentLesson, 
    sessions, 
    listOfStudents, 
    lessonPageUrl, 
    updateUserInvitationUrl, 
    sendPushNotificationMessage, 
    pushNotificationSubscribers 
    ); 

    let usersWhoJoinedTheMeeting = [];

    addNewMeeting(
    invitees, 
    user?._id,
    sessions, 
    Date.now(), 
    currentCourse?._id, 
    currentLesson?._id,
    currentCourse?.name,
    currentLesson?.title,
    lessonPageUrl,
    user,
    usersWhoJoinedTheMeeting );
}

let componentConfig = classRoomPageComponentConfig(
operatorBusinessName,
operator,
currentUser,
displayComponentConfig,
enableTeachPlatform,
children,
setListOfStudents,
listOfStudents,
sessions,
emailInputOptions,
emailMessageOptions,
setCourseFromDropDown,
setLessonFromDropDown,
currentCourse,
currentLesson,
courseId,
grades,
addNewGrade,
markAttendance,
addNewGradesForSelectedStudents,
markAttendanceForSelectedStudents,
pushNotificationSubscribers,
setDropDownDisplayOption,
dropDownDisplayOption,
toggleClassRoomSideBarDropDownDisplay,
toggleSideBarDisplay,
animateInvitationButton,
lessonPageUrl );

return ( <ClassRoomComponent config={componentConfig}/> );
};

const mapDispatch = {
    updateUserInvitationUrl,
    updateCurrentTutor,
    updateCurrentClassRoomLessonPlan,
    loadMeetings,
    loadMeetingsByMeetingId,
    loadSessions,
    loadGrades,
    loadLessons, 
    addNewLesson, 
    saveLesson, 
    getLessonVideoUrl, 
    setLessonInProgressStatus, 
    addNewMeeting,
    saveMeeting,
    decrementSessionCountForPackageOptions,
    incrementSessionCount,
    autoRenewSessionPackages,
    setAutoRenewPackageStatus,
    loadUsers,
    loadUserByEmail,
    updateCurrentUser,
    sendPushNotificationMessage,
    getSelectedPushNotificationUsers,
    loadSubscribedPushNotificationUsers,
    toggleClassRoomSideBarDropDownDisplay
};

const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        selectedCourseTutor: state.courses.courseTutor,
        pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
        selectedPushSubscribers: state.notifications.selectedPushNotificationMessageSubscribers,
        currentUser: state.users.user,
        isLessonsLoading:state.lessons.lessonsLoading,
        isCourseLoading: state.courses.coursesLoading,
        onLessonError: state.lessons.onSaveLessonError,
        course: getCoursesByCourseIdSelector( state, ownProps ),
        lessons: Object.values(state.lessons.lessons),
        coursesByTutor: getCoursesByCreatedByIdSelector( state, ownProps ),
        currentVideoUrl: state.lessons.currentVideoUrl,
        lessonStarted: state.lessons.lessonStarted,
        allSessions: Object.values(state?.sessions?.sessions),
        users: getUsersByOperatorId(state, ownProps),
        courses: getCoursesByOperatorId(state, ownProps),
        grades:  getSortedRecordsByDate(Object.values(state?.grades?.grades), 'testDate'),
        meetings: state.meetings.meetings,
        toggleSideBarDisplay: state.classrooms.displaySideBarDropDown
    };
};

export default connect(mapState, mapDispatch)(ClassRoomPage);