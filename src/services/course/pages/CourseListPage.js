import React  from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Link, navigate } from '@reach/router';
import { openNewCourseModal, closeNewCourseModal } from '../actions';
import Loading from './Loading';
import LoginLogout from './LoginLogout'
import CoursesComponent from './CoursesComponent';
import NewCourse from './NewCourse';
import Cart from './Cart'
import './CourseListPage.css';



const CourseListPage = ({ 

       courses,
       coursesLoading,
       onCoursesError,
       openNewCourseModal,
       closeNewCourseModal,
       isModalOpen,
       user,
        }) => {

    let yourcourses;


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
               
      //make courses.length a static value instead of calling courses all the time
    return (( courses?.length === 0 ) ? (

        <div className="CreateCourse">

             <NewCourse user={user} />

         </div>

        ) : (

            <div className="CourseList">

                <LoginLogout/>

                <Cart />
                
               {/* <span>
                <button className="new-course-btn" onClick={openNewCourseModal}>New Course</button> 
               </span> */}

                <button className="new-course-btn" onClick={viewMyCourses}>My Courses</button> 

                <div className="content">

                    <CoursesComponent 
                               title={`All Courses`}
                               courses={courses}
                   /> 
 
              
            </div>

                 <Modal isOpen={isModalOpen} onRequestClose={closeNewCourseModal}> <NewCourse user={user}/> </Modal>

            </div>
        )
    )     
}


const mapDispatch = {
   openNewCourseModal,
   closeNewCourseModal
};


const mapState = state => ({
    user: state?.users?.user,
    courses: state?.courses?.courses,
    coursesLoading: state.courses.coursesLoading,
    onCoursesError: state.courses.onCoursesError,
    isModalOpen: state.courses.isModalOpen
})

export default connect(mapState, mapDispatch)(CourseListPage);