import React from 'react';
import StreamHeader from '../services/recorder/stream/StreamHeader'; 
import StreamCreate from '../services/recorder/stream/StreamCreate';
import StreamDelete from '../services/recorder/stream/StreamDelete';
import StreamEdit from '../services/recorder/stream/StreamEdit';
import StreamList from '../services/recorder/stream/StreamList';
import StreamShow from '../services/recorder/stream/StreamShow';
import MyCourses from '../services/course/pages/MyCourses';
import ShowMeeting from '../services/course/pages/ShowMeeting';
import CourseListPage from '../services/course/pages/CourseListPage';
import CourseDetailPage from '../services/course/pages/CourseDetailPage';
import LessonPage from '../services/course/pages/LessonPage';
import LoginPage from '../services/course/pages/LoginPage';
import VideoPlayer  from '../services/course/pages/VideoPlayer';
import LessonPlan from '../services/course/pages/LessonPlan';
import LessonPlanInviteUserVerification from '../services/course/pages/LessonPlanInviteUserVerification'
import LessonPlanInviteUserVerifiedPage from '../services/course/pages/LessonPlanInviteUserVerifiedPage'
import VideoPage from '../services/course/pages/VideoPage';
import NotFoundPage from '../services/course/pages/NotFoundPage';
import SalesPage from '../services/course/pages/SalesPage';
import Cart from '../services/course/pages/Cart';
import Users from '../services/course/pages/Users';
import IndividualUsersCourseList from '../services/course/pages/IndividualUsersCourseList';
import IndividualUsersBio from '../services/course/pages/IndividualUsersBio';
import UpdateCart from '../services/course/pages/UpdateCart';
import FileUpload from '../services/course/pages/FileUpload';
import CourseDetailCheckBoxComponent from '../services/course/pages/CourseDetailCheckBoxComponent';
import CourseRatingsPage from '../services/course/pages/CourseRatingsPage';
import StudyHall from '../services/course/pages/StudyHall';
import CalendarPage from '../services/course/pages/CalendarPage'; 
import ClassRoomPage from '../services/course/pages/ClassRoomPage';
import CourseDropDownPage from '../services/course/pages/CourseDropDownPage';
import ClassRoomGroupsPage from '../services/course/pages/ClassRoomGroupsPage';
import OperatorSignUpPage from '../services/course/pages/OperatorSignUpPage'; 
import StudentDetailPage from '../services/course/pages/StudentDetailPage'; 
import StudentDisplayViewComponent from '../services/course/pages/StudentDisplayViewComponent';
import SessionComponent from '../services/course/pages/SessionComponent';
import GradeComponent from '../services/course/pages/GradeComponent';
import AttendanceComponent from '../services/course/pages/AttendanceComponent';
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
             <MyCourses path="/:operatorBusinessName/mycourses"/>
             <IndividualUsersCourseList path=":operatorBusinessName/coursestaught/:userId" />
             <IndividualUsersBio path=":operatorBusinessName/coursestaught/about/:userId" />
             <CourseDetailCheckBoxComponent path="/students/:courseId" />
             <StudyHall path="/:operatorBusinessName/students/mystudyhall" />
             {/* <StudentDetailPage path="/:operatorBusinessName/student/:studentId/course/:courseId/lessons/:lessonId" /> */}
             <CalendarPage path="/:operatorBusinessName/schedule/calendar"/>
             <NotFoundPage default />
        </Router>
    )
}

export default PodDetailPage;