import { 
createRef, 
PureComponent } from 'react';

import { 
connect } from 'react-redux';

import { 
uploadVideos } from 'services/course/helpers/ServerHelper';

import {
recordingStatusRecordingStarted,
recordingStatusRecordingStopped } from 'services/course/actions/video';

import { 
saveAs } from 'file-saver';

import VideoCallIcon from '@material-ui/icons/VideoCall';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import './style.css';

class MaterialVideoPage extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      capture: false,
      screenSharing:false,
      cameraOn:false,
      mediaStream: null,
      selectedElement: null,
      selectedElementToDelete: null
    };
    this.videoRef = createRef();
    this.enableScreenSharing = this.enableScreenSharing.bind(this);
    this.enableCamera = this.enableCamera.bind(this);
    this.setCapture = this.setCapture.bind(this);
    this.setTypeOfStreamToCapture = this.setTypeOfStreamToCapture.bind(this);
    this.startCapture = this.startCapture.bind(this);
    this.stopCapture = this.stopCapture.bind(this);
    this.handleSelectedElement =this.handleSelectedElement.bind(this);
  };

  theStream;
  theRecorder;
  recorder;
  url;
  blob;
  recordedChunks = [];

  componentDidMount = () => {
  };

  componentDidUpdate = () => {
    this.cancelIcon = this.props?.videoMeta?.exitVideoCallIcon && 
       this.props?.videoMeta?.exitVideoCallIcon( this.state.capture, this.props.element?._id, this.state.selectedElement?._id );
  };

  componentWillUnmount = () => { 
  };

  requestedMediaOptions = {
    video: {
      cursor: "always"
    },
    audio: { 
      echoCancellation: true,
      noiseSuppression: true
    }
  };

  requestedVideoOptions = {
    video: {
      noiseSuppression: true,
    },
    audio: { 
      echoCancellation: true,
      noiseSuppression: true
    }
  };

  requestedAudioOptions = {
    audio: { 
      echoCancellation: true,
      noiseSuppression: true
    }
  };

  setCapture = () => {
   this.setState( { capture: !this.state.capture } );
  }; 

  closeVideo = () => {
    if ( this.state.capture ) {
      this.resetAfterCapture();
    }
    this.setState( { capture: false } );
    this.props.recordingStatusRecordingStopped();
  };

  toggleRecordOnOff = () => {  
    this.setCapture();
    if ( this.state.capture ) {
       this.resetAfterCapture();
    } else {
        this.startCapture();       
    }
  };

  resetAfterCapture = () => {
    this.stopCapture();

    if ( this.state.screenSharing ) {
      this.setState( { screenSharing: false } );
    }

    if ( this.state.cameraOn ) {
      this.setState( { cameraOn: false } );
    }
  };

  setTypeOfStreamToCapture = () => {
     this.setState( { screenSharing: !this.state.screenSharing } );
  };

  toggleTypeOfStremCapture = () => {
     this.setTypeOfStreamCapture();
     if ( this.state.screenSharing ) {
        this.enableScreenShare();     
     } else {
        this.enableCameraStream();
     }
  };

  startCapture = () => {
    this.props.extendedMeetingSettings && this.props?.setVideoModalMode(true);
    this.props.extendedMeetingSettings && this.props?.resetAllStartSettings();
    this.props.extendedMeetingSettings && this.props?.recordingStatusRecordingStarted();
    return "Record";
  };

  stopCapture = () => {
    if (this.state.capture && this.theRecorder && this.theStream){ 
        this.theRecorder.stop();
        this.theStream.getTracks()?.forEach( track => track.stop() );
        this.blob = new Blob(this.recordedChunks, {type: "video/webm"});
        this.url =  (URL || window.webkitURL).createObjectURL(this.blob);
        
    let videoData = {
        videoBlob: this.blob,  
        objectId: this.props?.videoMeta?.objectId,  
        videoMetaData: this.props?.videoMeta?.videoMetaData, 
        videoName: this.props?.videoMeta?.videoName };

      uploadVideos( videoData, this.props?.videoMeta?.videoMetaDataExternalId, this.props?.videoMeta?.videoNamePrefix ); 
      saveAs(this.url, "recording.webm");
      this.theStream = null;
      this.props.extendedMeetingSettings && this.props.resetAllStopSettings();
    }
      this.props.extendedMeetingSettings &&  this.props?.setVideoModalMode(false);
      this.props.extendedMeetingSettings && this.props?.recordingStatusRecordingStopped();      
      this.setState({ capture: false });
      this.setState({ cameraOn: false });
  };

  saveRecording = ( selectedElement ) => {
    this.props?.saveRecording( selectedElement );
  };

  enableScreenSharing = () => {
  if ( ( this.state.capture ) && ( this.state.screenSharing ) ) {
    this.stopCapture();
    this.setState({ screenSharing: false });
    this.setState({ capture: false });
    this.saveRecording( this.state.selectedElement );
    return;
  }
   navigator.mediaDevices.getDisplayMedia(this.requestedMediaOptions)
    .then(screen  => {
      this.addMicToTrack( screen, this.state.screenSharing );
    }).catch(e => { 
      console.error('getUserMedia() failed: ' + e); 
      this.props.extendedMeetingSettings && this.props?.resetAllStopSettings();
    }); 
    if ( this.state.cameraOn ) {
      this.setState( { cameraOn: false } );
    }
    this.setState( { screenSharing: true } );
  };

  enableCamera = () => {   
    if ( ( this.state.capture ) && ( this.state.cameraOn ) ) {
      this.stopCapture();
      this.setState({ cameraOn: false });
      this.setState({ capture: false });
      this.saveRecording( this.state.selectedElement );
      return;
    } 
    navigator.mediaDevices.getUserMedia(this.requestedVideoOptions).then(screen  => {
        this.addMicToTrack( screen, false );
    }).catch(e => { 
        console.error('getUserMedia() failed: ' + e); 
        this.props.extendedMeetingSettings && this.props.resetAllStopSettings();
    }); 
    if ( this.state.screenSharing ) {
      this.setState( { screenSharing: false } );
    }
    if ( this.state.capture ) {
      this.setState( { cameraOn: true } );
    }   
  };

  addMicToTrack = ( screen, screenSharingEnabled ) => {
    navigator.mediaDevices.getUserMedia(this.requestedAudioOptions).then(function(mic) {
      let tracks = mic.getTracks();
      let track = tracks[0];

      if ( screen && track ) {
        if ( screenSharingEnabled ) {
           screen.addTrack( track );
        }
        getStream(screen);
      }
    });

    let getStream = stream => {
      this.theStream = stream;
      let video = this.videoRef?.current;

      if ( video ) {
        video.srcObject = stream;
        video.play();
      }
      
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
        console.log('MediaRecorder', stream);
        this.recorder = new MediaRecorder(stream, options);
      } catch (e) {
        console.error('Exception while creating MediaRecorder: ' + e);
        return;
      }
      
      this.theRecorder = this.recorder;
  
      if ( this.recordedChunks ){
          this.recordedChunks = [];
      }
      this.recorder.ondataavailable = (event) => { this.recordedChunks.push(event?.data); };
      this.recorder.start(100);
    };
  };
  
  handleSelectedElement = ( selected ) => {
    this.setState({ selectedElement: selected });
    this.toggleRecordOnOff();
  };

  handleSelectedElementToDelete = ( selected ) => {
    this.saveRecording({ ...selected, videoUrl:''}); 
  };

  handleCanPlay = () => {       
    this.videoRef.current.play();
  };

  render(){
        return (
            <>
            <span className="">  
               <span>  
              { 
                <span className={"videoSectionMain"}> 
                  <VideoCallIcon 
                      style={  this.props?.videoMeta?.videoCallIconMain( this.state.capture , this.props.element?._id, this.state.selectedElement?._id  )}
                      className={ ( this.state.capture && (  this.props.element?._id === this.props.selectedElement?._id )) ? "comment-round-button-3" : "comment-round-button-4" }
                      onClick={() => this.handleSelectedElement(  this.props.element )} 
                  /> 
                  <DeleteIcon 
                      style={ this.props?.videoMeta?.deleteIconStyle(  this.state.capture, this.props.element?._id, this.state.selectedElement?._id )  }
                      className="comment-round-button-3"
                      onClick={() => this.handleSelectedElementToDelete( this.props.element ) }
                  />
                </span>
              }      
              {
                  <div 
                  className={ ( this.state.capture ) ? this.props?.videoMeta?.videoSectionClassNameRecording : this.props?.videoMeta?.videoSectionClassNameRecordingStopped  }
                >
                  {( this.state.capture && this.props?.videoMeta?.displayVideoPlayer ) && 
                        <video
                          controls 
                          autoPlay="true"
                          className="video"
                          ref={ this.videoRef }
                          onCanPlay={ this.handleCanPlay } 
                          onBlur={ () => this.closeVideo() }
                      />
                  } 
                </div>        
              }
              { this.state.capture &&  (   
                <div className={this.props?.videoMeta?.videoSectionCallOut}>   
                  {      
                    <span> 
                      <CancelIcon 
                          style={ this.props?.videoMeta?.exitVideoCallIcon( this.state.capture, this.props.element?._id, this.state.selectedElement?._id ) }
                          className={ ( this.state.capture ) ? ( this.state.cameraOn ) ? "comment-round-button-3" : "comment-round-button-2" : "comment-round-button-4" }
                          onClick={ this.closeVideo }
                      />
                      <VideoCallIcon 
                          style={ this.props?.videoMeta?.videoCallIcon( this.state.capture, this.props.element?._id, this.state.selectedElement?._id  ) }
                          className={ ( this.state.capture ) ? ( this.state.cameraOn ) ? "comment-round-button-3" : "comment-round-button-2" : "comment-round-button-4" }
                          onClick={ this.enableCamera }
                      />
                       <ScreenShareIcon 
                          style={ this.props?.videoMeta?.shareScreenIcon( this.state.capture, this.props.element?._id, this.state.selectedElement?._id ) }
                          className={ ( this.state.capture ) ? ( this.state.screenSharing ) ? "comment-round-button-3" :  "comment-round-button-2" : "comment-round-button-4" }
                          onClick={ this.enableScreenSharing }
                        />
                    </span>
                  } 
                </div>
              )}
              </span> 
        </span>
        </>
        );
      }; 

}

const mapDispatch = {
  recordingStatusRecordingStarted,
  recordingStatusRecordingStopped,
};

const mapState = ( state, ownProps ) => {
  return {
    courses: Object.values( state?.courses?.courses ),
    hasRecordingStarted: state.hasRecordingStarted.hasRecordingStarted
  };
};

export default connect( mapState, mapDispatch )( MaterialVideoPage );





