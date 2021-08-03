import { 
connect } from 'react-redux';

import {
addNewMeeting,
loadMeetings, 
loadMeetingsByMeetingId,
saveMeeting } from 'services/course/actions/meetings';

import{
incrementSessionCount } from 'services/course/actions/sessions';

import{
loadLessons,
saveLesson,
toggleTeachBoardOrEditor,   
setLessonInProgressStatus,
selectLessonFromLessonPlanDropDown } from 'services/course/actions/lessons';

import{
loadUsers,
lastLoggedInUser,
updateUserInvitationUrl, 
inviteStudentsToLearningSession } from 'services/course/actions/users';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId } from 'services/course/selectors';

import { 
getUrls,
adjustRoomSize } from 'services/course/pages/Lessons/LessonPlan/helpers';

import { 
Validations } from 'services/course/helpers/Validations';

import {
toggleVideoModalMode } from 'services/course/actions/video';

import {
videoCallIcon,
adjustRoomIcon,
iconStyleMain,
videoMeta } from 'services/course/pages/Lessons/LessonPlan/inlineStyles.js';

import useTeachMeetingSettingsHook  from 'services/course/pages/Lessons/hooks/useTeachMeetingSettingsHook';
import LessonPlanIframeComponent  from 'services/course/pages/components/LessonPlanIframeComponent';
import Meeting from 'services/course/pages/Meeting';
import MaterialUiVideoComponent from 'services/course/pages/components/MaterialUiVideoComponent';
import NavLinks  from 'services/course/pages/components/NavLinks';
import NotesIcon from '@material-ui/icons/Notes';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AdjustIcon from '@material-ui/icons/Adjust';
import './style.css';

const LessonPlan = ({ 
  operatorBusinessName,
  operator,  
  toggleVideoModalMode,
  courseId,
  classRoomGroupId,
  classRoomGroupName,
  classRoomId,
  classRoomName,  
  videoState,
  lessons,
  selectedCourseTutor,
  classRoomLessonPlan,
  saveLesson,
  users,
  currentUser,
  boardOrEditor,
  toggleTeachBoardOrEditor,
  lastLoggedInUser,
  studentsSubscribedToThisCourse,
  loadUsers,
  loadMeetings,
  loadMeetingsByMeetingId,
  selectLessonFromLessonPlanDropDown,
  loadLessons,
  paidSessions,
  courses,
  addNewMeeting,
  incrementSessionCount,
  updateUserInvitationUrl,
  saveMeeting,
  selectedCourseFromLessonPlanCourseDropDown,
  selectedLessonFromLessonPlanDropDown,
  currentMeetings }) => {
  let {
    hideMeetingStage,
    fullMeetingStage,
    videoModalModeOn,
    currentLesson,
    session,
    roomSize, 
    setVideoModalMode,
    toggleTeach,
    toggleRoomSize,
    resetAllStartSettings,
    resetAllStopSettings,
    hidePopUpWindow
  } = useTeachMeetingSettingsHook( users, currentUser, addNewMeeting, classRoomId, operatorBusinessName );

  let lesson = ( ! selectedLessonFromLessonPlanDropDown?._id ) ? currentLesson : selectedLessonFromLessonPlanDropDown;
  
  const urls = getUrls(currentUser, courseId, lesson?._id, lesson?.title); 
  const fullScreenSize = "1536px";
  const editorUrl = urls.editor?.prod;
  const canvasUrl = urls.canvas?.prod; 

const saveVideoRecording = ( element ) => {
  saveLesson( element );
};

function toggleCurrentMeetingSession(){ 
  toggleTeach();
};

return (
    <div className="MeetingPlan" onDoubleClick={hidePopUpWindow}>  
      <header> 
        <h1>
          <NavLinks to={`/${operatorBusinessName}/classroomgroups/${classRoomGroupId}/${classRoomGroupName}/classroom/${classRoomId}`}> 
          {classRoomName}   
          </NavLinks>
        </h1>
        <div className="lesson-item"> 
        <span className="span-btns">  
        <VideoCallIcon 
            style={ videoCallIcon(  ) }
            className={ ( session ) ? "lesson-plan-round-button-3" : "lesson-plan-round-button-2" }
            onClick={() => toggleCurrentMeetingSession( lesson )} 
        />
        <NotesIcon
            style={ iconStyleMain() }
            className="lesson-plan-round-button-1"
            onClick={() => toggleTeachBoardOrEditor( lesson )} 
        />
        <AdjustIcon
            style={ adjustRoomIcon( session ) }
            className="lesson-plan-round-button-1"
            onClick={() => toggleRoomSize()} 
        />
        < MaterialUiVideoComponent 
            className={""} 
            element={ lesson } 
            videoMeta={videoMeta( lesson )}
            resetAllStartSettings={resetAllStartSettings}
            resetAllStopSettings={resetAllStopSettings}
            setVideoModalMode={(stage) => setVideoModalMode(stage)}
            VideoModalMode={videoModalModeOn}
            saveRecording={saveVideoRecording}
        />
        </span>
        </div>
          </header>
          <div className="content">    
            <div> 
          <div className={ fullMeetingStage ? `tools-hide` : `tools`    }> 
            {boardOrEditor 
            ? <div className={`editor${hideMeetingStage}-show`}> 
                < LessonPlanIframeComponent 
                  name="embed_readwrite" 
                  source={editorUrl}
                  width={fullScreenSize}
                  height="900px"
                  allow="camera;microphone"
                  scrolling="yes"
                  frameBorder="0" 
                /> 
             </div>
            : <div className={`canvas${hideMeetingStage}-show`}> 
                  < LessonPlanIframeComponent 
                    name="embed_readwrite" 
                    source={canvasUrl}
                    width={fullScreenSize}
                    height="900px"
                    allow="camera;microphone"
                    scrolling="yes"
                    frameBorder="0"
                    allowFullScreen
                  />
              </div>                          
            } 
            </div>
            </div>        
            <div className=''>
            <div>
            <div className={adjustRoomSize( roomSize ).containerStyle}>   
              <div className={`meeting-stage-${(hideMeetingStage) ? 'hidden' : 'visible'}`}>
              { ( session  )? <Meeting
                      userName={currentUser?.firstname}   
                      roomName={`${classRoomId}`}
                      containerHeight={adjustRoomSize( roomSize )?.meetingRoomHeight}
                      containerWidth={adjustRoomSize( roomSize )?.meetingRoomWidth}  
                    />
                  : <div> </div>          
              }
              </div>
            
            </div> 
            </div>
          </div>  
          { Validations.setErrorMessageContainer() }
      </div>
        </div>
      );
};

