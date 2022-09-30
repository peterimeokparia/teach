import { connect } from 'react-redux';
import { saveLesson, setLessonInProgressStatus } from 'services/course/actions/lessons';
import { inviteStudentsToLearningSession } from 'services/course/actions/users';
import { SET_NOTES_MARKDOWN } from 'services/course/actions/notes';
import { loadMeetingsByMeetingId } from 'services/course/actions/meetings';
import { permission, SiteFunctionalityGroup } from 'services/course/pages/components/SiteFunctionalityGroup'; // refactor 
import { editor_upload_url, handleChange } from 'services/course/pages/OnlineQuestionsPage/helpers';
import { saveEditorMarkDownObjectToMw } from 'services/course/actions/editor'; 
import { setInSession, setHideMeetingStage, setFullMeetingStage, setVideoModalMode, setIconOnColor } from 'services/course/actions/sessions'; 
import { videoMeta } from 'services/course/pages/Lessons/LessonPlan/inlineStyles.js';
import { adjustRoomSize } from 'services/course/pages/Lessons/LessonPlan/helpers';
import { mapDispatch, mapState } from 'services/course/pages/Lessons/LessonPlan/connectors';
import { PageObject, testGroup } from 'services/course/pages/Lessons/LessonPlan/permissions'; // refactor move to db
import EditorComponent from 'services/course/pages/components/EditorComponent';
import useNoteSelectionHook from 'services/course/pages/Lessons/hooks/useNoteSelectionHook'; 
import useLessonSelectionHook from 'services/course/pages/Lessons/hooks/useLessonSelectionHook'; 
import useTeachMeetingSettingsHook  from 'services/course/pages/Lessons/hooks/useTeachMeetingSettingsHook';
import useEndMeetingHook  from 'services/course/pages/Lessons/hooks/useEndMeetingHook';
import MaterialUiRecorderComponent from 'services/course/pages/components/MaterialUiRecorderComponent';
import NavLinks  from 'services/course/pages/components/NavLinks';
import BoardEditorComponent from 'services/course/pages/Lessons/LessonPlan/components/BoardEditorComponent';
import Meeting from 'services/course/pages/Meeting';
import './style.css';

const LessonPlan = ({ 
  operatorBusinessName,
  operator,  
  courseId,
  lessonId,
  meetingId,
  meetingEndingPromo,
  classRoomId,
  courses,  
  lessons,
  lessonNotes,
  note,
  saveLesson,
  eventId,
  lesson,
  currentUser,
  selectedCourseFromLessonPlanCourseDropDown,
  selectedLessonFromLessonPlanDropDown,
  loadMeetingsByMeetingId,
  saveEditorMarkDownObjectToMw,
  hideMeetingStage, 
  fullMeetingStage, 
  videoModalModeOn, 
  inSession, 
  iconOnColor, 
  meetingPanel,
  setVideoModalMode, 
  setIconOnColor }) => {
  let useLessonSelectionProps = {
    operatorBusinessName, currentUser, selectedCourseFromLessonPlanCourseDropDown, selectedLessonFromLessonPlanDropDown, 
    courses, lessons, courseId, lessonId, classRoomId, lessonNotes, note, meetingId, loadMeetingsByMeetingId, hideMeetingStage, 
    fullMeetingStage, videoModalModeOn, inSession, iconOnColor, meetingPanel
  };

  let {
    selectedCourse, selectedLesson,
  } = useLessonSelectionHook( useLessonSelectionProps );

  let {
    selectedNote, toggleDisplayedNotes, noteDetailPageLink, noteTitle
  } = useNoteSelectionHook( {...useLessonSelectionProps, selectedLesson } );
                       
  let {
    roomSize, toggleTeach, resetAllStartSettings, resetAllStopSettings,
  } = useTeachMeetingSettingsHook({...useLessonSelectionProps, selectedCourse, selectedLesson });

  useEndMeetingHook( meetingEndingPromo, classRoomId );

function saveVideoRecording( element ){
  saveLesson( element );
};

function toggleCurrentMeetingSession(){ 
  toggleTeach();
  setIconOnColor( !iconOnColor );
};
return (
    <div className="MeetingPlan"> 
     <div className={operatorBusinessName}>
     <header> 
        <h1>
          <div></div>
         <div title={lesson?._id} className="lessonMultiColor">{ selectedLesson?.title } </div>        
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
                        { ( inSession  ) && 
                            <Meeting
                              userName={currentUser?.firstname}   
                              roomName={ classRoomId ? classRoomId : selectedLesson?.userId } 
                              resizedHeight={"900px"}
                              resizedWidth={"480px"}
                              containerWidth={"100%"}  
                              containerHeight={adjustRoomSize( roomSize )?.meetingRoomHeight}
                              // containerWidth={adjustRoomSize( roomSize )?.meetingRoomWidth}  
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
                        whiteBoardLessonId={selectedLesson?._id}
                        eventId={eventId}
                        courseId={courseId}
                        lessonId={selectedLesson?._id}
                        lesson={selectedLesson}
                        classRoomId={classRoomId}
                        operatorBusinessName={operatorBusinessName}
                        saveIconVisible={true}
                      />
                    </div>
                  </SiteFunctionalityGroup>
              </div>
              {/* <Roles role={currentUser?.role === role.Student }> */}
              <div class="col col-lg-2"> 
              <div className="sidebarTwoHeader">
              <div onClick={toggleDisplayedNotes}>   
                { <label>
                    <NavLinks to={noteDetailPageLink}>
                        <label className="navLink"><h3>{noteTitle}</h3></label>
                    </NavLinks> 
                  </label>     
                }
                {
                  <div> <label className="title-date">
                    <h5>{`${new Date().toLocaleString()}` }</h5>
                  </label></div>   
                }
              </div>        
              </div>
              <div className="sidebarTwo">  
                  <div className="children-subsection">
                    <div className="notes-title">
                    </div>
                    <br></br> <br></br>
                     <EditorComponent  
                        upload_url={editor_upload_url} 
                        handleChange={(editor) => handleChange({ ...selectedNote, markDownContent: editor }, SET_NOTES_MARKDOWN, `/notes/`, saveEditorMarkDownObjectToMw )}
                        content={ selectedNote?.markDownContent }
                     /> 
                </div>
                
              </div>
              </div>
              {/* </Roles> */}
              <div className="sidebarTwoHeader"/>
          </div>
        </div>
      </div>
      </div>
      );
};

export default connect(mapState, mapDispatch )(LessonPlan);

