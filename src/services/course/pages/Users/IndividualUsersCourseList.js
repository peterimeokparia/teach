import React from 'react';

import { 
connect } from 'react-redux';

import { 
Link,
navigate } from '@reach/router';

import {  
getUsersByOperatorId,
getCoursesByOperatorId } from '../../Selectors';

import Loading from '../Components/Loading';
import LoginLogout from '../Login/LoginLogout'
import CoursesComponent from '../Courses/CoursesComponent';
import Cart from '../Sales/Cart/Cart';

import './MyCourses.css';


const IndividualUsersCourseList = ({
operatorBusinessName,
operator,    
userId,
users, 
user,
courses,
coursesLoading,
onCoursesError }) => {


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
        navigate(`/${operatorBusinessName}/courses`)
    }

    const viewTutorsBio = () => {
        navigate(`/${operatorBusinessName}/coursestaught/about/${userId}`)
    }
          

    let tutorsCourses, tutor, firstName;

    tutorsCourses = courses?.filter(course => course.createdBy === userId);

    tutor = users?.filter(thisUser => thisUser._id === userId)[0];

    firstName = user?.firstname;



    
    return (( tutorsCourses?.length === 0 ) ? (

       
        <div className="MyCourses">

            <header> 
                <h1>  {`Welcome ${firstName}! `} </h1>

                   
                    <div>  
                    <LoginLogout/>    

                    <Cart />
                    </div>
                </header>

        <br></br>   


    
             <div> 

             </div>

             <div>
                <h3>{tutor?.firstname} doesn't have any courses.  Please check back. <div>In the meantime, you can view other <h4><Link to={"/courses"}> courses. </Link></h4> </div></h3>
             </div>

         </div>

        ) : (

            <div className="MyCourses">

            <header> 
                <h1>  {`Welcome ${firstName}! `} </h1>
    
                <h2> You are viewing {tutor?.firstname}'s course list. </h2>

                <div className="lesson-item">  
                <LoginLogout/>

                <Cart />
                </div>
            </header>

            <br></br>   
            <button className="view-courses-btn" onClick={viewTutorsBio}>Bio</button>     
              <button className="view-courses-btn" onClick={viewAllCourses}>View All Courses</button> 

                    <CoursesComponent
                               operatorBusinessName={operatorBusinessName}
                               courses={tutorsCourses}
                   />     
            </div>
        )
    )     
}


 

const mapState = ( state, ownProps)  => ({
    user: state?.users?.user,
    users: getUsersByOperatorId(state, ownProps),
    yourCourses: getCoursesByOperatorId(state, ownProps)?.filter(course => state?.users.user?.courses?.includes(course?._id)),
    courses: getCoursesByOperatorId(state, ownProps),
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError
})

export default connect(mapState)(IndividualUsersCourseList);