import { 
navigate } from '@reach/router';

import { 
role } from '../../../helpers/PageHelpers';

import { 
toast } from 'react-toastify';

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
    studentsEnrolledInThisCourse.forEach((invitee) => { 
    let config = inviteStudentsToLearningSessionConfig(currentSessions, invitee, lessonPageUrl, courseLesson);    

    if ( ! config?.userHasExhaustedPackageSessions ) {
        invitees.push( config.user );
        updateUserInvitationUrlAction( invitee, config.inviteeSessionUrl, config.nameOfLessonInProgress, config.lessonInProgress );
        // set up push notification to navigate user to the lesson plan page after clicking on this message
        let pushNotificationSubscriber = pushNotificationSubscribers?.filter( pushuser => pushuser?.userId === invitee?._id );

        sendPushNotificationMessageAction( pushNotificationSubscriber, {title:`${config.nameOfLessonInProgress} is in progress!`, body:`Click to join: ${ config.nameOfLessonInProgress }` }); 
    }
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
 };
};

const getCurrentPageUrl = () => window.location.href; 

export function navigateToStudentDetailPage( futureLink, userNavigationHistoryAction ){
    userNavigationHistoryAction( getCurrentPageUrl() );
    navigate(futureLink);
};

export const classRoomPageDisplayComponentConfig = ( currentUser, users, courses, lessons, currentCourse, selectedUserId  ) => {
    let coursesCreatedByTheSelectedTutor = courses?.filter(course =>  course?.createdBy === selectedUserId);
    let coursesStudentIsEnrolledIn = courses?.filter(course =>  currentUser?.courses?.includes( course?._id));
    let listOfCourses = ( currentUser?.role === role.Tutor ) ? coursesCreatedByTheSelectedTutor?.filter(course => course) : coursesStudentIsEnrolledIn?.filter( course => course);
    let listOfLessons = lessons?.filter(lesson => lesson?.courseId === currentCourse?._id);

    return {
        selectedUser: users?.find(user => user?._id === selectedUserId),
        studentsSubscribedToCoursesByThisTutor: users?.filter(usr => usr?.role === "Student" && ( coursesCreatedByTheSelectedTutor?.find( course => usr?.courses?.includes( course?._id)))),
        listOfCoursesForTheSelectedStudent: [ { name: 'Select' }, ...listOfCourses ],
        listOfLessonsForTheSelectedStudent: [ { title: ( currentUser?.role === "Tutor" ? "Add New Lesson" : "" ), description:( currentUser?.role === "Tutor" ? "Add New Lesson" : "" ) }, ...listOfLessons ],
        toggleBetweenAttendanceGradeDisplay:[ { _id: "Courses", name: 'Display Courses' },  { _id: "Grade",  name: 'Add New Grade' }, {_id: "Attendance", name: 'Mark Attendance'} ],
    };
};

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
addNewGradeAction: addNewGrade,
markAttendanceAction: markAttendance,
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
}; };

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
};
