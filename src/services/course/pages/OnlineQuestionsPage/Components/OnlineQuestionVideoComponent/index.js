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
onlineQuestionVideoDeleteIconStyle  } from '../OnlineQuestionVideoComponent/inlineStyles';

import './style.css';

const OnlineQuestionVideoComponent = ({
element,
videoComponentMeta,
video,
} ) => { 

let videoMeta = {
  videoCallIconMain,
  videoCallIcon,
  shareScreenIcon,
  exitVideoCallIcon,
  deleteIconStyle: onlineQuestionVideoDeleteIconStyle,
  videoNamePrefix: 'OnlineQuestionVideoMarkDownEditors', 
  recordButtonText: 'Record Question',
  displayMaterialButton: true,
  videoSectionClassNameRecording: "mainVideoSection-recording",
  videoSectionClassNameRecordingStopped: "mainVideoSection-recordingStopped",
  videoSectionClassNameNoRecording: "mainVideoSection-recordingStopped", 
  videoClassName: ( element?.videoUrl === ""  ) ? "videoPlayer" : "",
  exitVideoCallIconPageName: "OnlineListItems",
  videoSectionCallOut: "videoSectionCallOut",
  videoMetaData: { inputFieldId: element?._id, currentQuestion: element },
  videoName: `${element?._id}_${element?._id}_${element?._id}_${element?.type}`,
  videoMetaDataExternalId:'name',
  buttonClassName: `toggle-stage-btns${( true ) ? "-show" : "-hide"}`, 
  objectId: element?._id 
};  

useEffect(() => {

  videoComponentMeta({ ...video, videoMeta  });
  
}, [ video, videoComponentMeta ])

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
      className={''}
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

export default connect( mapState, mapDispatch )( OnlineQuestionVideoComponent );



