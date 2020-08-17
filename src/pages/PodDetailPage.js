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
import VideoPage from '../services/course/pages/VideoPage';
import NotFoundPage from '../services/course/pages/NotFoundPage';
import SalesPage from '../services/course/pages/SalesPage';
import Cart from '../services/course/pages/Cart';
import UpdateCart from '../services/course/pages/UpdateCart';
import FileUpload from '../services/course/pages/FileUpload';
import { Router, Redirect } from '@reach/router';




const PodDetailPage = () => {
    return (
        <Router>
             <Redirect noThrow from="/" to="/mycourses" />
             {/* <Redirect noThrow from="/" to="/login" /> */}
             <StreamHeader path="streams/header"/>
             <StreamCreate path="streams/create"/>
             <StreamDelete path="streams/delete"/>
             <StreamEdit path="streams/edit"/>
             <StreamList path="streams/list"/>
             <StreamShow path="streams/show"/>
             <CourseListPage path="/courses"/>
             <CourseDetailPage path="/courses/:courseId">   
                <LessonPage path="lessons/:lessonId" />
             </CourseDetailPage>
             <SalesPage  path="/courses/:courseId/buy">
              <Cart path="/cart" />
              </SalesPage>
              <UpdateCart path="/updatecart/:courseId"/>
             <LessonPlan path="/LessonPlan/:courseId/:lessonId/:lessonTitle"/>
             <LoginPage path="/login"/>
             <VideoPlayer path="/videoplayer/:stream" />
             <VideoPage path="/video"/>
              <ShowMeeting path="/meeting/:teach" /> 
              <MyCourses path="/mycourses"/>
              {/* <FileBrowser path="/files/Users/peterimeokparia/Documents/VsCode/Work/Projects/Teach/teach-platform/BackEnd/public/videos/*"/> */}
              <FileUpload path="/files" /> 
             <NotFoundPage default />
        </Router>
    )
}

export default PodDetailPage;