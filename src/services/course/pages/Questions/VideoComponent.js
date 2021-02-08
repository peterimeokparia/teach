import React, { 
useState } from 'react';

import { 
Rnd } from 'react-rnd';

import VideoPage from '../Video/VideoPage';

import './answers.css';



const VideoComponent = ({
id, 
name,
className,
videoMetaData,
videoMetaDataExternalId,
videoNamePrefix,
videoName,
objectId,
setRecordingCompletionStatus,
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
       <div 
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
         />
         
       </div>      
   );
 }


export default VideoComponent;
