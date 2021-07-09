import { 
connect } from 'react-redux';

import { 
Redirect } from '@reach/router';

import { 
openNewCourseModal, 
closeNewCourseModal } from 'Services/course/Actions/Courses';

import { 
navContent } from  'Services/course/Pages/Components/NavigationHelper';

import { 
getCoursesByOperatorId,
getOperatorFromOperatorBusinessName } from 'Services/course/Selectors';

import { 
role } from 'Services/course/helpers/PageHelpers';

import Loading from 'Services/course/Pages/Components/Loading';
import LoginLogout from 'Services/course/Pages/LoginPage/Components/LoginLogout';
import CoursesComponent from 'Services/course/Pages/Courses/Components/CoursesComponent';
import NewCoursePage from 'Services/course/Pages/Courses/NewCoursePage';
import Cart from 'Services/course/Pages/SalesPage/Cart';
import MainMenu from 'Services/course/Pages/Components/MainMenu';
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
    { ( user?.role === role.Tutor ) && <button className="new-course-btn" onClick={openNewCourseModal}>Add New Course</button> }
        <CoursesComponent
            operatorBusinessName={operatorBusinessName} 
            user={user} 
            courses={courses}
        />     
        <Modal isOpen={isModalOpen} onRequestClose={closeNewCourseModal}> <NewCoursePage user={user} operator={operator}/> </Modal>
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