import 
React, { 
useEffect, 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
Redirect,
navigate } from '@reach/router';

import { 
togglePreviewMode } from 'Services/course/Actions/App';

import { 
getLessonVideoUrl,
loadLessons,
addNewLesson, 
saveLesson } from 'Services/course/Actions/Lessons';

import { 
loadSessions } from 'Services/course/Actions/Sessions';

import { 
getUsersByOperatorId,    
getLessonsByCourseIdSelector, 
getCoursesByCourseIdSelector,
getCoursesByCreatedByIdSelector,
getOperatorFromOperatorBusinessName } from 'Services/course/Selectors';

import { 
getLastUsersState, 
deleteLessonFileByFileName } from 'Services/course/Api';

import { 
emailMessageOptions, 
emailInputOptions } from  'Services/course/Pages/Courses/helpers';

import { 
toast } from 'react-toastify';

import NotFoundPage from 'Services/course/Pages/Components/NotFoundPage';
import Loading from 'Services/course/Pages/Components/Loading';
import CourseDisplayViewComponent from 'Services/course/Pages/Courses/CourseDetailPage/Components/CourseDisplayViewComponent';
import './style.css';
import 'react-toastify/dist/ReactToastify.css';

const CourseDetailPage = ({
operatorBusinessName,
operator,    
currentUser,
courseTutor,
courseId,
course,
lessons,
isLessonsLoading,
selectedTutorId, 
loadLessons,
addNewLesson,
saveLesson,
togglePreviewMode,
previewMode,
studentsSubscribedToThisCourse,
sessions,
onLessonError,
children}) => {
const [ currentLessonVideoUrl, setVideoUrl ] = useState( undefined );
const [ fileToRemove, setFileToRemove ] = useState( undefined );
const [ lessonPlanUrl, setLessonPlanUrl ] = useState( "" );
let   [ currentLesson, setCurrentLesson ] = useState( undefined );
// let   lessonTitle = currentLesson?.title?.replace(/\s+/g, "%20");
let   invitationUrl = `http://localhost:3000/${operatorBusinessName}/LessonPlan/invite/userverification/classRoom/${course?.createdBy}`;
const fileUploadUrl = 'http://localhost:9005/api/v1/fileUploads';
// const session = sessions?.find( currentSession => currentSession?.userId === currentUser?._id );

useEffect(() => {
    loadLessons( courseId );
}, [ courseId,  currentLessonVideoUrl, lessonPlanUrl, loadLessons ]);  

if ( ! currentUser?.userIsValidated || ! operator ){
    navigate(`/${operatorBusinessName}/login`);
}

const userOwnsCourse = (user, courseTutor,  courseId) => {
    if ( ! user ) {
        return false;
    }
    if ( user.userRole === 'admin' ) {
        return true;
    }
    return ( user?.courses?.includes(courseId) || courseTutor?.courses?.includes(courseId) );
    };

if ( fileToRemove ) {
    currentLesson.files = currentLesson?.files?.filter( files => files !== fileToRemove );
    saveLesson( currentLesson );
    deleteLessonFileByFileName( fileToRemove?.split('/files/')[1]);       
}

if ((! userOwnsCourse( currentUser, courseTutor, courseId )) && (! getLastUsersState()?.courses?.includes(courseId))) {
    return <Redirect to={`/${operatorBusinessName}/courses/${courseId}/buy`} noThrow/>;
}     

if ( isLessonsLoading ){
    return <Loading />;  
}

if ( ! course ){    
    return <NotFoundPage />;  
}

if ( onLessonError ) {
    return <div> { onLessonError.message } </div> ;
}

const setPreviewEditMode = () => {
    if ( ! currentLesson ) {
        toast.error("Please click on the lesson link.");
        return;  
    }
    togglePreviewMode();
};

return (     
    <CourseDisplayViewComponent
        course={course}
        courseId={courseId}
        currentUser={currentUser}
        selectedTutorId={selectedTutorId}
        operatorBusinessName={operatorBusinessName}
        operator={operator}
        setPreviewEditMode={setPreviewEditMode}
        previewMode={previewMode}
        lessons={lessons?.filter(lesson => lesson?.userId === selectedTutorId)}
        saveLesson={saveLesson}
        lessonDate={Date.now()}
        addNewLesson={addNewLesson}
        courseDetailChildren={children}
        fileUploadUrl={fileUploadUrl}
        setFileToRemove={setFileToRemove}
        emailInputOptions={emailInputOptions}
        emailMessageOptions={emailMessageOptions(currentUser,invitationUrl)}
        setCurrentLesson={setCurrentLesson}
        setVideoUrl={setVideoUrl}
        setLessonPlanUrl={setLessonPlanUrl}
        currentLesson={currentLesson}
        currentLessonVideoUrl={currentLessonVideoUrl} 
    />
);
};

const mapDispatch = {
    loadSessions,
    loadLessons, 
    addNewLesson, 
    saveLesson, 
    togglePreviewMode, 
    getLessonVideoUrl
};

const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        courseTutor: state.courses.courseTutor,
        currentUser: state.users.user,
        previewMode: state.app.previewMode,
        isLessonsLoading:state.lessons.lessonsLoading,
        onLessonError: state.lessons.onSaveLessonError,
        course: getCoursesByCourseIdSelector( state, ownProps ),
        lessons: getLessonsByCourseIdSelector( state, ownProps ),
        coursesByTutor: getCoursesByCreatedByIdSelector( state, ownProps ),
        currentVideoUrl: state.lessons.currentVideoUrl,
        studentsSubscribedToThisCourse : getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === "Student" && user?.courses?.includes(ownProps?.courseId)),
        lessonStarted: state.lessons.lessonStarted,
        sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.courseId === ownProps?.courseId),
        onSessionRenewal: state.sessions.autoRenewedPackageSuccess,
        //userOwnsCourse: userOwnsCourse(state, ownProps)
        //session: Object.values(state?.sessions?.sessions)?.find(session => session?.courseId === ownProps?.courseId && (ownProps?.currentUser?.role === "Tutor" ? (ownProps?.currentUser?._id === session?.tutorId) : (ownProps?.currentUser?._id === session?.userId) )),  
    };
};

export default connect(mapState, mapDispatch)(CourseDetailPage);