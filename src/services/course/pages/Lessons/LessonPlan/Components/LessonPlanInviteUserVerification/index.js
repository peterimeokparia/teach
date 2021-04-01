import 
React, { 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
Redirect, navigate } from '@reach/router';

import {
loadUsers,   
createUser,
loginUser } from 'Services/course/Actions/Users';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId } from 'Services/course/Selectors';

import LessonPlanSignUpComponent from 'Services/course/Pages/Lessons/LessonPlan/Components/LessonPlanSignUpComponent';
import SiteUser from 'Services/course/helpers/SiteUser';
import './style.css';

const LessonPlanInviteUserVerification = ({ 
operatorBusinessName,
operator,
classRoomId,
users,  
courseId,  
lessonId, 
lessonTitle,
currentUser,
studyHallOwner,
studyHallName,
loadUsers,
createUser,
loginUser  }) => {
   
  const [userCredentials, setUserCredentials] = useState(null);

  if ( currentUser?.userIsValidated && currentUser?.userIsVerified ) {
    
    if ( studyHallName ) {
      return <Redirect to={`/${operatorBusinessName}/LessonPlan/invite/userverified/${studyHallOwner}/${currentUser?.firstname}/${studyHallName}`} noThrow />   
    } 
    return <Redirect to={`/${operatorBusinessName}/LessonPlan/invite/userverified/classRoom/${classRoomId}`} noThrow />       
  }

  if ( ( ! currentUser?.isVerified ) && (! currentUser?.userIsValidated ) && (! userCredentials )) {
        LessonPlanSignUpComponent(setUserCredentials);
  }
  
  if ( userCredentials?.existingUser === "No" ) {
      userCredentials['existingUser'] = "Yes" 
      setUserCredentials(userCredentials)
      createUser({
        ...new SiteUser(), 
        firstname: userCredentials?.firstName, 
        email: userCredentials?.email, 
        password: userCredentials?.password, 
        role: userCredentials?.userRole,
        operatorId: operator?._id
      });
      
      loadUsers();
  }

  if ( userCredentials?.existingUser === "Yes" ) {
     let user = users.find( usr => usr?.email === userCredentials?.email );

     if ( user ) {
        loginUser({...user, unHarshedPassword: userCredentials?.password, userIsVerified: true });  
        navigate(`/${operatorBusinessName}/LessonPlan/invite/userverified/classRoom/${classRoomId}`);
     }
  }
  return ( <div> Please wait. We are verifying your account. Thank you.</div> )
}

const mapDispatch = {
  createUser,
  loginUser,
  loadUsers
}

const mapState = ( state, ownProps )   => {
  return {
    currentUser: state.users.user,
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    courses: getCoursesByOperatorId(state, ownProps),
    lessons: Object.values(state.lessons.lessons),
    lessonStarted: state.lessons.lessonStarted,
    boardOrEditor: state.lessons.toggleTeachBoardOrEditor,
    setVideoCapture: state.streams.setVideoCapture,
    invitees: state.users.invitees,
    studentsSubscribedToThisCourse : getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === "Student" && user?.courses?.includes(ownProps?.courseId)),
    currentMeeting: state.meetings.meetings
  };
}

export default connect( mapState, mapDispatch )(LessonPlanInviteUserVerification);