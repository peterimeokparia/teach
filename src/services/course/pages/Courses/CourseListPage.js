import React from 'react';

import { 
connect } from 'react-redux';

import Modal from 'react-modal';

import { 
Redirect } from '@reach/router';

import { 
openNewCourseModal, 
closeNewCourseModal } from '../../actions';

import { 
navContent } from  '../Components/navigationHelper.js';

import { 
getCoursesByOperatorId,
getOperatorFromOperatorBusinessName } from '../../Selectors';

import Loading from '../Components/Loading';
import LoginLogout from '../Login/LoginLogout'
import CoursesComponent from '../Courses/CoursesComponent';
import NewCourse from '../Courses/NewCourse';
import NewClassRoom from '../ClassRoom/NewClassRoomGroup';
import Cart from '../Sales/Cart/Cart';
import MainMenu from '../Components/MainMenu';

import './MyCourses.css';


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


    if ( ! user?.userIsValidated || ! operator  ){

        return <Redirect to={`/${operatorBusinessName}/login`} noThrow />
    }


    if ( coursesLoading) {

        return <Loading />
    }         


   
    if ( onCoursesError ) {

        return <div> { onCoursesError.message } </div> ;
    }
    

    let navigationContent = navContent( user, operatorBusinessName ).users;

           
    return (

        <div className="MyCourses">

        <header> 

           <MainMenu navContent={navigationContent} />

            {/* <h1>  {`Welcome ${user?.firstname}! `} </h1> */}

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

         { ( user?.role === "Tutor" ) && <button className="new-course-btn" onClick={openNewCourseModal}>Add New Course</button> }
  
                <CoursesComponent
                           operatorBusinessName={operatorBusinessName} 
                           user={user} 
                           courses={courses}
               />     

             <Modal isOpen={isModalOpen} onRequestClose={closeNewCourseModal}> <NewCourse user={user} operator={operator}/> </Modal>

        </div>
    )
}


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
})

export default connect(mapState, mapDispatch)(CourseListPage);