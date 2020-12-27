import React  from 'react';

import { 
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import Loading from '../Components/Loading';

import LoginLogout from '../Login/LoginLogout';

import MainMenu from '../Components/MainMenu';

import { 
navContent } from  '../Components/navigationHelper.js';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId } from '../../Selectors';

import './CoursesComponent.css';


//shadow-panel

const Users = ({
operatorBusinessName,
operator,     
coursesLoading,
onCoursesError,
user,
users}) => {


    if ( ! user ){

        navigate(`/${operatorBusinessName}/login`);
    }


    if ( coursesLoading) {

        return <Loading />
    }         


   
    if ( onCoursesError ) {

        return <div> { onCoursesError.message } </div> ;
    }
    

    const viewCurrentUsersCourseList = ( userId ) => {
        navigate(`/${operatorBusinessName}/coursestaught/${userId}`); 
    }


    const gotToLessonPlan = ( user ) => { 

          navigate(`/${operatorBusinessName}/classroom/${user._id}`);
        //navigate(`/${operatorBusinessName}/LessonPlan/${user._id}/${user.firstname}`);
    }
               

    let navigationContent = navContent( user, operatorBusinessName, user?.role,  "Student" ).users;

    return (

            <div className="MyCourses">
       
               <header> 

               <MainMenu 
                    navContent={navigationContent}
               /> 
          
                 <h1>  {`Welcome ${user?.firstname}! `} </h1>

                   <LoginLogout
                        user={user}
                   />
                          
               </header>

                <div className="ComponentCourseList">

                <ul >
                    
                   {
                       users.map(singleUser => 
                       
                           <li className={"component-seconday-list-body"}> 
                             <div className={ "user-list-items"}>

                              {singleUser?.firstname}

                              <span className=""> <h6>{singleUser?.courses?.length} {singleUser?.courses?.length === 1  ? "Course.": "Courses."}  </h6></span>  
                               <button
                                        className="user-course-btn"
                                        onClick={() => viewCurrentUsersCourseList(singleUser?._id)}
                                        disabled={singleUser?.courses?.length === 0} 
                                >                                
                                   <span> {singleUser?.courses?.length === 1  ? "View Course." : (singleUser?.courses?.length === 0) ? "" : "View Courses."}  </span>
                                        
                                 </button>
                                 <button
                                        className="user-course-btn"
                                        onClick={() => gotToLessonPlan(singleUser)}
                                        disabled={singleUser?.courses?.length === 0} 
                                >                                
                                   <span> {"Go to Class Room."}  </span>
                                        
                                 </button>
                                </div> 
                           </li>
                           
                       )
                   }
                </ul>
              
            </div>

            </div>
        )
       
}




const mapState = (state, ownProps) => ({
    user: state?.users?.user,
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === "Tutor"),
    courses: getCoursesByOperatorId(state, ownProps),
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError
    
})

export default connect(mapState)(Users);