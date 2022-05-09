import { 
connect } from 'react-redux';

import{
saveLesson,
setLessonInProgressStatus,
toggleTeachBoardOrEditor } from 'services/course/actions/lessons';

import {
LESSONNOTES, 
STUDENTNOTES } from 'services/course/actions/notes';

import{
inviteStudentsToLearningSession } from 'services/course/actions/users';

import { 
getEventByEventId,  
getStudentsLessonUserNotesByLessonId,
getLessonByLessonIdSelector,
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId } from 'services/course/selectors';

import {
addNotes,
loadAllNotes,
saveNotes,
SET_NOTES_MARKDOWN } from 'services/course/actions/notes';

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
editor_upload_url,
handleChange } from 'services/course/pages/OnlineQuestionsPage/helpers';

import { 
saveEditorMarkDownObjectToMw } from 'services/course/actions/editor'; 

import BoardEditorComponent from 'services/course/pages/Lessons/LessonPlan/components/BoardEditorComponent';
import Meeting from 'services/course/pages/Meeting';
  
import {
iconStyleMain,
videoCallIcon,
//adjustRoomIcon,
videoMeta } from 'services/course/pages/Lessons/LessonPlan/inlineStyles.js';

import { 
adjustRoomSize } from 'services/course/pages/Lessons/LessonPlan/helpers';

import EditorComponent from 'services/course/pages/components/EditorComponent';
import Roles from 'services/course/pages/components/Roles';
import useLessonSelectionHook from 'services/course/pages/Lessons/hooks/useLessonSelectionHook'; 
import useTeachMeetingSettingsHook  from 'services/course/pages/Lessons/hooks/useTeachMeetingSettingsHook';
import useEndMeetingHook  from 'services/course/pages/Lessons/hooks/useEndMeetingHook';
import MaterialUiRecorderComponent from 'services/course/pages/components/MaterialUiRecorderComponent';
import NavLinks  from 'services/course/pages/components/NavLinks';
import './style.css';

const LessonPlan = ({ 
  operatorBusinessName,
  operator,  
  courseId,
  lessonId,
  currentTutor,
  meetingId,
  meetingEndingPromo,
  classRoomGroupId,
  classRoomGroupName,
  classRoomId,
  classRoomName,
  courses,  
  lessons,
  note,
  saveLesson,
  eventId,
  lesson,
  user,
  users,
  currentUser,
  selectedCourseFromLessonPlanCourseDropDown,
  selectedLessonFromLessonPlanDropDown,
  loadMeetingsByMeetingId,
  toggleTeachBoardOrEditor,
  saveEditorMarkDownObjectToMw }) => {

  let useLessonSelectionProps = {
    selectedCourseFromLessonPlanCourseDropDown, 
    selectedLessonFromLessonPlanDropDown, 
    courses, 
    lessons, 
    courseId, 
    lessonId
  };

  let {
    selectedCourse,
    selectedLesson
  } = useLessonSelectionHook( useLessonSelectionProps );
                       
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
    iconOnColor,
    setIconOnColor,
  } = useTeachMeetingSettingsHook( useTeachMeetingProps );

  useEndMeetingHook( meetingEndingPromo, classRoomId );

  let videoProps = {
    element: selectedLesson,
    videoMeta: videoMeta( selectedLesson ),
    resetAllStartSettings,
    resetAllStopSettings,
    VideoModalMode: videoModalModeOn,
    saveVideoRecording
  };

  function saveVideoRecording( element ){
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
  setIconOnColor( !iconOnColor )
};

const PageObject = {
  LessonPlan_MaterialUiVideoComponent: 'LessonPlan_MaterialUiVideoComponent',
  LessonPlan_VideoCallIcon: 'LessonPlan_VideoCallIcon'
};

