import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Link, navigate, Redirect } from '@reach/router';
import { openNewCourseModal, closeNewCourseModal } from '../actions';
import Loading from './Loading';
import LoginLogout from './LoginLogout'
import CoursesComponent from './CoursesComponent';
import NewCourse from './NewCourse';
import Cart from './Cart';
import './MyCourses.css';


const CourseListPage = ({ 
       user,
       courses,
       coursesLoading,
       onCoursesError,
       openNewCourseModal,
       closeNewCourseModal,
       isModalOpen}) => {


    if ( ! user ){

        return <Redirect to="/login" noThrow />
    }


    if ( coursesLoading) {

        return <Loading />
    }         


   
    if ( onCoursesError ) {

        return <div> { onCoursesError.message } </div> ;
    }
    


    const viewMyCourses = () => {

        navigate('/mycourses');
    }

           
    return (

        <div className="MyCourses">

        <header> 
            <h1>  {`Welcome ${user?.firstname}! `} </h1>

            <h2> All Courses </h2>

            <div>  
              <LoginLogout/>

              <Cart />

            </div>
        </header>

        <br></br>   

          <button className="view-courses-btn" onClick={viewMyCourses}>My Courses</button> 
         { ( user?.role === "Tutor" ) && <button className="new-course-btn" onClick={openNewCourseModal}>New Course</button> }
          
                <CoursesComponent
                           user={user} 
                           courses={courses}
               />     

             <Modal isOpen={isModalOpen} onRequestClose={closeNewCourseModal}> <NewCourse user={user}/> </Modal>

        </div>
    )
}


const mapDispatch = {
   openNewCourseModal,
   closeNewCourseModal
};


const mapState = state => ({
    user: state?.users?.user,
    courses: Object.values(state?.courses?.courses),
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError,
    isModalOpen: state?.courses?.isModalOpen
})

export default connect(mapState, mapDispatch)(CourseListPage);