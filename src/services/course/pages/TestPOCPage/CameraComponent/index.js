import React  from 'react';
import './style.css';

class CameraComponent extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {
      capture: false,
      cameraOn:false,
      autoPlay:"false",
      mediaStream: null
    };
    this.videoRef = React.createRef();
    this.enableCamera = this.enableCamera.bind(this);
    this.setCapture = this.setCapture.bind(this);
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
    this.handleTogglingCamera();
    if ( !this.props.startCameraCapture  && this.theStream  ) {
      this.theStream.getTracks().forEach(track => track.stop());
    }
  };

  componentDidUpdate = () => {
    this.handleTogglingCamera();
    if ( !this.props.startCameraCapture && this.theStream ) {
      this.theStream.getTracks().forEach(track => track.stop());
    }
  }

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
    if ( this.state.capture ) {
       this.resetAfterCapture();
    } else {
        this.startCapture();       
    }
  }

  resetAfterCapture = () => {
    this.stopCapture();
    if ( this.state.cameraOn ) {
      this.setState( { cameraOn: false } );
    }
  }

  startCapture = () => {
    if ( this.props?.videoModalModeOn ) {
      this.props.resetAllStartSettings();
    }
    this.props.setVideoModalMode(true);
    this.setState({ cameraOn: true });
    this.setState({ capture: true });
    this.enableCamera(); 
    return "Record";
  };

  stopCapture = () => {
    if ( this.theRecorder && this.theStream ){
        this.theRecorder.stop();
        this.theStream.getTracks().forEach(track => track.stop());
    }
      this.props.resetAllStopSettings(); 
      this.setState({ capture: false });
      this.setState( { cameraOn: false });
  };
  
  enableCamera = () => {   
  if ( ( this.state.capture ) && ( this.state.cameraOn ) ) {
    this.stopCapture();
    this.setState({ cameraOn: false });
    this.setState({ capture: false });
    return;
  } 

   navigator.mediaDevices.getUserMedia(this.requestedVideoOptions).then(screen  => {
      this.addMicToTrack( screen, false );
  }).catch(e => { 
      console.error('getUserMedia() failed: ' + e); 
      this.props.resetAllStopSettings(true);
  }); 

  if ( this.state.screenSharing ) {
    this.setState( { screenSharing: false } );
  }

  if ( this.state.capture ) {
    this.setState( { cameraOn: true } );
  }   
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

      let video = this.videoRef?.current;

      if ( video ) {
        video.srcObject = stream;
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

  handleTogglingCamera = () => {
    if ( ( this.state.capture ) && ( this.state.cameraOn ) ) {  
      this.stopCapture();
      return;
    }

    if ( this.props.startCameraCapture ) {
      this.startCapture();
    }
  }

  handleCanPlay = () => {       
    this.videoRef.current.play();
    this.setState({ autoPlay: "true" });
    
    if ( !this.props.startCameraCapture ) {
      this.setState({ autoPlay: "false" });
      this.videRef = null;
    }
  }

  render(){
        return (
            <>
              <span className="videoComponents">  
              <div>
                {
                  <video
                    height={ this.props.videoHeight }
                    width={ this.props.videoWidth }
                    controls 
                    autoPlay={this.state.autoPlay }
                    ref={ this.videoRef }
                    onCanPlay={ this.handleCanPlay } 
                  />
                } 
              </div>        
        </span>
        </>
        );
      };
      
}

export default CameraComponent;





