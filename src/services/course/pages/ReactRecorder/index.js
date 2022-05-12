import { 
createRef, 
PureComponent, 
useEffect, 
useState } from 'react';

import { 
useReactMediaRecorder } from "react-media-recorder";

import { 
saveAs } from 'file-saver';

import { videoCallIconMain }  from "services/course/pages/Lessons/LessonPlan/inlineStyles";

import VideoCallIcon from '@material-ui/icons/VideoCall';
import DeleteIcon from '@material-ui/icons/Delete';
import './style.css';

const ReactRecorder = ({ toggleCurrentMeetingSession }) => {

    const [ enable, setEnable ] = useState( false );
    const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ 
            video: true, 
            audio: true, 
            screen: true, 
            onStart:() => toggleCurrentMeetingSession(),
            onStop: ( blobUrl, blob) => mediaUrl( blobUrl, blob) 
    });

    const mediaUrl = ( blobUrl, blob ) => {
        if ( blobUrl ) {
            alert(JSON.stringify(blobUrl))
            saveAs(blobUrl, "recording.webm")
        }
        return blob;
    }

    const toggleStart = () => {

        if ( enable ) {

            stopRecording();
            toggleCurrentMeetingSession();
            setEnable( !enable );
            return;
        }
        alert('start recording')
        startRecording();
        setEnable( !enable );
    }

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
                   {/* <DeleteIcon 
                       style={ this.props?.videoMeta?.deleteIconStyle(  this.state.capture, this.props.element?._id, this.state.selectedElement?._id )  }
                       className="comment-round-button-3"
                       onClick={() => this.handleSelectedElementToDelete( this.props.element ) }
                   /> */}
                 </span>
               }      
        </span>
        </span>
      {/* <video src={mediaUrl(mediaBlobUrl)} controls autoPlay loop /> */}
    </div>
  );
};

export default ReactRecorder;