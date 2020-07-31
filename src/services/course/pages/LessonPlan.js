import React, { useState, useEffect } from 'react';
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
import './LessonPlan.css';
// import Portal from 'src/pages/Portal'


const LessonPlan = ({ 
      courseId,  
      lessonId, 
      lessonTitle,
      boardOrEditor,
      setVideoCapture,
      toggleTeachBoardOrEditor,
      toggleVideoCapture,
      children }) => {

    
  const page = `${courseId}_${lessonId}_${lessonTitle}`;
  const editorUrl = `http://localhost:9002/p/${page}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`;
  const canvasUrl = `http://localhost:8080/?whiteboardid=${page}`; 
  const meetingUrl = `https://connect.247meetings.net/${page}`
  const recorderUrl = `http://localhost:3000/LessonPlan/VideoModal/${courseId}/${lessonId}/${lessonTitle}`      
  
  const fullScreenSize = "1440px";
  const mainStageSize = "900px";
  const hideMeetingStageSize = "0px";
  const showMeetingStageSize = "600px"; 

  const [hideMeetingStage, setHideMeetingStage] = useState(false);
  const [fullMeetingStage, setFullMeetingStage] = useState(false);
  const [videoModalModeOn,  setVideoModalMode] = useState(false);
  const [session, setSession] = useState(false);



  const alertRecording = () => {
    alert('Recording In Progress. To end this teaching session, please stop the recording.');
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



   const recordSessionLink = () => (<span>  <a href={recorderUrl} target="_blank">Start Recording</a></span>)
  


    return (

        <div className="CourseDetail"> 
              
              <header> 
                {/* navigation links back to course and back to lesson page */}
                {courseId} -  {lessonId} - {lessonTitle} 
  
                <div className="lesson-item"> 
                      <span className="span-btns">  
                          {/* images / gif */}

                            <button className="plan-lesson-btn" onClick={toggleTeach}> { session ? 'End' : 'Teach' } </button>

                            <button className={ `toggle-stage-btns${fullMeetingStage ? "-hide" : "-show"}` } onClick={toggleTeachBoardOrEditor}> { boardOrEditor ? 'Board' : 'Editor' } </button>         

                            <button className={`toggle-stage-btns${(session) ? (fullMeetingStage) ?  "-hide" : "-show" : "-hide" }`}  onClick={meetingStage}> { ( session && hideMeetingStage ) ? "Show Meeting Stage"  :  "Hide Meeting Stage"  } </button> 
                            
                            <VideoPage buttonClassName={`toggle-stage-btns${( session ) ? "-show" : "-hide"}`} recordStream={session} resetAllStartSettings={all => resetAllStartSettings(all)}  resetAllStopSettings={stage => resetAllStopSettings(stage)}   setVideoModalMode={stage => setVideoModalMode(stage)}/>
                            
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
              </div>
        </div>

    );


}



const mapState = (state)   => {
  return {
         boardOrEditor: state.lessons.toggleTeachBoardOrEditor,
         setVideoCapture: state.streams.setVideoCapture
  };
}


export default connect(mapState, { toggleTeachBoardOrEditor, toggleVideoCapture } )(LessonPlan);