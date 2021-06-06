import 
React, { 
useState, 
useEffect,
useRef } from 'react';

import { 
connect } from 'react-redux';

import{
loadMeetings, 
loadMeetingsByMeetingId,
saveMeeting } from 'Services/course/Actions/Meetings';

import{
incrementSessionCount } from 'Services/course/Actions/Sessions';

import{
loadLessons,  
toggleTeachBoardOrEditor,   
setLessonInProgressStatus } from 'Services/course/Actions/Lessons';

import{
loadUsers,
lastLoggedInUser,
updateUserInvitationUrl, 
inviteStudentsToLearningSession } from 'Services/course/Actions/Users';

import { 
getSelectedOnlineAnswersByCourseId,  
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
//getCoursesByOperatorId 
} from 'Services/course/Selectors';

import { 
meetingConfigSettings, 
getUrls } from  'Services/course/Pages/Lessons/LessonPlan/helpers';

import { 
Validations } from 'Services/course/helpers/Validations';

import { 
Rnd } from 'react-rnd';

import { 
navContent } from 'Services/course/Pages/Components/NavigationHelper';
  
import MainMenu from 'Services/course/Pages/Components/MainMenu';
import NavLinks  from 'Services/course/Pages/Components/NavLinks';
import LessonPlanIframeComponent from 'Services/course/Pages/Lessons/LessonPlan/Components/LessonPlanIframeComponent';
import CameraComponent from 'Services/course/Pages/TestPOCPage/CameraComponent';
import TestVideoPage2 from 'Services/course/Pages/TestPOCPage/TestVideoPage2';
import './style.css';

