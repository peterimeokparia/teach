import React  from 'react';
import { connect } from 'react-redux';
import { Link, navigate } from '@reach/router';
import Loading from './Loading';
import LoginLogout from './LoginLogout'
import './CoursesComponent.css';



const Users = ({ 
       coursesLoading,
       onCoursesError,
       user,
       users
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
    

    const viewMyCourses = () => {
        navigate('/mycourses');
    }

    const viewCurrentUsersCourseList = (userId) => {
        navigate(`/coursestaught/${userId}`); 
    }
               
      //make courses.length a static value instead of calling courses all the time
    return (

            <div className="MyCourses">
       
               <header> 
          
                 <h1>  {`Welcome ${user?.firstname}! `} </h1>

                   <LoginLogout/>
                          
               </header>

                 <div className="my-courses-btn">
                    <button className="new-course-btn" onClick={viewMyCourses}>My Courses</button> 
                 </div>
                

                <div className="ComponentCourseList">

                <ul className={"component-seconday-list-body"}>
                   {
                       users.map(singleUser => 
                        <div className={ "user-list-items"}>
                           <li> 
                              
                              {singleUser?.firstname}

                               <button
                                        className="user-course-btn"
                                        onClick={() => viewCurrentUsersCourseList(singleUser?._id)}
                                        disabled={singleUser?.courses?.length === 0} 
                                > 
                                        
                                        <span> {singleUser?.courses?.length} {singleUser?.courses?.length === 1  ? "Course.": "Courses."}  </span>  <span> {singleUser?.courses?.length === 1  ? "View Course." : (singleUser?.courses?.length === 0) ? "" : "View Courses."}  </span>
                                        
                                 </button>
                               
                           </li>
                           </div>  

                       )
                   }
                </ul>
              
            </div>

            </div>
        )
       
}



const mapState = state => ({
    user: state?.users?.user,
    users: Object.values(state?.users?.users)?.filter(user => user?.role === "Tutor"),
    courses: Object.values(state?.courses?.courses),
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError
    
})

export default connect(mapState)(Users);