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
getCalendarByCalendarEventType,
getEventsByOperatorId,    
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId,
getMeetingsByOperatorId,
getSessionsByOperatorId } from 'services/course/selectors';

import {
permission,
SiteFunctionalityGroup,
Organization }from 'services/course/pages/components/SiteFunctionalityGroup';

import{
enableTeachPlatform } from 'services/course/actions/classrooms';

import {
addNewSession } from 'services/course/actions/sessions';

import { 
role } from 'services/course/helpers/PageHelpers';

import {
goToCalendar,
goToTimeLine,
gotToLessonPlan } from 'services/course/pages/Users/helpers';

import {
viewAllTutors,
viewCurrentUsersCourseList,
goToMeeting,
getCoursesOwnedByUser,
getUsers,
studentDetailPage,
PageObject,
group,
addNewStudentSession } from 'services/course/pages/Users/Students/helpers';
    
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
import PollIcon from '@mui/icons-material/Poll';
import Roles from 'services/course/pages/components/Roles';

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

    const sessions = allSessions?.filter( usersession => usersession?.userId === operator?._id); 

    const calendarProps = {
        users,
        calendars,
        calendar,
        addCalendar,
        operatorBusinessName,
        operator
    };

    const sessionProps = {
        operatorId: operator?._id,
        courseId: selectedCourseFromLessonPlanCourseDropDown?._id,
        typeOfSession: 'generic session',
        numberOfSessions: 0,
        totalNumberOfSessions: 10000,
        startDate: Date.now(),
        endDate: Date.now(),
        status: true,
        autoRenew: false,
        autoRenewDates: [],
        addNewSession
    };