const mapDispatch = {
  toggleTeachBoardOrEditor, 
  updateUserInvitationUrl, 
  setLessonInProgressStatus,  
  inviteStudentsToLearningSession,
  saveLesson,
  loadUsers, 
  loadMeetings, 
  loadMeetingsByMeetingId,
  addNewMeeting,
  saveMeeting, 
  incrementSessionCount,
  lastLoggedInUser,
  loadLessons,
  selectLessonFromLessonPlanDropDown,
  toggleVideoModalMode
};

const mapState = ( state, ownProps )   => {
  return {
    videoState: state.hasRecordingStarted.recording,
    selectedCourseTutor: state.courses.courseTutor,
    classRoomLessonPlan: state.classrooms.classRoomLessonPlan,
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    courses: getCoursesByOperatorId(state, ownProps),
    currentUser: state.users.user,
    lessons: Object.values(state.lessons.lessons),
    lessonStarted: state.lessons.lessonStarted,
    boardOrEditor: state.lessons.toggleTeachBoardOrEditor,
    setVideoCapture: state.streams.setVideoCapture,
    invitees: state.users.invitees,
    studentsSubscribedToThisCourse : Object.values(state?.users?.users)?.filter(user => user?.role === "Student" && user?.courses?.includes(ownProps?.courseId)),
    currentMeetings: state.meetings.meetings,
    paidSessions: Object.values(state?.sessions?.sessions),
    onSessionRenewal: state.sessions.autoRenewedPackageSuccess,
    allSessions: Object.values(state?.sessions?.sessions),
    selectedCourseFromLessonPlanCourseDropDown: state.courses.selectedCourseFromLessonPlanCourseDropDown,
    selectedLessonFromLessonPlanDropDown: state.lessons.selectedLessonFromLessonPlanDropDown
  };
};

export default connect(mapState, mapDispatch )(LessonPlan);

