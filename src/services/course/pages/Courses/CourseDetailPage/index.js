import { 
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
saveLesson } from 'services/course/actions/lessons';

import { 
loadSessions } from 'services/course/actions/sessions';

import { 
getUsersByOperatorId,    
getLessonsByCourseIdSelector, 
getCoursesByCourseIdSelector,
getCoursesByCreatedByIdSelector,
getOperatorFromOperatorBusinessName } from 'services/course/selectors';

import { 
getLastUsersState } from 'services/course/api';

import { 
role } from 'services/course/helpers/PageHelpers';

import { 
toast } from 'react-toastify';

import { 
Validations } from  'services/course/helpers/Validations';

import NotFoundPage from 'services/course/pages/components/NotFoundPage';
import Loading from 'services/course/pages/components/Loading';
import CourseDisplayViewComponent from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent';
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
    useEffect(() => {
        setLessonCourse( course );
        loadLessons( courseId );
    }, [ courseId, course, loadLessons, setLessonCourse ]);  

    if ( onLessonError ) {
        toast.error(`There was a problem while adding lesson: ${ onLessonError?.title }: ${ onLessonError?.error?.message }`);
    }

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
        {Validations.setErrorMessageContainer()} 
        <CourseDisplayViewComponent
            operatorBusinessName={operatorBusinessName}
            courseId={courseId} 
            lessonId={lessonId}
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
        course: state.courses.selectedCourseFromLessonPlanCourseDropDown,
        selectedLessonPlanLesson: state.lessons.selectedLessonPlanLesson,
        isLessonsLoading:state.lessons.lessonsLoading,
        onLessonError: state.lessons.onSaveLessonError,
        courses: getCoursesByCourseIdSelector( state, ownProps ),
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