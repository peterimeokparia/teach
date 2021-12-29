import { 
Router, 
Redirect } from '@reach/router';

import MyCoursesPage from 'services/course/pages/Courses/MyCoursesPage';
import ShowMeeting from 'services/course/pages/Meeting/components/ShowMeeting';
import CourseListPage from 'services/course/pages/Courses/CourseListPage';
import CourseDetailPage from 'services/course/pages/Courses/CourseDetailPage';
import LessonPage from 'services/course/pages/Lessons/LessonPage';
import LoginPage from 'services/course/pages/LoginPage';
import LessonPlan from 'services/course/pages/Lessons/LessonPlan';
import LessonPlanInviteUserVerification from 'services/course/pages/Lessons/LessonPlan/components/LessonPlanInviteUserVerification';
import LessonPlanInviteUserVerifiedPage from 'services/course/pages/Lessons/LessonPlan/components/LessonPlanInviteUserVerifiedPage';
import NotFoundPage from 'services/course/pages/components/NotFoundPage';
import SalesPage from 'services/course/pages/SalesPage';
import Cart from 'services/course/pages/SalesPage/Cart';
import Users from 'services/course/pages/Users';
import IndividualUsersCourseList from 'services/course/pages/Courses/IndividualUsersCourseList';
import BioPage from 'services/course/pages/BioPage';
import UpdateCart from 'services/course/pages/SalesPage/Cart/UpdateCart';
import FileUpload from 'services/course/pages/components/FileUpload';
import CourseDetailCheckBoxComponent from 'services/course/pages/Courses/components/CourseDetailCheckBoxComponent';
import CourseRatingsPage from 'services/course/pages/Ratings';
import StudyHall from 'services/course/pages/StudyHall';
import ClassRoomPage from 'services/course/pages/ClassRoomPage';
import OperatorSignUpPage from 'services/course/pages/OperatorSignupPage';
import StudentDetailPage from 'services/course/pages/Users/StudentDetailPage';
import Students from 'services/course/pages/Users/Students';
import SessionPage from 'services/course/pages/SessionPage';
import GradesPage from 'services/course/pages/GradesPage';
import AttendancePage from 'services/course/pages/AttendancePage';
import SendNotificationsPage from 'services/course/pages/SendNotificationsPage';
import OnlineQuestionPage from 'services/course/pages/OnlineQuestionsPage';
import AccountVerificationForm from 'services/course/pages/SignUp/AccountVerificationForm';
import PasswordReset from 'services/course/pages/LoginPage/components/PasswordReset';
import CalendarPage from 'services/course/pages/CalendarPage';
import CalendarEventsDetailPage from 'services/course/pages/CalendarPage/components/CalendarEventsDetailPage';
import EventDetailPage  from 'services/course/pages/CalendarPage/components/EventDetailPage';
import AddNewCalendar from 'services/course/pages/CalendarPage/components/AddNewCalendar';
import TimeLines from 'services/course/pages/CalendarPage/components/TimeLines';
import OnlineQuestionsSavedAnswersPage from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionsSavedAnswersPage';
import OnlineQuestionsSavedAnswersDetailPage from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionsSavedAnswersDetailPage';
import OnlineQuestionsCourseListPage from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionsCourseListPage';
import MoreLessonContentPage from 'services/course/pages/Courses/CourseDetailPage/MoreLessonContentPage';
import SiteEntryComponent from 'services/course/pages/components/SiteEntryComponent';
import VerifyMeetingAttendees from 'services/course/pages/Lessons/LessonPlan/components/VerifyMeetingAttendees';
import Booming from 'services/course/pages/Booming';
import Logins from 'services/course/pages/LoginPage/components/Logins';
import LessonPlanSplitViewComponent from 'services/course/pages/Lessons/LessonPlan/LessonPlanSplitViewComponent';
import FormQuestions from 'services/course/pages/FormBuilder/FormQuestions';
import FormBuilder from 'services/course/pages/FormBuilder';

