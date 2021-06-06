import 
React, { 
useState, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import{
loadMeetings, 
loadMeetingsByMeetingId,
saveMeeting } from 'Services/course/Actions/Meetings';

import{
incrementSessionCount } from 'Services/course/Actions/Sessions';

import{
toggleTeachBoardOrEditor,   
setLessonInProgressStatus } from 'Services/course/Actions/Lessons';

import{
loadUsers,
lastLoggedInUser,
updateUserInvitationUrl, 
inviteStudentsToLearningSession } from 'Services/course/Actions/Users';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId } from 'Services/course/Selectors';

import { 
meetingConfigSettings, 
getUrls } from  './helpers';

import { 
getMeetings } from  'Services/course/Pages/Meeting/helpers';

import { 
Validations } from  'Services/course/helpers/Validations';

import { 
Rnd } from 'react-rnd';

import { 
Redirect, 
navigate } from '@reach/router';

import { 
navContent } from  'Services/course/Pages/Components/NavigationHelper';
  
import MainMenu from '../../Components/MainMenu';
import NavLinks  from '../../Components/NavLinks';
import LessonPlanIframeComponent from 'Services/course/Pages/Lessons/LessonPlan/Components/LessonPlanIframeComponent';
import VideoPage from 'Services/course/Pages/VideoPage';
import Meeting from '../../Meeting';
import './style.css';

const LessonPlan = ({ 
operatorBusinessName,
operator,  
courseId,
classRoomGroupId,
classRoomGroupName,
classRoomId,
classRoomName,  
lessonId, 
lessonTitle,
lessons,
selectedCourseTutor,
classRoomLessonPlan,
users,
currentUser,
boardOrEditor,
toggleTeachBoardOrEditor,
lastLoggedInUser,
studentsSubscribedToThisCourse,
loadMeetings,
loadMeetingsByMeetingId,
paidSessions,
courses,
incrementSessionCount,
updateUserInvitationUrl,
saveMeeting,
currentMeetings }) => {
const urls = getUrls(currentUser, courseId, lessonId, lessonTitle);
const editorUrl = urls.editor.dev;
const canvasUrl = urls.canvas.dev;   
const fullScreenSize = "1536px";

const [ hideMeetingStage, setHideMeetingStage ] = useState(false);
const [ fullMeetingStage, setFullMeetingStage ] = useState(false);
const [ videoModalModeOn,  setVideoModalMode ] = useState(false);
const [ session, setSession] = useState( false );  
const paidSession = paidSessions?.filter(session => session?.courseId === courseId)?.find( currentSession => currentSession?.userId === currentUser?._id );
const lesson = classRoomLessonPlan[classRoomId]?.selectedLesson; 
const currentCourse = courses?.find(course => course?._id === courseId)?.name;

useEffect(()=>{
  loadUsers();
  loadMeetings();
}, [ fullMeetingStage, hideMeetingStage, loadMeetings  ]);

handleRedirectionsOnPageLoad();

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
      let selectedTutor = users?.find(usr => usr?._id === classRoomId );

      handleMeetings(currentMeetings, selectedTutor, currentUser);
  }
  else{
      setSession(true);
      setHideMeetingStage(false);
      loadMeetingsByMeetingId(currentUser?._id);
  };
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

function handleRedirectionsOnPageLoad(){
  if ( ! currentUser?.userIsValidated ) {  
      navigate(`/${operatorBusinessName}/LessonPlan/invite/userverification/classRoom/${classRoomId}`); 
  } 

  if ( paidSession?.numberOfSessions === session?.totalNumberOfSessions  && session?.typeOfSession === "Package" && currentUser?.role === "Student" ) { 
    return <Redirect to={`/${operatorBusinessName}/mycourses`} noThrow />;
  }
}

