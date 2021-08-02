import { 
connect } from 'react-redux';

import { 
Redirect } from '@reach/router';

import { 
openNewCourseModal, 
closeNewCourseModal } from 'teach/src/services/course/actions/courses';

import { 
navContent } from  'teach/src/services/course/pages/components/NavigationHelper';

import { 
getCoursesByOperatorId,
getOperatorFromOperatorBusinessName } from 'teach/src/services/course/selectors';

import { 
role } from 'teach/src/services/course/helpers/PageHelpers';

import { 
helpIconStyle } from 'teach/src/services/course/pages/CourseListPage/inlineStyles';

import Loading from 'teach/src/services/course/pages/components/Loading';
import LoginLogout from 'teach/src/services/course/pages/LoginPage/components/LoginLogout';
import CoursesComponent from 'teach/src/services/course/pages/Courses/components/CoursesComponent';
import NewCoursePage from 'teach/src/services/course/pages/Courses/NewCoursePage';
import Cart from 'teach/src/services/course/pages/SalesPage/Cart';
import MainMenu from 'teach/src/services/course/pages/components/MainMenu';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Modal from 'react-modal';

const CourseListPage = ({ 
    operatorBusinessName,
    operator,
    user,
    courses,
    coursesLoading,
    onCoursesError,
    openNewCourseModal,
    closeNewCourseModal,
    isModalOpen }) => {
    if ( ! user && !user?.userIsValidated ){
        return <Redirect to={`/${operatorBusinessName}/login`} noThrow />;
    }

    if ( coursesLoading) {
        return <Loading />;
    } 

    if ( onCoursesError ) {
        return <div> { onCoursesError.message } </div> ;
    }
    
return (
    <div className="MyCourses">
    <header> 
        <MainMenu navContent={ navContent( user, operatorBusinessName ).users } />
        <h2> You are viewing all courses. </h2>
        <div>      
        <LoginLogout
            operatorBusinessName={operatorBusinessName}
            user={user} 
        />
        <Cart />
        </div>
    </header>
    <br></br>   
    { ( user?.role === role.Tutor ) && 
         <PostAddIcon 
            style={helpIconStyle()}
            className="comment-round-button-5"
            onClick={openNewCourseModal}
        />
    }
        <CoursesComponent
            operatorBusinessName={operatorBusinessName} 
            user={user} 
            courses={courses}
        />     
        <Modal isOpen={isModalOpen} onRequestClose={closeNewCourseModal}> <NewCoursePage user={user} operatorBusinessName={operatorBusinessName}/> </Modal>
    </div>
); };

const mapDispatch = {
    openNewCourseModal,
    closeNewCourseModal
};

const mapState = (state, ownProps) => ({
    courses: getCoursesByOperatorId(state, ownProps),
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    user: state?.users?.user,
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError,
    isModalOpen: state?.courses?.isModalOpen
});

export default connect(mapState, mapDispatch)(CourseListPage);