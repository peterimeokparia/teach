import React  from 'react';

import { 
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import {
navContent } from  'Services/course/Pages/Components/NavigationHelper';

import { 
addCalendar,
saveCalendar,
loadAllCalendars } from 'Services/course/Actions/Calendar';

import { 
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
import './style.css'; // rename css styling attributes
import { green } from '@material-ui/core/colors';
//shadow-panel

const Users = ({
operatorBusinessName,
operator,     
coursesLoading,
onCoursesError,
calendarEvents,
calendar,
calendars,
events,
user,
users }) => {

if ( ! user?.userIsValidated || ! operator ){
    navigate(`/${operatorBusinessName}/login`);
}

if ( coursesLoading) {
    return <Loading />
}

if ( onCoursesError ) {
    return <div> { onCoursesError.message } </div> ;
}

const viewCurrentUsersCourseList = ( userId ) => {
    // Today
    //navigate(`/${operatorBusinessName}/coursestaught/${userId}`); 
    //localhost:3000/boomingllc/homework/askquestion/0001
    //navigate(`/${operatorBusinessName}/homework/askquestion/000111`);

    //test 
    navigate(`/${operatorBusinessName}/test/605d63b2d0c161039cce22ae/60707c401c5ffb2409411ab8/001/002`)
}

const gotToLessonPlan = ( user ) => { 
    navigate(`/${operatorBusinessName}/classroom/${user._id}`);
}

const gotToCalendar = ( user ) => {
    let schedulingCalendar = calendars?.find( cal => cal?.calendarEventType === 'sessionscheduling' && cal?.userId === user?._id);
    if ( schedulingCalendar ) navigate(`/${operatorBusinessName}/schedule/sessionscheduling/calendar/${schedulingCalendar._id}/user/${user._id}`);
}

const gotToConsultationCalendarTest = ( user ) => {
    let consultingCalendar = calendars?.find( cal => cal?.calendarEventType === 'consultationform' && cal?.userId === user?._id);
    if ( consultingCalendar ) navigate(`/${operatorBusinessName}/schedule/consultationform/calendar/${consultingCalendar?._id}/user/${user._id}`);   
}

const goToTestPage = ( user ) => {
    let calendar = Object.values( calendarEvents )?.find(calEvent => calEvent?.userId === user?._id && calEvent?.calendarEventType === 'sessionscheduling' );
    alert( calendar );
    navigate(`/${operatorBusinessName}/sessionscheduling/calendar/${ calendar?._id }/${user._id}`)
}

const goToOnlineTutoringRequest = ( user ) => {
    navigate(`/${operatorBusinessName}/schedule/onlinetutoringrequest/calendar/${user._id}`)
}

const goToTimeLine = ( user ) => {
    navigate(`/${operatorBusinessName}/schedule/sessionscheduling/timeline/${user._id}`);
}

let navigationContent = navContent( user, operatorBusinessName, user?.role,  "Student" ).users;

return (
        <div className="Users">
            <header> 
                <MainMenu 
                    navContent={navigationContent}
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
                                        <img src={singleUser?.avatarUrl} width="80" height="80" alt="profile picture"/>
                                    </div>
                                     <div className="col-10">
                                        <NavLinks to={`/${operatorBusinessName}/coursestaught/about/${singleUser?._id}`}>
                                            <span className="multicolortext"> {singleUser?.firstname} </span>
                                        </NavLinks>
                                            <span className="price"> <h6>{singleUser?.courses?.length} {singleUser?.courses?.length === 1  ? "Course.": "Courses."}  </h6></span>  
                                            {/* <SchoolIcon style={{ color: green[500] }}/> */}
                                            {/* <button
                                                // className="user-course-btn"
                                                className="round-button-1"
                                                onClick={() => viewCurrentUsersCourseList(singleUser?._id)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            >                                
                                            {/* <span> {singleUser?.courses?.length === 1  ? "View Course." : (singleUser?.courses?.length === 0) ? "" : "View Courses."}  </span>*/}
                                            {/* </button> */} 
                                            <SchoolIcon 
                                                className="round-button-1"
                                                onClick={() => viewCurrentUsersCourseList(singleUser?._id)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            />
                                            
                                            {/* <button
                                                // className="user-course-btn"
                                                className="round-button-2"
                                                onClick={() => gotToLessonPlan(singleUser)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            >                                
                                            {/* <span> {"Go to Class Room."}  </span>*/}
                                            {/* </button>  */}
                                            <BookIcon 
                                                 className="round-button-2"
                                                 onClick={() => gotToLessonPlan(singleUser)}
                                                 disabled={singleUser?.courses?.length === 0} 
                                            />
                                            {/* 
                                            <button
                                                // className="user-course-btn"
                                                className="round-button-3"
                                                onClick={() => gotToCalendar(singleUser)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            >                                
                                            {/* <span> {"Calendar"}  </span> */}
                                            {/* </button> */} 
                                            <ScheduleIcon
                                                className="round-button-3"
                                                onClick={() => gotToCalendar(singleUser)}
                                                disabled={singleUser?.courses?.length === 0}  
                                            />
                                           

                                            {/* <button
                                                className="round-button-4"
                                                // className="user-course-btn"
                                                onClick={() => gotToConsultationCalendarTest(singleUser)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            >                                
                                            {/* <span> {"Test Consultation Calendar"}  </span> */}
                                            {/* </button>  */}
                                            <CalendarTodayIcon 
                                                className="round-button-5"
                                                onClick={() => gotToConsultationCalendarTest(singleUser)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            />

                                            {/* <button
                                                className="round-button-5"
                                                // className="user-course-btn"
                                                onClick={() => goToTestPage(singleUser)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            >                                
                                            {/* <span> {"Test Page"}  </span> */}
                                            {/* </button> */}

                                            {/* <button
                                                className="round-button-6"
                                                // className="user-course-btn"
                                                onClick={() => goToOnlineTutoringRequest(singleUser)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            >                                
                                            {/* <span> {"Test Page2"}  </span> */}
                                            {/* </button>  */}
                                            <ForumIcon 
                                                className="round-button-6"
                                                // className="user-course-btn"
                                                onClick={() => goToOnlineTutoringRequest(singleUser)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            />

                                            {/* <button
                                                className="round-button-7"
                                                // className="user-course-btn"
                                                onClick={() => goToTimeLine(singleUser)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            >                                
                                            {/* <span> {"Test Page2 - TimeLines"}  </span> */}
                                            {/* </button> */}
                                            <TimelineIcon 
                                                className="round-button-7"
                                                // className="user-course-btn"
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
    )       
}

const mapState = ( state, ownProps ) => ({
    user: state?.users?.user,
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    calendar: getCalendarEventsByUserIdSelector(state, ownProps),
    calendars: getCalendarsByOperatorId(state, ownProps),
    events: getEventsByOperatorId(state, ownProps),
    users: getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === "Tutor"),
    courses: getCoursesByOperatorId(state, ownProps),
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError  
})

export default connect(mapState)(Users);