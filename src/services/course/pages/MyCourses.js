import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Link, navigate } from '@reach/router';
import { openNewCourseModal, closeNewCourseModal } from '../actions';
import Loading from './Loading';
import LoginLogout from './LoginLogout'
import CoursesComponent from './CoursesComponent';
import NewCourse from './NewCourse';
import './MyCourses.css';


const MyCourses = ({ 

       user,
       yourCourses,
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
    


    const viewAllCourses = () => {
        navigate('/courses')
    }
           
     
    return (( user?.courses?.length === 0 ) ? (

       
        <div className="MyCourses">

            <header> 
                    <h1>  {`Welcome ${user?.username}! `} </h1>

                   
                    <div>  
                    <LoginLogout/>
                    {/* <LoginLogout/> */}
               
                    </div>
                </header>

        <br></br>   


    
             <div> 

             </div>

             <div>
                <h3>You are not subscribed to any courses.</h3>
             </div>

             <div>
                <h4><Link to={"/courses"}>View all courses </Link></h4>
             </div>

         </div>

        ) : (

            <div className="MyCourses">

            <header> 
                <h1>  {`Welcome ${user?.username}! `} </h1>
    
                <h2> Your course list </h2>

                <div className="lesson-item">  
                <LoginLogout/>
                </div>
            </header>

            <br></br>   

              <button className="view-courses-btn" onClick={viewAllCourses}>View All Courses</button> 
              <button className="new-course-btn" onClick={openNewCourseModal}>New Course</button> 

                    <CoursesComponent 
                               courses={yourCourses}
                   />     
 
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
    yourCourses: state?.courses?.courses?.filter(course => state?.users.user?.courses?.includes(course?.id)),
    courses: state?.courses?.courses,
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError,
    isModalOpen: state?.courses?.isModalOpen
})

export default connect(mapState, mapDispatch)(MyCourses);