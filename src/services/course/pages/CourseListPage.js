import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Link, navigate } from '@reach/router';
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

        navigate('/login');
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
            <h1>  {`Welcome ${user?.username}! `} </h1>

            <h2> All Courses </h2>

            <div>  
              <LoginLogout/>

              <Cart />
            </div>
        </header>

        <br></br>   

          <button className="view-courses-btn" onClick={viewMyCourses}>My Courses</button> 
          
                <CoursesComponent 
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
    courses: state?.courses?.courses,
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError,
    isModalOpen: state?.courses?.isModalOpen
})

export default connect(mapState, mapDispatch)(CourseListPage);