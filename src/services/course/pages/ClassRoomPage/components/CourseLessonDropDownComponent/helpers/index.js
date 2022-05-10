import { 
navigate } from '@reach/router';

import { 
role } from 'services/course/helpers/PageHelpers';

import { 
toast } from 'react-toastify';

export const sendEmailMessage = ( listOfStudents, url, sendEmailAction ) => {
    listOfStudents?.forEach( student => {
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
    let prefix = "http://localhost:3000";

    return {
        lessonPlanUrl,
        lessonPageUrl: prefix.concat(lessonPlanUrl)  
    };
};

export function navigateToStudentDetailPage( futureLink, userNavigationHistoryAction ){
    userNavigationHistoryAction( getCurrentPageUrl() );
    navigate(futureLink);
};

export const getselectedTutor = ( users, selectedUserId ) => {
    return users?.find(user => user?._id === selectedUserId);
};

export const getStudentsSubscribedToCoursesByThisTutor = ( users, courseList, userId ) => {
    return users?.filter(usr => usr?.role === "Student" && 
        ( coursesCreatedByTheSelectedTutor( courseList, userId )?.find( course => usr?.courses?.includes( course?._id))));
};

export const getListOfCoursesForTheSelectedStudent = ( courseList, user, selectedTutorId ) => {
    return [ { _id: 'Select',  name: 'Select' }, ...listOfCourses( courseList, user, selectedTutorId ) ];
};

export const getListOfLessonsForTheSelectedStudent = ( user, lessonList, courseSelected ) => {
    return [ {  title: ( user?.role === "Tutor" ? "Add New Lesson" : "" ), 
                description:( user?.role === "Tutor" ? "Add New Lesson" : "" ) 
             }, 
                ...listOfLessons( lessonList, courseSelected ) 
            ];;
};

export const toggleBetweenAttendanceGradeDisplay = () => {
    return [ { _id: "Courses", name: 'Display Courses' },  { _id: "Grade",  name: 'Add New Grade' }, {_id: "Attendance", name: 'Mark Attendance'} ];
};

export const validationBeforeEnablingTeachPlatform = (currentCourse, currentUser, role, listOfStudents ) => {
    if ( ! currentCourse?._id ) {
        toast.error("Please select a course before joining your lesson.");
        return;
    }
    // if ( currentUser?.role === role.Tutor && listOfStudents?.length === 0 ) {
    //     toast.error("Please invite a student.");
    //     return;  
    // }
    if ( currentUser?.role === role.Tutor && !( currentCourse ) ) {
        toast.error("Please select a course.");
        return;  
    }
};

function listOfCourses( courseList, user, seletedTutorId ){
    return coursesCreatedByTheSelectedTutor( courseList, seletedTutorId )?.filter(course => course);
    // return ( user?.role === role.Tutor ) 
    //         ? coursesCreatedByTheSelectedTutor( courseList, seletedTutorId )?.filter(course => course) 
    //         : coursesStudentIsEnrolledIn( courseList, user )?.filter( course => course);
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
        userHasExhaustedPackageSessions: ( usersSession?.numberOfSessions === usersSession?.totalNumberOfSessions 
                                            && usersSession?.typeOfSession === "Package" ),
        inviteeSessionUrl: lessonPageUrl, 
        nameOfLessonInProgress: courseLesson?.title, 
        lessonInProgress: true,    
        user: { ...invitee, inviteeSessionUrl: lessonPageUrl, nameOfLessonInProgress: courseLesson?.title, lessonInProgress: true, lesson: courseLesson?._id  }
    };
};

