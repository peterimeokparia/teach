import {
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import {
navContent } from  'services/course/pages/components/NavigationHelper';

import { 
addCalendar } from 'services/course/actions/calendar';

import {
eventEnum,
getCalendarColor } from 'services/course/pages/CalendarPage/helpers';

import { 
getPushNotificationUsersByOperatorId,
getCalendarsByOperatorId,
getCalendarEventsByUserIdSelector,
getEventsByOperatorId,    
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId,
getMeetingsByOperatorId,
getSessionsByOperatorId } from 'services/course/selectors';

import {
permission,
SiteFunctionalityGroup }from 'services/course/pages/components/SiteFunctionalityGroup';

import{
enableTeachPlatform } from 'services/course/actions/classrooms';

import {
addNewSession } from 'services/course/actions/sessions';

import { 
role } from 'services/course/helpers/PageHelpers';
    
import NotFoundPage from 'services/course/pages/components/NotFoundPage';
import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';
import MainMenu from 'services/course/pages/components/MainMenu';
import NavLinks from 'services/course/pages/components/NavLinks';
import SchoolIcon from '@material-ui/icons/School';
import PeopleIcon from '@material-ui/icons/People';
import ScheduleIcon from '@material-ui/icons/Schedule';
import TimelineIcon from '@material-ui/icons/Timeline';
import BookIcon from '@material-ui/icons/Book';
import ForumIcon from '@material-ui/icons/Forum';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Calendar from 'services/course/helpers/Calendar';
import Roles from 'services/course/pages/components/Roles';
import Select from 'react-select';
// import './style.css';

const Students = ({
    enableTeachPlatform,
    addNewSession,
    meetings,
    allSessions,
    allStudents,
    operatorBusinessName,
    operator,     
    coursesLoading,
    onCoursesError,
    calendarEvents,
    calendar,
    calendars,
    events,
    addCalendar,
    pushNotificationSubscribers,
    user,
    users,
    selectedCourseFromLessonPlanCourseDropDown }) => {
    if ( ! operator || ! operatorBusinessName  ) {
        return <NotFoundPage />;
    }

    if ( ! user?.userIsValidated ){
        navigate(`/${operatorBusinessName}/login`);
    }

    const [ selectedUser, setSelectedUser ] = useState( undefined );
    const [ usersAttendingMeeting, setUsersAttendingMeeting ] = useState( [] );
    const sessions = allSessions?.filter( usersession => usersession?.userId === operator?._id); 

    let calendarConfig = ( tutor, calendarType ) => 
        { return {
            users: users,
            userId: tutor?._id,
            calendarEventType: calendarType,
            operatorId: operator?._id,
            firstName: tutor?.firstname,
            color: getCalendarColor( calendars )
        };
    };

const viewAllTutors = () => {
    navigate(`/${operatorBusinessName}/users`); 
}

const viewCurrentUsersCourseList = ( userId ) => {
    navigate(`/${operatorBusinessName}/mycourses`); 
};

const gotToLessonPlan = ( user ) => { 
    navigate(`/${operatorBusinessName}/classroom/${user._id}`);
};

const gotToPersonalCalendar = ( user ) => {
    let personalCalendar = calendars?.find( cal => cal?.calendarEventType === eventEnum.NewEvent && cal?.userId === user?._id);

    if ( personalCalendar ) {
        navigate(`/${operatorBusinessName}/schedule/${eventEnum.NewEvent}/calendar/${personalCalendar._id}/user/${user._id}`);
    } else {
        addCalendar( { calendar: new Calendar( calendarConfig( user, eventEnum?.NewEvent ) ).calendar()} )
            .then(calendar => {
                if ( calendar ) {
                    navigateUserAfterGeneratingNewCalendar( user, eventEnum.NewEvent );
                }
            })
            .catch( error => console.log( error ));
    }
};

const goToOnlineTutoringRequest = ( user ) => {
    let onlineTutoringCalendar = calendars?.find( cal => cal?.calendarEventType === eventEnum.OnlineTutoringRequest && cal?.userId === user?._id);

    if ( onlineTutoringCalendar ) {
        navigate(`/${operatorBusinessName}/schedule/${eventEnum.OnlineTutoringRequest}/calendar/${onlineTutoringCalendar._id}/user/${user._id}`);
    } else {
        addCalendar( addNewUserCalendar( user, eventEnum?.OnlineTutoringRequest ) )
            .then(calendar => {
                if ( calendar ) {
                    navigateUserAfterGeneratingNewCalendar( user, eventEnum.OnlineTutoringRequest );
                }
            })
            .catch( error => console.log( error ));
    }
};

const goToTimeLine = ( user ) => {
    navigate(`/${operatorBusinessName}/schedule/${eventEnum.NewEvent}/timeline/${user._id}`);
};

const goToMeeting = ( user ) => {
    navigate(`/${operatorBusinessName}/LessonPlan/classRoom/${user?._id}`);
};

function navigateUserAfterGeneratingNewCalendar(user, calendarEventType){ 
    navigate(`/${operatorBusinessName}/schedule/${calendarEventType}/calendar/${calendar._id}/user/${user._id}`);
};

function addNewUserCalendar( student, calendarType ){
    return {
        calendar: {
            userId: student?._id,
            calendarEventType: calendarType,
            operatorId: operator?._id,
            firstName: student?.firstname,
            color: getCalendarColor( calendars )
        }
    };
};

function addNewStudentSession( student, tutor ){
    let session = {
        operatorId: operator?._id,
        courseId: operator?._id,
        typeOfSession: 'generic session',
        numberOfSessions: 0,
        totalNumberOfSessions: 10000,
        userId: student?._id,
        tutorId: tutor?._id,
        startDate: Date.now(),
        endDate: Date.now(),
        status: true,
        autoRenew: false,
        autoRenewDates: []
      };

      addNewSession( session );
};

function getCoursesOwnedByUser( student ){
    return student?.courses;
};

function getUsers( students, currentUser ){
    return ( currentUser?.role === role.Tutor ) 
        ? students
        : students?.filter( usr => usr?._id === currentUser?._id );
}

function studentDetailPage( singleUser ){
    let course = selectedCourseFromLessonPlanCourseDropDown?._id === undefined 
            ? operator?._id 
            : selectedCourseFromLessonPlanCourseDropDown?._id;       
    return `/${operatorBusinessName}/student/${singleUser?._id}/course/${course}`
}

const PageObject = {
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

let testGroup = [
    {   page: 'Users',
        operatorBusinessName,
        pageObject: [ 
            { name: PageObject.Users_SideBarNavigation, value: false }, 
            { name: PageObject.Users_Course_Count, value: false },
            { name: PageObject.Users_SchoolIcon, value: false },
            { name: PageObject.Users_BookIcon, value: true },
            { name: PageObject.Users_ScheduleIcon, value: true },
            { name: PageObject.Users_CalendarTodayIcon, value: true },
            { name: PageObject.Users_ForumIcon, value: false },
            { name: PageObject.Users_TimelineIcon, value: true }, 
            { name: PageObject.Users_VideoCallIcon, value: true }, 
            { name: PageObject.Users_ViewTutorsIcon, value: true }, 
            { name: PageObject.Users_AddSessionIcon, value: true }
        ]  
    }
];

return (
    <div className="Users">
        <div className={operatorBusinessName}>
        <header> 
            <MainMenu 
                navContent={navContent( user, operatorBusinessName, user?.role,  "Student", ['boomingllc'] ).users}
            />   
            <h1>  {`Welcome ${user?.firstname}! `} </h1>

            <div id="logout">
                <LoginLogout
                    id="LoginLogout"
                    operatorBusinessName={operatorBusinessName}
                    user 
                /> 
            </div>                   
        </header>

        </div>
            <div className="ComponentUserList">
            { <ul className={"component-seconday-ul"}>
                {getUsers( users, user ).map(singleUser => 
                    <li className={`component-seconday-list-body-users${operatorBusinessName === 'boomingllc' ? '-boomingllc' : ''}`} data-cy={`li_${singleUser?.firstname}`} key={singleUser?._id}> 
                        <div className={ "user-list-items-users"}>
                            <div className="row">
                                <div className="col-1"> 
                                    <img src={singleUser?.avatarUrl} width="80" height="80" alt=''/>
                                </div>
                                <div className="col-10">
                                 <NavLinks to={studentDetailPage(singleUser)}> 
                                    <div>
                                        <span id={`multicolortext`} className="multicolortext" data-cy={`multicolortext_${singleUser?.firstname}`}>  {singleUser?.firstname} </span> 
                                        <SiteFunctionalityGroup group={ permission( testGroup, operatorBusinessName, PageObject.Users_Course_Count )}>
                                            <span className="price" name={PageObject.Users_Course_Count}> <h6>{getCoursesOwnedByUser(singleUser)?.length} {getCoursesOwnedByUser(singleUser)?.length === 1  ? "Course.": "Courses."}  </h6></span>
                                        </SiteFunctionalityGroup> 
                                    </div> 
                                </NavLinks>  
                                <SiteFunctionalityGroup group={ permission( testGroup, operatorBusinessName, PageObject.Users_VideoCallIcon )}> 
                                <VideoCallIcon 
                                    id="VideoCallIcon"
                                    name={PageObject.Users_VideoCallIcon}
                                    data-cy={`${(singleUser?.firstname)?.toLowerCase()}_VideoCallIcon`}
                                    className="round-button-3"
                                    onClick={() => goToMeeting(singleUser)}
                                /> 
                                </SiteFunctionalityGroup>
                                <SiteFunctionalityGroup group={ permission( testGroup, operatorBusinessName, PageObject.Users_AddSessionIcon )}> 
                                    <Roles role={user?.role === role.Tutor }>
                                        <AddCircleIcon  
                                            id="AddSessionIcon"
                                            name={PageObject.Users_AddSessionIcon}
                                            data-cy={`${(singleUser?.firstname)?.toLowerCase()}_AddSessionIcon`}
                                            className="round-button-1"
                                            onClick={() => addNewStudentSession(singleUser, user)}
                                            disabled={sessions?.length > 0} 
                                        /> 
                                    </Roles>
                                </SiteFunctionalityGroup>
                                <SiteFunctionalityGroup group={ permission( testGroup, operatorBusinessName, PageObject.Users_ViewTutorsIcon )}> 
                                  <PeopleIcon  
                                    id="ViewTutorsIcon"
                                    name={PageObject.Users_ViewTutorsIcon}
                                    data-cy={`${(singleUser?.firstname)?.toLowerCase()}_ViewTutorsIcon`}
                                    className="round-button-2"
                                    onClick={() => viewAllTutors(singleUser)}
                                />
                                </SiteFunctionalityGroup>
                                <SiteFunctionalityGroup group={ permission( testGroup, operatorBusinessName, PageObject.Users_SchoolIcon )}>
                                <SchoolIcon 
                                        id="SchoolIcon"
                                        name={PageObject.Users_SchoolIcon}
                                        data-cy={`${(singleUser?.firstname)?.toLowerCase()}_SchoolIcon`}
                                        className="round-button-1"
                                        onClick={() => viewCurrentUsersCourseList(singleUser?._id)}
                                        disabled={singleUser?.courses?.length === 0} 
                                    />
                                </SiteFunctionalityGroup>
                                <SiteFunctionalityGroup group={ permission( testGroup, operatorBusinessName, PageObject.Users_BookIcon )}>  
                                    <BookIcon 
                                        id="BookIcon"
                                        name={PageObject.Users_BookIcon}
                                        data-cy={`${(singleUser?.firstname)?.toLowerCase()}_BookIcon`}
                                        className="round-button-2"
                                        onClick={() => gotToLessonPlan(singleUser)}
                                        disabled={singleUser?.courses?.length === 0} 
                                    />
                                    </SiteFunctionalityGroup>
                                    <SiteFunctionalityGroup group={ permission( testGroup, operatorBusinessName, PageObject.Users_ScheduleIcon )}>
                                    <ScheduleIcon
                                        id="ScheduleIcon"
                                        name={PageObject.Users_ScheduleIcon}
                                        data-cy={`${(singleUser?.firstname)?.toLowerCase()}_ScheduleIcon`}
                                        className="round-button-3"
                                        onClick={() => gotToPersonalCalendar(singleUser)}
                                        disabled={singleUser?.courses?.length === 0}  
                                    />
                                    </SiteFunctionalityGroup>
                                    <SiteFunctionalityGroup group={ permission( testGroup, operatorBusinessName, PageObject.Users_ForumIcon )}>
                                    <ForumIcon 
                                        id="ForumIcon"
                                        name={PageObject.Users_ForumIcon}
                                        data-cy={`${(singleUser?.firstname)?.toLowerCase()}_ForumIcon`}
                                        className="round-button-6"
                                        onClick={() => goToOnlineTutoringRequest(singleUser)}
                                        disabled={singleUser?.courses?.length === 0} 
                                    />
                                    </SiteFunctionalityGroup>
                                    <SiteFunctionalityGroup group={ permission( testGroup, operatorBusinessName, PageObject.Users_TimelineIcon )}>
                                    <TimelineIcon 
                                        id="TimelineIcon"
                                        name={PageObject.Users_TimelineIcon}
                                        data-cy={`${(singleUser?.firstname)?.toLowerCase()}_TimelineIcon`}
                                        className="round-button-7"
                                        onClick={() => goToTimeLine(singleUser)}
                                        disabled={singleUser?.courses?.length === 0} 
                                    />
                                    </SiteFunctionalityGroup>
                                </div>
                            </div>
                        </div> 
                    </li>    
                    )
                }
            </ul>
            }
    </div>
    </div>
    );       
};

const mapState = ( state, ownProps ) => ({
    user: state?.users?.user,
    allStudents: getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === role.Student),
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    calendar: getCalendarEventsByUserIdSelector(state, ownProps),
    calendars: getCalendarsByOperatorId(state, ownProps),
    events: getEventsByOperatorId(state, ownProps),
    users: getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === role.Student),
    courses: getCoursesByOperatorId(state, ownProps),
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError,
    pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
    allSessions: getSessionsByOperatorId(state, ownProps),
    meetings: getMeetingsByOperatorId(state, ownProps),
    selectedCourseFromLessonPlanCourseDropDown: state.courses.selectedCourseFromLessonPlanCourseDropDown,
});

export default connect(mapState, { addCalendar, enableTeachPlatform, addNewSession })(Students);