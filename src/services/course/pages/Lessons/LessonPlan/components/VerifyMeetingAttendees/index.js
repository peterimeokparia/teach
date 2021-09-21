import { 
connect } from 'react-redux';

import{
loadMeetings, 
loadMeetingsByMeetingId,
saveMeeting } from 'services/course/actions/meetings';

import{
incrementSessionCount } from 'services/course/actions/sessions';
  
import {
updateUserInvitationUrl } from 'services/course/actions/users';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId } from 'services/course/selectors';

import CheckBox from 'services/course/pages/components/CheckBox';
import useVerifyMeetingAttendeesHook from 'services/course/pages/Lessons/hooks/useVerifyMeetingAttendeesHook';
import './style.css'

const VerifyMeetingAttendees = ({ 
  operatorBusinessName,
  operator,
  currentUser,
  selectedUserId,
  users, 
  loadMeetingsByMeetingId,
  meetingId })  =>  {

    let meetingProps = {
      operatorBusinessName,
      currentUser,
      meetingId,
      selectedUserId,
      loadMeetingsByMeetingId
    };

    let {
      meeting,
      handleSubmit
    } = useVerifyMeetingAttendeesHook( meetingProps );

    let meetings = meeting?.invitees;
    
  return(<div className="verifyattendees">
    <div className={operatorBusinessName}>
      <header>
        <h4>{'Verify Meeting Attendees.'}</h4>
      </header>
    </div>
          <CheckBox
            mainLabel="Verify Meeting Attendees"
            description="firstname"
            itemCollection={meetings}
            itemValueKey="_id"
            handleSubmit={ handleSubmit }
          />
     </div>
  );
};

const mapState = ( state, ownProps )   => {
  return {
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    currentUser: state.users.user,
    users: state.users.users,
    courses: getCoursesByOperatorId(state, ownProps),
    lessons: Object.values(state.lessons.lessons),
    lessonStarted: state.lessons.lessonStarted,
    boardOrEditor: state.lessons.toggleTeachBoardOrEditor,
    setVideoCapture: state.streams.setVideoCapture,
    invitees: state.users.invitees,
    studentsSubscribedToThisCourse : getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === "Student" && user?.courses?.includes(ownProps?.courseId)),
    currentMeeting: state.meetings.meetings
  };
};

export default connect(mapState, { incrementSessionCount, loadMeetingsByMeetingId, updateUserInvitationUrl, loadMeetings, saveMeeting } )(VerifyMeetingAttendees);