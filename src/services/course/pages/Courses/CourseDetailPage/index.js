import { useEffect } from 'react';
import { connect } from 'react-redux';
import { mapState, mapDispatch } from '../storeConnector';
import { Redirect } from '@reach/router';
import { getLastUsersState } from 'services/course/api';
import { role } from 'services/course/helpers/PageHelpers';
import { toast } from 'react-toastify';
import { Validations } from  'services/course/helpers/Validations';
import NotFoundPage from 'services/course/pages/components/NotFoundPage';
import Loading from 'services/course/pages/components/Loading';
import CourseDisplayViewComponent from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent';
import './style.css';
import 'react-toastify/dist/ReactToastify.css';

const CourseDetailPage = ({
    operatorBusinessName,
    currentUser,
    courseTutor,
    courseId,
    lessonId,
    course,
    isLessonsLoading,
    selectedTutorId, 
    loadLessons,
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

export default connect(mapState, mapDispatch)(CourseDetailPage);