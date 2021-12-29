import { 
connect } from 'react-redux';

import { 
Redirect } from '@reach/router';

import { 
openNewCourseModal, 
closeNewCourseModal } from 'services/course/actions/courses';

import { 
navContent } from  'services/course/pages/components/NavigationHelper';

import { 
getCoursesByOperatorId,
getOperatorFromOperatorBusinessName } from 'services/course/selectors';

import { 
role } from 'services/course/helpers/PageHelpers';

import { 
helpIconStyle } from './inlineStyles';

import { 
useUserVerificationHook } from 'services/course/helpers/Hooks/useUserVerificationHook';

import { 
useOnLoadingHook } from 'services/course/helpers/Hooks/useOnLoadingHook';

import Loading from 'services/course/pages/components/Loading';
import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';
import CoursesComponent from 'services/course/pages/Courses/components/CoursesComponent';
import NewCoursePage from 'services/course/pages/Courses/NewCoursePage';
import Cart from 'services/course/pages/SalesPage/Cart';
import MainMenu from 'services/course/pages/components/MainMenu';
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

    useUserVerificationHook( user, operatorBusinessName );

    useOnLoadingHook( coursesLoading , onCoursesError );
    
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