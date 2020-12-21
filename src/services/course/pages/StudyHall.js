import React from 'react';

import { 
connect } from 'react-redux';

import Modal from 'react-modal';

import {
Link, 
navigate, 
Redirect } from '@reach/router';

import { 
openNewCourseModal, 
closeNewCourseModal } from '../actions';

import Loading from './Loading';
import LoginLogout from './LoginLogout'
import CoursesComponent from './CoursesComponent';
import NewCourse from './NewCourse';
import Cart from './Cart';
import MainMenu from './MainMenu';
import './MyCourses.css';
import LessonPlan from './LessonPlan';


const StudyHall = ({ 
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
    


    let navContent = [
        { id: 0, hrefValue: '/mycourses' , item: 'Study Hall' }, 
        { id: 1, hrefValue: '/mycourses' , item: 'My Courses' },
        { id: 2, hrefValue: '/users' , item: 'My Tutors' }  
    ]
           
    return (

        <div className="">
{/* 
        <header> 

           <MainMenu navContent={navContent} />

             
            <h2> You are viewing all courses. </h2>

            <div>  
              <LoginLogout/>

              <Cart />

            </div>
        </header> */}

        <br></br>   

        <LessonPlan/>
      

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

export default connect(mapState, mapDispatch)(StudyHall);