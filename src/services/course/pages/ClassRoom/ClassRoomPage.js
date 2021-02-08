import 
React, { 
useEffect, 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import {
updateUserInvitationUrl,     
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
loadSessions,
updateCurrentTutor,
updateCurrentClassRoomLessonPlan,
loadUsers,
loadGrades, 
loadMeetings,
loadMeetingsByUserId,
lastLoggedInUser,
sendPushNotificationMessage,
getSelectedPushNotificationUsers,
loadSubscribedPushNotificationUsers,
updateCurrentUser,
toggleClassRoomSideBarDropDownDisplay, 
addNewGrade,
markAttendance} from './../../actions';


import {
getSortedRecordsByDate,    
getCoursesByOperatorId,     
getUsersByOperatorId,    
getOperatorFromOperatorBusinessName,
getCoursesByCourseIdSelector,
getCoursesByCreatedByIdSelector,
getPushNotificationUsersByOperatorId } from './../../Selectors';


import { 
emailInputOptions, 
emailMessageOptions,
classRoomPageComponentConfig,
classRoomPageDisplayComponentConfig,
joinMeetingPopupMessage, 
newMeetingInvitePromoMessage,
inviteStudentsToLearningSession,
validationBeforeEnablingTeachPlatform } from  './classRoomPageHelpers';


import {
role, 
cleanUrl } from '../../../../helpers/pageHelpers';


import { 
getMeetings } from '../LessonPlan/lessonPlanHelpers';

import ClassRoomPageComponent from './ClassRoomPageComponent';

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
loadMeetingsByUserId,
loadGrades,
setLessonInProgressStatus,
addNewMeeting,
updateUserInvitationUrl,
allSessions,
pushNotificationSubscribers,
grades,
lastLoggedInUser,
updateCurrentUser,
sendPushNotificationMessage,
getSelectedPushNotificationUsers,
loadSubscribedPushNotificationUsers,
selectedPushSubscribers,
toggleClassRoomSideBarDropDownDisplay,
toggleSideBarDisplay,
children }) => {


const [ lessonUrl, setLessonUrl ] = useState("");
const [ currentCourse, setSelectedCourseFromCourseDropDownSelector ] = useState( undefined );
let   [ currentLesson, setSelectedLessonFromLessonDropDownSelector ] = useState( undefined );
const [ listOfStudents, setListOfStudents ] = useState([]);
const [ dropDownDisplayOption, setDropDownDisplayOption ] = useState( "" );
const lessonTitle = currentLesson?.title?.replace(/\s+/g, "%20");
const [ sessions, setSessions ] = useState( undefined );
const [ newMeeting, setNewMeeting ] = useState( {} );
const [ setUpdateUserTimerHandle, setNewMeetingTimerHandle ] = useState(null);
const [ animateInvitationButton, setAnimationForEmailInvitationEffect ] = useState( false );
const invitationUrl = "test";
const lessonPlanUrl = `/${operatorBusinessName}/LessonPlan/classRoom/${selectedUserId}`;
const lessonPageUrl = "http://localhost:3000" + lessonPlanUrl; 



useEffect(() => {

    
    if ( currentCourse ) {

        loadLessons( currentCourse?._id );
    }


    listOfStudents.forEach(student => {

        loadGrades( student );
    });    

    
    if ( (! listOfStudents[0]?.courses.includes(currentCourse?._id )) || (! displayComponentConfig?.selectedUser?.courses.includes( currentCourse?._id )) ) {

        setListOfStudents([]);
    }


    if ( currentUser?.role === role.Student && currentUser?.lessonInProgress ) {

        showJoinMeetingPopupAfterTheTutorStartsTheMeeting( setUpdateUserTimerHandle, currentCourse, currentUser, operatorBusinessName );
    }


    loadUsers();

    loadMeetings();

    loadSubscribedPushNotificationUsers();

    
}, [ loadGrades, loadLessons, loadUsers, currentCourse, currentLesson, loadMeetings, currentUser ]);  
    


if ( ! currentUser?.userIsValidated || ! operator ){

    navigate(`/${operatorBusinessName}/login`);
}




const setCourseFromDropDown = ( selectedCourseId ) => {

    if ( selectedCourseId ) {

       let course = courses?.find( crs => crs._id === selectedCourseId );

        setSelectedCourseFromCourseDropDownSelector( course );

        setSessions( allSessions?.filter( usersession => usersession?.courseId === selectedCourseId ));
    }
}




const setLessonFromDropDown = ( selectedLessonId ) => {

    if ( selectedLessonId ) {

        let lesson = lessons?.find( lsn => lsn._id === selectedLessonId );
 
        setSelectedLessonFromLessonDropDownSelector( lesson );

        setLessonUrl(`/courses/${lesson?.courseId}/lessons/${lesson?._id}`);
    }
}





const enableTeachPlatform = () => {

    validationBeforeEnablingTeachPlatform( currentCourse, currentUser, role, listOfStudents );
    
    if ( currentUser?.role === role.Student ) {

        loadUsers();
        updateCurrentUser( currentUser );
    }

    try { 
        
        if ( currentUser?.role === role.Student ) { 

            if ( ( currentUser?.lessonInProgress ) && ( currentUser?.meetingId === displayComponentConfig?.selectedUser?.meetingId ) ) {

                joinInProgressMeeting( currentUser );    

            } else {

                waititingForMeetingToStartBeforeJoining( currentUser, currentUser?.lessonInProgress, currentUser?.inviteeSessionUrl, operatorBusinessName );

                return;
            }          
        }
        
        navigate( lessonPlanUrl ); 
        updateCurrentTutor( displayComponentConfig?.selectedUser ); 
        updateCurrentClassRoomLessonPlan( { selectedTutor: displayComponentConfig?.selectedUser, selectedCourse: currentCourse, selectedLesson: currentLesson } );

        if ( currentUser?.role === role.Tutor ) {

           setTeachSessionSettings( currentUser, currentCourse, currentLesson, 
                                      sessions, listOfStudents, lessonPageUrl ); 
           getSelectedPushNotificationUsers( listOfStudents, pushNotificationSubscribers );
        }
                    
    } catch (error) {

        console.log( error );      
    }
}




function setTeachSessionSettings(user, currentCourse, currentLesson, sessions, 
                              listOfStudents, lessonPageUrl ){

    setLessonInProgressStatus();

    let invitees = inviteStudentsToLearningSession( user, currentLesson, sessions, listOfStudents, 
                                 lessonPageUrl, updateUserInvitationUrl, sendPushNotificationMessage, pushNotificationSubscribers ); 

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
    usersWhoJoinedTheMeeting )
}



 


