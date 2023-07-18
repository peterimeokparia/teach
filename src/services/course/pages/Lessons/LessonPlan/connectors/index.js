import { saveLesson, setLessonInProgressStatus } from 'services/course/actions/lessons';
import { inviteStudentsToLearningSession } from 'services/course/actions/users';
import { getEventByEventId, getStudentsLessonUserNotesByLessonId, getLessonByLessonIdSelector, 
  getOperatorFromOperatorBusinessName, getTutorsLessonUserNotesByLessonId } from 'services/course/selectors';
import { loadMeetingsByMeetingId } from 'services/course/actions/meetings';
import { saveEditorMarkDownObjectToMw } from 'services/course/actions/editor'; 
import { setInSession, setHideMeetingStage, setFullMeetingStage, 
  setVideoModalMode, setIconOnColor, toggleMeetingPanel} from 'services/course/actions/sessions'; 

export const mapDispatch = {
    setLessonInProgressStatus,  
    inviteStudentsToLearningSession,
    saveLesson,
    loadMeetingsByMeetingId,
    saveEditorMarkDownObjectToMw,
    setInSession, 
    setHideMeetingStage, 
    setFullMeetingStage, 
    setVideoModalMode, 
    setIconOnColor, 
    toggleMeetingPanel
};
  
export const mapState = ( state, ownProps )   => {
    return {
      operator: getOperatorFromOperatorBusinessName(state, ownProps),
      currentUser: state.users.user,
      courses: Object.values(state.lessons.lessons),
      lessons: Object.values(state.lessons.lessons),
      lessonStarted: state.lessons.lessonStarted,
      setVideoCapture: state.streams.setVideoCapture,
      invitees: state.users.invitees,
      onSessionRenewal: state.sessions.autoRenewedPackageSuccess,
      allSessions: Object.values(state?.sessions?.sessions),
      selectedCourseFromLessonPlanCourseDropDown: state.courses.selectedCourseFromLessonPlanCourseDropDown,
      selectedLessonFromLessonPlanDropDown: state.lessons.selectedLessonFromLessonPlanDropDown,
      note: getStudentsLessonUserNotesByLessonId(state, ownProps),
      lessonNotes: getTutorsLessonUserNotesByLessonId(state, ownProps),
      event: getEventByEventId(state, ownProps),
      lesson: getLessonByLessonIdSelector( state, ownProps ),
      hideMeetingStage:state?.sessions?.hideMeetingStage, 
      fullMeetingStage:state?.sessions?.fullMeetingStage, 
      videoModalModeOn:state?.sessions?.videoModalModeOn, 
      inSession:state?.sessions?.inSession, 
      iconOnColor:state?.sessions?.iconOnColor, 
      meetingPanel:state?.sessions?.meetingPanel,
      currentMeeting: state?.meetings?.currentMeeting,
      meetings: Object.values( state?.meetings?.meetings )
    };
  };