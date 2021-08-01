import { 
  connect } from 'react-redux';
  
  import { 
  toggleTeachBoardOrEditor, 
  setLessonInProgressStatus } from 'services/course/actions/lessons';
  
  import {
  loadMeetings, 
  saveMeeting } from 'services/course/actions/meetings';
  
  import {
  updateUserInvitationUrl,   
  inviteStudentsToLearningSession } from 'services/course/actions/users';
  
  import { 
  getOperatorFromOperatorBusinessName, 
  getUsersByOperatorId,
  getCoursesByOperatorId } from 'services/course/selectors';
  
  import { 
  Redirect } from '@reach/router';
  
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
      return <Redirect to={`/${operatorBusinessName}/LessonPlan/invite/userverification/classRoom/${classRoomId}`} noThrow />;
    } 
  
    if ( paidSession?.numberOfSessions === paidSession?.totalNumberOfSessions  && paidSession?.typeOfSession === "Package" && currentUser?.role === "Student" ) {
      return <Redirect to={`/${operatorBusinessName}/mycourses`} noThrow />;
    }
  
    if ( currentUser?.userIsValidated && currentUser?.userIsVerified ) {
      return <Redirect to={`/${operatorBusinessName}/LessonPlan/classRoom/${classRoomId}`} noThrow />;
    }
  };
  
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
  };
  
  export default connect(mapState, { toggleTeachBoardOrEditor, updateUserInvitationUrl, setLessonInProgressStatus,  inviteStudentsToLearningSession, loadMeetings, saveMeeting } )(LessonPlanInviteUserVerifiedPage);