function joinInProgressMeeting( user, allMeetings ){

  let currentMeeting = getMeetings( allMeetings, user, role.Student );

  saveMeeting( user?.meetingId, { ...currentMeeting, usersWhoJoinedTheMeeting:[ currentMeeting?.usersWhoJoinedTheMeeting, user ] });
} 

   




let newMeetingTimerHandle = null;

function waititingForMeetingToStartBeforeJoining( user, lessonInProgress ){

    let timeOutPeriod = 1000;

    if ( ! lessonInProgress ) {

        newMeetingInvitePromoMessage( setAnimationForEmailInvitationEffect );
    }

    newMeetingTimerHandle = setInterval( updateCurrentUserAfterASetInterval, timeOutPeriod, user );

    if ( ! setUpdateUserTimerHandle ) {

        setNewMeetingTimerHandle( newMeetingTimerHandle );
    }
}




function updateCurrentUserAfterASetInterval( meetingUser ) {

    if ( ! meetingUser?.lessonInProgress ) {

        updateCurrentUser( meetingUser );
    } 
}
   



   
function showJoinMeetingPopupAfterTheTutorStartsTheMeeting( updateCurrentUserTimerHandle, selectedCourse, user, businessName ){

    let meetingHasStartedMessage = `Your lesson has started. Please join the following course: ${ selectedCourse?.name }.`;    
    
    let cancellationUrl =  `/${businessName}/users`;

    if ( user?.lessonInProgress && user?.inviteeSessionUrl ) { 

        joinMeetingPopupMessage( meetingHasStartedMessage, user?.lessonInProgress, user?.inviteeSessionUrl, cancellationUrl );

        joinInProgressMeeting( user, meetings );
    
        if ( updateCurrentUserTimerHandle ) {

            clearInterval( updateCurrentUserTimerHandle );

            setNewMeetingTimerHandle( null );
        }
    } 
}





function addNewGradesForSelectedStudents( pushNotificationUsers, selectedCourseFromCourseDropDrown, newGrade, grades ){

    newGrade.selectedStudents.forEach(student => {

       let currentGrades = grades?.filter( grd => grd?.studentId === student?._id );

       addNewGrade( student, selectedCourseFromCourseDropDrown, newGrade, currentGrades, pushNotificationUsers );
    })  
}




function markAttendanceForSelectedStudents( pushNotificationUsers, selectedCourseFromCourseDropDrown, attendance ) {

    attendance.selectedStudents.forEach(student => {

       let attendanceData = { ...attendance, studentId: student?._id  }

       markAttendance( student, selectedCourseFromCourseDropDrown, attendanceData, pushNotificationUsers );
    });
}


let displayComponentConfig = classRoomPageDisplayComponentConfig( 
currentUser, 
users, 
courses, 
lessons, 
currentCourse, 
selectedUserId );


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
addNewGradesForSelectedStudents,
markAttendanceForSelectedStudents,
pushNotificationSubscribers,
setDropDownDisplayOption,
dropDownDisplayOption,
toggleClassRoomSideBarDropDownDisplay,
toggleSideBarDisplay,
animateInvitationButton,
lessonPageUrl );


return (     

    <ClassRoomPageComponent config={componentConfig}/>
        
   );
}



const mapDispatch = {
    updateUserInvitationUrl,
    updateCurrentTutor,
    updateCurrentClassRoomLessonPlan,
    loadMeetings,
    loadMeetingsByUserId,
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
    lastLoggedInUser,
    loadUsers,
    updateCurrentUser,
    sendPushNotificationMessage,
    getSelectedPushNotificationUsers,
    loadSubscribedPushNotificationUsers,
    toggleClassRoomSideBarDropDownDisplay
}


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
    }
}


export default connect(mapState, mapDispatch)(ClassRoomPage);