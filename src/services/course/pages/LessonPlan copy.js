import 
React, 
{ useState, useEffect  } from 'react';

import { 
connect } from 'react-redux';

import { 
toggleTeachBoardOrEditor, 
updateUserInvitationUrl, 
setLessonInProgressStatus, 
inviteStudentsToLearningSession, 
loadMeetings, 
saveMeeting, 
incrementSessionCount } from '../actions';

import { 
toggleVideoCapture } from '../../recorder/actions.js';


import { 
meetingConfigSettings, 
handleMeetings } from  '../../../helpers/lessonPlanHelpers';

import { 
Validations } from  '../../../helpers/validations';

import { 
Rnd } from 'react-rnd';

import { 
Redirect } from '@reach/router';

import NavLinks  from './NavLinks';
import LessonPlanIframeComponent from './LessonPlanIframeComponent'
import VideoPage from './VideoPage';
import Meeting from './Meeting';
import './LessonPlan.css';
// import Portal from 'src/pages/Portal'


const LessonPlan = ({ 
      courseId,  
      lessonId, 
      lessonTitle,
      lessons,
      currentUser,
      boardOrEditor,
      toggleTeachBoardOrEditor,
      studentsSubscribedToThisCourse,
      loadMeetings,
      paidSessions,
      courses,
      currentMeetings }) => {
   

  // const page = `${courseId}_${lessonId}_${lessonTitle}`;

  // let urls = {
  //     meeting:{ prod: `https://joinmeet.today/${page}`, dev:`https://joinmeet.today/${page}`},
  //     editor:{ prod:`https://padsconnect247.com/editor/p/${lessonTitle}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`, dev:`http://localhost:9002/p/${lessonTitle}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false` },
  //     canvas:{ prod:`https://padsconnect247.com/whiteboard/?whiteboardid=${page}&username=${currentUser?.firstname}`, dev:`http://localhost:8080/?whiteboardid=${page}&username=${currentUser?.firstname}`},
  //     recorder:{ prod:`https://padsconnect247.com/LessonPlan/VideoModal/${courseId}/${lessonId}/${lessonTitle}`, dev:`http://localhost:3000/LessonPlan/VideoModal/${courseId}/${lessonId}/${lessonTitle}`}
  // };     
  
  const urls = getUrls(currentUser, courseId, lessonId, lessonTitle)
  const editorUrl = urls.editor.dev;
  const canvasUrl = urls.canvas.dev;   
  const fullScreenSize = "1536px";

  const [hideMeetingStage, setHideMeetingStage] = useState(false);
  const [fullMeetingStage, setFullMeetingStage] = useState(false);
  const [videoModalModeOn,  setVideoModalMode] = useState(false);
  const [session, setSession] = useState(false);  
  const paidSession = paidSessions?.filter(session => session?.courseId === courseId)?.find( currentSession => currentSession?.userId === currentUser?._id );
  const lesson = lessons?.filter(thisLesson => thisLesson?._id === lessonId); 
  const currentCourse = courses?.find(course => course?._id === courseId)?.name;

  
  useEffect(()=>{}, [ fullMeetingStage, hideMeetingStage ]);

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

        handleMeetings(currentMeetings, currentUser, paidSessions, studentsSubscribedToThisCourse);
           
    }
    else{

        setSession(true);

        setHideMeetingStage(false);

        loadMeetings(currentUser?._id);
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
    if ( currentUser?.email === undefined ) {

      return <Redirect to={`/LessonPlan/invite/userverification/${courseId}/${lessonId}/${lessonTitle}`} noThrow />
    } 
  
    
    if ( paidSession?.numberOfSessions === session?.totalNumberOfSessions  && session?.typeOfSession === "Package" && currentUser?.role === "Student" ) {
  
      return <Redirect to={`/mycourses`} noThrow />
    }
  }


 
  // function handleMeetings(meetings, user, sessions, studentsEnrolledInCourse){

  //    try {
 
  //       // let meeting = currentMeetings?.find(meeting => meeting?._id === currentUser?.meetingId  &&  currentUser?.role === "Tutor" );

  //        let meeting = getMeetings(meetings, user);

  //       if ( meeting ) {

  //            saveMeeting(user?.meetingId, { ...meeting, timeEnded: Date.now() });

  //           // let meetingInvitees = studentsSubscribedToThisCourse?.filter(student => meeting?.invitees?.includes(student?._id));
  //           // meetingInvitees.map(invitee => {

  //             getStudentsSubscribedToCurrentCourse(studentsEnrolledInCourse, meeting).map(student => {

  //             // const userSession = paidSessions?.find( currentSession => currentSession?.userId === invitee?._id );  
  //             // incrementSessionCount( userSession );   

  //             incrementSessionCount( getCurrentStudentsPaidSessions(sessions, student) ); 

  //             let setInvitationUrl = "", nameOfLessonInProgress = "", lessonInProgress = false;

  //             updateUserInvitationUrl(student, setInvitationUrl, nameOfLessonInProgress, lessonInProgress); 

  //         });
  //       }

       
  //    } catch (error) {

  //       console.log( error )
       
  //    }
  // }


  // function getMeetings(meetings, user) {
  //   return meetings?.find(meeting => meeting?._id === user?.meetingId  &&  
  //                    user?.role === "Tutor" );
  // }


  // function getStudentsSubscribedToCurrentCourse(students, meeting){
  //   return students?.filter(student => meeting?.invitees?.
  //           includes(student?._id));
  // }


  // function getCurrentStudentsPaidSessions(usersPaidSessions, student){
  //   return usersPaidSessions?.
  //           find( currentSession => currentSession?.userId === student?._id );  
  // }

   const meetingSettings = meetingConfigSettings(currentCourse, lessonTitle);

   let meetingStyleContainer = ( fullMeetingStage ) ? 'meeting-full' :  ( hideMeetingStage ) ? 'meeting-hide' : `meeting` 

    return (

        <div className="LessonPlan" onDoubleClick={hidePopUpWindow}> 
              
              <header> 

                <h1>
                  <NavLinks to={`/courses/${courseId}/lessons/${lessonId}`}> {lessonTitle}   </NavLinks>
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
               
              {/* <div className="sidebar">  */}
    
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
                                              scrolling="auto"
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
                                                scrolling="auto"
                                                frameBorder="0"
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



const mapState = ( state, ownProps )   => {
  return {
         currentUser: state.users.user,
         courses: Object.values(state?.courses?.courses),
         lessons: Object.values(state.lessons.lessons),
         lessonStarted: state.lessons.lessonStarted,
         boardOrEditor: state.lessons.toggleTeachBoardOrEditor,
         setVideoCapture: state.streams.setVideoCapture,
         invitees: state.users.invitees,
         studentsSubscribedToThisCourse : Object.values(state?.users?.users)?.filter(user => user?.role === "Student" && user?.courses?.includes(ownProps?.courseId)),
         currentMeetings: state.meetings.meetings,
         paidSessions: Object.values(state?.sessions?.sessions)
  };
}


export default connect(mapState, { toggleTeachBoardOrEditor, toggleVideoCapture, updateUserInvitationUrl, setLessonInProgressStatus,  inviteStudentsToLearningSession, loadMeetings, saveMeeting, incrementSessionCount } )(LessonPlan);