import { 
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import {
navContent } from  'Services/course/Pages/Components/NavigationHelper';

import { 
addCalendar } from 'Services/course/Actions/Calendar';

import {
eventEnum,
getCalendarColor } from 'Services/course/Pages/CalendarPage/helpers';

import { 
getPushNotificationUsersByOperatorId,
getCalendarsByOperatorId,
getCalendarEventsByUserIdSelector,
getEventsByOperatorId,    
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId } from 'Services/course/Selectors';

import NotFoundPage from 'Services/course/Pages/Components/NotFoundPage';
import Loading from '../Components/Loading';
import LoginLogout from '../LoginPage/Components/LoginLogout';
import MainMenu from 'Services/course/Pages/Components/MainMenu';
import NavLinks from 'Services/course/Pages/Components/NavLinks';
import SchoolIcon from '@material-ui/icons/School';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScheduleIcon from '@material-ui/icons/Schedule';
import TimelineIcon from '@material-ui/icons/Timeline';
import BookIcon from '@material-ui/icons/Book';
import ForumIcon from '@material-ui/icons/Forum';
import Calendar from 'Services/course/helpers/Calendar';
import './style.css';

const Users = ({
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
    users }) => {
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

    let calendarConfig = ( tutor, calendarType ) => 
        { return {
            users: users,
            userId: tutor?._id,
            calendarEventType: calendarType,
            operatorId: operator?._id,
            firstName: tutor?.firstname,
            color: getCalendarColor( calendars )
        }
    }

const viewCurrentUsersCourseList = ( userId ) => {
    navigate(`/${operatorBusinessName}/coursestaught/${userId}`); 
};

const gotToLessonPlan = ( user ) => { 
    navigate(`/${operatorBusinessName}/classroom/${user._id}`);
};

const gotToCalendar = ( user ) => {
    let schedulingCalendar = calendars?.find( cal => cal?.calendarEventType === eventEnum.SessionScheduling && cal?.userId === user?._id);

    if ( schedulingCalendar ) {
        navigate(`/${operatorBusinessName}/schedule/${eventEnum.SessionScheduling}/calendar/${schedulingCalendar._id}/user/${user._id}`);
    } else {
        addCalendar( { calendar: new Calendar( calendarConfig( user, eventEnum?.SessionScheduling ) ).calendar()} )
         .then(calendar => {
             if ( calendar ) {
                 navigateUserAfterGeneratingNewCalendar( user, eventEnum.SessionScheduling );
             }
         })
         .catch( error => console.log( error ));
    }
};

const gotToConsultationCalendar = ( user ) => {
    let consultingCalendar = calendars?.find( cal => cal?.calendarEventType === eventEnum?.ConsultationForm && cal?.userId === user?._id);

    if ( consultingCalendar ) {
        navigate(`/${operatorBusinessName}/schedule/${eventEnum?.ConsultationForm}/calendar/${consultingCalendar._id}/user/${user._id}`);
    } else {
        addCalendar( addNewUserCalendar( user, eventEnum?.ConsultationForm ) )
         .then(calendar => {
             if ( calendar ) {
                 navigateUserAfterGeneratingNewCalendar( user, eventEnum.ConsultationForm );
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
    navigate(`/${operatorBusinessName}/schedule/sessionscheduling/timeline/${user._id}`);
};

function navigateUserAfterGeneratingNewCalendar(user, calendarEventType){ 
    navigate(`/${operatorBusinessName}/schedule/${calendarEventType}/calendar/${calendar._id}/user/${user._id}`);
};

function addNewUserCalendar( tutor, calendarType ){
   return {
    calendar: {
        userId: tutor?._id,
        calendarEventType: calendarType,
        operatorId: operator?._id,
        firstName: tutor?.firstname,
        color: getCalendarColor( calendars )
    }
   };
};
return (
    <div className="Users">
        <header> 
            <MainMenu 
                navContent={navContent( user, operatorBusinessName, user?.role,  "Student" ).users}
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
            <div className="ComponentUserList">
        <ul className={"component-seconday-ul"}>
            {users.map(singleUser => 
                <li className={"component-seconday-list-body-users"} data-cy={`li_${singleUser?.firstname}`}> 
                    <div className={ "user-list-items-users"}>
                        <div className="row">
                            <div className="col-1"> 
                                <img src={singleUser?.avatarUrl} width="80" height="80" alt=''/>
                            </div>
                            <div className="col-10">
                            <NavLinks to={`/${operatorBusinessName}/coursestaught/about/${singleUser?._id}`}>
                                <span id={`multicolortext`} className="multicolortext" data-cy={`multicolortext_${singleUser?.firstname}`}> {singleUser?.firstname} </span>
                            </NavLinks>
                                <span className="price"> <h6>{singleUser?.courses?.length} {singleUser?.courses?.length === 1  ? "Course.": "Courses."}  </h6></span>  
                                <SchoolIcon 
                                    id="SchoolIcon"
                                    data-cy={`${(singleUser?.firstname)?.toLowerCase()}_SchoolIcon`}
                                    className="round-button-1"
                                    onClick={() => viewCurrentUsersCourseList(singleUser?._id)}
                                    disabled={singleUser?.courses?.length === 0} 
                                />
                                <BookIcon 
                                    id="BookIcon"
                                    data-cy={`${(singleUser?.firstname)?.toLowerCase()}_BookIcon`}
                                    className="round-button-2"
                                    onClick={() => gotToLessonPlan(singleUser)}
                                    disabled={singleUser?.courses?.length === 0} 
                                />
                                <ScheduleIcon
                                    id="ScheduleIcon"
                                    data-cy={`${(singleUser?.firstname)?.toLowerCase()}_ScheduleIcon`}
                                    className="round-button-3"
                                    onClick={() => gotToCalendar(singleUser)}
                                    disabled={singleUser?.courses?.length === 0}  
                                />
                                <CalendarTodayIcon 
                                    id="CalendarTodayIcon"
                                    data-cy={`${(singleUser?.firstname)?.toLowerCase()}_CalendarTodayIcon`}
                                    className="round-button-5"
                                    onClick={() => gotToConsultationCalendar(singleUser)}
                                    disabled={singleUser?.courses?.length === 0} 
                                />
                                <ForumIcon 
                                    id="ForumIcon"
                                    data-cy={`${(singleUser?.firstname)?.toLowerCase()}_ForumIcon`}
                                    className="round-button-6"
                                    onClick={() => goToOnlineTutoringRequest(singleUser)}
                                    disabled={singleUser?.courses?.length === 0} 
                                />
                                <TimelineIcon 
                                    id="TimelineIcon"
                                    data-cy={`${(singleUser?.firstname)?.toLowerCase()}_TimelineIcon`}
                                    className="round-button-7"
                                    onClick={() => goToTimeLine(singleUser)}
                                    disabled={singleUser?.courses?.length === 0} 
                                />
                            </div>
                        </div>
                    </div> 
                </li>      
                )
            }
        </ul>
    </div>
    </div>
    );       
};

const mapState = ( state, ownProps ) => ({
    user: state?.users?.user,
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    calendar: getCalendarEventsByUserIdSelector(state, ownProps),
    calendars: getCalendarsByOperatorId(state, ownProps),
    events: getEventsByOperatorId(state, ownProps),
    users: getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === "Tutor"),
    courses: getCoursesByOperatorId(state, ownProps),
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError,
    pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps) 
});

export default connect(mapState, { addCalendar })(Users);