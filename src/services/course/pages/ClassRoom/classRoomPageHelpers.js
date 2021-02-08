import { 
navigate } from '@reach/router';


import {
role, 
cleanUrl } from '../../../../helpers/pageHelpers';


import { 
toast } from 'react-toastify';

    
import Swal from 'sweetalert2';



export const emailMessageOptions = (currentUser, invitationUrl) => {
    return {
        from: "teachpadsconnect247@gmail.com",
        subject: "Hey! Join my lesson!",
        messageBody: invitationUrl,
        userId: currentUser?._id
    }
}



export const emailInputOptions = {
    name:"inputO",
    type:"email",
    placeHolder:"Invite your friends!"
}



   
   
export function inviteStudentsToLearningSession( 
user, 
courseLesson, 
currentSessions, 
studentsEnrolledInThisCourse,
lessonPageUrl,
updateUserInvitationUrlAction,
sendPushNotificationMessageAction,
pushNotificationSubscribers ){
    
let invitees = [];


if ( user?.role === role.Tutor  ) {
        
    studentsEnrolledInThisCourse.map(invitee => {

    let config = inviteStudentsToLearningSessionConfig(currentSessions, invitee, 
                       lessonPageUrl, courseLesson);    

    if ( config.userHasExhaustedPackageSessions ) {
        return;
    }
    
    invitees.push( config.user );

       updateUserInvitationUrlAction( invitee, config.inviteeSessionUrl, config.nameOfLessonInProgress, config.lessonInProgress ); 

        // set up push notification to navigate user to the lesson plan page after clicking on this message
        let pushNotificationSubscriber = pushNotificationSubscribers?.filter( pushuser => pushuser?.userId === invitee?._id );

        sendPushNotificationMessageAction( pushNotificationSubscriber, {title:`${config.nameOfLessonInProgress} is in progress!`, body:`Click to join: ${ config.nameOfLessonInProgress }`})
    });

}

    return invitees;
}




function inviteStudentsToLearningSessionConfig(
currentSessions,
invitee,
lessonPageUrl,
courseLesson  
) {

const usersSession = currentSessions?.find( currentSession => currentSession?.userId === invitee?._id );
    
return {
    userHasExhaustedPackageSessions: ( usersSession?.numberOfSessions === usersSession?.totalNumberOfSessions  && usersSession?.typeOfSession === "Package" ),
    inviteeSessionUrl: lessonPageUrl, 
    nameOfLessonInProgress: courseLesson?.title, 
    lessonInProgress: true,    
    user: { ...invitee, inviteeSessionUrl: lessonPageUrl, nameOfLessonInProgress: courseLesson?.title, lessonInProgress: true  }
 }
}





export function navigateToStudentDetailPage( futureLink, userNavigationHistoryAction ){

    userNavigationHistoryAction( getCurrentPageUrl() );

    navigate(futureLink)
}
    
    

const getCurrentPageUrl = () => window.location.href; 



export const classRoomPageDisplayComponentConfig = ( currentUser, users, courses, lessons, currentCourse, selectedUserId  ) => {

    let coursesCreatedByTheSelectedTutor = courses?.filter(course =>  course?.createdBy === selectedUserId);
    let listOfCourses = coursesCreatedByTheSelectedTutor?.filter(course => course);
    let listOfLessons = lessons?.filter(lesson => lesson?.courseId === currentCourse?._id);

    return {
            selectedUser: users?.find(user => user?._id === selectedUserId),
            studentsSubscribedToCoursesByThisTutor: users?.filter(usr => usr?.role === "Student" && ( coursesCreatedByTheSelectedTutor?.find( course => usr?.courses?.includes( course?._id)))),
            listOfCoursesForTheSelectedStudent: [ { name: 'Select' }, ...listOfCourses ],
            listOfLessonsForTheSelectedStudent: [ { title: ( currentUser?.role === "Tutor" ? "Add New Lesson" : "" ), description:( currentUser?.role === "Tutor" ? "Add New Lesson" : "" ) }, ...listOfLessons ],
            toggleBetweenAttendanceGradeDisplay:[ { _id: "Courses", name: 'Display Courses' },  { _id: "Grade",  name: 'Add New Grade' }, {_id: "Attendance", name: 'Mark Attendance'} ],
    };
};





export const joinMeetingPopupMessage = ( swalTitle, showConfirmationButton, onConfirmationNavigateToUrl, onCancelationNavigateToUrl ) => {

Swal.fire({
    title: swalTitle,
    icon: 'warning',
    // html: currentUser?.cart?.map((item, index) => '<ul><li key=' + `${index}` + '>' + `${item?.name}` + '</li></ul') + "Do you still want to log out?",
    showCancelButton: true,
    showConfirmButton: ( showConfirmationButton ),
    confirmButtonText: 'Join',
    confirmButtonColor: '#673ab7',
    cancelButtonText: 'Next time'
    }).then( (response) => {
    
    if ( response?.value ) {
        
        navigate( onConfirmationNavigateToUrl );
    
    } else {
        
        navigate( onCancelationNavigateToUrl );
    }
    
    });       
}



export const newMeetingInvitePromoMessage = ( setInviteButtonAnimationEffect ) => {

Swal.fire({
    title: "Please wait. Your meeting has not started.",
    icon: 'info',
    html: '<div><p> While you wait,<br></br> earn points, gift cards and rewards. <br></br> Invite a friend to use the platform. </p></div>',
    showCancelButton: false,
    showConfirmButton: ( true ),
    confirmButtonText: 'Invite Your Friends',
    // confirmButtonColor: '#673ab7',
    confirmButtonColor: '#20c997',
    cancelButtonText: 'Next time'
    }).then( (response) => {
    
    if ( response?.value ) {
        
        setInviteButtonAnimationEffect( true );
    
    } 
    
    });  
}



