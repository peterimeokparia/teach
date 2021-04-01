import React from 'react';
import MyCoursesPage from 'Services/course/Pages/Courses/MyCoursesPage';
import ShowMeeting from 'Services/course/Pages/Meeting/Components/ShowMeeting';
import CourseListPage from 'Services/course/Pages/Courses/CourseListPage';
import CourseDetailPage from 'Services/course/Pages/Courses/CourseDetailPage';
import LessonPage from 'Services/course/Pages/Lessons/LessonPage';
import LoginPage from 'Services/course/Pages/LoginPage';
import VideoPlayer  from 'Services/course/Pages/VideoPage/Component/VideoPlayer';
import LessonPlan from 'Services/course/Pages/LessonPlan';
import LessonPlanInviteUserVerification from 'Services/course/Pages/Lessons/LessonPlan/Components/LessonPlanInviteUserVerification'
import LessonPlanInviteUserVerifiedPage from 'Services/course/Pages/Lessons/LessonPlan/Components/LessonPlanInviteUserVerifiedPage'
import VideoPage from 'Services/course/Pages/VideoPage';
import NotFoundPage from 'Services/course/Pages/Components/NotFoundPage';
import SalesPage from 'Services/course/Pages/SalesPage';
import Cart from 'Services/course/Pages/SalesPage/Cart';
import Users from 'Services/course/Pages/Users';
import IndividualUsersCourseList from 'Services/course/Pages/Courses/IndividualUsersCourseList';
import BioPage from 'Services/course/Pages/BioPage';
import UpdateCart from 'Services/course/Pages/SalesPage/Cart/UpdateCart';
import FileUpload from 'Services/course/Pages/Components/FileUpload';
import CourseDetailCheckBoxComponent from 'Services/course/Pages/Courses/Components/CourseDetailCheckBoxComponent';
import CourseRatingsPage from 'Services/course/Pages/Ratings';
import StudyHall from 'Services/course/Pages/StudyHall';
import ClassRoomPage from 'Services/course/Pages/ClassRoomPage';
import CourseDropDownPage from 'Services/course/Pages/Courses/CourseDropDownPage';
import OperatorSignUpPage from 'Services/course/Pages/OperatorSignupPage'; 
import StudentDetailPage from 'Services/course/Pages/Users/StudentDetailPage'; 
import SessionPage from 'Services/course/Pages/SessionPage';
import GradesPage from 'Services/course/Pages/GradesPage';
import AttendancePage from 'Services/course/Pages/AttendancePage';
import EditorDemo from 'Services/course/Pages/Lessons/EditorDemo';
import SendNotificationsPage from 'Services/course/Pages/SendNotificationsPage';
import QuestionPage from 'Services/course/Pages/QuestionsPage';
import AccountVerificationForm from 'Services/course/Pages/SignUp/AccountVerificationForm';
import PasswordReset from 'Services/course/Pages/LoginPage/Components/PasswordReset';
import CalendarPage from 'Services/course/Pages/CalendarPage'; 
import CalendarEventsDetailPage from 'Services/course/Pages/CalendarPage/Components/CalendarEventsDetailPage'; 
import EventDetailPage  from 'Services/course/Pages/CalendarPage/Components/EventDetailPage'; 
import OnlineTutoringRequestForm from 'Services/course/Pages/CalendarPage/Components/OnlineTutoringRequestForm';
import TimeLine from 'Services/course/Pages/CalendarPage/Components/TimeLine'; 
//import ClassRoomGroupsPage from 'Services/course/Pages/ClassRoomGroupsPage';
//import Boards from 'Services/course/Pages/Boards';
import { Router, Redirect } from '@reach/router';

