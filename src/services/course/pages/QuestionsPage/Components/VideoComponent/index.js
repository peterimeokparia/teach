import 
React, { 
useState } from 'react';
// import VideoPage from 'Services/course/Pages/VideoPage';
import MaterialVideoPage from 'Services/course/Pages/MaterialVideoPage';

import './style.css';

const VideoComponent = ({
config,
element,
selectedElement,
toggleRecording,
toggleCamera,
toggleScreenSharing,
id, 
name,
className,
recordButtonText,
videoMetaData,
videoMetaDataExternalId,
videoNamePrefix,
videoName,
objectId,
setRecordingCompletionStatus,
displayMaterialButton,
videoSectionClassName,
handleSubmit
}) => {
const [ videoModalMode, setVideoModalMode ] = useState( false ); 

const resetAllStartSettings = () => {
  handleSubmit();
  setRecordingCompletionStatus( false );
};

const resetAllStopSettings = () => {
  setRecordingCompletionStatus( true );
};

return (
    <span 
      id={id}
      name={name}
      className={className}
    > 
      <MaterialVideoPage
          config={config} 
          element={element}
          selectedElement={selectedElement}
          toggleRecordOnOff={ toggleRecording }
          turnCamerOn={ toggleCamera }
          enableScreenSharing={ toggleScreenSharing }
          buttonClassName={`toggle-stage-btns${( true ) ? "-show" : "-hide"}`} 
          recordStream={true}
          resetAllStartSettings={ resetAllStartSettings }  
          resetAllStopSettings={ resetAllStopSettings }   
          setVideoModalMode={stage => setVideoModalMode(stage) } 
          objectId={objectId}
          videoMetaData={videoMetaData}
          videoMetaDataExternalId={videoMetaDataExternalId}
          videoNamePrefix={videoNamePrefix}
          videoName={videoName}
          videoModalMode={videoModalMode}
          recordButtonText={recordButtonText}
          displayMaterialButton={displayMaterialButton}
          videoSectionClassName={videoSectionClassName}
          setRecordingCompletionStatus={setRecordingCompletionStatus}
      />  
    </span>      
   );
};

export default VideoComponent;
