import React, { 
useState, 
useEffect  } from 'react';

import { 
connect } from 'react-redux';

import { 
Redirect, 
navigate } from '@reach/router';

import { 
getUserByEmail } from '../actions';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId } from '../Selectors';

import LessonPlanSignUpComponent from './LessonPlanSignUpComponent';

import './LessonPlan.css'; // change


const LessonPlanInviteUserVerification = ({ 
operatorBusinessName,
operator,
classRoomId,  
courseId,  
lessonId, 
lessonTitle,
currentUser,
studyHallOwner,
studyHallName,
getUserByEmail }) => {
   

  const [userCredentials, setUserCredentials] = useState(null);


  if ( currentUser?.userIsValidated ) {

    if ( studyHallName ) {

      return <Redirect to={`/${operatorBusinessName}/LessonPlan/invite/userverified/${studyHallOwner}/${currentUser?.firstname}/${studyHallName}`} noThrow />   
    } 

    return <Redirect to={`/${operatorBusinessName}/LessonPlan/invite/userverified/classRoom/${classRoomId}`} noThrow />       
  }


  if ( (! currentUser?.userIsValidated ) && (! userCredentials )) {

     LessonPlanSignUpComponent(setUserCredentials);
  }
  
  
  if ( userCredentials ) {

     getUserByEmail(userCredentials);       
  }


  if ( currentUser?.userIsValidated ) {

    return <Redirect to={`/${operatorBusinessName}/LessonPlan/invite/userverified/classRoom/${classRoomId}`} noThrow /> 

  } else {

    return ( <div> Please wait. We are verifying your account. Thank you.</div> )

  }

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


export default connect( mapState, { getUserByEmail } )(LessonPlanInviteUserVerification);