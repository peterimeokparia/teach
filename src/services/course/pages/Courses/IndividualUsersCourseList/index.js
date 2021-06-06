import React from 'react';

import { 
connect } from 'react-redux';

import { 
Link,
navigate } from '@reach/router';

import {
navContent } from  'Services/course/Pages/Components/NavigationHelper';

import {  
getUsersByOperatorId,
getCoursesByOperatorId,
getOperatorFromOperatorBusinessName } from 'Services/course/Selectors';

import Loading from 'Services/course/Pages/Components/Loading';
import LoginLogout from 'Services/course/Pages/LoginPage/Components/LoginLogout';
import CoursesComponent from 'Services/course/Pages/Courses/Components/CoursesComponent';
import Cart from 'Services/course/Pages/SalesPage/Cart';
import MainMenu from 'Services/course/Pages/Components/MainMenu';
import './style.css';

const IndividualUsersCourseList = ({
operatorBusinessName,
operator,    
userId,
users, 
user,
courses,
coursesLoading,
onCoursesError }) => {
if ( ! user?.userIsValidated || ! operator ){
    navigate(`/${operatorBusinessName}/login`);
}

if ( coursesLoading) {
    return <Loading />;
}         

if ( onCoursesError ) {
    return <div> { onCoursesError.message } </div> ;
}

let tutorsCourses, tutor, firstName;

tutorsCourses = courses?.filter(course => course.createdBy === userId);

tutor = users?.filter(thisUser => thisUser._id === userId)[0];

firstName = user?.firstname;

let navigationContent = navContent( user, operatorBusinessName, user?.role,  "Student" ).users;

return ( <div className="MyCourses">
            <header> 
                <MainMenu 
                    navContent={navigationContent}
                />  
                <h1>  {`You are viewing ${firstName}'s Course List. `} </h1>
                <div>  
                <LoginLogout
                    operatorBusinessName={operatorBusinessName}
                    user 
                />    
                <Cart />
                </div>
            </header>  

         {
              ( tutorsCourses?.length === 0 ) 
                ? ( <div> <h3>{tutor?.firstname} doesn't have any courses.  Please check back. 
                        <div> In the meantime, you can view other 
                            <h4><Link to={"/courses"}> courses. </Link></h4> 
                        </div></h3> 
                    </div>
                  ) 
                : ( <div> 
                    <CoursesComponent
                        selectedTutorId={userId}
                        operatorBusinessName={operatorBusinessName}
                        courses={tutorsCourses}
                    />     
                    </div>
                  )
         } 
    </div>
); };

const mapState = ( state, ownProps)  => ({
    user: state?.users?.user,
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    yourCourses: getCoursesByOperatorId(state, ownProps)?.filter(course => state?.users.user?.courses?.includes(course?._id)),
    courses: getCoursesByOperatorId(state, ownProps),
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError
});

export default connect(mapState)(IndividualUsersCourseList);

   