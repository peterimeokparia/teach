import { 
useState,
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
Redirect } from '@reach/router';

import { 
setCurrentLesson,
getLessonVideoUrl,
setLessonCourse,
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
getLastUsersState } from 'Services/course/Api';

import { 
role } from 'Services/course/helpers/PageHelpers';

import EditorComponent  from 'Services/course/Pages/Components/EditorComponent';
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
    lessonId,
    course,
    lessons,
    isLessonsLoading,
    selectedTutorId, 
    loadLessons,
    addNewLesson,
    saveLesson,
    previewMode,
    setCurrentLesson,
    selectedLessonPlanLesson,
    studentsSubscribedToThisCourse,
    sessions,
    setLessonCourse,
    onLessonError,
    children }) => {

    let   [ currentLesson, setLesson ] = useState( undefined );
    useEffect(() => {
        setLessonCourse( course );
        loadLessons( courseId );
    }, [ courseId, course, loadLessons, setLessonCourse ]);  

    if ((! userOwnsCourse( currentUser, courseTutor, courseId )) &&                                                                             
            (! getLastUsersState()?.courses?.includes(courseId))) {
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

function userOwnsCourse(user, courseTutor,  courseId){
    if ( ! user ) {
        return false;
    }
    if ( user.userRole === role.Admin ) {
        return true;
    }
    return ( user?.courses?.includes(courseId) || 
            courseTutor?.courses?.includes(courseId) );
};

return ( 
    <div>    
        <CourseDisplayViewComponent 
                lessonId={lessonId}
                currentLesson={currentLesson}
                selectedTutorId={selectedTutorId}
                courseDetailChildren={children}
        />  
    </div>   
    

); };

const mapDispatch = {
    setCurrentLesson,
    loadSessions,
    loadLessons, 
    addNewLesson, 
    saveLesson, 
    getLessonVideoUrl,
    setLessonCourse
};

const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        courseTutor: state.courses.courseTutor,
        currentUser: state.users.user,
        previewMode: state.app.previewMode,
        lessonPlanUrl: state.lessons.lessonPlanUrl,
        course: state.lessons.course,
        selectedLessonPlanLesson: state.lessons.selectedLessonPlanLesson,
        isLessonsLoading:state.lessons.lessonsLoading,
        onLessonError: state.lessons.onSaveLessonError,
        course: getCoursesByCourseIdSelector( state, ownProps ),
        lessons: getLessonsByCourseIdSelector( state, ownProps ),
        coursesByTutor: getCoursesByCreatedByIdSelector( state, ownProps ),
        currentVideoUrl: state.lessons.currentVideoUrl,
        studentsSubscribedToThisCourse : getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === role.Student && user?.courses?.includes(ownProps?.courseId)),
        lessonStarted: state.lessons.lessonStarted,
        sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.courseId === ownProps?.courseId),
        onSessionRenewal: state.sessions.autoRenewedPackageSuccess, 
    };
};

export default connect(mapState, mapDispatch)(CourseDetailPage);