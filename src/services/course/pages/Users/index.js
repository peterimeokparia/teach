import React  from 'react';

import { 
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import Loading from '../Components/Loading';

import LoginLogout from '../LoginPage/Components/LoginLogout';

import MainMenu from 'Services/course/Pages/Components/MainMenu';

import {
navContent } from  'Services/course/Pages/Components/NavigationHelper';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId } from 'Services/course/Selectors';

import NavLinks from 'Services/course/Pages/Components/NavLinks';
import './style.css'; // rename css styling attributes
//shadow-panel

const Users = ({
operatorBusinessName,
operator,     
coursesLoading,
onCoursesError,
calendarEvents,
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
    navigate(`/${operatorBusinessName}/coursestaught/${userId}`); 
}

const gotToLessonPlan = ( user ) => { 
    navigate(`/${operatorBusinessName}/classroom/${user._id}`);
}

const gotToCalendar = ( user ) => {
    navigate(`/${operatorBusinessName}/schedule/sessionscheduling/calendar/${user._id}`);
}

const gotToConsultationCalendarTest = ( user ) => {
    navigate(`/${operatorBusinessName}/schedule/consultationform/calendar/${user._id}`);
}

const goToTestPage = ( user ) => {
    let calendar = Object.values( calendarEvents )?.find(calEvent => calEvent?.userId === user?._id && calEvent?.calendarEventType === 'sessionscheduling' );
    alert( calendar );
    navigate(`/${operatorBusinessName}/sessionscheduling/calendar/${ calendar?._id }/${user._id}`)
}

const goToOnlineTutoringRequest = ( user ) => {
    // let calendar = Object.values( calendarEvents )?.find(calEvent => calEvent?.userId === user?._id && calEvent?.calendarEventType === 'onlinetutoringrequest' );
    // alert( calendar );
    navigate(`/${operatorBusinessName}/schedule/onlinetutoringrequest/calendar/${user._id}`)
}

const goToTimeLine = ( user ) => {
    // let calendar = Object.values( calendarEvents )?.find(calEvent => calEvent?.userId === user?._id && calEvent?.calendarEventType === 'onlinetutoringrequest' );
    // alert( calendar );
    navigate(`/${operatorBusinessName}/schedule/sessionscheduling/timeline/${user._id}`);
}

let navigationContent = navContent( user, operatorBusinessName, user?.role,  "Student" ).users;

return (
        <div className="MyCourses">
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
                                            <button
                                                className="user-course-btn"
                                                onClick={() => viewCurrentUsersCourseList(singleUser?._id)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            >                                
                                            <span> {singleUser?.courses?.length === 1  ? "View Course." : (singleUser?.courses?.length === 0) ? "" : "View Courses."}  </span>                                        
                                            </button>
                                            <button
                                                className="user-course-btn"
                                                onClick={() => gotToLessonPlan(singleUser)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            >                                
                                            <span> {"Go to Class Room."}  </span>                                        
                                            </button>
                                            <button
                                                className="user-course-btn"
                                                onClick={() => gotToCalendar(singleUser)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            >                                
                                            <span> {"Calendar"}  </span>                                        
                                            </button>

                                            <button
                                                className="user-course-btn"
                                                onClick={() => gotToConsultationCalendarTest(singleUser)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            >                                
                                            <span> {"Test Consultation Calendar"}  </span>                                        
                                            </button>

                                            <button
                                                className="user-course-btn"
                                                onClick={() => goToTestPage(singleUser)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            >                                
                                            <span> {"Test Page"}  </span>                                        
                                            </button>

                                            <button
                                                className="user-course-btn"
                                                onClick={() => goToOnlineTutoringRequest(singleUser)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            >                                
                                            <span> {"Test Page2"}  </span>                                        
                                            </button>

                                            <button
                                                className="user-course-btn"
                                                onClick={() => goToTimeLine(singleUser)}
                                                disabled={singleUser?.courses?.length === 0} 
                                            >                                
                                            <span> {"Test Page2 - TimeLines"}  </span>                                        
                                            </button>
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
    calendarEvents: state?.calendar?.calendarEvents,
    users: getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === "Tutor"),
    courses: getCoursesByOperatorId(state, ownProps),
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError  
})

export default connect(mapState)(Users);