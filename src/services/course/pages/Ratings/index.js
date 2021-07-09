import { 
connect } from 'react-redux';

const CourseRatingsPage = ({ 
  courseId, 
  users, 
  currentUser, 
  userId,
  courses }) => {
return   (    
      <span> 
          courseId: {courseId} || userId: {userId}  || Review: Great course. Seasoned tutor.
      </span> 
); };

const mapState = ( state )   => {
  return {
      currentUser: state.users.user,
      courses: Object.values(state?.courses?.courses),
  };
};

export default connect(mapState)(CourseRatingsPage);