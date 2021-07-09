import MyCoursesPage from 'Services/course/Pages/Courses/MyCoursesPage';
import ShowMeeting from 'Services/course/Pages/Meeting/Components/ShowMeeting';
import CourseListPage from 'Services/course/Pages/Courses/CourseListPage';
import CourseDetailPage from 'Services/course/Pages/Courses/CourseDetailPage';
import LessonPage from 'Services/course/Pages/Lessons/LessonPage';
import LoginPage from 'Services/course/Pages/LoginPage';
import VideoPlayer  from 'Services/course/Pages/VideoPage/Component/VideoPlayer';
import LessonPlan from 'Services/course/Pages/Lessons/LessonPlan';
import LessonPlanInviteUserVerification from 'Services/course/Pages/Lessons/LessonPlan/Components/LessonPlanInviteUserVerification';
import LessonPlanInviteUserVerifiedPage from 'Services/course/Pages/Lessons/LessonPlan/Components/LessonPlanInviteUserVerifiedPage';
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
import OperatorSignUpPage from 'Services/course/Pages/OperatorSignupPage';
import StudentDetailPage from 'Services/course/Pages/Users/StudentDetailPage';
import SessionPage from 'Services/course/Pages/SessionPage';
import GradesPage from 'Services/course/Pages/GradesPage';
import AttendancePage from 'Services/course/Pages/AttendancePage';
import SendNotificationsPage from 'Services/course/Pages/SendNotificationsPage';
import QuestionPage from 'Services/course/Pages/QuestionsPage';
import OnlineQuestionPage from 'Services/course/Pages/OnlineQuestionsPage';
import AccountVerificationForm from 'Services/course/Pages/SignUp/AccountVerificationForm';
import PasswordReset from 'Services/course/Pages/LoginPage/Components/PasswordReset';
import CalendarPage from 'Services/course/Pages/CalendarPage';
import CalendarEventsDetailPage from 'Services/course/Pages/CalendarPage/Components/CalendarEventsDetailPage';
import EventDetailPage  from 'Services/course/Pages/CalendarPage/Components/EventDetailPage';
import AddNewCalendar from 'Services/course/Pages/CalendarPage/Components/AddNewCalendar';
import TimeLine from 'Services/course/Pages/CalendarPage/Components/TimeLine';
import OnlineQuestionsSavedAnswersPage from 'Services/course/Pages/OnlineQuestionsPage/Components/OnlineQuestionsSavedAnswersPage';
import OnlineQuestionsSavedAnswersDetailPage from 'Services/course/Pages/OnlineQuestionsPage/Components/OnlineQuestionsSavedAnswersDetailPage';
import OnlineQuestionsCourseListPage from 'Services/course/Pages/OnlineQuestionsPage/Components/OnlineQuestionsCourseListPage';
import InlineVideoComponent from 'Services/course/Pages/InlineVideoComponent';
import FormFields from 'Services/course/Pages/TestBuilder/FormFields';
import MoreLessonContentPage from 'Services/course/Pages/Courses/CourseDetailPage/MoreLessonContentPage';
import { Router, Redirect } from '@reach/router';

const MainRoute = () => {
    return (
        <Router>
             <Redirect noThrow from="/" to="/users" />
             <FormFields path="/fieldTest" />
             <ClassRoomPage path="/:operatorBusinessName/classroomgroups/:groupId/:classRoomName"  />

             <ClassRoomPage path="/:operatorBusinessName/classroom/:selectedUserId" /> 
             <CourseListPage path="/:operatorBusinessName/courses"/>
             
             <CourseDetailPage path="/:operatorBusinessName/tutor/:selectedTutorId/courses/:courseId/">   
                <LessonPage path="lessons/:lessonId" /> 
             </CourseDetailPage>
             
             <SalesPage  path="/:operatorBusinessName/courses/:courseId/buy">
                <Cart path="/:operatorBusinessName/cart" />
                <CourseRatingsPage path="course/:courseId/user/:userId/review" />
              </SalesPage>

              <StudentDetailPage path="/:operatorBusinessName/student/:studentId/course/:courseId/lessons/:lessonId" >
                  <OnlineQuestionsSavedAnswersPage path="student/:studentId/savedanswers">
                    < OnlineQuestionsSavedAnswersDetailPage path="student/:studentId/course/:courseId"/> 
                   </ OnlineQuestionsSavedAnswersPage>
                   <SessionPage path="student/:studentId/sessions/courseId/:courseId"/>
                   <GradesPage path="student/:studentId/grades"/>
                   <AttendancePage path="student/:studentId/attendance"/>
              </StudentDetailPage>

              <StudentDetailPage path="/:operatorBusinessName/student/:studentId" >
                   <OnlineQuestionsSavedAnswersPage path="student/:studentId/savedanswers">
                    < OnlineQuestionsSavedAnswersDetailPage path="student/:studentId/course/:courseId"/> 
                   </ OnlineQuestionsSavedAnswersPage>
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
             <QuestionPage path="/formBuilder/:lessonId"/>
             <SendNotificationsPage path="/:operatorBusinessName/demo/sendnotifications" />
             <CalendarPage path="/:operatorBusinessName/schedule/:calendarEventType/calendar/:calendarId/user/:userId"/>
             <CalendarEventsDetailPage path="/:operatorBusinessName/:calendarEventType/calendar/:calendarId/:userId/:selectedCalendarEventId"/>
             <CalendarEventsDetailPage path="/:operatorBusinessName/:calendarEventType/calendar/:calendarId/:userId"/>
             <EventDetailPage path="/:operatorBusinessName/:calendarEventType/calendar/:calendarId/user/:userId/event/:eventId" />
             <TimeLine path="/:operatorBusinessName/schedule/:calendarEventType/timeline/:userId"/>
             <AddNewCalendar path="/:operatorBusinessName/add/calendar" />
             <OnlineQuestionPage path="/:operatorBusinessName/homework/askquestion/course/:courseId" />
             <OnlineQuestionPage path="/:operatorBusinessName/homework/askquestion/course/:courseId/question/:onlineQuestionId" />
             <InlineVideoComponent path="/:operatorBusinessName/homework/askquestion/board/course/:courseId/answer/:answerId"/>
             <OnlineQuestionsCourseListPage path="/:operatorBusinessName/homework/askquestion/course"/>
             <MoreLessonContentPage path="/lessons/:lessonId/more" />
        </Router>

    );
};

export default MainRoute;