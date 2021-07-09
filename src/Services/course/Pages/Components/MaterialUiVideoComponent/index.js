import { 
connect } from 'react-redux';

import {
videoComponentMeta } from 'Services/course/Actions/Video';

import MaterialVideoPage from 'Services/course/Pages/MaterialVideoPage';
import './style.css';

{/*
Handle Styling:
--------------
  this.props?.videoMeta?.videoCallIconMain,
  this.props?.videoMeta?.deleteIconStyle,
  this.props?.videoMeta?.exitVideoCallIcon,
  this.props?.videoMeta?.videoCallIcon,
  this.props?.videoMeta?.shareScreenIcon

  Handle Saving:
  -------------
  this.props.displaySavedRecording,
  this.props.saveRecording,
  this.props?.videoMeta?.objectId,
  this.props?.videoMeta?.videoMetaData,
  this.props?.videoMeta?.videoName,
  this.props?.videoMeta?.videoMetaDataExternalId,
  this.props?.videoMeta?.videoNamePrefix
  this.props?.videoMeta?.videoSectionClassNameRecording,
  this.props?.videoMeta?.videoSectionClassNameRecordingStopped,
  this.props?.videoMeta?.videoSectionCallOut

  Operational Settings:
  -----------------------
this.props.element : Platform specific object
this.props.setVideoModalMode(false);
this.props.recordingStatusRecordingStarted();
this.props.recordingStatusRecordingStopped();
this.props.resetAllStartSettings();
this.props.resetAllStopSettings();
*/}

// http://localhost:3000/videos/OnlineAnswerVideoMarkDownEditors_1623903005927_name_60c7a71bae3d403e3c8d3629_6460.webm

// http://localhost:3000/videos/OnlineQuestionVideoMarkDownEditors_1623902943041_name_60c7a67dae3d403e3c8d3627_6280.webm

const MaterialUiVideoComponent = ({
element,
className,
videoMeta,
saveRecording,
resetAllStartSettings,
resetAllStopSettings,
setVideoModalMode,
videoModalMode,
extendedMeetingSettings
}) => {


return (
 <span className={className}> 
    <span>
      { (videoMeta?.displaySavedRecording ) && (element?.videoUrl) &&
        <div className={ videoMeta?.videoClassName }>
            <video
              className={ videoMeta?.videoClassName }
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
      <MaterialVideoPage
          videoMeta={videoMeta} 
          element={element}
          saveRecording={saveRecording} 
          resetAllStartSettings={resetAllStartSettings}
          resetAllStopSettings={resetAllStopSettings}
          setVideoModalMode={(modal) => setVideoModalMode(modal)}
          videoModalMode={videoModalMode}
          extendedMeetingSettings={extendedMeetingSettings}
      />  
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
    hasRecordingStarted: state.hasRecordingStarted.hasRecordingStarted,
    isRecordingDialogOpen: state.hasRecordingStarted.recordingDialogOpen
  };
};

export default connect( mapState, mapDispatch )( MaterialUiVideoComponent );



