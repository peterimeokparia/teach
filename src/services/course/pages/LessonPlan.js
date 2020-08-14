import React, { useState  } from 'react';
import { connect } from 'react-redux';
import LessonEditor from './LessonEditor';
// import ResizePanel from "react-resize-panel";
import ReactIframe from './ReactIframe';
import LessonPlanIframeComponent from './LessonPlanIframeComponent'
import MeetingIframeComponent from './MeetingIframeComponent';
import VideoPage from './VideoPage';
import MarkDown from 'react-markdown';
import { toggleTeachBoardOrEditor } from '../actions';
import { toggleVideoCapture } from '../../recorder/actions.js';
import ReactModal from 'react-modal-resizable-draggable';
import { Link, navigate } from '@reach/router';
import { Validations } from  '../../../helpers/validations';
import NavLinks  from './NavLinks';
import './LessonPlan.css';
// import Portal from 'src/pages/Portal'


const LessonPlan = ({ 
      courseId,  
      lessonId, 
      lessonTitle,
      lessons,
      currentUser,
      boardOrEditor,
      setVideoCapture,
      toggleTeachBoardOrEditor,
      toggleVideoCapture,
      children }) => {
   

  const page = `${courseId}_${lessonId}_${lessonTitle}`;
  let urls = {
      meeting:{ prod: `https://connect.247meetings.net/${page}`, dev:`https://connect.247meetings.net/${page}`},
      editor:{ prod:`https://padsconnect247.com/editor/p/${lessonTitle}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`, dev:`http://localhost:9002/p/${lessonTitle}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false` },
      canvas:{ prod:`https://padsconnect247.com/whiteboard/?whiteboardid=${page}&username=${currentUser?.username}`, dev:`http://localhost:8080/?whiteboardid=${page}&username=${currentUser?.username}`},
      recorder:{ prod:`https://padsconnect247.com/LessonPlan/VideoModal/${courseId}/${lessonId}/${lessonTitle}`, dev:`http://localhost:3000/LessonPlan/VideoModal/${courseId}/${lessonId}/${lessonTitle}`}
  };     
    
    
  const editorUrl = urls.editor.dev;
  const canvasUrl = urls.canvas.dev;
  const meetingUrl = urls.meeting.dev; 
  const recorderUrl = urls.recorder.dev;    
  
  const fullScreenSize = "1440px";
  const mainStageSize = "900px";
  const hideMeetingStageSize = "0px";
  const showMeetingStageSize = "600px"; 

  const [hideMeetingStage, setHideMeetingStage] = useState(false);
  const [fullMeetingStage, setFullMeetingStage] = useState(false);
  const [videoModalModeOn,  setVideoModalMode] = useState(false);
  const [session, setSession] = useState(false);
  
  const lesson = Object.values(lessons).filter(thisLesson => thisLesson.id === parseInt(lessonId, 10)) 



  const alertRecording = () => {
    Validations.warn('Recording In Progress. To end this teaching session, please stop the recording.');
  };


  const toggleTeach = () => {

    if ( session ){
        
        if ( videoModalModeOn ){
            
            alertRecording();
            return;
        }

        if ( fullMeetingStage ){
          setFullMeetingStage(false);
           
        }

        setSession(false);

    }
    else{

        setSession(true);

    }

  }


  const meetingStage = () => {

    if( session && hideMeetingStage ){
      
      setHideMeetingStage(false);

    } 
    else{
  
      setHideMeetingStage(true);
      
      setFullMeetingStage(false);

    }
  }


  const showFullMeetingStage = () => {

    if ( fullMeetingStage ){
        
      setFullMeetingStage(false);

    }
    else{

       setFullMeetingStage(true);

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



   const recordSessionLink = () => ( <span>  <a href={recorderUrl} target="_blank">Start Recording</a></span> );


    return (

        <div className="CourseDetail"> 
              
              <header> 

                <NavLinks to={`/courses/${courseId}/lessons/${lessonId}`}> {lessonTitle}   </NavLinks>
                
  
                <div className="lesson-item"> 

                      <span className="span-btns">  
                          {/* images / gif */}

                            <button className="plan-lesson-btn" onClick={toggleTeach}> { session ? 'End' : 'Teach' } </button>

                            <button className={ `toggle-stage-btns${fullMeetingStage ? "-hide" : "-show"}` } onClick={toggleTeachBoardOrEditor}> { boardOrEditor ? 'Board' : 'Editor' } </button>         

                            <button className={`toggle-stage-btns${(session) ? (fullMeetingStage) ?  "-hide" : "-show" : "-hide" }`}  onClick={meetingStage}> { ( session && hideMeetingStage ) ? "Show Meeting Stage"  :  "Hide Meeting Stage"  } </button> 
                            
                            <VideoPage buttonClassName={`toggle-stage-btns${( session ) ? "-show" : "-hide"}`} recordStream={session} resetAllStartSettings={all => resetAllStartSettings(all)}  resetAllStopSettings={stage => resetAllStopSettings(stage)}   setVideoModalMode={stage => setVideoModalMode(stage)} lesson={lesson}/>
                            
                            <button className={`toggle-stage-btns${(session) ? "-show" : "-hide"}`}  onClick={showFullMeetingStage}> { ( fullMeetingStage ) ? "Meeting Stage Half" : "Meeting Stage Full"   } </button> 
                        </span>
                </div>

              </header>
             <div className="content">
               
     
              <div className="sidebar"> 
                    
               { (fullMeetingStage) ? <div>  <MeetingIframeComponent  
                                                name="embed_readwrite" 
                                                source={meetingUrl}
                                                width= { fullScreenSize }
                                                height="900px"
                                                allow="camera;microphone"
                                                scrolling="auto"
                                                frameBorder="0"
                                                recorderLink={recordSessionLink}
                                       />

                                     </div>
               
                                    :  boardOrEditor ? <div> < LessonPlanIframeComponent 
                                                                            name="embed_readwrite" 
                                                                            source={editorUrl}
                                                                            width={session  ? (( hideMeetingStage ) ? fullScreenSize : mainStageSize ) :  fullScreenSize }
                                                                            height="900px"
                                                                            allow="camera;microphone"
                                                                            scrolling="auto"
                                                                            frameBorder="0" 
                                                              /> 
                                                        </div> 
                                                    :        
                                                        <div> < LessonPlanIframeComponent 
                                                                      name="embed_readwrite" 
                                                                      source={canvasUrl}
                                                                      width={session  ? (( hideMeetingStage ) ? fullScreenSize : mainStageSize ) :  fullScreenSize }
                                                                      height="900px"
                                                                      allow="camera;microphone"
                                                                      scrolling="auto"
                                                                      frameBorder="0"
                                                        />
                                                        </div>
                                                          
                                        } 

                              </div>
           
                                          <div className="meeting"> 
                                      
                                                            <div>
                                          { session ?  <MeetingIframeComponent  
                                                                          name="embed_readwrite" 
                                                                          source={meetingUrl}
                                                                          width= { (fullMeetingStage) ?  hideMeetingStageSize : (hideMeetingStage) ? hideMeetingStageSize : showMeetingStageSize }
                                                                          height="900px"
                                                                          allow="camera;microphone"
                                                                          scrolling="auto"
                                                                          frameBorder="0"
                                                                          recorderLink={recordSessionLink}
                                                              />
                                                              : <div> </div>
                                                                          
                                          }
                                                                  
                                                            </div>
                                                    
                                        
                                        </div>
                                        {Validations.setErrorMessageContainer()}
                                  </div>
                            </div>

                  );


}



const mapState = ( state )   => {
  return {
         currentUser: state.users.user,
         lessons: state.lessons.lessons,
         boardOrEditor: state.lessons.toggleTeachBoardOrEditor,
         setVideoCapture: state.streams.setVideoCapture
  };
}


export default connect(mapState, { toggleTeachBoardOrEditor, toggleVideoCapture } )(LessonPlan);