import React  from 'react';
import { connect } from 'react-redux';
import { sendMediaStream } from '../actions';
import { saveAs } from 'file-saver';
import { toggleVideoCapture } from '../../recorder/actions.js';
import './VideoPage.css';


class VideoPage extends React.PureComponent {

  constructor(props){

    super(props);

    this.state = {
         capture: false,
         mediaStream: null
    } 
  
    this.videoRef = React.createRef();
    
  
    this.enableStreamTest = this.enableStreamTest.bind(this);
    this.setCapture = this.setCapture.bind(this);
    this.startCapture = this.startCapture.bind(this);
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

    this.setState( {capture: !this.state.capture})

  }; 



  toggleRecordOnOff = () => {
    
    this.setCapture();

    if ( this.state.capture ) {

         this.stopCapture();
    }
    else {

         this.startCapture();       
    }
  }


  startCapture = () => {
     
     this.props.resetAllStartSettings(true)

     this.enableStreamTest();

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
 
      saveAs(this.url, "//test//test.webm");
 
      this.theStream = null;
    }

       this.props.resetAllStopSettings(true);
      
  };



  


  enableStreamTest = () => {

      navigator.mediaDevices.getDisplayMedia(this.requestedMediaOptions)
      .then(screen  => {
         navigator.mediaDevices.getUserMedia({audio:true}).then(function(mic) {
           screen.addTrack(mic.getTracks()[0]);
  
           console.log('screen', screen)
  
           getStream(screen);
       });
      }).catch(e => { 
               console.error('getUserMedia() failed: ' + e); 
                  this.props.resetAllStopSettings(true);
                });
  
    


     let getStream = stream => {

      console.log('getStream', stream);
  
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
                          { this.state.capture ? "Stop" : "Record" }

                  </button>           

                
            </span>)

      }
}



export default VideoPage;







