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
getCoursesByOperatorId } from 'services/course/selectors';

import {
permission,
SiteFunctionalityGroup,
Organization }from 'services/course/pages/components/SiteFunctionalityGroup';   // use this for permissions

import{
enableTeachPlatform } from 'services/course/actions/classrooms';

import {
studentOption,
goToCalendar,
goToTimeLine,
viewCurrentUsersCourseList,
gotToLessonPlan,
getCoursesSubscribedTo,
getCoursesCreatedByUser,
goToMeeting,
goToOnlineSurvey,
addStudentsToMeeting } from 'services/course/pages/Users/helpers';

import {
PageObject,
group } from 'services/course/pages/Users/helpers/permissions';

import { 
role } from 'services/course/helpers/PageHelpers';

import NotFoundPage from 'services/course/pages/components/NotFoundPage';
import Loading from '../components/Loading';
import LoginLogout from '../LoginPage/components/LoginLogout';
import MainMenu from 'services/course/pages/components/MainMenu';
import NavLinks from 'services/course/pages/components/NavLinks';
import SchoolIcon from '@material-ui/icons/School';
import ScheduleIcon from '@material-ui/icons/Schedule';
import TimelineIcon from '@material-ui/icons/Timeline';
import BookIcon from '@material-ui/icons/Book';
import ForumIcon from '@material-ui/icons/Forum';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import PollIcon from '@mui/icons-material/Poll';
import Select from 'react-select';
import Calendar from 'services/course/helpers/Calendar';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TabPanel from 'services/course/pages/components/FloatingActionButtonZoom';
import './style.css';

