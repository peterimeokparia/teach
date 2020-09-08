import React, { useState, useEffect } from 'react';
// import ProgressComponent from '@material-ui/core/CircularProgress';

function Meeting({ roomName, width, height, containerWidth, containerHeight, userName }) {

  const [loading, setLoading] = useState(true);
  
  const containerStyle = {
      width: containerWidth,
      height: containerHeight
  };

  const jitsiContainerStyle = {
    display: (loading ? 'none' : 'block'),
    width: ( containerWidth === "100%" ) ? 220 : 720,// clean - create object
    height: ( containerHeight === "100%" ) ? 200 : 720, 
  }

 const smallScreenWidth = 200;
 const minTimeOut = 1000;
 const maxTimeOut = 4000;

 function startConference() {
  try {
    const domain = `joinmeet.today`;
    const options = {
    roomName,
    parentNode: document.getElementById('mycontainer'),
    interfaceConfigOverwrite: {
    filmStripOnly: false,
    DEFAULT_REMOTE_DISPLAY_NAME: 'Teach',
    SHOW_JITSI_WATERMARK: false,
    APP_NAME: 'Teach',
    NATIVE_APP_NAME: 'Teach',
    PROVIDER_NAME: 'Teach',
    SHOW_BRAND_WATERMARK: false,
    BRAND_WATERMARK_LINK: '',
    SHOW_POWERED_BY: false,
    SHOW_DEEP_LINKING_IMAGE: false,
    GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
    DISPLAY_WELCOME_PAGE_CONTENT: false,
    DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
    ENABLE_FEEDBACK_ANIMATION: true,
    INVITATION_POWERED_BY: true,
    SETTINGS_SECTIONS: [ 'devices', 'language', 'moderator', 'profile', 'calendar' ],
    TOOLBAR_ALWAYS_VISIBLE: false,
    TOOLBAR_BUTTONS:[
      'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 'fullscreen',
      'fodeviceselection', 'hangup', 'profile', 'chat', 'recording', 'localrecording',
      'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
      'videoquality', 'filmstrip',  'feedback', 'stats', 'shortcuts',
      'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
    ],
    // TOOLBAR_BUTTONS: [
    //   'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 'fullscreen',
    //   'fodeviceselection', 'hangup', 'profile', 'chat', 'recording', 'localrecording',
    //   'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
    //   'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
    //   'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
    // ]
    TOOLBAR_TIMEOUT: 500, //( width === smallScreenWidth )  ? minTimeOut : maxTimeOut,
    VIDEO_QUALITY_LABEL_DISABLED: true //( width ) === smallScreenWidth ? true : false,
    },
    configOverwrite: {
      enableWelcomePage: false,
      enableClosePage: true,
      disableSimulcast: false,  //maxFullResolutionParticipants:  enableNoisyMicDetection
    localRecording: {
       enabled: false,
       format: 'ogg'  
     },
     maxFullResolutionParticipants: -1,
     enableAutomaticUrlCopy: true,
     enableNoisyMicDetection: ( width === smallScreenWidth  ) ? true : false
    },
   };

   const api = new window.JitsiMeetExternalAPI(domain, options);

   api.addEventListener('videoConferenceJoined', () => {
   
    console.log('Local User Joined');
   
    setLoading(false);
   
    api.executeCommand('displayName', userName);

   });


   api.addEventListener('videoConferenceLeft', () => {
   
    // https://github.com/jitsi/jitsi-meet/issues/3720
    //https://dev.to/metamodal/add-jitsi-meet-to-your-react-app-33j9
    //https://github.com/jitsi/jitsi-meet/blob/master/config.js
    //https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe

    console.log('Local User Left');

    api.executeCommand('displayName', userName);

    api.dispose();
   
   });


   api.on('passwordRequired', function ()
   {

      api.executeCommand('password', 'testpasswordset');

   });





  } catch (error) {
   
     console.error('Failed to load API', error);

  }
 }

 useEffect(() => {

  // verify the JitsiMeetExternalAPI constructor is added to the global..
  
  if ( window.JitsiMeetExternalAPI ) 

       startConference();
  else 
       alert('script not loaded');

 }, []);

 return (
  <div style={containerStyle}
  >
   {/* {loading && <ProgressComponent />} */}
    {loading }

   <div id="mycontainer" style={jitsiContainerStyle}/>
  </div>
 );
}

export default Meeting;


