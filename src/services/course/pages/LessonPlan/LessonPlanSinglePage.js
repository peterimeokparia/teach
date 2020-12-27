// import React, { useState, useEffect,useRef } from 'react';
// import { connect } from 'react-redux';
// import VideoPlayer from './VideoPlayer';
// import LessonEditor from './LessonEditor';
// import ResizePanel from "react-resize-panel";
// import ReactIframe from './ReactIframe';
// import LessonPlanIframeComponent from './LessonPlanIframeComponent'
// import VideoPage3 from './VideoPage3';
// import VideoPage from './VideoPage';
// import MarkDown from 'react-markdown';
// import { togglePreviewMode } from '../actions';
// import { toggleVideoCapture } from '../../recorder/actions.js';
// import ReactModal from 'react-modal-resizable-draggable';
// import './LessonPlan.css';
// import { saveAs } from 'file-saver';
// import { pure } from 'recompose';


const LessonPlan =  ({ 
      courseId,  
      lessonId, 
      lessonTitle,
      previewMode,
      setVideoCapture,
      togglePreviewMode,
      toggleVideoCapture,
      children }) => {

    
       
  const page = `${courseId}_${lessonId}_${lessonTitle}`;
  const editorUrl = `http://localhost:9002/p/${page}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`;
  const canvasUrl = `http://localhost:8080/?whiteboardid=${page}`; 
  const meetingUrl = `https://connect.247meetings.net/`    
  
  const fullScreenSize = "1440px";
  const mainStageSize = "900px";
  const hideMeetingStageSize = "0px";
  const showMeetingStageSize = "600px"; 

  // const [videoModalState, setVideoModalState] = useState(false);
  const [hideMeetingStage, setHideMeetingStage] = useState(false);
  const [disableMeetingStageTest, setDisableMeetingStage] = useState(false);
  const [videoModalModeOn,  setVideoModalMode] = useState(false);

  let videoPage = true;


  let [ capture, setCapture ] = useState(false);
  let [ mediaStream, setMediaStream ] = useState(null);
  let videoRef = useRef();
  let theStream;
  let theRecorder;
  let recorder;
  let url;
  let blob;
  let recordedChunks = [];

  console.log('theStream', theStream);
  console.log('theRecorder', theRecorder);
  console.log('recorder', recorder);
  console.log('url', url);
  console.log('blob', blob);
  console.log('recordedChunks', recordedChunks);
  console.log('mediaStream', mediaStream);

  
  const requestedMediaOptions = {

      video: {
        cursor: "always"
      },
      audio: true
  };



  const startCapture = () => {
     
    console.log('startCapture');
    console.log('setCapture');
    console.log('setVideoModalMode');

    resetAllStartSettings(true)

    setCapture(true);  
      
    setVideoModalMode(true);
     
  }



  const stopCapture = () => {

    //toggleVideoCapture();

    console.log('stop capture');

    //console.log('disableMeetingStage set to:', showStage);

    
    console.log('capture', capture);
    console.log('theRecorder', theRecorder);
    console.log('theStream', theStream);

    if (capture && theRecorder && theStream){

      setCapture(false);

      theRecorder.stop();
 
      theStream.getTracks().forEach( track => track.stop() );
 
      blob = new Blob(recordedChunks, {type: "video/webm"});
 
      url =  URL.createObjectURL(blob);
 
      saveAs(url, "test.webm");
 
      theStream = null;
    }

    console.log('resetAllStopSettings');
    
    resetAllStopSettings(true);
      
  }



  const getStream = stream => {

    console.log('getStream', stream);

    theStream = stream;
    videoRef.current.srcObject  = stream;

    let options = {mimeType: 'video/webm;codecs=vp9,opus'};

    if (! MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not supported`);
        options = {mimeType: 'video/webm;codecs=vp8,opus'};

      if (! MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not supported`);
        options = {mimeType: 'video/webm'};

        if (! MediaRecorder.isTypeSupported(options.mimeType)) {
          console.error(`${options.mimeType} is not supported`);
          options = {mimeType: ''};
        }
      }
    }

    try {

      recorder = new MediaRecorder(stream, options);

    } catch (e) {

      console.error('Exception while creating MediaRecorder: ' + e);
      return;

    }
    
    theRecorder = recorder;

    recorder.ondataavailable = (event) => { recordedChunks.push(event.data); };

    recorder.start(100);
  }


   let enableStreams = false;
   useEffect(() => {


     if (enableStreams) return;


    console.log('in useEffect');

    function enableStream(){

      navigator.mediaDevices.getDisplayMedia(requestedMediaOptions)
      .then(screen  => {
         navigator.mediaDevices.getUserMedia({audio:true}).then(function(mic) {
           screen.addTrack(mic.getTracks()[0]);

           getStream(screen);
       });
      }).catch(e => { 
               console.error('getUserMedia() failed: ' + e); 
                  resetAllStopSettings(true);});

    }


    if ( capture ){
      enableStreams = true;
        enableStream();
    };


    if ( ! capture &&  mediaStream ){
        mediaStream = null;
    };

  //capture, mediaStream,  requestedMediaOptions, getStream
  }, [capture]);



   if ( mediaStream && videoRef.current && !videoRef.current.srcObject ){
 
         console.log('mediaStream && videoRef.current && !videoRef.current.srcObject');

        getStream(mediaStream);
   }


   const handleCanPlay = () => {
  
    console.log('handleCanPlay');
     
        videoRef.current.play();
   }



  const meetingStage = () => {

    if(videoModalModeOn && hideMeetingStage){
      console.log('show2')
      setHideMeetingStage(false);
    } 
    else{
      console.log('show')
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
  

  console.log('videoModalModeOn', videoModalModeOn)

  console.log('disableMeetingStageTest', hideMeetingStage)

   
    return (

        <div className="CourseDetail"> 
              
              <header> 
                {/* navigation links back to course and back to lesson page */}
                {courseId} -  {lessonId} - {lessonTitle} 
  
                <div className="lesson-item"> 
                      <span className="span-btns">  
                          {/* images / gif */}
                            <button className="plan-lesson-btn" onClick={togglePreviewMode}> { previewMode ? 'Blackboard' : 'Editor' } </button>

                           {/* <VideoPage3 buttonClassName={"plan-lesson-btn"} recordStream={videoModalModeOn} showStage={hideMeetingStage}  resetAllStartSettings={all => resetAllStartSettings(all)}  resetAllStopSettings={stage => resetAllStopSettings(stage)} setVideoModalMode={stage => setVideoModalMode(stage)}/>   */}
                                       
                            {/* <button className={`toggle-stage-btns${(!videoModalModeOn || disableMeetingStageTest) ? "-hide" : "-show"}`} disabled={!videoModalModeOn || disableMeetingStageTest} onClick={meetingStage}> { ( videoModalModeOn && hideMeetingStage ) ? "Show Meeting Stage"  : "Hide Meeting Stage"  } </button>   */}

                            <button
              className="plan-lesson-btn"
               onClick={ startCapture }
             >
                 
                Record

             </button>


             <button
              className="plan-lesson-btn"
               onClick={ stopCapture }
             >
                 
                Stop Recording

             </button>

                            <button className={`toggle-stage-btns${(videoModalModeOn) ? "-show" : "-hide"}`}  onClick={meetingStage}> { ( videoModalModeOn && hideMeetingStage ) ? "Show Meeting Stage"  : "Hide Meeting Stage"  } </button> 

                            <div> 
                
                <VideoPlayer
                          className="video" 
                          videoRef={ videoRef } 
                          handleCanPlay={ handleCanPlay }
                          autoPlay="autoPlay"
                />

            </div>
                        </span>
                </div>

              </header>
             <div className="content">
               
     
              <div className="sidebar"> 
                    
               { previewMode ? <div> < LessonPlanIframeComponent 
                                                    name="embed_readwrite" 
                                                    source={editorUrl}
                                                    width={videoModalModeOn  ? (( hideMeetingStage ) ? fullScreenSize : mainStageSize ) :  fullScreenSize }
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
                                              width={videoModalModeOn  ? (( hideMeetingStage ) ? fullScreenSize : mainStageSize ) :  fullScreenSize }
                                              height="900px"
                                              allow="camera;microphone"
                                              scrolling="auto"
                                              frameBorder="0"
                                />
                                </div>
                                   
                } 

                </div>
           
                <div className="lesson"> 
            
                                  <div>
                { videoModalModeOn ? < LessonPlanIframeComponent 
                                                name="embed_readwrite" 
                                                source={meetingUrl}
                                                // width= {( (videoModalModeOn && hideMeetingStage) || (videoModalModeOn && disableMeetingStageTest) )  ? hideMeetingStageSize : showMeetingStageSize }
                                                width= {( (videoModalModeOn && hideMeetingStage) )  ? hideMeetingStageSize : showMeetingStageSize }
                                                height="900px"
                                                allow="camera;microphone"
                                                scrolling="auto"
                                                frameBorder="0"
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
         previewMode: state.app.previewMode,
         setVideoCapture: state.streams.setVideoCapture
  };
}


export default connect(mapState, { togglePreviewMode, toggleVideoCapture } )(LessonPlan);