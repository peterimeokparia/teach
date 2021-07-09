import { createRef, PureComponent } from 'react';

import { 
connect } from 'react-redux';

import { 
uploadVideos } from 'Services/course/helpers/ServerHelper';

import {
recordingStatusRecordingStarted,
recordingStatusRecordingStopped } from 'Services/course/Actions/Video';

import { 
saveAs } from 'file-saver';

import './style.css';

class InLineVideo extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      capture: false,
      screenSharing:false,
      cameraOn:false,
      mediaStream: null
    };
    this.videoRef = createRef();
    this.enableScreenSharing = this.enableScreenSharing.bind(this);
    this.setCapture = this.setCapture.bind(this);
    this.setTypeOfStreamToCapture = this.setTypeOfStreamToCapture.bind(this);
    this.startCapture = this.startCapture.bind(this);
    this.stopCapture = this.stopCapture.bind(this);
  };
  
  theStream;

  theRecorder;
  
  recorder;

  url;

  blob;

  recordedChunks = [];

  componentDidMount = () => {
    if ( this.props.displayMaterialButton && this.props.hasRecordingStarted ) {
        this.toggleRecordOnOff();
    }
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
  }

  toggleRecordOnOff = () => {  
    this.setCapture();
    if ( this.state.capture  ) {
        if ( this.props.hasCameraStarted ) {
          this.props.setVideoModalMode(true);
        }
       this.resetAfterCapture();
    } else {
        this.startCapture();       
    }
  }

  resetAfterCapture = () => {
    this.stopCapture();

    if ( this.state.screenSharing ) {
      this.setState( { screenSharing: false } );
    }

    if ( this.state.cameraOn ) {
      this.setState( { cameraOn: false } );
    }
  }

  setTypeOfStreamToCapture = () => {
     this.setState( {screenSharing: !this.state.screenSharing } );
  }

  toggleTypeOfStremCapture = () => {
     this.setTypeOfStreamCapture();
     if ( this.state.screenSharing ) {
          this.enableScreenShare();     
     } 
  }

  startCapture = () => {
    if ( this.props?.videoModalModeOn ) {
      this.props.resetAllStartSettings();
    }
    this.props.setVideoModalMode(true);
    this.props.recordingStatusRecordingStarted();
    this.enableScreenSharing();
    return "Record";
  };

  stopCapture = () => {
    this.props.setVideoModalMode(false);

    if (this.state.capture && this.theRecorder && this.theStream){
        this.theRecorder.stop();
        this.theStream.getTracks().forEach( track => track.stop() );
        this.blob = new Blob(this.recordedChunks, {type: "video/webm"});
        this.url =  (URL || window.webkitURL).createObjectURL(this.blob);

    let videoData = {
        videoBlob: this.blob,  
        objectId: this.props.objectId,  
        videoMetaData: this.props.videoMetaData, 
        videoName: this.props.videoName };

        alert('testpoc')
        alert(JSON.stringify(videoData))
        alert(JSON.stringify(this.props.videoNamePrefix))

      // uploadVideos( videoData, this.props.videoMetaDataExternalId, this.props.videoNamePrefix ); 
      uploadVideos( videoData, "courseId", this.props.videoNamePrefix );
      saveAs(this.url, "test.webm");
      this.theStream = null;
    }
      this.props.resetAllStopSettings(); 
      this.props.recordingStatusRecordingStopped();
      this.setState({ capture: false });
      this.setState( {cameraOn: false }); 
  };

  enableScreenSharing = () => {
    this.props.setVideoModalMode(true);
  if ( ( this.state.capture ) && ( this.state.screenSharing ) ) {
    this.stopCapture();
    this.setState({ screenSharing: false });
    this.setState({ capture: false });
    return;
  }

   navigator.mediaDevices.getDisplayMedia(this.requestedMediaOptions)
    .then(screen  => {
      this.addMicToTrack( screen, this.state.screenSharing );
    }).catch(e => { 
      console.error('getUserMedia() failed: ' + e); 
      this.props.resetAllStopSettings(true);
    }); 
    if ( this.state.cameraOn ) {
      this.setState( { cameraOn: false } );
    }
    this.setState( { screenSharing: true } );
  }


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


  render(){
        return (
            <>
              <span className="videoComponents">  
               
               <span>  
               { 
                    <button
                      className={ this.props.buttonClassName }
                      onClick={ this.toggleRecordOnOff }
                    >
                    { ( this.state.capture )  ? "Stop" 
                                              : (this.props.recordButtonText) 
                                              ? this.props.recordButtonText 
                                              : "Record"
                    }
                    </button>  
                }      
              </span> 
        </span>
        </>
        );
      };

}

const mapState = ( state, ownProps ) => {
  return {
    hasRecordingStarted: state.hasRecordingStarted.hasRecordingStarted
  };
};

export default connect( mapState, { recordingStatusRecordingStarted, recordingStatusRecordingStopped } )( InLineVideo );