const MainRoute = () => {
    return (
        <Router>
            <Redirect noThrow from="/" to="/main" />
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

              <StudentDetailPage path="/:operatorBusinessName/student/:studentId/course/:courseId" >
                    <OnlineQuestionsSavedAnswersPage path="student/:studentId/savedanswers">
                        <OnlineQuestionsSavedAnswersDetailPage path="student/:studentId/course/:courseId"/> 
                    </OnlineQuestionsSavedAnswersPage>
                    <SessionPage path="student/:studentId/sessions/courseId/:courseId"/>
                    <GradesPage path="student/:studentId/grades"/> 
                    <AttendancePage path="student/:studentId/attendance"/>
                    <Logins path="student/:studentId/logins"/>
              </StudentDetailPage>

              <StudentDetailPage path="/:operatorBusinessName/student/:studentId" >
                   <OnlineQuestionsSavedAnswersPage path="student/:studentId/savedanswers">
                    < OnlineQuestionsSavedAnswersDetailPage path="student/:studentId/course/:courseId"/> 
                   </ OnlineQuestionsSavedAnswersPage>
                   <SessionPage path="student/:studentId/sessions/courseId/:courseId"/>
                   <GradesPage path="student/:studentId/grades"/>
                   <AttendancePage path="student/:studentId/attendance"/>
                   <Logins path="student/:studentId/logins"/>
              </StudentDetailPage>

             <PasswordReset path="/:operatorBusinessName/passwordreset/:userId"/>
             <AccountVerificationForm path="/:operatorBusinessName/accountverification/:userId" />
             <UpdateCart path="/:operatorBusinessName/updatecart/:courseId"/>
             <LessonPlan path="/:operatorBusinessName/LessonPlan/classRoom/:classRoomId"/> 
             <LessonPlan path="/:operatorBusinessName/LessonPlan/classRoom/:classRoomId/:meetingId"/> 
             <LessonPlan path="/:operatorBusinessName/LessonPlan/classRoom/:classRoomId/:meetingEndingPromo"/> 
             <LessonPlan path="/:operatorBusinessName/LessonPlan/classRoom/:classRoomId/:meetingId/:meetingEndingPromo"/>
             <LessonPlan path="/:operatorBusinessName/LessonPlan/:classRoomGroupId/:classRoomGroupName/:classRoomId/:classRoomName"/>
             <LessonPlan path="/LessonPlan/:courseId/:lessonId/:lessonTitle/:userId"/>
             <LessonPlanInviteUserVerification path="/:operatorBusinessName/LessonPlan/invite/userverification/classRoom/:classRoomId"/> 
             <LessonPlanInviteUserVerifiedPage path="/:operatorBusinessName/LessonPlan/invite/userverified/classRoom/:classRoomId"/> 
             <LoginPage path="/:operatorBusinessName/login"/>
             <OperatorSignUpPage path="/operator/signup" />
             <ShowMeeting path="/meeting/:teach" /> 
             <FileUpload path="/files" />
             <Users path="/:operatorBusinessName/users"/>
             <MyCoursesPage path="/:operatorBusinessName/mycourses"/>
             <IndividualUsersCourseList path=":operatorBusinessName/coursestaught/:userId" />
             <BioPage path=":operatorBusinessName/coursestaught/about/:userId" />
             <CourseDetailCheckBoxComponent path="/students/:courseId" />
             <StudyHall path="/:operatorBusinessName/LessonPlan/StudyHall/:userId" />
             <NotFoundPage default />
             <SendNotificationsPage path="/:operatorBusinessName/demo/sendnotifications" />
             <CalendarPage path="/:operatorBusinessName/schedule/:calendarEventType/calendar/:calendarId/user/:userId"/>
             <CalendarEventsDetailPage path="/:operatorBusinessName/:calendarEventType/calendar/:calendarId/:userId/:selectedCalendarEventId"/>
             <CalendarEventsDetailPage path="/:operatorBusinessName/:calendarEventType/calendar/:calendarId/:userId"/>
             <EventDetailPage path="/:operatorBusinessName/:calendarEventType/calendar/:calendarId/user/:userId/event/:eventId" />
             <TimeLines path="/:operatorBusinessName/schedule/:calendarEventType/timeline/:userId"/>
             <AddNewCalendar path="/:operatorBusinessName/add/calendar" />
             <OnlineQuestionPage path="/:operatorBusinessName/homework/askquestion/course/:courseId" />
             <OnlineQuestionPage path="/:operatorBusinessName/homework/askquestion/course/:courseId/question/:onlineQuestionId" />
             <OnlineQuestionsCourseListPage path="/:operatorBusinessName/homework/askquestion/course"/>
             <MoreLessonContentPage path="/lessons/:lessonId/more" />
             <SiteEntryComponent path="/main"/>
             <SiteEntryComponent path="/:operatorBusinessName"/>
             <SiteEntryComponent path="/main/:operatorBusinessName"/>
             <VerifyMeetingAttendees path="/:operatorBusinessName/verifyattendees/:selectedTutorId/meeting/:meetingId"/>
             <Students path="/:operatorBusinessName/students"/>
             <Booming path="/boomingllc" />
             <Logins path="/:operatorBusinessName/logins/student/:studentId" />
             <LessonPlanSplitViewComponent path="/:operatorBusinessName/:calendarEventType/boardeditor/:calendarId/:userId/:meetingId"/>
             <FormQuestions path="/:operatorBusinessName/formBuilder/:formType/:formName/:formId/:formUuId/:userId/:formBuilderStatus"/>
             <FormQuestions path="/:operatorBusinessName/formBuilder/:formType/:formName/:lessonId/:formUuId/:userId/:formBuilderStatus"/>
             <FormQuestions path="/:operatorBusinessName/formBuilder/:formType/:formName/:formUuId/:userId/:formBuilderStatus"/>  
             {/* Survey - Routes */}
             <FormBuilder path="/:operatorBusinessName/:formType/:formName/:formUuId/:userId"/>        
             <FormBuilder path="/:operatorBusinessName/:formType/:formName/:formId/:formUuId/:userId"/>
        </Router>

    );
};

export default MainRoute;