export function classRoomPageComponentConfig(
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
invitationUrl 
) {


return {
operatorBusinessName,
operator,
currentUser,
selectedUser: displayComponentConfig.selectedUser,
enableTeachPlatform,
courseDetailChildren: children,
studentsSubscribedToThisCourse:displayComponentConfig?.studentsSubscribedToCoursesByThisTutor,
setListOfStudents,
selectedStudents:listOfStudents,
sessions,
emailInputOptions,
emailMessageOptions: emailMessageOptions(currentUser, invitationUrl),
currentTutor: displayComponentConfig?.selectedUser,
listOfCoursesForTheSelectedStudent: displayComponentConfig?.listOfCoursesForTheSelectedStudent,
listOfLessonsForTheSelectedStudent: displayComponentConfig?.listOfLessonsForTheSelectedStudent, 
setSelectedCourseFromCourseDropDownSelector: setCourseFromDropDown,
setSelectedLessonFromLessonDropDownSelector: setLessonFromDropDown,
selectedCourseFromCourseDropDrown: currentCourse,
selectedLessonFromLessonDropDrown: currentLesson, 
courseId,
grades: grades?.filter(grd => grd?.courseId === currentCourse?._id),
addNewGradesForSelectedStudents,
markAttendanceForSelectedStudents,
pushNotificationSubscribers,
displayCourses: displayComponentConfig?.displayCourses,
toggleBetweenAttendanceGradeDisplay: displayComponentConfig?.toggleBetweenAttendanceGradeDisplay,
setDropDownDisplayOption,
dropDownDisplayOption,
toggleClassRoomSideBarDropDownDisplay,
toggleSideBarDisplay,
animateInvitationButton 
}}



export const validationBeforeEnablingTeachPlatform = (
currentCourse,
currentUser,
role,
listOfStudents,
) => {

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

}


// function inviteStudentsToLearningSession( 
// user, 
// courseLesson, 
// currentSessions, 
// studentsEnrolledInThisCourse ){
    
//     let invitees = [];

//     if ( user?.role === role.Tutor  ) {
            
//         studentsEnrolledInThisCourse.map(invitee => {

//         const usersSession = currentSessions?.find( currentSession => currentSession?.userId === invitee?._id );
        
//         const userHasExhaustedPackageSessions = ( usersSession?.numberOfSessions === usersSession?.totalNumberOfSessions  && usersSession?.typeOfSession === "Package" );

//         if ( userHasExhaustedPackageSessions ) {
                
//             return;
//         }
        
//         let setInvitationUrl = lessonPageUrl, nameOfLessonInProgress = courseLesson?.title, lessonInProgress = true;    

//         let user = { ...invitee, inviteeSessionUrl: setInvitationUrl, lessonInProgress: nameOfLessonInProgress, lessonInProgress  }

//         invitees.push( user );
    
//             updateUserInvitationUrl(invitee, setInvitationUrl, nameOfLessonInProgress, lessonInProgress); 

//             // set up push notification to navigate user to the lesson plan page after clicking on this message
//             let pushNotificationSubscriber = pushNotificationSubscribers?.filter( pushuser => pushuser?.userId === invitee?._id );

//             sendPushNotificationMessage( pushNotificationSubscriber, {title:`${nameOfLessonInProgress} is in progress!`, body:`Click to join: ${ nameOfLessonInProgress }`})
//         });

//     }

//     return invitees;
// }


// <ClassRoomPageComponent
    //         operatorBusinessName={operatorBusinessName}
    //         operator={operator}
    //         currentUser={currentUser}
    //         selectedUser={displayComponentConfig?.selectedUser}
    //         enableTeachPlatform={enableTeachPlatform}
    //         courseDetailChildren={children}
    //         studentsSubscribedToThisCourse={displayComponentConfig?.studentsSubscribedToCoursesByThisTutor}
    //         setListOfStudents={setListOfStudents}
    //         selectedStudents={listOfStudents}
    //         sessions={sessions}
    //         emailInputOptions={emailInputOptions}
    //         emailMessageOptions={emailMessageOptions(currentUser,invitationUrl)}
    //         currentTutor={displayComponentConfig?.selectedUser}
    //         listOfCoursesForTheSelectedStudent={displayComponentConfig?.listOfCoursesForTheSelectedStudent} 
    //         listOfLessonsForTheSelectedStudent={displayComponentConfig?.listOfLessonsForTheSelectedStudent} 
    //         setSelectedCourseFromCourseDropDownSelector={setCourseFromDropDown}
    //         setSelectedLessonFromLessonDropDownSelector={setLessonFromDropDown}
    //         selectedCourseFromCourseDropDrown={currentCourse}
    //         selectedLessonFromLessonDropDrown={currentLesson} 
    //         courseId={courseId}
    //         grades={grades?.filter(grd => grd?.courseId === currentCourse?._id)}
    //         addNewGradesForSelectedStudents={addNewGradesForSelectedStudents}
    //         markAttendanceForSelectedStudents={markAttendanceForSelectedStudents} 
    //         pushNotificationSubscribers={pushNotificationSubscribers}
    //         displayCourses={displayComponentConfig?.displayCourses}
    //         toggleBetweenAttendanceGradeDisplay={displayComponentConfig?.toggleBetweenAttendanceGradeDisplay}
    //         setDropDownDisplayOption={setDropDownDisplayOption}
    //         dropDownDisplayOption={dropDownDisplayOption}
    //         toggleClassRoomSideBarDropDownDisplay={toggleClassRoomSideBarDropDownDisplay}
    //         toggleSideBarDisplay={toggleSideBarDisplay}
    //         animateInvitationButton={animateInvitationButton}        
    //         /> 

