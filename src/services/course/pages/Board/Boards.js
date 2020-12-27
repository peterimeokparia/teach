import 
React, { 
useState, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
toggleTeachBoardOrEditor, 
updateUserInvitationUrl, 
setLessonInProgressStatus, 
inviteStudentsToLearningSession,
loadMeetings, 
loadMeetingsByUserId,
saveMeeting, 
incrementSessionCount, 
loadUsers} from '../../actions';

import { 
toggleVideoCapture } from '../../../recorder/actions.js';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCoursesByOperatorId } from '../../Selectors';

import { 
meetingConfigSettings, 
getMeetings,
getUrls } from  '../LessonPlan/lessonPlanHelpers';

import { 
Validations } from  '../../../../helpers/validations';

import { 
Rnd } from 'react-rnd';

import { 
Redirect, 
navigate } from '@reach/router';

import NavLinks  from '../Components/NavLinks';
import LessonPlanIframeComponent from '../LessonPlan/LessonPlanIframeComponent'
import VideoPage from '../Video/VideoPage';
import Meeting from '../Meetings/Meeting';

// import './LessonPlan.css';
// import Portal from 'src/pages/Portal'


const Boards = ({ 
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
users,
currentUser,
boardOrEditor,
toggleTeachBoardOrEditor,
studentsSubscribedToThisCourse,
loadMeetings,
loadMeetingsByUserId,
paidSessions,
courses,
incrementSessionCount,
updateUserInvitationUrl,
saveMeeting,
currentMeetings }) => {

   
const urls = getUrls(currentUser, courseId, lessonId, lessonTitle)
const editorUrl = urls.editor.dev;
const canvasUrl = urls.canvas.dev;   
const fullScreenSize = "1036px";

const [ hideMeetingStage, setHideMeetingStage ] = useState(false);
const [ fullMeetingStage, setFullMeetingStage ] = useState(false);
const [ videoModalModeOn,  setVideoModalMode ] = useState(false);
const [ session, setSession] = useState( false );  
const paidSession = paidSessions?.filter(session => session?.courseId === courseId)?.find( currentSession => currentSession?.userId === currentUser?._id );
const lesson = lessons?.filter(thisLesson => thisLesson?._id === lessonId); 
const currentCourse = courses?.find(course => course?._id === courseId)?.name;


  useEffect(()=>{
    
    loadUsers();

    loadMeetings();
    
  }, [ fullMeetingStage, hideMeetingStage, loadUsers, loadMeetings  ]);


  handleRedirectionsOnPageLoad();


  const toggleTeach = () => {

    if ( session ) {
        
        if ( videoModalModeOn ){
            
          Validations.warn('Recording In Progress. To end this teaching session, please stop the recording.');

          return;
        }

        if ( fullMeetingStage ){

          setFullMeetingStage(false); 
        }

        setSession(false);

        setHideMeetingStage(false);

        let selectedTutor = users?.find(usr => usr?._id === selectedCourseTutor?._id );

        handleMeetings(currentMeetings, selectedTutor);
           
    }
    else{

        setSession(true);

        setHideMeetingStage(false);

        loadMeetingsByUserId(currentUser?._id);
    }
  }




  const showFullMeetingStage = () => {

    if ( fullMeetingStage ){
        
       setFullMeetingStage(false);

       setHideMeetingStage(false);

    }
    else{

      setFullMeetingStage(true);

      setHideMeetingStage(true);

    } 
    
  }


  const resetAllStartSettings = () => {

    if ( hideMeetingStage ){

       setHideMeetingStage(false);
    }

  }


  const resetAllStopSettings = () => {

    if ( videoModalModeOn ){

      setVideoModalMode(false);
    }
  }



  const hidePopUpWindow = () => {

    if ( ! hideMeetingStage ) {

      setHideMeetingStage(true);

    } else {

      setHideMeetingStage(false);

    }
  }



  function handleRedirectionsOnPageLoad(){
    //if email address does not exist in the system, have them sign up and then redirect to the studyhall
    //studyhallname:usersname, invitedusersname,  
    // change to verified / unverified
    if ( ! currentUser?.userIsValidated ) {

    
        navigate(`/${operatorBusinessName}/LessonPlan/invite/userverification/classRoom/${classRoomId}`); 
        // return <Redirect to={`/${operatorBusinessName}/courses/${courseId}/buy`} noThrow/>
      //return <Redirect to={`/${operatorBusinessName}/LessonPlan/invite/userverification/classRoom/${classRoomId}`} noThrow />
    } 
  
    
    if ( paidSession?.numberOfSessions === session?.totalNumberOfSessions  && session?.typeOfSession === "Package" && currentUser?.role === "Student" ) {
  
      return <Redirect to={`/${operatorBusinessName}/mycourses`} noThrow />
    }
  }





  function handleMeetings( meetings, user ){

    try {

      loadMeetings();

      let meeting = getMeetings(meetings, user);

       if ( meeting ) {

             meeting.invitees.forEach( user => {

                user[ 'timeMeetingEnded' ] =  Date.now();

                incrementSessionCount( meeting?.sessions?.find(session => session?.userId === user?._id ) ); 

                let setInvitationUrl = "", nameOfLessonInProgress = "", lessonInProgress = false;

                updateUserInvitationUrl(user, setInvitationUrl, nameOfLessonInProgress, lessonInProgress); 
              
              });

               saveMeeting(user?.meetingId, { ...meeting, timeEnded: Date.now() });
       }

      
    } catch (error) {

       console.log( error )
      
    }
 }

 
 

 
   const meetingSettings = meetingConfigSettings(currentCourse, lessonTitle);

   const meetingStyleContainer = ( fullMeetingStage ) ? 'meeting-full' :  ( hideMeetingStage ) ? 'meeting-hide' : `meeting` 

    return (

        <div className="LessonPlan" onDoubleClick={hidePopUpWindow}> 
              
              <header> 

                <h1>
                  <NavLinks to={`/${operatorBusinessName}/classroomgroups/${classRoomGroupId}/${classRoomGroupName}/classroom/${classRoomId}`}> {classRoomName}   </NavLinks>
                </h1>
                
  
                <div className="lesson-item"> 

                      <span className="span-btns">  
        
                          {/* images / gif */}

                            <button className="plan-lesson-btn" onClick={toggleTeach}> { session ? 'End' : 'Start Video' } </button>

                            <button className={ `toggle-stage-btns${fullMeetingStage ? "-hide" : "-show"}` } onClick={toggleTeachBoardOrEditor}> { boardOrEditor ? 'Board' : 'Editor' } </button>         

                            <button className={`toggle-stage-btns${(session) ? (fullMeetingStage) ?  "-show" : "-show" : "-hide" }`}  onClick={showFullMeetingStage}> { ( session && fullMeetingStage) ? "Hide Room"  :  "Show Room"  } </button> 
                            
                            <VideoPage buttonClassName={`toggle-stage-btns${( session ) ? "-show" : "-hide"}`} recordStream={session} resetAllStartSettings={resetAllStartSettings}  resetAllStopSettings={resetAllStopSettings}   setVideoModalMode={stage => setVideoModalMode(stage)} lesson={lesson}/>

                        </span>
                </div>

              </header>

             <div className="content">
               
               <div className="sidebar">  </div>
    
              <div> 

                <div className= {meetingStyleContainer}>   

                    <Rnd>                 
                        <div>
                        { ( session  ) ?  <Meeting
                                                userName={currentUser?.firstname}   
                                                roomName={meetingSettings.roomName}
                                                containerWidth={( fullMeetingStage ) ? meetingSettings.fullScreen.meetingContainerStyle.containerWidth 
                                                                                     : meetingSettings.popOutScreen.meetingContainerStyle.containerWidth}
                                                containerHeight={( fullMeetingStage ) ? meetingSettings.fullScreen.meetingContainerStyle.containerHeight 
                                                                                      : meetingSettings.popOutScreen.meetingContainerStyle.containerHeight}   
                                          />
                                        : <div> </div>
                                      
                        }
                        </div>
                    </Rnd> 
               </div> 
              <div className={ fullMeetingStage ? `tools-hide` : `tools`    }> 

               {  boardOrEditor ? <div className={`editor${hideMeetingStage}-show`}> 
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
                              
                                  <div>
                                     
                              </div>
                      {Validations.setErrorMessageContainer()}
                            </div>
                      </div>

                  );

}




const mapDispatch = {
  toggleTeachBoardOrEditor, 
  toggleVideoCapture, 
  updateUserInvitationUrl, 
  setLessonInProgressStatus,  
  inviteStudentsToLearningSession, 
  loadMeetings, 
  loadMeetingsByUserId,
  saveMeeting, 
  incrementSessionCount
}




const mapState = ( state, ownProps )   => {
  return {
         selectedCourseTutor: state.courses.courseTutor,
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
}


export default connect(mapState, mapDispatch )(Boards);