let testGroup = [ // refactor create groups, permissions etc
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
        <div className="div-btns"/>
        <span className="span-btns">  
        <SiteFunctionalityGroup group={ permission( testGroup, operatorBusinessName, PageObject?.LessonPlan_MaterialUiVideoComponent )}>
        < MaterialUiRecorderComponent 
            name={PageObject?.LessonPlan_MaterialUiVideoComponent}
            className={"MaterialUiVideoComponent"} 
            element={ selectedLesson } 
            hasRights={true}
            videoMeta={videoMeta( selectedLesson )}
            resetAllStartSettings={resetAllStartSettings}
            resetAllStopSettings={resetAllStopSettings}
            setVideoModalMode={(stage) => setVideoModalMode(stage)}
            VideoModalMode={videoModalModeOn}
            eventId={eventId}
            lessonId={selectedLesson?._id}
            saveVideoRecording={saveVideoRecording}
            toggleCurrentMeetingSession={toggleCurrentMeetingSession}
        /> 
        </SiteFunctionalityGroup>
        </span>
        </div>
      </header>
        <div class="container">
          <div class="row justify-content-md-center">
              <div class="col col-lg-2">
                <SiteFunctionalityGroup group={ permission( testGroup, operatorBusinessName, PageObject?.LessonPlan_VideoCallIcon )}> 
                    <div className="sidebarThree">
                      <div className={adjustRoomSize( roomSize ).containerStyle}>   
                        <div className={`meeting-stage-${(hideMeetingStage) ? 'hidden' : 'visible'}`}>
                        { ( session  ) && 
                            <Meeting
                              userName={currentUser?.firstname}   
                              roomName={selectedLesson?._id}
                              resizedHeight={"900px"}
                              containerHeight={adjustRoomSize( roomSize )?.meetingRoomHeight}
                              containerWidth={adjustRoomSize( roomSize )?.meetingRoomWidth}  
                            /> 
                        }
                        </div>
                      </div> 
                    </div> 
                  </SiteFunctionalityGroup>
              </div>
              <div class="col-md-auto">
                <SiteFunctionalityGroup group={ permission( testGroup, operatorBusinessName, PageObject?.LessonPlan_VideoCallIcon )}> 
                    <div className='splitview'>
                      <BoardEditorComponent 
                          meetingId={meetingId}
                          whiteBoardLessonId={lessonId}
                          eventId={eventId}
                          courseId={courseId}
                          lessonId={lessonId}
                          classRoomId={classRoomId}
                          operatorBusinessName={operatorBusinessName}
                          saveIconVisible={true}
                      />
                    </div>
                  </SiteFunctionalityGroup>
              </div>
              <Roles role={currentUser?.role === role.Student }>
              <div class="col col-lg-2"> 
              <div className="sidebarTwo">   
                <div>   
                  { <label>
                      <NavLinks to={`/${operatorBusinessName}/notes/${note?._id}/noteType/${STUDENTNOTES}/course/${courseId}/lesson/${lessonId}/user/${currentUser?._id}`}> 
                          <label className="navLink"><h3>{selectedLesson?.title}</h3></label>
                      </NavLinks> 
                    </label>     
                  }
                  </div> 
                  <div className="children-subsection">
                    <div className="notes-title">
                        <label className="title-date">
                            <h5>{`${new Date().toLocaleString()}` }</h5>
                        </label>
                    </div>
                    <br></br> <br></br>
                     <EditorComponent  
                        upload_url={editor_upload_url} 
                        handleChange={(editor) => handleChange({ ...note, markDownContent: editor }, SET_NOTES_MARKDOWN, `/notes/`, saveEditorMarkDownObjectToMw )}
                        content={ note?.markDownContent }
                     /> 
                </div>
              </div>
              </div>
              </Roles>
          </div>
        </div>
      </div>
      </div>
      );
};

const mapDispatch = {
  setLessonInProgressStatus,  
  inviteStudentsToLearningSession,
  saveLesson,
  loadMeetingsByMeetingId,
  toggleTeachBoardOrEditor,
  saveEditorMarkDownObjectToMw
};

const mapState = ( state, ownProps )   => {
  return {
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    currentUser: state.users.user,
    courses: Object.values(state.lessons.lessons),
    lessons: Object.values(state.lessons.lessons),
    lessonStarted: state.lessons.lessonStarted,
    currentTutor: state.classrooms?.currentTutor,
    setVideoCapture: state.streams.setVideoCapture,
    invitees: state.users.invitees,
    onSessionRenewal: state.sessions.autoRenewedPackageSuccess,
    allSessions: Object.values(state?.sessions?.sessions),
    selectedCourseFromLessonPlanCourseDropDown: state.courses.selectedCourseFromLessonPlanCourseDropDown,
    selectedLessonFromLessonPlanDropDown: state.lessons.selectedLessonFromLessonPlanDropDown,
    user: state?.users?.user,
    note: getStudentsLessonUserNotesByLessonId(state, ownProps),
    event: getEventByEventId(state, ownProps),
    lesson: getLessonByLessonIdSelector( state, ownProps )
  };
};

export default connect(mapState, mapDispatch )(LessonPlan);

