import React, { useState, useEffect  } from 'react';
import { connect } from 'react-redux';
import LessonPlanIframeComponent from './LessonPlanIframeComponent'
import VideoPage from './VideoPage';
import { toggleTeachBoardOrEditor, updateUserInvitationUrl, setLessonInProgressStatus, inviteStudentsToLearningSession, loadMeetings, saveMeeting } from '../actions';
import { toggleVideoCapture } from '../../recorder/actions.js';
import { Validations } from  '../../../helpers/validations';
import NavLinks  from './NavLinks';
import './LessonPlan.css';
import Meeting from './Meeting';
import { Rnd } from 'react-rnd';
// import Portal from 'src/pages/Portal'



const LessonPlan = ({ 
      courseId,  
      lessonId, 
      lessonTitle,
      lessons,
      currentUser,
      boardOrEditor,
      toggleTeachBoardOrEditor,
      updateUserInvitationUrl,
      setLessonInProgressStatus,
      studentsSubscribedToThisCourse,
      loadMeetings,
      saveMeeting,
      lessonStarted,
      courses,
      currentMeeting }) => {
   


  const page = `${courseId}_${lessonId}_${lessonTitle}`;

  let urls = {
      meeting:{ prod: `https://joinmeet.today/${page}`, dev:`https://joinmeet.today/${page}`},
      editor:{ prod:`https://padsconnect247.com/editor/p/${lessonTitle}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`, dev:`http://localhost:9002/p/${lessonTitle}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false` },
      canvas:{ prod:`https://padsconnect247.com/whiteboard/?whiteboardid=${page}&username=${currentUser?.firstname}`, dev:`http://localhost:8080/?whiteboardid=${page}&username=${currentUser?.firstname}`},
      recorder:{ prod:`https://padsconnect247.com/LessonPlan/VideoModal/${courseId}/${lessonId}/${lessonTitle}`, dev:`http://localhost:3000/LessonPlan/VideoModal/${courseId}/${lessonId}/${lessonTitle}`}
  };     
    
    
  const editorUrl = urls.editor.dev;
  const canvasUrl = urls.canvas.dev;   
  const fullScreenSize = "1536px";

  const [hideMeetingStage, setHideMeetingStage] = useState(false);
  const [fullMeetingStage, setFullMeetingStage] = useState(false);
  const [videoModalModeOn,  setVideoModalMode] = useState(false);
  const [session, setSession] = useState(false);

 

  useEffect(()=>{}, [ fullMeetingStage, hideMeetingStage ]);
  
  const lesson = lessons?.filter(thisLesson => thisLesson?._id === lessonId); 

  const currentCourse = courses?.find(course => course?._id === courseId)?.name;

  const alertRecording = () => {
   
    Validations.warn('Recording In Progress. To end this teaching session, please stop the recording.');
  };



  const toggleTeach = () => {

    if ( session ) {
        
        if ( videoModalModeOn ){
            
           alertRecording();

          return;
        }

        if ( fullMeetingStage ){

          setFullMeetingStage(false); 
        }

        setSession(false);

        setHideMeetingStage(false);

        
        let meeting = currentMeeting?.find(meeting => meeting?._id === currentUser?.meetingId);

        let meetingInvitees = studentsSubscribedToThisCourse?.filter(student => meeting?.invitees?.includes(student?._id));

          if ( meeting ) {

            saveMeeting(currentUser?.meetingId, {...currentMeeting?.find(meeting => meeting?._id === currentUser?.meetingId), timeEnded: Date.now() });  

              meetingInvitees.map(invitee => {
    
              let setInvitationUrl = "";
              let nameOfLessonInProgress = lesson.title;     
              let lessonInProgress = false;    
        
               updateUserInvitationUrl(invitee, setInvitationUrl, nameOfLessonInProgress, lessonInProgress); 
    
            });
          }
           
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



  const resetAllStartSettings = ( value ) => {

      console.log('resetAllSettings', value);

    if ( hideMeetingStage ){

       setHideMeetingStage(false);
    }

  }


  const resetAllStopSettings = ( value ) => {

    console.log('resetAllStopSettings', value);

    if ( videoModalModeOn ){

      setVideoModalMode(false);
    }
  }


  const hideWindowTest = () => {

    if ( ! hideMeetingStage ) {

      setHideMeetingStage(true);

    } else {

      setHideMeetingStage(false);

    }

  }


  const meetingSettings = { 

    roomName: `${currentCourse} ${lessonTitle}`,

    popOutScreen: { 
                  meetingContainerStyle: {
                    containerWidth:  "100%",
                    containerHeight: "100%"
                  },     
                  draggableDiv: {
                    x: 1280,
                    y: 10,
                    width: 500,
                    height: 190,
                    minWidth: 500,
                    minHeight: 190
                  } 
    },

    fullScreen: { 
                meetingContainerStyle: {
                  containerWidth:  "720px",
                  containerHeight: "720px"
                },
                draggableDiv: {
                  x: 370,
                  y: 0,
                  width: 500,
                  height: 190,
                  minWidth: 500,
                  minHeight: 190
                } 
   },
 }
  
   let meetingStyleContainer = ( fullMeetingStage ) ? 'meeting-full' :  ( hideMeetingStage ) ? 'meeting-hide' : `meeting` 

    return (

        <div className="LessonPlan" onDoubleClick={hideWindowTest}> 
              
              <header> 

                <h1>
                <NavLinks to={`/courses/${courseId}/lessons/${lessonId}`}> {lessonTitle}   </NavLinks>
                </h1>
                
  
                <div className="lesson-item"> 

                      <span className="span-btns">  
                      {/* <CheckBoxComponent courseId={courseId}/> */}
                          {/* images / gif */}

                            <button className="plan-lesson-btn" onClick={toggleTeach}> { session ? 'End' : 'Start Video' } </button>

                            <button className={ `toggle-stage-btns${fullMeetingStage ? "-hide" : "-show"}` } onClick={toggleTeachBoardOrEditor}> { boardOrEditor ? 'Board' : 'Editor' } </button>         

                            <button className={`toggle-stage-btns${(session) ? (fullMeetingStage) ?  "-show" : "-show" : "-hide" }`}  onClick={showFullMeetingStage}> { ( session && fullMeetingStage) ? "Hide Room"  :  "Show Room"  } </button> 
                            
                            <VideoPage buttonClassName={`toggle-stage-btns${( session ) ? "-show" : "-hide"}`} recordStream={session} resetAllStartSettings={all => resetAllStartSettings(all)}  resetAllStopSettings={stage => resetAllStopSettings(stage)}   setVideoModalMode={stage => setVideoModalMode(stage)} lesson={lesson}/>

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

               {  boardOrEditor ? <div className={`editor${hideMeetingStage}-show`}> < LessonPlanIframeComponent 
                                                                            name="embed_readwrite" 
                                                                            source={editorUrl}
                                                                            width={fullScreenSize}
                                                                            height="900px"
                                                                            allow="camera;microphone"
                                                                            scrolling="auto"
                                                                            frameBorder="0" 
                                                              /> 
                                                        </div> 
                                                     :        
                                                        <div className={`canvas${hideMeetingStage}-show`}> < LessonPlanIframeComponent 
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
         currentMeeting: state.meetings.meetings
  };
}


export default connect(mapState, { toggleTeachBoardOrEditor, toggleVideoCapture, updateUserInvitationUrl, setLessonInProgressStatus,  inviteStudentsToLearningSession, loadMeetings, saveMeeting } )(LessonPlan);