import { useState } from 'react';
import { useReactMediaRecorder } from "react-media-recorder";
import { saveAs } from 'file-saver';
import { videoCallIconMain }  from "services/course/pages/Lessons/LessonPlan/inlineStyles";
import VideoCallIcon from '@material-ui/icons/VideoCall';
import './style.css';

const ReactRecorder = ({ toggleCurrentMeetingSession }) => {
    const [ enable, setEnable ] = useState( false );
    const { status, startRecording, stopRecording } = useReactMediaRecorder({ 
            video: true, 
            audio: true, 
            screen: true, 
            onStart:() => toggleCurrentMeetingSession(),
            onStop: ( blobUrl, blob) => mediaUrl( blobUrl, blob) 
    });

    const mediaUrl = ( blobUrl, blob ) => {
        if ( blobUrl ) {
            saveAs(blobUrl, "recording.webm");
        }
        return blob;
    };

    const toggleStart = () => {
        if ( enable ) {
            stopRecording();
            toggleCurrentMeetingSession();
            setEnable( !enable );
            return;
        }
        startRecording();
        setEnable( !enable );
    };

  return (
    <div>
      <span className="videoSectionMain">  
            <span>  
               { 
                 <span className={"videoSectionMain"}> 
                   {
                       <> 
                        <VideoCallIcon 
                            style={ videoCallIconMain()}
                            className={  enable  ?  "comment-round-button-3" : "comment-round-button-4" }
                            onClick={ toggleStart }
                        /> 
                        <div className={ enable ? "blink_me" : "blink_me_not" }><p> <h2> {status} </h2></p></div>
                       </>
                   }
                 </span>
               }      
        </span>
        </span>
    </div>
  );
};

export default ReactRecorder;