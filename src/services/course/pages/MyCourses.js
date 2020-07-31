import React, { useEffect } from 'react';
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



const MyCourses = ({ 

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
    
    
    if ( user && user?.courses?.length > 0 ){

      yourcourses = courses?.filter(course => user?.courses?.includes(course.id));

    }


    const viewAllCourses = () => {
        navigate('/courses')
    }
           
     
    return (( user?.courses?.length === 0 ) ? (

        <div className="CreateCourse">

             {/* <NewCourse user={user} /> */}
             <div> 
                 {`Welcome ${user.username}`}
             </div>

             <div>
                You are not subscribed to any courses.
             </div>

             <div>
             <Link to={"/courses"}>View all courses</Link>
             </div>

         </div>

        ) : (

            <div className="CourseList">
              <h2>{`Welcome ${user.username}! Your course list.`}</h2>
               <span>
               <button className="new-course-btn" onClick={openNewCourseModal}>New Course</button> 
               </span>
               <button className="new-course-btn" onClick={viewAllCourses}>View All Courses</button> 
               
                
                <div className="content">

                    <CoursesComponent 
                               courses={yourcourses}
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

export default connect(mapState, mapDispatch)(MyCourses);