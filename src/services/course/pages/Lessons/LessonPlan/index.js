import { 
connect } from 'react-redux';

import{
saveLesson,
setLessonInProgressStatus } from 'services/course/actions/lessons';

import{
inviteStudentsToLearningSession } from 'services/course/actions/users';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId } from 'services/course/selectors';

import { 
adjustRoomSize } from 'services/course/pages/Lessons/LessonPlan/helpers';

import { 
Validations } from 'services/course/helpers/Validations';

import { 
setItemInSessionStorage,
getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';

import {
videoCallIcon,
adjustRoomIcon,
videoMeta } from 'services/course/pages/Lessons/LessonPlan/inlineStyles.js';

import BoardEditorComponent from 'services/course/pages/Lessons/LessonPlan/components/BoardEditorComponent';
import useTeachMeetingSettingsHook  from 'services/course/pages/Lessons/hooks/useTeachMeetingSettingsHook';
import Meeting from 'services/course/pages/Meeting';
import MaterialUiVideoComponent from 'services/course/pages/components/MaterialUiVideoComponent';
import NavLinks  from 'services/course/pages/components/NavLinks';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AdjustIcon from '@material-ui/icons/Adjust';
import './style.css';

const LessonPlan = ({ 
  operatorBusinessName,
  operator,  
  courseId,
  classRoomGroupId,
  classRoomGroupName,
  classRoomId,
  classRoomName,  
  lessons,
  saveLesson,
  users,
  currentUser,
  selectedCourseFromLessonPlanCourseDropDown,
  selectedLessonFromLessonPlanDropDown }) => {

  const selectedCourse = (selectedCourseFromLessonPlanCourseDropDown?._id === undefined) 
                            ? getItemFromSessionStorage('selectedCourse') 
                            : selectedCourseFromLessonPlanCourseDropDown;

  const selectedLesson = (selectedLessonFromLessonPlanDropDown?._id === undefined) 
                            ? getItemFromSessionStorage('selectedLesson') 
                            : selectedLessonFromLessonPlanDropDown;

  let {
    hideMeetingStage,
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
  } = useTeachMeetingSettingsHook( users, currentUser, classRoomId, selectedCourse, selectedLesson );

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
            style={ videoCallIcon() }
            className={ ( session ) ? "lesson-plan-round-button-3" : "lesson-plan-round-button-2" }
            onClick={() => toggleCurrentMeetingSession( selectedLesson )} 
        />
        <AdjustIcon
            style={ adjustRoomIcon( session ) }
            className="lesson-plan-round-button-1"
            onClick={() => toggleRoomSize()} 
        />
        < MaterialUiVideoComponent 
            className={""} 
            element={ selectedLesson } 
            videoMeta={videoMeta( selectedLesson )}
            resetAllStartSettings={resetAllStartSettings}
            resetAllStopSettings={resetAllStopSettings}
            setVideoModalMode={(stage) => setVideoModalMode(stage)}
            VideoModalMode={videoModalModeOn}
            saveRecording={saveVideoRecording}
        />
        </span>
        </div>
      </header>
        <div>
          <div className="content">  
            <BoardEditorComponent 
              saveIconVisible={true}
              courseId={selectedCourse?._id }
              lessonId={selectedLesson?._id}
              classRoomId={classRoomId}
              operatorBusinessName={operatorBusinessName}
            />  
            <div>
              <div className={adjustRoomSize( roomSize ).containerStyle}>   
                <div className={`meeting-stage-${(hideMeetingStage) ? 'hidden' : 'visible'}`}>
                { ( session  )
                    ? <Meeting
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
  setLessonInProgressStatus,  
  inviteStudentsToLearningSession,
  saveLesson
};

const mapState = ( state, ownProps )   => {
  return {
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    currentUser: state.users.user,
    lessons: Object.values(state.lessons.lessons),
    lessonStarted: state.lessons.lessonStarted,
    setVideoCapture: state.streams.setVideoCapture,
    invitees: state.users.invitees,
    onSessionRenewal: state.sessions.autoRenewedPackageSuccess,
    allSessions: Object.values(state?.sessions?.sessions),
    selectedCourseFromLessonPlanCourseDropDown: state.courses.selectedCourseFromLessonPlanCourseDropDown,
    selectedLessonFromLessonPlanDropDown: state.lessons.selectedLessonFromLessonPlanDropDown
  };
};

export default connect(mapState, mapDispatch )(LessonPlan);