const TestPocPage = ({  //set config value for props
operatorBusinessName,
operator,  
courseId, 
answerId,
lessonId,
questionId,
classRoomGroupId,
classRoomGroupName,
classRoomId,
classRoomName,  
lessonTitle,
lessons,
onlineAnswers,
onlineAnswerId,
selectedCourseTutor,
classRoomLessonPlan,
users,
currentUser,
boardOrEditor,
toggleTeachBoardOrEditor,
loadUsers,
loadMeetings,
loadLessons,
courses  }) => {
const urls = getUrls(currentUser, courseId, lessonId, lessonTitle);
const editorUrl = urls.editor.dev;
const canvasUrl = urls.canvas.dev;   
const fullScreenSize = "1536px";

const [ hideMeetingStage, setHideMeetingStage ] = useState(false);
const [ fullMeetingStage, setFullMeetingStage ] = useState(false);
const [ videoModalModeOn,  setVideoModalMode ] = useState(false);
const [ videoModalModeOn2,  setVideoModalMode2 ] = useState(false);
const [ session, setSession ] = useState( false );  
let onlineAnswer = useRef( onlineAnswers?.find( answer => answer?._id === answerId ) ); 
// let onlineAnswer = onlineAnswers?.find( answer => answer?._id === answerId ); 

  useEffect(()=>{
    loadLessons(courseId);
    loadUsers();
    loadMeetings();

    if ( onlineAnswers.length > 0 ) {
      onlineAnswer['current'] = onlineAnswers?.find( answer => answer?._id === answerId ); 
    }
  // }, [ fullMeetingStage, hideMeetingStage, loadMeetings, loadUsers ]);
  }, [ fullMeetingStage, hideMeetingStage, loadMeetings, loadUsers,   loadLessons, answerId, courseId, onlineAnswers  ]);

  const toggleTeach = () => {
    if ( session ) {
        if ( videoModalModeOn ){
          Validations.warn( 'Recording In Progress. To end this teaching session, please stop the recording.' );
          return;
        }
        if ( fullMeetingStage ){
          setFullMeetingStage(false); 
        }
        setSession(false);
        setHideMeetingStage(false);
        loadUsers();
    }
    else{
        setSession(true);
        setHideMeetingStage(false);
        loadUsers();
    }
  };

  const showFullMeetingStage = () => {
    if ( fullMeetingStage ) {
       setFullMeetingStage(false);
       setHideMeetingStage(false);
    }
    else {
      setFullMeetingStage(true);
      setHideMeetingStage(true);
    } 
  };

  const resetAllStartSettings = () => {
    if ( hideMeetingStage ){
       setHideMeetingStage(false);
    }
  };

  const resetAllStopSettings = () => {
    if ( videoModalModeOn ){
      setVideoModalMode(false);
    }
  };

  const hidePopUpWindow = () => {
    if ( ! hideMeetingStage ) {
      setHideMeetingStage(true);
    } else {
      setHideMeetingStage(false);
    }
  };

  const meetingSettings = meetingConfigSettings("currentCourse", lessonTitle);
  const meetingStyleContainer = ( fullMeetingStage ) ? 'meeting-full' :  ( hideMeetingStage ) ? 'meeting-hide' : `meeting`; 
  let navigationContent = navContent( currentUser, operatorBusinessName, currentUser?.role,  "Student" ).users;   
    
  return (
        <div className="mediaDisplay" onDoubleClick={hidePopUpWindow}>  
              <header> 
                  <MainMenu 
                    navContent={navigationContent}
                  />
                    <h1>
                      <NavLinks to={`/${operatorBusinessName}/classroomgroups/${classRoomGroupId}/${classRoomGroupName}/classroom/${classRoomId}`}> {classRoomName}   </NavLinks>
                    </h1>
                    <div className="mediaDisplay-item"> 
                        <span className="span-btns">  
                            {/* images / gif */}
                              <button className="plan-lesson-btn" onClick={toggleTeach}> { session ? 'End Session' : 'Start Session' } </button>
                              <button className={ `toggle-stage-btns${fullMeetingStage ? "-hide" : "-show"}` } onClick={toggleTeachBoardOrEditor}> { boardOrEditor ? 'Board' : 'Editor' } </button>         
                              <button className={`toggle-stage-btns${(session) ? (fullMeetingStage) ?  "-show" : "-show" : "-hide" }`}  onClick={showFullMeetingStage}> { ( session && fullMeetingStage) ? "Hide Room"  :  "Show Room"  } </button> 
                          </span>
                    </div>
            </header>
             <div className="content">    
             <div> 
                <div className={ meetingStyleContainer }>   
                    <Rnd>                 
                        <div>
                          {
                            <CameraComponent 
                                buttonClassName={`toggle-stage-btns${( session ) ? "-show" : "-hide"}`} 
                                recordStream={session}
                                startCameraCapture={videoModalModeOn}
                                enableScreenShare={true} 
                                enableCameraStream={false}
                                resetAllStartSettings={ resetAllStartSettings }  
                                resetAllStopSettings={ resetAllStopSettings }   
                                setVideoModalMode={stage => setVideoModalMode2(stage) }
                                videoModalModeOn={videoModalModeOn}
                                objectId={onlineAnswer?._id} 
                                videoMetaData={onlineAnswer}
                                videoMetaDataExternalId={"name"}
                                videoNamePrefix={"OnlineAnswerVideoMarkDownEditorsRecordedBoard"}
                                height={( fullMeetingStage ) 
                                        ? meetingSettings.fullScreen.meetingContainerStyle.containerHeight 
                                        : meetingSettings.popOutScreen.meetingContainerStyle.containerHeight}  
                                width={( fullMeetingStage ) 
                                      ? meetingSettings.fullScreen.meetingContainerStyle.containerWidth 
                                      : meetingSettings.popOutScreen.meetingContainerStyle.containerWidth}
                            />
                          }
                       
                          { ( session  ) &&
                              <TestVideoPage2 
                                 buttonClassName={`toggle-stage-btns${( session ) ? "-show" : "-hide"}`} 
                                 hasCameraStarted={videoModalModeOn2}
                                 recordStream={session}
                                 enableScreenShare={true} 
                                 enableCameraStream={false}
                                 resetAllStartSettings={ resetAllStartSettings }  
                                 resetAllStopSettings={ resetAllStopSettings }   
                                 setVideoModalMode={stage => setVideoModalMode(stage) }
                                 videoModalModeOn={videoModalModeOn2}
                                 objectId={onlineAnswer?._id} 
                                 videoMetaData={onlineAnswer}
                                 videoMetaDataExternalId={"name"}
                                 videoNamePrefix={"OnlineAnswerVideoMarkDownEditorsRecordedBoard"}
                                 height={( fullMeetingStage ) 
                                         ? meetingSettings.fullScreen.meetingContainerStyle.containerHeight 
                                         : meetingSettings.popOutScreen.meetingContainerStyle.containerHeight}  
                                 width={( fullMeetingStage ) 
                                       ? meetingSettings.fullScreen.meetingContainerStyle.containerWidth 
                                       : meetingSettings.popOutScreen.meetingContainerStyle.containerWidth}
                                 />
                          }
                      
                        </div>
                    </Rnd> 
               </div> 
              <div className={ fullMeetingStage ? `tools-hide` : `tools`    }> 
               {boardOrEditor ? <div className={`editor${hideMeetingStage}-show`}> 
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
                              :   <div className={`canvas${hideMeetingStage}-show`}> 
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
                      {Validations.setErrorMessageContainer()}
                </div>
          </div>
        );
};

const mapDispatch = {
  loadLessons,
  toggleTeachBoardOrEditor, 
  updateUserInvitationUrl, 
  setLessonInProgressStatus,  
  inviteStudentsToLearningSession,
  loadUsers, 
  loadMeetings, 
  loadMeetingsByMeetingId,
  saveMeeting, 
  incrementSessionCount,
  lastLoggedInUser
};

const mapState = ( state, ownProps )   => {
  return {
    selectedCourseTutor: state.courses.courseTutor,
    classRoomLessonPlan: state.classrooms.classRoomLessonPlan,
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    // courses: getCoursesByOperatorId(state, ownProps),
    currentUser: state.users.user,
    onlineAnswers: getSelectedOnlineAnswersByCourseId(state, ownProps),
    lessons: Object.values(state.lessons.lessons),
    lessonStarted: state.lessons.lessonStarted,
    boardOrEditor: state.lessons.toggleTeachBoardOrEditor,
    setVideoCapture: state.streams.setVideoCapture,
    invitees: state.users.invitees,
    studentsSubscribedToThisCourse : Object.values(state?.users?.users)?.filter(user => user?.role === "Student" && user?.courses?.includes(ownProps?.courseId)),
    currentMeetings: state.meetings.meetings,
    paidSessions: Object.values(state?.sessions?.sessions),
    onSessionRenewal: state.sessions.autoRenewedPackageSuccess
};
};

export default connect(mapState, mapDispatch )(TestPocPage);