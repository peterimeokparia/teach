import 
React, { 
useEffect, 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
Link, 
Match, 
navigate, 
Redirect } from '@reach/router';

import {

toggleClassRoomCourseGradeForm,
updateUserInvitationUrl,     
loadLessons,
addNewLesson, 
saveLesson, 
getLessonVideoUrl, 
setLessonInProgressStatus, 
addNewMeeting, 
decrementSessionCountForPackageOptions, 
incrementSessionCount, 
autoRenewSessionPackages,
setAutoRenewPackageStatus, 
loadSessions,
updateCurrentTutor,
loadUsers,
loadGrades } from '../../actions';

import {
getSortedRecordsByDate,    
getCoursesByOperatorId,     
getUsersByOperatorId,    
getOperatorFromOperatorBusinessName,
getCoursesByCourseIdSelector,
getCoursesByCreatedByIdSelector } from '../../Selectors';


import { 
emailInputOptions, 
emailMessageOptions,
classRoomPageComponentConfig } from  '../../../../helpers/classRoomPageHelpers';

import { 
toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// import './CourseDetailPage.css';



const ClassRoomPageWithinGroups = ({
operatorBusinessName,
operator,   
currentUser,
selectedUserId, 
updateCurrentTutor,
users, 
courseId,
classRoomId,
groupId,
classRoomName,
courses,
lessons,
loadLessons,
loadGrades,
setLessonInProgressStatus,
addNewMeeting,
updateUserInvitationUrl,
toggleClassRoomCourseGradeForm,
allSessions,
displayGradeForm,
grades,
children }) => {




const [ lessonUrl, setLessonUrl ] = useState("");
const [ currentCourse, setSelectedCourseFromCourseDropDownSelector ] = useState( undefined );
let   [ currentLesson, setSelectedLessonFromLessonDropDownSelector ] = useState( undefined );
const [ listOfStudents, setListOfStudents ] = useState([]);
const [ courseTutor, setCurrentTutor ] = useState( undefined );
const [ dropDownDisplayOption, setDropDownDisplayOption ] = useState( "" );
const lessonTitle = currentLesson?.title?.replace(/\s+/g, "%20");
const [ sessions, setSessions ] = useState( undefined );
const invitationUrl = "test";
const lessonPlanUrl = `/${operatorBusinessName}/LessonPlan/classRoom/${selectedUserId}`;
const lessonPageUrl = "http://localhost:3000" + lessonPlanUrl; 




useEffect(() => {

    
    if ( currentCourse ) {

        loadLessons( currentCourse?._id);
    }

    if ( courseTutor ) {

        updateCurrentTutor( courseTutor );

    }

    if ( listOfStudents[0] ) {

        loadGrades(listOfStudents[0])
    }

    if ( (! listOfStudents[0]?.courses.includes(currentCourse?._id )) || (! courseTutor?.courses.includes( currentCourse?._id )) ) {

        setListOfStudents([]);

        if ( displayGradeForm ) {

            toggleClassRoomCourseGradeForm();
        }
    }

    loadUsers();

    
}, [ loadGrades, loadLessons, loadUsers, currentCourse, currentLesson, courseTutor ]);  
    




const setCourseFromDropDown = ( selectedCourseId ) => {

    if ( selectedCourseId ) {

       let course = courses.find( crs => crs._id === selectedCourseId );

        setSelectedCourseFromCourseDropDownSelector( course );

        setSessions( allSessions?.filter( usersession => usersession?.courseId === selectedCourseId ));

    }

}




const setLessonFromDropDown = ( selectedLessonId ) => {

    if ( selectedLessonId ) {

        let lesson = lessons.find( lsn => lsn._id === selectedLessonId );
 
        setSelectedLessonFromLessonDropDownSelector( lesson );

        setLessonUrl(`/courses/${lesson?.courseId}/lessons/${lesson?._id}`)
     }
    
}




const enableTeachPlatform = () => {
    
    if ( currentUser?.role === "Tutor" && listOfStudents?.length === 0 ) {

        toast.error("Please invite a student.")

        return;  
    }


    if ( currentUser?.role === "Tutor" && !( currentCourse ) ) {

        toast.error("Please select a course.")

        return;  
    }
    

    try {         

        navigate( lessonPlanUrl ); 

        setTeachSessionSettings(courseTutor, currentCourse, currentLesson, sessions, listOfStudents );
                                
                    
    } catch (error) {

        console.log( error );
        
    }
}




 function setTeachSessionSettings(currentUser, currentCourse, currentLesson, sessions, listOfStudents ){

    setLessonInProgressStatus();

    let invitees = inviteStudentsToLearningSession( currentUser, currentLesson, sessions, listOfStudents ); 
    
    addNewMeeting(
        invitees, 
        currentUser?._id,
        sessions, 
        Date.now(), 
        currentCourse?._id, 
        currentLesson?._id,
        currentCourse?.name,
        currentLesson?.title,
        lessonPageUrl,
        currentUser
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
        
        
            let setInvitationUrl = lessonPageUrl;
            let nameOfLessonInProgress = courseLesson?.title;     
            let lessonInProgress = true;    
    
            invitees.push( invitee?._id );
        
              updateUserInvitationUrl(invitee, setInvitationUrl, nameOfLessonInProgress, lessonInProgress); 
            });
    
        }
    
        return invitees;
    }


   let displayComponentConfig = classRoomPageComponentConfig( currentUser, users, courses, lessons, currentCourse, selectedUserId );
   
   return (     

        <ClassRoomDisplayViewComponentWithinGroups
                operatorBusinessName={operatorBusinessName}
                operator={operator}
                users={users}
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
                setCurrentTutor={setCurrentTutor}
                currentTutor={courseTutor}
                listOfCoursesForTheSelectedStudent={displayComponentConfig?.listOfCoursesForTheSelectedStudent} 
                listOfLessonsForTheSelectedStudent={displayComponentConfig?.listOfLessonsForTheSelectedStudent} 
                setSelectedCourseFromCourseDropDownSelector={setCourseFromDropDown}
                setSelectedLessonFromLessonDropDownSelector={setLessonFromDropDown}
                selectedCourseFromCourseDropDrown={currentCourse}
                selectedLessonFromLessonDropDrown={currentLesson} 
                courseId={courseId}
                lessonUrl={lessonUrl}
                grades={grades?.filter(grd => grd?.courseId === currentCourse?._id)} 
                displayGradeForm={displayGradeForm}
                toggleBetweenAttendanceGradeDisplay={displayComponentConfig?.toggleBetweenAttendanceGradeDisplay}
                setDropDownDisplayOption={setDropDownDisplayOption}
                dropDownDisplayOption={dropDownDisplayOption}        
              /> 
                
        );
}



const mapDispatch = {
    toggleClassRoomCourseGradeForm,
    updateUserInvitationUrl,
    updateCurrentTutor,
    loadSessions,
    loadGrades,
    loadLessons, 
    addNewLesson, 
    saveLesson, 
    getLessonVideoUrl, 
    setLessonInProgressStatus, 
    addNewMeeting,
    decrementSessionCountForPackageOptions,
    incrementSessionCount,
    autoRenewSessionPackages,
    setAutoRenewPackageStatus
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
         grades:  getSortedRecordsByDate(Object.values(state?.grades?.grades), 'testDate')
    }
}


export default connect(mapState, mapDispatch)(ClassRoomPageWithinGroups);