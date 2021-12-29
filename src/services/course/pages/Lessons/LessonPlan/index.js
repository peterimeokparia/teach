import { 
connect } from 'react-redux';

import{
saveLesson,
setLessonInProgressStatus,
toggleTeachBoardOrEditor } from 'services/course/actions/lessons';

import{
inviteStudentsToLearningSession } from 'services/course/actions/users';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId } from 'services/course/selectors';

import { 
loadMeetingsByMeetingId } from 'services/course/actions/meetings';

import { 
getUrls } from 'services/course/pages/Lessons/LessonPlan/helpers';

import { 
Validations } from 'services/course/helpers/Validations';

import {
getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';

import {
permission,
SiteFunctionalityGroup,
Organization }from 'services/course/pages/components/SiteFunctionalityGroup';

import { 
role } from 'services/course/helpers/PageHelpers';
  
import {
iconStyleMain,
videoCallIcon,
// adjustRoomIcon,
videoMeta } from 'services/course/pages/Lessons/LessonPlan/inlineStyles.js';

import Roles from 'services/course/pages/components/Roles';
import LessonPlanSplitViewComponent from 'services/course/pages/Lessons/LessonPlan/LessonPlanSplitViewComponent';
import useTeachMeetingSettingsHook  from 'services/course/pages/Lessons/hooks/useTeachMeetingSettingsHook';
import useEndMeetingHook  from 'services/course/pages/Lessons/hooks/useEndMeetingHook';
import MaterialUiVideoComponent from 'services/course/pages/components/MaterialUiVideoComponent';
import NavLinks  from 'services/course/pages/components/NavLinks';
import VideoCallIcon from '@material-ui/icons/VideoCall';
// import AdjustIcon from '@material-ui/icons/Adjust';
import './style.css';

const LessonPlan = ({ 
  operatorBusinessName,
  operator,  
  courseId,
  currentTutor,
  meetingId,
  meetingEndingPromo,
  classRoomGroupId,
  classRoomGroupName,
  classRoomId,
  classRoomName,  
  lessons,
  saveLesson,
  users,
  currentUser,
  selectedCourseFromLessonPlanCourseDropDown,
  selectedLessonFromLessonPlanDropDown,
  loadMeetingsByMeetingId,
  toggleTeachBoardOrEditor }) => {

  const selectedCourse = (selectedCourseFromLessonPlanCourseDropDown?._id === undefined) 
                            ? getItemFromSessionStorage('selectedCourse') 
                            : selectedCourseFromLessonPlanCourseDropDown;

  const selectedLesson = (selectedLessonFromLessonPlanDropDown?._id === undefined) 
                            ? getItemFromSessionStorage('selectedLesson') 
                            : selectedLessonFromLessonPlanDropDown;

  let useTeachMeetingProps = {
    meetingId, 
    currentUser, 
    classRoomId, 
    selectedCourse, 
    selectedLesson, 
    loadMeetingsByMeetingId
  };

  let {
    currentMeetingId,
    hideMeetingStage,
    videoModalModeOn,
    meetingPanel,
    session,
    roomSize, 
    setVideoModalMode,
    toggleMeetingPanel,
    toggleTeach,
    toggleRoomSize,
    resetAllStartSettings,
    resetAllStopSettings, 
    hidePopUpWindow,
  } = useTeachMeetingSettingsHook( useTeachMeetingProps );

  useEndMeetingHook( meetingEndingPromo, classRoomId );

  const saveVideoRecording = ( element ) => {
    saveLesson( element );
  };

  const urls = getUrls(currentUser, selectedCourse?._id, selectedLesson?._id, classRoomId); 
  const editor = {
    height: "900px",
    width: "380px",
    url: urls?.privateEditor,
    scrolling: "yes",
    allow: "camera;microphone",
    frameBorder: "0" 
  };
 
function toggleCurrentMeetingSession(){ 
  toggleTeach();
};

const PageObject = {
  LessonPlan_MaterialUiVideoComponent: 'LessonPlan_MaterialUiVideoComponent',
  LessonPlan_VideoCallIcon: 'LessonPlan_VideoCallIcon'
};

let testGroup = [
  {   page: 'Users',
      operatorBusinessName: [Organization.Teach, Organization.Boomingllc ],
      pageObject: [ 
          { name: PageObject?.LessonPlan_MaterialUiVideoComponent, allowed: [ Organization.Teach ]},
          { name: PageObject?.LessonPlan_VideoCallIcon, allowed: [ Organization.Teach, Organization.Boomingllc ]},
      ]  
  }
];

return (
    <div className="MeetingPlan"> 
     <div className={operatorBusinessName}>
     <header> 
        <h1>
          <NavLinks to={`/${operatorBusinessName}/classroomgroups/${classRoomGroupId}/${classRoomGroupName}/classroom/${classRoomId}`}> 
          {classRoomName}   
          </NavLinks>
        </h1>
        <div className="lesson-item"> 
        <span className="span-btns">  
        <SiteFunctionalityGroup group={ permission( testGroup, operatorBusinessName, PageObject?.LessonPlan_MaterialUiVideoComponent )}>
        < MaterialUiVideoComponent 
            name={PageObject?.LessonPlan_MaterialUiVideoComponent}
            className={"MaterialUiVideoComponent"} 
            element={ selectedLesson } 
            hasRights={true}
            videoMeta={videoMeta( selectedLesson )}
            resetAllStartSettings={resetAllStartSettings}
            resetAllStopSettings={resetAllStopSettings}
            setVideoModalMode={(stage) => setVideoModalMode(stage)}
            VideoModalMode={videoModalModeOn}
            saveRecording={saveVideoRecording}
        /> 
        </SiteFunctionalityGroup>
        <SiteFunctionalityGroup group={ permission( testGroup, operatorBusinessName, PageObject?.LessonPlan_VideoCallIcon )}> 
        {/* <Roles role={currentUser?.role === role.Tutor }> */}
          <VideoCallIcon 
              name={PageObject?.LessonPlan_VideoCallIcon}
              style={ videoCallIcon() }
              className={ ( session ) ? "lesson-plan-round-button-3" : "lesson-plan-round-button-2" }
              onClick={() => toggleCurrentMeetingSession( selectedLesson )} 
          /> 
        {/* </Roles>   */}
        </SiteFunctionalityGroup>
        </span>
        </div>
      </header>

     </div>
        <div>
        <div className="content">
          <LessonPlanSplitViewComponent 
            session={session}
            currentUser={currentUser}
            classRoomId={classRoomId} 
            roomSize={roomSize} 
            hideMeetingStage={hideMeetingStage}
            meetingId={currentMeetingId}
          />
          </div> 
          { Validations.setErrorMessageContainer() }
      </div>
        </div>
      );
};

const mapDispatch = {
  setLessonInProgressStatus,  
  inviteStudentsToLearningSession,
  saveLesson,
  loadMeetingsByMeetingId,
  toggleTeachBoardOrEditor
};

const mapState = ( state, ownProps )   => {
  return {
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    currentUser: state.users.user,
    lessons: Object.values(state.lessons.lessons),
    lessonStarted: state.lessons.lessonStarted,
    currentTutor: state.classrooms?.currentTutor,
    setVideoCapture: state.streams.setVideoCapture,
    invitees: state.users.invitees,
    onSessionRenewal: state.sessions.autoRenewedPackageSuccess,
    allSessions: Object.values(state?.sessions?.sessions),
    selectedCourseFromLessonPlanCourseDropDown: state.courses.selectedCourseFromLessonPlanCourseDropDown,
    selectedLessonFromLessonPlanDropDown: state.lessons.selectedLessonFromLessonPlanDropDown
  };
};

export default connect(mapState, mapDispatch )(LessonPlan);

