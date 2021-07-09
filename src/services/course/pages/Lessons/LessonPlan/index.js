import { 
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
saveLesson,
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
getUrls } from  'Services/course/Pages/Lessons/LessonPlan/helpers';

import {
getLessonPlanUrls } from 'Services/course/Pages/ClassRoomPage/helpers';

import { 
meetingConfigSettings } from  'Services/course/Pages/Lessons/LessonPlan/helpers';

import {
updateMeetingStatus } from 'Services/course/Pages/Meeting/helpers';
  
import {
role } from 'Services/course/helpers/PageHelpers';

import { 
Validations } from 'Services/course/helpers/Validations';

import { 
Redirect, 
navigate } from '@reach/router';
  
import {
toggleVideoModalMode } from 'Services/course/Actions/Video';

import { 
navContent } from 'Services/course/Pages/Components/NavigationHelper';

import {
videoCallIconMain,
videoCallIcon,
adjustRoomIcon,
shareScreenIcon,
exitVideoCallIcon,  
onlineQuestionVideoDeleteIconStyle,
iconStyleMain,
videoMeta } from 'Services/course/Pages/Lessons/LessonPlan/inlineStyles.js';

import { 
Rnd } from 'react-rnd';

import LessonPlanIframeComponent  from 'Services/course/Pages/Components/LessonPlanIframeComponent';
import Meeting from 'Services/course/Pages/Meeting';
import MaterialUiVideoComponent from 'Services/course/Pages/Components/MaterialUiVideoComponent';
import MainMenu from 'Services/course/Pages/Components/MainMenu';
import NavLinks  from 'Services/course/Pages/Components/NavLinks';
import NotesIcon from '@material-ui/icons/Notes';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AdjustIcon from '@material-ui/icons/Adjust';
import NoteAddTwoToneIcon from '@material-ui/icons/NoteAddTwoTone';
import Swal from 'sweetalert2';
import BoardEditorDisplay from 'Services/course/Pages/Lessons/LessonPlan/Components/BoardEditorDisplay';
import DraggableMeetingComponent from 'Services/course/Pages/Lessons/LessonPlan/Components/DraggableMeetingComponent';
import VideoPage from 'Services/course/Pages/VideoPage';
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
  paidSessions,
  courses,
  incrementSessionCount,
  updateUserInvitationUrl,
  saveMeeting,
  selectedCourseFromLessonPlanCourseDropDown,
  selectedLessonFromLessonPlanDropDown,
  currentMeetings }) => {
  const fullScreenSize = "1536px";
  const [ hideMeetingStage, setHideMeetingStage ] = useState(false);
  const [ fullMeetingStage, setFullMeetingStage ] = useState(false);
  const [ videoModalModeOn,  setVideoModalMode ] = useState(false);
  const [ session, setSession] = useState( false );  
  let [ roomSize, setRoomSize] = useState(1);  
  const [ selectedTutor, setSelectedTutor ] = useState( undefined );  
  const paidSession = paidSessions?.filter(session => session?.courseId === courseId)?.find( currentSession => currentSession?.userId === currentUser?._id );
  const lesson = selectedLessonFromLessonPlanDropDown; 
  const course = selectedCourseFromLessonPlanCourseDropDown;
  // const meetingSettings = meetingConfigSettings( course?.name, lesson?.title );;
  // const meetingStyleContainer = ( fullMeetingStage ) ? 'meeting-full' :  ( hideMeetingStage ) ? 'meeting-hide' : `meeting`;
  const urls = getUrls(currentUser, courseId, lesson?._id, lesson?.title)
  const editorUrl = urls.editor.dev;
  const canvasUrl = urls.canvas.dev; 

  useEffect(() => {
    loadUsers();
    loadMeetings();
  }, [ loadMeetings, loadUsers   ]);

handleRedirectionsOnPageLoad();

const toggleTeach = () => {
  
  let tutor =  users?.find(usr => usr?._id === classRoomId );

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
    loadMeetings();
    handleMeetings(  tutor, currentUser  );
    setSelectedTutor( tutor );
  }
  
  else{
    setSession(true);
    setHideMeetingStage(false);
    loadUsers();
    loadMeetingsByMeetingId(tutor?.meetingId);
  }
};

