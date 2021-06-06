import React from 'react';

import { 
connect } from 'react-redux';

import { 
Link, 
Redirect,
navigate } from '@reach/router';

import { 
openNewCourseModal, 
closeNewCourseModal } from 'Services/course/Actions/Courses';

import { 
navContent } from  'Services/course/Pages/Components/NavigationHelper';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId } from 'Services/course/Selectors';

import LoginLogout from 'Services/course/Pages/LoginPage/Components/LoginLogout';
import CoursesComponent from 'Services/course/Pages/Courses/Components/CoursesComponent';
import NewCoursePage from 'Services/course/Pages/Courses/NewCoursePage';
import MainMenu from 'Services/course/Pages/Components/MainMenu';
import Cart from 'Services/course/Pages/SalesPage/Cart';
import Modal from 'react-modal';
import './style.css';

const MyCoursesPage = ({
operatorBusinessName,
operator,
user,
courses,
openNewCourseModal,
closeNewCourseModal,
isModalOpen }) => {
if ( ! user?.userIsValidated || ! operator ){
    navigate(`/${operatorBusinessName}/login`);
}

if ( ! user || user?.email === undefined ){
   return <Redirect to={`/${operatorBusinessName}/login`} noThrow />;
}

let navigationContent = navContent( user, operatorBusinessName ).users;
let myCourseList = courses?.filter(course => user?.courses?.includes(course?._id));

return (    
    <div className="MyCourses">
        <header> 
            <MainMenu navContent={navigationContent} />
            <h2> You are viewing your list of courses. </h2>
            <div>  
            <LoginLogout
                operatorBusinessName={operatorBusinessName}
                user={user}
            />    
            <Cart />
            </div>
        </header>
            
    {( user?.courses?.length === 0 ) && (<div> 
        <div>
            <h3>You are not subscribed to any  <span><Link to={"/courses"}> courses. </Link></span></h3>
        </div>
        <div>   
            {(user?.role === "Tutor" ) && <button className="new-course-btn" onClick={openNewCourseModal}>New Course</button> }
        </div>
            <Modal isOpen={isModalOpen} onRequestClose={closeNewCourseModal}> <NewCoursePage user={user}/> </Modal>
        </div>
    )}
    <br></br>   
        {( user?.role === "Tutor" ) && <button className="new-course-btn" onClick={openNewCourseModal}>Add New Course</button> }
            <CoursesComponent
                operatorBusinessName={operatorBusinessName}
                modal={isModalOpen} 
                courses={myCourseList}
            />     
            <Modal 
                isOpen={isModalOpen} 
                onRequestClose={closeNewCourseModal}
            > 
                <NewCoursePage user={user}/> 
            </Modal>
    </div>
); };

const mapDispatch = {
   openNewCourseModal,
   closeNewCourseModal
};

const mapState = ( state, ownProps )  => ({
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    courses: getCoursesByOperatorId(state, ownProps),
    user: state?.users?.user,
    yourCourses: getCoursesByOperatorId(state, ownProps)?.filter(course => state?.users.user?.courses?.includes(course?._id)),
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError,
    isModalOpen: state?.courses?.isModalOpen
});

export default connect(mapState, mapDispatch)(MyCoursesPage);