return (
    <div className="Users">
        <div className={operatorBusinessName}>
        <header> 
            <MainMenu 
                navContent={navContent( user, operatorBusinessName, user?.role,  "Student", [Organization.Boomingllc] ).users}
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
                    <li className={`component-seconday-list-body-users${operatorBusinessName === Organization.Boomingllc ? '-boomingllc' : ''}`} data-cy={`li_${singleUser?.firstname}`} key={singleUser?._id}> 
                        <div className={ "user-list-items-users"}>
                            <div className="row">
                                <div className="col-1"> 
                                    <img src={singleUser?.avatarUrl} width="80" height="80" alt=''/>
                                </div>
                                <div className="col-10">
                                 <NavLinks to={studentDetailPage( operatorBusinessName, selectedCourseFromLessonPlanCourseDropDown, singleUser, operator )}> 
                                    <div>
                                        <span id={`multicolortext`} className="multicolortext" data-cy={`multicolortext_${singleUser?.firstname}`}>  {singleUser?.firstname} </span> 
                                        <SiteFunctionalityGroup group={ permission( group, operatorBusinessName, PageObject.Users_Course_Count )}>
                                            <span className="price" name={PageObject.Users_Course_Count}> <h6>{getCoursesOwnedByUser(singleUser)?.length} {getCoursesOwnedByUser(singleUser)?.length === 1  ? "Course.": "Courses."}  </h6></span>
                                        </SiteFunctionalityGroup> 
                                    </div> 
                                </NavLinks>  
                                <SiteFunctionalityGroup group={ permission( group, operatorBusinessName, PageObject.Users_VideoCallIcon )}> 
                                <VideoCallIcon 
                                    id="VideoCallIcon"
                                    name={PageObject.Users_VideoCallIcon}
                                    data-cy={`${(singleUser?.firstname)?.toLowerCase()}_VideoCallIcon`}
                                    className="round-button-3"
                                    onClick={() => goToMeeting( operatorBusinessName, singleUser)}
                                /> 
                                </SiteFunctionalityGroup>
                                <SiteFunctionalityGroup group={ permission( group, operatorBusinessName, PageObject.Users_AddSessionIcon )}> 
                                    <Roles role={user?.role === role.Tutor }>
                                        <AddCircleIcon  
                                            id="AddSessionIcon"
                                            name={PageObject.Users_AddSessionIcon}
                                            data-cy={`${(singleUser?.firstname)?.toLowerCase()}_AddSessionIcon`}
                                            className="round-button-1"
                                            onClick={() => addNewStudentSession( sessionProps, singleUser, user )}
                                            disabled={sessions?.length > 0} 
                                        /> 
                                    </Roles>
                                </SiteFunctionalityGroup>
                                <SiteFunctionalityGroup group={ permission( group, operatorBusinessName, PageObject.Users_ViewTutorsIcon )}> 
                                  <PeopleIcon  
                                    id="ViewTutorsIcon"
                                    name={PageObject.Users_ViewTutorsIcon}
                                    data-cy={`${(singleUser?.firstname)?.toLowerCase()}_ViewTutorsIcon`}
                                    className="round-button-2"
                                    onClick={() => viewAllTutors( operatorBusinessName )}
                                />
                                </SiteFunctionalityGroup>
                                <SiteFunctionalityGroup group={ permission( group, operatorBusinessName, PageObject.Users_SchoolIcon )}>
                                <SchoolIcon 
                                        id="SchoolIcon"
                                        name={PageObject.Users_SchoolIcon}
                                        data-cy={`${(singleUser?.firstname)?.toLowerCase()}_SchoolIcon`}
                                        className="round-button-1"
                                        onClick={() => viewCurrentUsersCourseList(operatorBusinessName)}
                                        disabled={singleUser?.courses?.length === 0} 
                                    />
                                </SiteFunctionalityGroup>
                                <SiteFunctionalityGroup group={ permission( group, operatorBusinessName, PageObject.Users_BookIcon )}>  
                                    <BookIcon 
                                        id="BookIcon"
                                        name={PageObject.Users_BookIcon}
                                        data-cy={`${(singleUser?.firstname)?.toLowerCase()}_BookIcon`}
                                        className="round-button-2"
                                        onClick={() => gotToLessonPlan( operatorBusinessName, singleUser)}
                                        disabled={singleUser?.courses?.length === 0} 
                                    />
                                    </SiteFunctionalityGroup>
                                    <SiteFunctionalityGroup group={ permission( group, operatorBusinessName, PageObject.Users_ScheduleIcon )}>
                                    <ScheduleIcon
                                        id="ScheduleIcon"
                                        name={PageObject.Users_ScheduleIcon}
                                        data-cy={`${(singleUser?.firstname)?.toLowerCase()}_ScheduleIcon`}
                                        className="round-button-3"
                                        onClick={() => goToCalendar( calendarProps, singleUser, eventEnum.NewEvent )}
                                        disabled={singleUser?.courses?.length === 0}  
                                    />
                                    </SiteFunctionalityGroup>
                                    <SiteFunctionalityGroup group={ permission( group, operatorBusinessName, PageObject.Users_ForumIcon )}>
                                    <ForumIcon 
                                        id="ForumIcon"
                                        name={PageObject.Users_ForumIcon}
                                        data-cy={`${(singleUser?.firstname)?.toLowerCase()}_ForumIcon`}
                                        className="round-button-6"
                                        onClick={() => goToCalendar( calendarProps, singleUser, eventEnum?.OnlineTutoringRequest )}
                                        disabled={singleUser?.courses?.length === 0} 
                                    />
                                    </SiteFunctionalityGroup>
                                    <SiteFunctionalityGroup group={ permission( group, operatorBusinessName, PageObject.Users_VideoCallIcon )}> 
                                    <PollIcon 
                                        id="PollIcon"
                                        name={PageObject.Users_PollIcon}
                                        data-cy={`${(singleUser?.firstname)?.toLowerCase()}_PollIcon`}
                                        className="round-button-3"
                                        onClick={() => goToCalendar( calendarProps, singleUser, eventEnum?.ReportForms )}
                                    /> 
                                    </SiteFunctionalityGroup>
                                    <SiteFunctionalityGroup group={ permission( group, operatorBusinessName, PageObject.Users_TimelineIcon )}>
                                    <TimelineIcon 
                                        id="TimelineIcon"
                                        name={PageObject.Users_TimelineIcon}
                                        data-cy={`${(singleUser?.firstname)?.toLowerCase()}_TimelineIcon`}
                                        className="round-button-7"
                                        onClick={() => goToTimeLine( operatorBusinessName, eventEnum.NewEvent, singleUser)}
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
    calendar: getCalendarByCalendarEventType(state, ownProps),
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