const toggleRoomSize = () => {
  if ( roomSize === 2) {
    roomSize = 0;
  }
  let newSize = roomSize;

  newSize += 1;
  alert(newSize);
  setRoomSize( newSize );
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

const saveVideoRecording = ( element ) => {
  alert('videoRecording')
  alert(JSON.stringify(element?.videoUrl))
  saveLesson( element );
};

function handleRedirectionsOnPageLoad(){
  if ( currentUser && !currentUser?.userIsValidated ) {  
      navigate(`/${operatorBusinessName}/LessonPlan/invite/userverification/classRoom/${classRoomId}`); 
  } 
  if ( paidSession?.numberOfSessions === session?.totalNumberOfSessions  && session?.typeOfSession === "Package" && currentUser?.role === "Student" ) { 
    return <Redirect to={`/${operatorBusinessName}/mycourses`} noThrow />;
  }
};

function handleMeetings( tutor, user ){
  let usersWhoJoinedTheMeeting = [];

  try {
    loadMeetingsByMeetingId( tutor?.meetingId )
    .then(meeting => {
      updateMeetingStatus(user, lastLoggedInUser );
        if ( user?.role === role.Tutor ) {
          incrementSessionCountForMeetingUsers( meeting, usersWhoJoinedTheMeeting );
          saveMeeting(tutor?.meetingId, { ...meeting, timeEnded: Date.now(), 
            usersWhoJoinedTheMeeting: ( meeting.usersWhoJoinedTheMeeting === undefined )
              ? usersWhoJoinedTheMeeting
              : (meeting?.usersWhoJoinedTheMeeting.includes(currentUser?._id) 
                  ? [ ...meeting?.usersWhoJoinedTheMeeting, ...usersWhoJoinedTheMeeting ] 
                  : [ ...meeting?.usersWhoJoinedTheMeeting, currentUser?._id, ...usersWhoJoinedTheMeeting ]) 
          }
          );
        }
      })
      .catch( error => {
        throw Error(`handleMeetings: loadMeetingsByMeetingId: ${error}`);
    });  
  } catch (error) {
        console.error( error );
        throw Error(`handleMeetings: loadMeetingsByMeetingId: ${error}`);
    }
};

function incrementSessionCountForMeetingUsers( meeting, usersWhoJoinedTheMeeting ){
  let setInvitationUrl = "", nameOfLessonInProgress = "", lessonInProgress = false, meetingId = "";

  if ( meeting && currentUser?.role === role.Tutor ) { 
    currentUser = currentUser = { ...currentUser, timeMeetingEnded: Date.now() , setInvitationUrl, nameOfLessonInProgress, lessonInProgress, meetingId };
    updateUserInvitationUrl( currentUser, setInvitationUrl, nameOfLessonInProgress, lessonInProgress, meetingId);  
    meeting?.invitees?.forEach( user => {
      let session = meeting?.sessions?.find(session => session?.userId === user?._id );

      verifyMeetingStatusBeforeIncrementingSessionCount( session, user, usersWhoJoinedTheMeeting )
      updateUserInvitationUrl(user, setInvitationUrl, nameOfLessonInProgress, lessonInProgress, meetingId);  
    });
  }
};

function handleIncrementingSessionCountForMeetingInvitees( session ){
  if ( session ) {
    incrementSessionCount( session );
  }
};

function verifyMeetingStatusBeforeIncrementingSessionCount( session, invitee, usersWhoJoinedTheMeeting ) {
  Swal.fire({
    title: 'Please Verify Meeting Attendees',
    icon: 'warning',
    html:`<div> ${invitee?.firstname}. </div> <div> ${invitee?.email}. </div> <div>Attended ?</div>`,
    showCancelButton: true,
    confirmButtonText: 'Attended',
    confirmButtonColor: '#673ab7',
    cancelButtonText: 'Did not attend'
  }).then( (response) => {
      if ( response?.value ) {
         usersWhoJoinedTheMeeting = [ ...usersWhoJoinedTheMeeting, invitee ];
          handleIncrementingSessionCountForMeetingInvitees( session );
      } 
  });

};

function adjustRoomSize( roomsize ){
  let settings = {}, roomSizeSettings = { 
    settings: ( containerStyle, meetingRoomHeight, meetingRoomWidth ) => { return {
      containerStyle, 
      meetingRoomHeight, 
      meetingRoomWidth
    } } 
  };

  let size = {
    videoCall:'video-call',
    videoCallFull:'video-call-full',
    videoCallHide:'video-call-hide',
    videoCallPercentageOne:'100%',
    videoCallPixelPoints:'920px'   // optimal is between 720 & 920
  }

  switch (roomsize) { 
    case 1:
      settings = roomSizeSettings.settings(size.videoCall, size.videoCallPercentageOne, size.videoCallPercentageOne);
      break;
    case 2:
      settings = roomSizeSettings.settings(size.videoCallFull, size.videoCallPixelPoints, size.videoCallPixelPoints);
      break;
    default:
      settings = roomSizeSettings.settings(size.videoCall, size.videoCallPercentageOne, size.videoCallPercentageOne);
      break;
  }
  return settings;
}
return (
    <div className="MeetingPlan" onDoubleClick={hidePopUpWindow}>  
      <header> 
      <MainMenu 
        navContent={ navContent( currentUser, operatorBusinessName, currentUser?.role,  "Student" )?.users }
      />
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
            onClick={() => toggleTeach( lesson )} 
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
            // saveRecording={saveVideoRecording}
        />
                    {/* <VideoPage 
                                buttonClassName={`toggle-stage-btns${( session ) ? "-show" : "-hide"}`} 
                                enableScreenShare={true} 
                                enableCameraStream={false}
                                resetAllStartSettings={ resetAllStartSettings }  
                                resetAllStopSettings={ resetAllStopSettings }   
                                setVideoModalMode={stage => setVideoModalMode(stage) }
                                objectId={lesson?._id} 
                                videoMetaData={lesson}
                                videoMetaDataExternalId={"courseId"}
                                videoNamePrefix={"LessonVideo"}
                            /> */}
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
                      roomName={lesson?.title}
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
  saveMeeting, 
  incrementSessionCount,
  lastLoggedInUser,
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
    courses: getCoursesByOperatorId(state, ownProps),
    selectedCourseFromLessonPlanCourseDropDown: state.courses.selectedCourseFromLessonPlanCourseDropDown,
    selectedLessonFromLessonPlanDropDown: state.lessons.selectedLessonFromLessonPlanDropDown
  };
};

export default connect(mapState, mapDispatch )(LessonPlan);

