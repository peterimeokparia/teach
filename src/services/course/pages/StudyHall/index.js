import React from 'react';

import { 
connect } from 'react-redux';

import {
Redirect } from '@reach/router';

import { 
openNewCourseModal, 
closeNewCourseModal } from 'Services/course/Actions/Courses';

import Loading from '../Components/Loading';
import LessonPlan from '../Lessons/LessonPlan';
import './style.css';

const StudyHall = ({ 
operatorBusinessName,
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
return (
<div className="">\
    <br></br>   
    <LessonPlan
            currentUser={user}
            operatorBusinessName={operatorBusinessName}
        />
</div>
)}

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