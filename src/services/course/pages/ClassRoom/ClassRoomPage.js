import 
React, { 
useEffect, 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import {
toggleClassRoomCourseGradeForm,
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
loadUsers,
loadGrades, 
loadMeetings,
loadMeetingsByUserId,
lastLoggedInUser,
updateCurrentUser } from './../../actions';


import {
getSortedRecordsByDate,    
getCoursesByOperatorId,     
getUsersByOperatorId,    
getOperatorFromOperatorBusinessName,
getCoursesByCourseIdSelector,
getCoursesByCreatedByIdSelector } from './../../Selectors';


import { 
emailInputOptions, 
emailMessageOptions,
classRoomPageComponentConfig,
joinMeetingPopupMessage, 
newMeetingInvitePromoMessage } from  './classRoomPageHelpers';

import {
role, 
cleanUrl } from '../../../../helpers/pageHelpers';

import { 
toast } from 'react-toastify';

import { 
getMeetings } from '../LessonPlan/lessonPlanHelpers';

import ClassRoomPageComponent from './ClassRoomPageComponent';

import 'react-toastify/dist/ReactToastify.css';

// import './CourseDetailPage.css';



const ClassRoomPage = ({
operatorBusinessName,
operator,   
currentUser,
selectedUserId, 
updateCurrentTutor,
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
toggleClassRoomCourseGradeForm,
allSessions,
displayGradeForm,
grades,
lastLoggedInUser,
updateCurrentUser,
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


    if ( listOfStudents[0] ) {

        loadGrades(listOfStudents[0])
    }

    if ( (! listOfStudents[0]?.courses.includes(currentCourse?._id )) || (! displayComponentConfig?.selectedUser?.courses.includes( currentCourse?._id )) ) {

        setListOfStudents([]);

        if ( displayGradeForm ) {

            toggleClassRoomCourseGradeForm();
        }
    }


    if ( currentUser?.role === role.Student && currentUser?.lessonInProgress ) {

        showJoinMeetingPopupAfterTheTutorStartsTheMeeting( setUpdateUserTimerHandle, currentCourse, currentUser, operatorBusinessName );
    }


    loadUsers();

    loadMeetings()

    
}, [ loadGrades, loadLessons, loadUsers, currentCourse, currentLesson, loadMeetings, currentUser ]);  
    




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

        setLessonUrl(`/courses/${lesson?.courseId}/lessons/${lesson?._id}`)
     }
    
}




const enableTeachPlatform = () => {

    if ( ! currentCourse ) {

        toast.error("Please select a course before joining your lesson.");

        return;
    }

    
    if ( currentUser?.role === "Tutor" && listOfStudents?.length === 0 ) {

        toast.error("Please invite a student.");

        return;  
    }


    if ( currentUser?.role === "Tutor" && !( currentCourse ) ) {

        toast.error("Please select a course.");

        return;  
    }
    

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

        if ( currentUser?.role === role.Tutor ) {

           setTeachSessionSettings( currentUser, currentCourse, currentLesson, sessions, listOfStudents ); 
        }
                    
    } catch (error) {

        console.log( error );
        
    }
}




 function setTeachSessionSettings(user, currentCourse, currentLesson, sessions, listOfStudents ){

    setLessonInProgressStatus();

    let invitees = inviteStudentsToLearningSession( user, currentLesson, sessions, listOfStudents ); 

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
        usersWhoJoinedTheMeeting
    )
 }


 

 function inviteStudentsToLearningSession( 
    user, 
    courseLesson, 
    currentSessions, 
    studentsEnrolledInThisCourse ){
        
        let invitees = [];
    
        if ( user?.role === "Tutor"  ) {
                
            studentsEnrolledInThisCourse.map(invitee => {
    
            const usersSession = currentSessions?.find( currentSession => currentSession?.userId === invitee?._id );
            
            const userHasExhaustedPackageSessions = ( usersSession?.numberOfSessions === usersSession?.totalNumberOfSessions  && usersSession?.typeOfSession === "Package" );
    
            if ( userHasExhaustedPackageSessions ) {
                    
                return;
            }
          
            let setInvitationUrl = lessonPageUrl, nameOfLessonInProgress = courseLesson?.title, lessonInProgress = true;    

            let user = { ...invitee, inviteeSessionUrl: setInvitationUrl, lessonInProgress: nameOfLessonInProgress, lessonInProgress: lessonInProgress  }
    
            invitees.push( user );
        
              updateUserInvitationUrl(invitee, setInvitationUrl, nameOfLessonInProgress, lessonInProgress); 
            });
    
        }
    
        return invitees;
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





   let displayComponentConfig = classRoomPageComponentConfig( currentUser, users, courses, lessons, currentCourse, selectedUserId );

   return (     

        <ClassRoomPageComponent
                operatorBusinessName={operatorBusinessName}
                operator={operator}
                currentUser={currentUser}
                selectedUser={displayComponentConfig?.selectedUser}
                enableTeachPlatform={enableTeachPlatform}
                courseDetailChildren={children}
                studentsSubscribedToThisCourse={displayComponentConfig?.studentsSubscribedToCoursesByThisTutor}
                setListOfStudents={setListOfStudents}
                selectedStudents={listOfStudents}
                sessions={sessions}
                emailInputOptions={emailInputOptions}
                emailMessageOptions={emailMessageOptions(currentUser,invitationUrl)}
                currentTutor={displayComponentConfig?.selectedUser}
                listOfCoursesForTheSelectedStudent={displayComponentConfig?.listOfCoursesForTheSelectedStudent} 
                listOfLessonsForTheSelectedStudent={displayComponentConfig?.listOfLessonsForTheSelectedStudent} 
                setSelectedCourseFromCourseDropDownSelector={setCourseFromDropDown}
                setSelectedLessonFromLessonDropDownSelector={setLessonFromDropDown}
                selectedCourseFromCourseDropDrown={currentCourse}
                selectedLessonFromLessonDropDrown={currentLesson} 
                courseId={courseId}
                grades={grades?.filter(grd => grd?.courseId === currentCourse?._id)} 
                displayGradeForm={displayGradeForm}
                toggleBetweenAttendanceGradeDisplay={displayComponentConfig?.toggleBetweenAttendanceGradeDisplay}
                setDropDownDisplayOption={setDropDownDisplayOption}
                dropDownDisplayOption={dropDownDisplayOption}
                animateInvitationButton={animateInvitationButton}        
              /> 
                
        );
}



const mapDispatch = {
    toggleClassRoomCourseGradeForm,
    updateUserInvitationUrl,
    updateCurrentTutor,
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
    updateCurrentUser
}


const mapState = (state, ownProps) => {

     return {
         operator: getOperatorFromOperatorBusinessName(state, ownProps),
         selectedCourseTutor: state.courses.courseTutor,
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
         displayGradeForm: state.classrooms.displayGradeForm,
         grades:  getSortedRecordsByDate(Object.values(state?.grades?.grades), 'testDate'),
         meetings: state.meetings.meetings,
    }
}


export default connect(mapState, mapDispatch)(ClassRoomPage);