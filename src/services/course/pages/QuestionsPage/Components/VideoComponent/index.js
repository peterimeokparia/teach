import 
React, { 
useState } from 'react';

import VideoPage from 'Services/course/Pages/VideoPage';

import './style.css';

const VideoComponent = ({
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
  setRecordingCompletionStatus( false )
}

const resetAllStopSettings = () => {
  setRecordingCompletionStatus( true )
}
return (
    <span 
      id={id}
      name={name}
      className={className}
    > 
        <VideoPage 
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
}

export default VideoComponent;
