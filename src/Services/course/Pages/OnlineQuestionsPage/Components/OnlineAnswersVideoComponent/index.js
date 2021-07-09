import { 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import {
videoComponentMeta } from 'Services/course/Actions/Video';

import MaterialVideoPage from 'Services/course/Pages/MaterialVideoPage';

import { 
videoCallIconMain,
videoCallIcon,
shareScreenIcon,
exitVideoCallIcon,  
saveIconStyle  } from '../OnlineAnswersVideoComponent/inlineStyles';

import './style.css';

const OnlineAnswersVideoComponent = ({
element,
videoComponentMeta,
video,
className
} ) => { 

let videoMeta = {
  videoCallIcon,
  exitVideoCallIcon,
  shareScreenIcon,
  videoCallIconMain,
  saveIconStyle: saveIconStyle,
  recordingOn: false,
  videoNamePrefix: 'OnlineAnswerVideoMarkDownEditors', 
  recordButtonText: 'Record Answer',
  videoSectionClassNameRecording: "answerVideoSection-recording",
  videoSectionClassNameRecordingStopped: "answerVideoSection-recordingStopped",
  videoSectionClassNameNoRecording: "mainVideoSection-recordingStopped", 
  videoClassName: ( element?.videoUrl === "" || element?.videoUrl === undefined ) ? "" : "",
  // deleteVideo: () => deleteVideo( element ),
  exitVideoCallIconPageName: "ManageEditors",
  videoSectionCallOut: "answerVideoSectionCallOut",
  objectId: element?._id 
};  

useEffect(() => {

  videoComponentMeta({ ...video, videoMeta  });
  
}, [ video, videoComponentMeta ]);

return (
 <span className="onlineQuestionVideoComponent"> 
    <span>
      {
        <div className={ video?.videoMeta?.videoClassName }>
            <video
              className={ video?.videoMeta?.videoClassName }
              src={element?.videoUrl}
              autoPlay={false}
              controls
            >
            </video>
        </div>
      }   
      <span> 
    <span>
    <span 
      className={className}
    > 
      <MaterialVideoPage element={element} />  

    </span>      
      </span>
      </span>
    </span>        
    </span>  
  );
};

const mapDispatch = {
  videoComponentMeta,
};

const mapState = ( state, ownProps ) => {
  return {
    video: state.hasRecordingStarted.recording[ ownProps?.element?._id ],
    hasRecordingStarted: state.hasRecordingStarted.hasRecordingStarted,
    isRecordingDialogOpen: state.hasRecordingStarted.recordingDialogOpen
  };
};

export default connect( mapState, mapDispatch )( OnlineAnswersVideoComponent );



