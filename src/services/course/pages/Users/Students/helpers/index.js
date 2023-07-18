import { navigate } from '@reach/router';
import { role } from 'services/course/helpers/PageHelpers';
import { organization } from 'services/course/pages/components/SiteFunctionalityGroup';

export function goToMeeting( operatorBusinessName, user ){
    navigate(`/${operatorBusinessName}/LessonPlan/classRoom/${user?._id}`);
};

export function viewAllTutors( operatorBusinessName ){
    navigate(`/${operatorBusinessName}/users`); 
}

export function viewCurrentUsersCourseList( operatorBusinessName ){
    navigate(`/${operatorBusinessName}/mycourses`); 
};

export function getCoursesOwnedByUser( student ){
    return student?.courses;
};

export function getUsers( students, currentUser ){
    return ( currentUser?.role === role.Tutor ) 
        ? students
        : students?.filter( usr => usr?._id === currentUser?._id );
}

export function studentDetailPage( operatorBusinessName, selectedCourse, singleUser, operator ){
    let course = selectedCourse?._id === undefined 
            ? operator?._id 
            : selectedCourse?._id;       

    return `/${operatorBusinessName}/student/${singleUser?._id}/course/${course}`;
}

export function addNewStudentSession( sessionProps, student, tutor ){
    let {
        addNewSession,
        operatorId,
        courseId,
        typeOfSession,
        numberOfSessions,
        totalNumberOfSessions,
        startDate,
        endDate,
        status,
        autoRenew,
        autoRenewDates
    } = sessionProps;

    let session = {
        operatorId,
        courseId,
        typeOfSession,
        numberOfSessions,
        totalNumberOfSessions,
        userId: student?._id,
        tutorId: tutor?._id,
        startDate,
        endDate,
        status,
        autoRenew,
        autoRenewDates
      };

      addNewSession( session );
};

export const PageObject = {
    Users_Course_Count: 'Users_Course_Count',
    Users_SchoolIcon: 'Users_SchoolIcon',
    Users_BookIcon: 'Users_BookIcon',
    Users_ScheduleIcon: 'Users_ScheduleIcon',
    Users_CalendarTodayIcon: 'Users_CalendarTodayIcon',
    Users_ForumIcon: 'Users_ForumIcon',
    Users_TimelineIcon: 'Users_TimelineIcon',
    Users_VideoCallIcon: 'Users_VideoCallIcon',
    Users_SideBarNavigation: 'Users_SideBarNavigation',
    Users_ViewTutorsIcon: 'Users_ViewTutorsIcon',
    Users_AddSessionIcon: 'Users_AddSessionIcon'
};

export let group = [
    {   page: 'Users',
        operatorBusinessName: [organization.Boomingllc, organization.Teach],
        pageObject: [ 
            { name: PageObject.Users_SideBarNavigation, allowed: [organization.Teach] }, 
            { name: PageObject.Users_Course_Count, allowed: [organization.Teach] },
            { name: PageObject.Users_SchoolIcon, allowed: [organization.Teach] },
            { name: PageObject.Users_BookIcon, allowed: [organization.Boomingllc, organization.Teach] },
            { name: PageObject.Users_ScheduleIcon, allowed: [organization.Boomingllc, organization.Teach] },
            { name: PageObject.Users_CalendarTodayIcon, allowed: [organization.Boomingllc, organization.Teach] },
            { name: PageObject.Users_ForumIcon, allowed: [organization.Teach]},
            { name: PageObject.Users_TimelineIcon, allowed: [organization.Boomingllc, organization.Teach] }, 
            { name: PageObject.Users_VideoCallIcon, allowed: [organization.Boomingllc, organization.Teach]}, 
            { name: PageObject.Users_ViewTutorsIcon, allowed: [organization.Boomingllc, organization.Teach]}, 
            { name: PageObject.Users_AddSessionIcon, allowed: [organization.Boomingllc, organization.Teach] }
        ]  
    }
];