import React  from 'react';

import { 
uploadVideos } from  '../../../../helpers/serverHelper';

import { 
StoreDataToFireBase } from  '../../../../firebase/StoreDataToFireBase';

import { 
saveAs } from 'file-saver';

import './VideoPage.css';


class VideoPage extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
         capture: false,
         screenSharing:true,
         mediaStream: null
    } 
    this.videoRef = React.createRef();
    this.enableScreenSharing = this.enableScreenSharing.bind(this);
    this.enableCamera = this.enableCamera.bind(this);
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



  setCapture = () => {
   this.setState( {capture: !this.state.capture} );
  }; 

  


  toggleRecordOnOff = () => {  
    this.setCapture();
    if ( this.state.capture ) {
         this.stopCapture();
    } else {
         this.startCapture();       
    }
  }




  setTypeOfStreamToCapture = () => {
     this.setState( {screenSharing: !this.state.screenSharing } );
  }




  toggleTypeOfStremCapture = () => {
     this.setTypeOfStreamCapture();
     if ( this.state.screenSharing ) {
          this.enableScreenShare();     
     } else {
           this.enableCameraStream();
     }
  }





  startCapture = () => {
    this.props.resetAllStartSettings()
    console.log('startCapture', this.state.capture)
    this.props.setVideoModalMode(true);
    return "Record";
  };




  stopCapture = () => {

    if (this.state.capture && this.theRecorder && this.theStream){
        this.theRecorder.stop();
        this.theStream.getTracks().forEach( track => track.stop() );
        this.blob = new Blob(this.recordedChunks, {type: "video/webm"});
        this.url =  URL.createObjectURL(this.blob);

    let videoData = {
        videoBlob: this.blob,  
        objectId: this.props.objectId,  
        videoMetaData: this.props.videoMetaData, 
        videoName: this.props.videoName };

      uploadVideos( videoData, this.props.videoMetaDataExternalId, this.props.videoNamePrefix ); 
      StoreDataToFireBase(this.blob);
      saveAs(this.url, "test.webm");
      this.theStream = null;
    }
      this.props.resetAllStopSettings(); 
  };



  

  enableScreenSharing = () => {
   navigator.mediaDevices.getDisplayMedia(this.requestedMediaOptions)
      .then(screen  => {
        this.addMicToTrack( screen );
      }).catch(e => { 
        console.error('getUserMedia() failed: ' + e); 
        this.props.resetAllStopSettings(true);
      }); 
 }






 enableCamera = () => {  
  navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    .then(screen  => {
      this.addMicToTrack( screen );
    }).catch(e => { 
      console.error('getUserMedia() failed: ' + e); 
      this.props.resetAllStopSettings(true);
    }); 
}

  

  

  addMicToTrack = screen => {
    navigator.mediaDevices.getUserMedia({audio:true}).then(function(mic) {
      screen.addTrack(mic.getTracks()[0]);
       getStream(screen);
    });

    let getStream = stream => {
      this.theStream = stream;
      this.videoRef.current.srcObject  = stream;
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
  
        console.log('MediaRecorder', stream)
        this.recorder = new MediaRecorder(stream, options);
      } catch (e) {
        console.error('Exception while creating MediaRecorder: ' + e);
        return;
      }
      
      this.theRecorder = this.recorder;
  
      if ( this.recordedChunks ){
            this.recordedChunks = [];
      }
      this.recorder.ondataavailable = (event) => { this.recordedChunks.push(event.data); };
      this.recorder.start(100);
    }

  }



   

  handleCanPlay = () => {       
    this.videoRef.current.play();
  }




   render(){
  
        return (
          
            <span>
                        
                <video controls autoPlay
                        className="video"
                        ref={this.videoRef}
                        onCanPlay={this.handleCanPlay} 
                />

                  <button
                          className={this.props.buttonClassName}
                          onClick={ this.toggleRecordOnOff }
                        >
                          { ( this.state.capture ) ? "Stop" 
                                                   : "Record"
                          }

                  </button>        


                    
                  {  
                    ( this.state.capture ) &&  <span> 
                                                  <button
                                                      className={this.props.buttonClassName} 
                                                      onClick={ this.enableCamera }>
                                                    {      
                                                        "Camera"                                 
                                                    }
                                                  </button>   

                                                  <button
                                                      className={this.props.buttonClassName} 
                                                      onClick={ this.enableScreenSharing }>
                                                    {  
                                                        "Screen"  
                                                    }
                                                </button>   
                                              </span>
                                            

                  }         

                  

                
            </span>)

      }
}



export default VideoPage;