function handleMeetings( meetings, tutor, currentUser ){
  try {
    let setInvitationUrl = "", nameOfLessonInProgress = "", lessonInProgress = false;

    loadMeetings();
    let meeting = getMeetings(meetings, tutor);

    if ( meeting ) {
        meeting.invitees.forEach( user => {
          user[ 'timeMeetingEnded' ] =  Date.now();
          incrementSessionCount( meeting?.sessions?.find(session => session?.userId === user?._id ) ); 
          updateUserInvitationUrl(user, setInvitationUrl, nameOfLessonInProgress, lessonInProgress);   
        });
    }
    saveMeeting(tutor?.meetingId, { ...meeting, timeEnded: Date.now() });
    lastLoggedInUser(currentUser);
  } catch (error) {
    console.log( error );
  }
}

const meetingSettings = meetingConfigSettings(currentCourse, lessonTitle);
const meetingStyleContainer = ( fullMeetingStage ) ? 'meeting-full' :  ( hideMeetingStage ) ? 'meeting-hide' : `meeting`; 
let navigationContent = navContent( currentUser, operatorBusinessName, currentUser?.role,  "Student" ).users;   
  
return (
      <div className="LessonPlan" onDoubleClick={hidePopUpWindow}>  
            <header> 
                <MainMenu 
                  navContent={navigationContent}
                />
                  <h1>
                    <NavLinks to={`/${operatorBusinessName}/classroomgroups/${classRoomGroupId}/${classRoomGroupName}/classroom/${classRoomId}`}> {classRoomName}   </NavLinks>
                  </h1>
                  <div className="lesson-item"> 
                      <span className="span-btns">  
                          {/* images / gif */}
                            <button className="plan-lesson-btn" onClick={toggleTeach}> { session ? 'End' : 'Start Video' } </button>
                            <button className={ `toggle-stage-btns${fullMeetingStage ? "-hide" : "-show"}` } onClick={toggleTeachBoardOrEditor}> { boardOrEditor ? 'Board' : 'Editor' } </button>         
                            <button className={`toggle-stage-btns${(session) ? (fullMeetingStage) ?  "-show" : "-show" : "-hide" }`}  onClick={showFullMeetingStage}> { ( session && fullMeetingStage) ? "Hide Room"  :  "Show Room"  } </button> 
                            <VideoPage 
                                buttonClassName={`toggle-stage-btns${( session ) ? "-show" : "-hide"}`} 
                                recordStream={session}
                                enableScreenShare={true} 
                                enableCameraStream={false}
                                resetAllStartSettings={ resetAllStartSettings }  
                                resetAllStopSettings={ resetAllStopSettings }   
                                setVideoModalMode={stage => setVideoModalMode(stage) }
                                objectId={lesson?._id} 
                                videoMetaData={lesson}
                                videoMetaDataExternalId={"courseId"}
                                videoNamePrefix={"LessonVideo"}
                            />
                        </span>
                  </div>
          </header>
            <div className="content">    
            <div> 
              <div className={ meetingStyleContainer }>   
                  <Rnd>                 
                      <div>
                      { ( session  ) 
                          ? <Meeting
                              userName={currentUser?.firstname}   
                              roomName={meetingSettings.roomName}
                              containerWidth={( fullMeetingStage ) 
                                ? meetingSettings.fullScreen.meetingContainerStyle.containerWidth 
                                : meetingSettings.popOutScreen.meetingContainerStyle.containerWidth}
                              containerHeight={( fullMeetingStage ) 
                                ? meetingSettings.fullScreen.meetingContainerStyle.containerHeight 
                                : meetingSettings.popOutScreen.meetingContainerStyle.containerHeight}   
                            />
                          : <div> </div>          
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
  toggleTeachBoardOrEditor, 
  updateUserInvitationUrl, 
  setLessonInProgressStatus,  
  inviteStudentsToLearningSession, 
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
    onSessionRenewal: state.sessions.autoRenewedPackageSuccess
};
};

export default connect(mapState, mapDispatch )(LessonPlan);