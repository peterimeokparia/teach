import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Link, navigate, Redirect } from '@reach/router';
import { openNewCourseModal, closeNewCourseModal,  loginUser } from '../actions';
import LoginLogout from './LoginLogout'
import CoursesComponent from './CoursesComponent';
import NewCourse from './NewCourse';
import Cart from './Cart';
import './MyCourses.css';


const MyCourses = ({
       user,
       courses,
       openNewCourseModal,
       closeNewCourseModal,
       isModalOpen}) => {




    if ( ! user || user?.email === undefined ){

        return <Redirect to="/login" noThrow />
    }

 

    const viewAllCourses = () => {
        navigate('/courses')
    }
          

   
    let yourCourses = courses?.filter(course => user?.courses?.includes(course?._id));

    let usersFirstName = user?.firstname;
   
    
    return (( user?.courses?.length === 0 ) ? (

       
        <div className="MyCourses">

            <header> 
                    <h1>  {`Welcome ${usersFirstName}! `} </h1>

                   
                    <div>  
                    <LoginLogout/>    

                    <Cart />
                    </div>
                </header>

        <br></br>   


    
             <div> 

             </div>

             <div>
                <h3>You are not subscribed to any  <span><Link to={"/courses"}> courses. </Link></span></h3>
             </div>

             <div>
             { ( user?.role === "Tutor" ) && <button className="new-course-btn" onClick={openNewCourseModal}>New Course</button> }
    
             </div>
      
             <Modal isOpen={isModalOpen} onRequestClose={closeNewCourseModal}> <NewCourse user={user}/> </Modal>
         </div>

        ) : (

            <div className="MyCourses">

            <header> 
                <h1>  {`Welcome ${usersFirstName}! `} </h1>
    
                <h2> Your Course List </h2>

                <div className="lesson-item">  
                <LoginLogout/>

                <Cart />
                </div>
            </header>

            <br></br>   

              <button className="view-courses-btn" onClick={viewAllCourses}>View All Courses</button> 
              { ( user?.role === "Tutor" ) && <button className="new-course-btn" onClick={openNewCourseModal}>New Course</button> }

                    <CoursesComponent
                               modal={isModalOpen} 
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
    users: Object.values(state?.users?.users),
    yourCourses: Object.values(state?.courses?.courses)?.filter(course => state?.users.user?.courses?.includes(course?._id)),
    courses: Object.values(state?.courses?.courses),
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError,
    isModalOpen: state?.courses?.isModalOpen
})

export default connect(mapState, mapDispatch)(MyCourses);