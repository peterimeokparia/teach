import React from 'react';
import MyCourses from '../services/course/pages/Courses/MyCourses';
import ShowMeeting from '../services/course/pages/Meetings/ShowMeeting';
import CourseListPage from '../services/course/pages/Courses/CourseListPage';
import CourseDetailPage from '../services/course/pages/Courses/CourseDetailPage';
import LessonPage from '../services/course/pages/Lessons/LessonPage';
import LoginPage from '../services/course/pages/Login/LoginPage';
import VideoPlayer  from '../services/course/pages/Video/VideoPlayer';
import LessonPlan from '../services/course/pages/LessonPlan/LessonPlan';
import LessonPlanInviteUserVerification from '../services/course/pages/LessonPlan/LessonPlanInviteUserVerification'
import LessonPlanInviteUserVerifiedPage from '../services/course/pages/LessonPlan/LessonPlanInviteUserVerifiedPage'
import VideoPage from '../services/course/pages/Video/VideoPage';
import NotFoundPage from '../services/course/pages/Components/NotFoundPage';
import SalesPage from '../services/course/pages/Sales/SalesPage';
import Cart from '../services/course/pages/Sales/Cart/Cart';
import Users from '../services/course/pages/Users/Users';
import IndividualUsersCourseList from '../services/course/pages/Users/IndividualUsersCourseList';
import IndividualUsersBio from '../services/course/pages/Users/IndividualUsersBio';
import UpdateCart from '../services/course/pages/Sales/Cart/UpdateCart';
import FileUpload from '../services/course/pages/FileUpload/FileUpload';
import CourseDetailCheckBoxComponent from '../services/course/pages/Courses/CourseDetailCheckBoxComponent';
import CourseRatingsPage from '../services/course/pages/Ratings/CourseRatingsPage';
import StudyHall from '../services/course/pages/StudyHall/StudyHall';
import CalendarPage from '../services/course/pages/Calendar/CalendarPage'; 
import ClassRoomPage from '../services/course/pages/ClassRoom/ClassRoomPage';
import CourseDropDownPage from '../services/course/pages/Courses/CourseDropDownPage';
import ClassRoomGroupsPage from '../services/course/pages/ClassRoom/ClassRoomGroupsPage';
import OperatorSignUpPage from '../services/course/pages/SignUp/OperatorSignUpPage'; 
import Boards from '../services/course/pages/Board/Boards';
import StudentDetailPage from '../services/course/pages/Users/Student/StudentDetailPage'; 
import SessionComponent from '../services/course/pages/Sessions/SessionComponent';
import GradeComponent from '../services/course/pages/Grades/GradeComponent';
import AttendanceComponent from '../services/course/pages/Attendance/AttendanceComponent';
import EditorDemo from '../services/course/pages/Lessons/EditorDemo';
import SendNotificationsPage from '../services/course/pages/Notifications/SendNotificationsPage';
import QuestionPage from '../services/course/pages/Questions/QuestionPage';
import AccountVerification from '../services/course/pages/SignUp/AccountVerification';
import PasswordReset from '../services/course/pages/Login/PasswordReset';
import { Router, Redirect } from '@reach/router';



const PodDetailPage = () => {
    return (
        <Router>
             <Redirect noThrow from="/" to="/users" />
             <ClassRoomGroupsPage path="/:operatorBusinessName/classroomgroups"/>

             <ClassRoomPage path="/:operatorBusinessName/classroomgroups/:groupId/:classRoomName" >
                 <CourseDropDownPage path="classroom/:userId" /> 
             </ClassRoomPage>

             <ClassRoomPage path="/:operatorBusinessName/classroom/:selectedUserId" /> 
             <CourseListPage path="/:operatorBusinessName/courses"/>
             
             <CourseDetailPage path="/:operatorBusinessName/courses/:courseId">   
                <LessonPage path="lessons/:lessonId" /> 
             </CourseDetailPage>
             
             <SalesPage  path="/:operatorBusinessName/courses/:courseId/buy">
                <Cart path="/:operatorBusinessName/cart" />
                <CourseRatingsPage path="course/:courseId/user/:userId/review" />
              </SalesPage>

              <StudentDetailPage path="/:operatorBusinessName/student/:studentId/course/:courseId/lessons/:lessonId" >
                   <SessionComponent path="student/:studentId/sessions/courseId/:courseId"/>
                   <GradeComponent path="student/:studentId/grades"/>
                   <AttendanceComponent path="student/:studentId/attendance"/>
              </StudentDetailPage>
             
             <PasswordReset path="/:operatorBusinessName/passwordreset/:userId"/>
             <AccountVerification path="/:operatorBusinessName/accountverification/:userId" />
             <UpdateCart path="/:operatorBusinessName/updatecart/:courseId"/>
             <LessonPlan path="/:operatorBusinessName/LessonPlan/classRoom/:classRoomId"/> 
             <LessonPlan path="/:operatorBusinessName/LessonPlan/:classRoomGroupId/:classRoomGroupName/:classRoomId/:classRoomName"/>
             <LessonPlan path="/LessonPlan/:courseId/:lessonId/:lessonTitle/:userId"/>
             <LessonPlanInviteUserVerification path="/:operatorBusinessName/LessonPlan/invite/userverification/classRoom/:classRoomId"/> 
             <LessonPlanInviteUserVerifiedPage path="/:operatorBusinessName/LessonPlan/invite/userverified/classRoom/:classRoomId"/> 
             <LoginPage path="/:operatorBusinessName/login"/>
             <OperatorSignUpPage path="/operator/signup" />
             <Boards path="/boards" />
             <VideoPlayer path="/videoplayer/:stream" />
             <VideoPage path="/video"/>
             <ShowMeeting path="/meeting/:teach" /> 
             <FileUpload path="/files" />
             <Users path="/:operatorBusinessName/users"/>
             <MyCourses path="/:operatorBusinessName/mycourses"/>
             <IndividualUsersCourseList path=":operatorBusinessName/coursestaught/:userId" />
             <IndividualUsersBio path=":operatorBusinessName/coursestaught/about/:userId" />
             <CourseDetailCheckBoxComponent path="/students/:courseId" />
             <StudyHall path="/:operatorBusinessName/LessonPlan/StudyHall/:userId" />
             {/* <StudentDetailPage path="/:operatorBusinessName/student/:studentId/course/:courseId/lessons/:lessonId" /> */}
             <CalendarPage path="/:operatorBusinessName/schedule/calendar"/>
             <NotFoundPage default />
             <EditorDemo path="/demo/editor/:lessonId"/>
             <QuestionPage path="/formBuilder/:lessonId"/>
             <SendNotificationsPage path="/:operatorBusinessName/demo/sendnotifications" />
        </Router>
    )
}

export default PodDetailPage;