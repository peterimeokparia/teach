import React from 'react';
import { connect } from 'react-redux';
import { Link, navigate } from '@reach/router';
import Loading from './Loading';
import LoginLogout from './LoginLogout'
import CoursesComponent from './CoursesComponent';
import Cart from './Cart';
import './MyCourses.css';


const IndividualUsersCourseList = ({
       userId,
       users, 
       user,
       courses,
       coursesLoading,
       onCoursesError}) => {


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

              <button className="view-courses-btn" onClick={viewAllCourses}>View All Courses</button> 

                    <CoursesComponent
                               courses={tutorsCourses}
                   />     
 
            </div>
        )
    )     
}


 

const mapState = state => ({
    user: state?.users?.user,
    users: Object.values(state?.users?.users),
    yourCourses: Object.values(state?.courses?.courses)?.filter(course => state?.users.user?.courses?.includes(course?._id)),
    courses: Object.values(state?.courses?.courses),
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError
})

export default connect(mapState)(IndividualUsersCourseList);