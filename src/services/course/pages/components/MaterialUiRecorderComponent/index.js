import { 
connect } from 'react-redux';

import {
videoComponentMeta } from 'services/course/actions/video';

import RecordSessionPage from 'services/course/pages/RecordSessionPage';
import './style.css';

const MaterialUiRecorderComponent = ({
  element,
  className,
  videoMeta,
  saveRecording,
  resetAllStartSettings,
  resetAllStopSettings,
  setVideoModalMode,
  videoModalMode,
  eventId,
  lessonId,
  toggleCurrentMeetingSession,
  extendedMeetingSettings }) => {
return (
  <span className={className}> 
    <span>
      { ( videoMeta?.displaySavedRecording ) && ( element?.videoUrl ) &&
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
       <RecordSessionPage
          videoMeta={videoMeta} 
          element={element}
          saveRecording={saveRecording} 
          resetAllStartSettings={resetAllStartSettings}
          resetAllStopSettings={resetAllStopSettings}
          setVideoModalMode={(modal) => setVideoModalMode(modal)}
          videoModalMode={videoModalMode}
          eventId={eventId}
          lessonId={lessonId}
          extendedMeetingSettings={extendedMeetingSettings}
          toggleCurrentMeetingSession={toggleCurrentMeetingSession}
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

export default connect( mapState, mapDispatch )( MaterialUiRecorderComponent );



