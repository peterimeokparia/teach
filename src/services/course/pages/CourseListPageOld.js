import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Link, navigate } from '@reach/router';
import { openNewCourseModal, closeNewCourseModal } from '../actions';
import Loading from './Loading';
import LoginLogout from './LoginLogout'
import NewCourse from './NewCourse';
import Cart from './Cart'
import './CourseListPage.css';



const CourseListPageOld = ({ 

       courses,
       coursesLoading,
       onCoursesError,
       openNewCourseModal,
       closeNewCourseModal,
       isModalOpen,
       user,
        }) => {



    if ( ! user ){

        navigate('/login');
    }



    if ( coursesLoading) {

        return <Loading />
    }         


   
    if ( onCoursesError ) {

        return <div> { onCoursesError.message } </div> ;
    }  
           

    
   let coursesBelongingToTheCurrentUser = courses?.filter(course =>  user?.courses?.includes(course?.id));




    return ( courses.length === 0 ? (

        <div className="CreateCourse">

             <NewCourse />

         </div>
        ) : (

            <div className="CourseList">

                <LoginLogout/>

                <Cart />
                
                <button className="new-course-btn" onClick={openNewCourseModal}>New Course</button>

                <div className="content">

                  <div className="sidebar">

                      <h1>A list of your courses:</h1>

                    <ul>
 
                    { coursesBelongingToTheCurrentUser.map( course => ( 

                       <li key={course.id}>
                           <div>

                            <Link to={`/courses/${course.id}`}>

                                <div className="courseDetails"> {course.name}</div>

                            </Link>

                                <div className="price"> ${ course.price.toFixed(2) }   </div> 
                          
                           </div>
                           
                       </li>
                     ))}
                 </ul>
                      </div>
 
                        <div className="sidebar">

                        <h1>A list of all courses:</h1>
                 <ul>
       
                    { courses.map( course => ( 

                       <li key={course.id}>

                           <div>

                            <Link to={`/courses/${course.id}`}>

                                <div className="courseDetails"> {course.name}</div>

                            </Link>

                                <div className="price"> ${ course.price.toFixed(2) }   </div> 
                          
                           </div>
                           
                       </li>
                     ))}
                 </ul>
            </div>
            </div>

                 <Modal isOpen={isModalOpen} onRequestClose={closeNewCourseModal}> <NewCourse /> </Modal>

            </div>
        )
    )     
}


const mapDispatch = {
   openNewCourseModal,
   closeNewCourseModal
};


const mapState = state => ({
    user: state.users.user,
    courses: state.courses.courses,
    coursesLoading: state.courses.coursesLoading,
    onCoursesError: state.courses.onCoursesError,
    isModalOpen: state.courses.isModalOpen
})

export default connect(mapState, mapDispatch)(CourseListPageOld);