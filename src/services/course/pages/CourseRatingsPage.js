import React from 'react';
import { connect } from 'react-redux';



//https://www.foresee.com/solutions/apps-and-tools/ratings-reviews/%20cost
const CourseRatingsPage = ({ 
            courseId, 
            users, 
            currentUser, 
            userId,
            courses 
          }) => {

    return   (    
            <span> 
                courseId: {courseId} || userId: {userId}  || Review: Great course. Seasoned tutor.
            </span> 
    );

}



const mapState = ( state )   => {
  return {
         currentUser: state.users.user,
         courses: Object.values(state?.courses?.courses),
  };
}


export default connect(mapState)(CourseRatingsPage);