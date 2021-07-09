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
    pushNotificationSubscribers,
    user,
    users }) => {
    if ( ! user?.userIsValidated || ! operator ){
        navigate(`/${operatorBusinessName}/login`);
    }

    if ( coursesLoading) {
        return <Loading />;
    }

    if ( onCoursesError ) {
        return <div> { onCoursesError.message } </div> ;
    }

const viewCurrentUsersCourseList = ( userId ) => {
    navigate(`/${operatorBusinessName}/coursestaught/${userId}`); 
};

const gotToLessonPlan = ( user ) => { 
    navigate(`/${operatorBusinessName}/classroom/${user._id}`);
};
// <CalendarPage path="/:operatorBusinessName/schedule/:calendarEventType/calendar/:calendarId/user/:userId"/>
const gotToCalendar = ( user ) => {
    let schedulingCalendar = calendars?.find( cal => cal?.calendarEventType === eventEnum.SessionScheduling && cal?.userId === user?._id);

    if ( schedulingCalendar ) {
        navigate(`/${operatorBusinessName}/schedule/${eventEnum.SessionScheduling}/calendar/${schedulingCalendar._id}/user/${user._id}`);
    } else {
        addCalendar( addNewUserCalendar( user, eventEnum?.SessionScheduling ) )
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
    addCalendar( addNewUserCalendar( user, calendarEventType ) )
        .then(calendar => {
            if ( calendar ) {
            navigate(`/${operatorBusinessName}/schedule/${calendarEventType}/calendar/${calendar._id}/user/${user._id}`);
            }
        })
        .catch( error => console.log( error ));
};

function addNewUserCalendar( tutor, calendarType ){
   return {
    calendar: {
        userId: tutor?._id,
        calendarEventType: calendarType,
        operatorId: operator?._id,
        firstName: tutor?.firstname,
        color: getCalendarColor( calendars )
        }, 
        event: undefined, 
        location: undefined, 
        schedulingData: undefined, 
        consultation: undefined, 
        calendarEventType: calendarType, 
        operatorId: operator?._id, 
        currentUser: tutor, 
        pushNotificationUser: pushNotificationSubscribers?.filter(subscriber =>  subscriber?.userId === tutor?._id  ), 
        emailAddresses: [ tutor?.email ]
   };
};

return (
    <div className="Users">
        <header> 
            <MainMenu 
                navContent={navContent( user, operatorBusinessName, user?.role,  "Student" ).users}
            />           
            <h1>  {`Welcome ${user?.firstname}! `} </h1>
            <LoginLogout
                operatorBusinessName={operatorBusinessName}
                user 
            />                      
        </header>
            <div className="ComponentUserList">
        <ul >
            {users.map(singleUser => 
                <li className={"component-seconday-list-body-users"}> 
                    <div className={ "user-list-items-users"}>
                        <div className="row">
                            <div className="col-1"> 
                                <img src={singleUser?.avatarUrl} width="80" height="80" alt=''/>
                            </div>
                            <div className="col-10">
                            <NavLinks to={`/${operatorBusinessName}/coursestaught/about/${singleUser?._id}`}>
                                <span className="multicolortext"> {singleUser?.firstname} </span>
                            </NavLinks>
                                <span className="price"> <h6>{singleUser?.courses?.length} {singleUser?.courses?.length === 1  ? "Course.": "Courses."}  </h6></span>  
                                <SchoolIcon 
                                    className="round-button-1"
                                    onClick={() => viewCurrentUsersCourseList(singleUser?._id)}
                                    disabled={singleUser?.courses?.length === 0} 
                                />
                                <BookIcon 
                                    className="round-button-2"
                                    onClick={() => gotToLessonPlan(singleUser)}
                                    disabled={singleUser?.courses?.length === 0} 
                                />
                                <ScheduleIcon
                                    className="round-button-3"
                                    onClick={() => gotToCalendar(singleUser)}
                                    disabled={singleUser?.courses?.length === 0}  
                                />
                                <CalendarTodayIcon 
                                    className="round-button-5"
                                    onClick={() => gotToConsultationCalendar(singleUser)}
                                    disabled={singleUser?.courses?.length === 0} 
                                />
                                <ForumIcon 
                                    className="round-button-6"
                                    onClick={() => goToOnlineTutoringRequest(singleUser)}
                                    disabled={singleUser?.courses?.length === 0} 
                                />
                                <TimelineIcon 
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

export default connect(mapState)(Users);