import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Link, navigate } from '@reach/router';
import { openNewCourseModal, closeNewCourseModal } from '../actions';
import Loading from './Loading';
import LoginLogout from './LoginLogout'
import NewCourse from './NewCourse';
import Cart from './Cart'
import './CoursesComponent.css';



const CoursesComponent = ({ 
       courses,
       coursesLoading,
       onCoursesError
        }) => {


    if ( coursesLoading) {

        return <Loading />
    }         


    if ( onCoursesError ) {

      return <div> { onCoursesError.message } </div> 

    }  
           
    return (
                <div className="ComponentCourseList">
                 <ul>
       
                    { courses?.map( course => ( 

                       <li key={course.id}>

                           <div className="list-items">

                            <Link to={`/courses/${course?.id}`}>

                                <span> {course?.name}</span>

                            </Link>
                                <span className="price"> ${ course?.price.toFixed(2) }   </span> 
                           </div>
                           
                       </li>
                     ))}
                 </ul>
            </div>
          
    )
       
}



const mapState = state => ({
    coursesLoading: state.courses.coursesLoading,
    onCoursesError: state.courses.onCoursesError,
})

export default connect(mapState)(CoursesComponent);