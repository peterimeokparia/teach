import React from 'react';

import { 
connect } from 'react-redux';

import { 
toggleTeachBoardOrEditor, 
updateUserInvitationUrl, 
setLessonInProgressStatus, 
inviteStudentsToLearningSession, 
loadMeetings, 
saveMeeting, 
getUserByEmail } from '../actions';

import { 
toggleVideoCapture } from '../../recorder/actions.js';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId } from '../Selectors';

import { 
Redirect } from '@reach/router';

import './LessonPlan.css'; // change


const LessonPlanInviteUserVerifiedPage = ({ 
operatorBusinessName,
operator,
classRoomId,  
courseId,  
lessonId, 
lessonTitle,
currentUser,
paidSessions })  =>  {
   
 
    
  const paidSession = paidSessions?.find( currentSession => currentSession?.userId === currentUser?._id );  

  if ( currentUser?.email === undefined ) {

    return <Redirect to={`/${operatorBusinessName}/LessonPlan/invite/userverification/classRoom/${classRoomId}`} noThrow />
  } 

  
  if ( paidSession?.numberOfSessions === paidSession?.totalNumberOfSessions  && paidSession?.typeOfSession === "Package" && currentUser?.role === "Student" ) {

    return <Redirect to={`/${operatorBusinessName}/mycourses`} noThrow />
  }


  if ( currentUser?.userIsValidated ) {

    return <Redirect to={`/${operatorBusinessName}/LessonPlan/classRoom/${classRoomId}`} noThrow />
  }


}



const mapState = ( state, ownProps )   => {
  return {
         operator: getOperatorFromOperatorBusinessName(state, ownProps),
         currentUser: state.users.user,
         courses: getCoursesByOperatorId(state, ownProps),
         lessons: Object.values(state.lessons.lessons),
         lessonStarted: state.lessons.lessonStarted,
         boardOrEditor: state.lessons.toggleTeachBoardOrEditor,
         setVideoCapture: state.streams.setVideoCapture,
         invitees: state.users.invitees,
         studentsSubscribedToThisCourse : getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === "Student" && user?.courses?.includes(ownProps?.courseId)),
         currentMeeting: state.meetings.meetings,
         paidSessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.courseId === ownProps?.courseId)
  };
}


export default connect(mapState, { toggleTeachBoardOrEditor, toggleVideoCapture, updateUserInvitationUrl, setLessonInProgressStatus,  inviteStudentsToLearningSession, loadMeetings, saveMeeting, getUserByEmail } )(LessonPlanInviteUserVerifiedPage);