const Users = ({
    enableTeachPlatform,
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
    courses }) => {


    if ( ! operator || ! operatorBusinessName  ) {
        return <NotFoundPage />;
    }

    if ( ! user?.userIsValidated ){
        navigate(`/${operatorBusinessName}/login`);
    }

    if ( coursesLoading) {
        return <Loading />;
    }

    if ( onCoursesError ) {
        return <div> { onCoursesError.message } </div> ;
    }

    const [ addUsers, setAddUsers ] = useState( false );
    const [ selectedUser, setSelectedUser ] = useState( undefined );
    const [ usersAttendingMeeting, setUsersAttendingMeeting ] = useState( [] );
    const sessions = allSessions?.filter( usersession => usersession?.operatorId === operator?._id); 

    const calendarProps = {
        users,
        calendars,
        calendar,
        addCalendar,
        operatorBusinessName,
        operator
    };

    const goToMeetingProps = {
        enableTeachPlatform,
        usersAttendingMeeting,
        operatorBusinessName, 
        sessions, 
        operator
    };

    const addStudentsToMeetingProps = {
        enableTeachPlatform,
        setSelectedUser,
        setAddUsers,
        listOfStudents:[], 
        operatorBusinessName, 
        sessions, 
        operator
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
            { ( addUsers ) 
                ?  <label>
                    Select users to add to this meeting:
                    <Select
                        placeholder={ `Add Students` }
                        isMulti
                        value={ usersAttendingMeeting }
                        onChange={ setUsersAttendingMeeting }
                        options={ studentOption( Object.values( allStudents ) ) } 
                    />    
                    <div>
                        <button
                            className="addStudentsToMeeting" 
                            onClick={() => goToMeeting( goToMeetingProps, selectedUser )}>
                            { "Continue"}
                        </button>
                    </div>
                    </label>        
                : <ul className={"component-seconday-ul"}>
                {users.map(singleUser => 
                    <li className={`component-seconday-list-body-users${operatorBusinessName === Organization.Boomingllc ? '-boomingllc' : ''}`} data-cy={`li_${singleUser?.firstname}`} key={singleUser?._id}> 
                        <div className={ "user-list-items-users"}>
                            <div className="row">
                                <div className="col-1"> 
                                    <img src={singleUser?.avatarUrl} width="80" height="80" alt=''/>
                                </div>
                                <div className="col-10">
                                 <NavLinks to={`/${operatorBusinessName}/coursestaught/about/${singleUser?._id}`}> 
                                    <div>
                                        <span id={`multicolortext`} className="multicolortext" data-cy={`multicolortext_${singleUser?.firstname}`}>  {singleUser?.firstname} </span> 
                                        <SiteFunctionalityGroup group={ permission( group, operatorBusinessName, PageObject.Users_Course_Count )}>
                                            <span className="price" name={PageObject.Users_Course_Count}> <h6>{getCoursesCreatedByUser( courses, singleUser )?.length} {getCoursesCreatedByUser( courses, singleUser )?.length === 1  ? "Course.": "Courses"}  </h6></span>
                                            <span className="price" name={PageObject.Users_Course_Count}> <h6>{getCoursesSubscribedTo(singleUser)?.length} {getCoursesSubscribedTo(singleUser)?.length === 1  ? "Subscribed Course.": "Subscribed Courses."}  </h6></span>
                                        </SiteFunctionalityGroup> 
                                    </div> 
                                </NavLinks>  
                                <SiteFunctionalityGroup group={ permission( group, operatorBusinessName, PageObject.Users_VideoCallIcon )}> 
                                <VideoCallIcon 
                                    id="VideoCallIcon"
                                    name={PageObject.Users_VideoCallIcon}
                                    data-cy={`${(singleUser?.firstname)?.toLowerCase()}_VideoCallIcon`}
                                    className="round-button-3"
                                    onClick={() => addStudentsToMeeting( addStudentsToMeetingProps, singleUser, user )}
                                /> 
                                </SiteFunctionalityGroup>
                                <SiteFunctionalityGroup group={ permission( group, operatorBusinessName, PageObject.Users_SchoolIcon )}>
                                <SchoolIcon 
                                        id="SchoolIcon"
                                        name={PageObject.Users_SchoolIcon}
                                        data-cy={`${(singleUser?.firstname)?.toLowerCase()}_SchoolIcon`}
                                        className="round-button-1"
                                        onClick={() => viewCurrentUsersCourseList(operatorBusinessName, singleUser?._id)}
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
                                        className="round-button-1"
                                        onClick={() => goToCalendar( calendarProps, singleUser, eventEnum.NewEvent )}
                                        disabled={singleUser?.courses?.length === 0}  
                                    />
                                    </SiteFunctionalityGroup>
                                    {/*
                                    <SiteFunctionalityGroup group={ permission( group, operatorBusinessName, PageObject.Users_CalendarTodayIcon )}>
                                     <CalendarTodayIcon 
                                        id="CalendarTodayIcon"
                                        name={PageObject.Users_CalendarTodayIcon}
                                        data-cy={`${(singleUser?.firstname)?.toLowerCase()}_CalendarTodayIcon`}
                                        className="round-button-5"
                                        onClick={() => goToCalendar(calendarProps, singleUser, eventEnum?.ConsultationForm)}
                                        disabled={singleUser?.courses?.length === 0} 
                                    /> 
                                    </SiteFunctionalityGroup>
                                    */}
                                    <SiteFunctionalityGroup group={ permission( group, operatorBusinessName, PageObject.Users_ForumIcon )}>
                                    <ForumIcon 
                                        id="ForumIcon"
                                        name={PageObject.Users_ForumIcon}
                                        data-cy={`${(singleUser?.firstname)?.toLowerCase()}_ForumIcon`}
                                        className="round-button-6"
                                        onClick={() => goToCalendar(calendarProps, singleUser, eventEnum?.OnlineTutoringRequest)}
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
                                        // onClick={() => goToOnlineSurvey( operatorBusinessName, user )}
                                    /> 
                                    </SiteFunctionalityGroup>
                                    <SiteFunctionalityGroup group={ permission( group, operatorBusinessName, PageObject.Users_TimelineIcon )}>
                                    <TimelineIcon 
                                        id="TimelineIcon"
                                        name={PageObject.Users_TimelineIcon}
                                        data-cy={`${(singleUser?.firstname)?.toLowerCase()}_TimelineIcon`}
                                        className="round-button-7"
                                        onClick={() => goToTimeLine(operatorBusinessName, eventEnum.SessionScheduling, singleUser)}
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
    users: getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === role.Tutor),
    courses: getCoursesByOperatorId(state, ownProps),
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError,
    pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
    allSessions: Object.values(state?.sessions?.sessions)
});

export default connect(mapState, { addCalendar, enableTeachPlatform })(Users);