const MainRoute = () => {
    return (
        <Router>
             <Redirect noThrow from="/" to="/users" />
             <ClassRoomPage path="/:operatorBusinessName/classroomgroups/:groupId/:classRoomName" >
                 <CourseDropDownPage path="classroom/:userId" /> 
             </ClassRoomPage>

             <ClassRoomPage path="/:operatorBusinessName/classroom/:selectedUserId" /> 
             <CourseListPage path="/:operatorBusinessName/courses"/>
             
             <CourseDetailPage path="/:operatorBusinessName/courses/:courseId/:selectedTutorId">   
                <LessonPage path="lessons/:lessonId" /> 
             </CourseDetailPage>
             
             <SalesPage  path="/:operatorBusinessName/courses/:courseId/buy">
                <Cart path="/:operatorBusinessName/cart" />
                <CourseRatingsPage path="course/:courseId/user/:userId/review" />
              </SalesPage>

              <StudentDetailPage path="/:operatorBusinessName/student/:studentId/course/:courseId/lessons/:lessonId" >
                   <SessionPage path="student/:studentId/sessions/courseId/:courseId"/>
                   <GradesPage path="student/:studentId/grades"/>
                   <AttendancePage path="student/:studentId/attendance"/>
              </StudentDetailPage>
             
             <PasswordReset path="/:operatorBusinessName/passwordreset/:userId"/>
             <AccountVerificationForm path="/:operatorBusinessName/accountverification/:userId" />
             <UpdateCart path="/:operatorBusinessName/updatecart/:courseId"/>
             <LessonPlan path="/:operatorBusinessName/LessonPlan/classRoom/:classRoomId"/> 
             <LessonPlan path="/:operatorBusinessName/LessonPlan/:classRoomGroupId/:classRoomGroupName/:classRoomId/:classRoomName"/>
             <LessonPlan path="/LessonPlan/:courseId/:lessonId/:lessonTitle/:userId"/>
             <LessonPlanInviteUserVerification path="/:operatorBusinessName/LessonPlan/invite/userverification/classRoom/:classRoomId"/> 
             <LessonPlanInviteUserVerifiedPage path="/:operatorBusinessName/LessonPlan/invite/userverified/classRoom/:classRoomId"/> 
             <LoginPage path="/:operatorBusinessName/login"/>
             <OperatorSignUpPage path="/operator/signup" />
             <VideoPlayer path="/videoplayer/:stream" />
             <VideoPage path="/video"/>
             <ShowMeeting path="/meeting/:teach" /> 
             <FileUpload path="/files" />
             <Users path="/:operatorBusinessName/users"/>
             <MyCoursesPage path="/:operatorBusinessName/mycourses"/>
             <IndividualUsersCourseList path=":operatorBusinessName/coursestaught/:userId" />
             <BioPage path=":operatorBusinessName/coursestaught/about/:userId" />
             <CourseDetailCheckBoxComponent path="/students/:courseId" />
             <StudyHall path="/:operatorBusinessName/LessonPlan/StudyHall/:userId" />
             <NotFoundPage default />
             <EditorDemo path="/demo/editor/:lessonId"/>
             <QuestionPage path="/formBuilder/:lessonId"/>
             <SendNotificationsPage path="/:operatorBusinessName/demo/sendnotifications" />
             <CalendarPage path="/:operatorBusinessName/schedule/:calendarEventType/calendar/:userId"/>
             <CalendarEventsDetailPage path="/:operatorBusinessName/:calendarEventType/calendar/:calendarId/:userId/:selectedCalendarEventId"/>
             <CalendarEventsDetailPage path="/:operatorBusinessName/:calendarEventType/calendar/:calendarId/:userId"/>
             <EventDetailPage path="/:operatorBusinessName/:calendarEventType/calendar/:calendarId/:userId/event/:eventId" />
             <TimeLine path="/:operatorBusinessName/schedule/:calendarEventType/timeline/:userId"/>
             {/* http://localhost:3000/boomingllc/sessionscheduling/calendar/6052319c75d30d0155dfbe3e/6039cdc8560b6e1314d7bccc/event/6039cdc8560b6e1314d7bccc_1 */}
             {/* http://localhost:3000/boomingllc/sessionscheduling/calendar/6052319c75d30d0155dfbe3e/6039cdc8560b6e1314d7bccc/event/calendar/6052319c75d30d0155dfbe3e/event/undefined */}
             {/* http://localhost:3000/boomingllc/sessionscheduling/calendar/6052319c75d30d0155dfbe3e/event */}
             {/* /:eventId */}
             {/* operatorBusinessName, calendarEventType, eventId  */}
             {/* <ClassRoomGroupsPage path="/:operatorBusinessName/classroomgroups"/> */}
             {/* <Boards path="/boards" /> */}
        </Router>
    )
}

export default MainRoute;