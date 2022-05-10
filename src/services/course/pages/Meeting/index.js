import { 
useState, 
useEffect } from 'react';

function Meeting({ 
  roomName, 
  width, 
  height, 
  containerWidth, 
  containerHeight, 
  userName, 
  resizedHeight,
  resizedWidth }) {

  const [loading, setLoading] = useState(true);
  const containerStyle = {
      width: containerWidth,
      height: containerHeight
  };
  //   defaults
  //   width: ( containerWidth === "100%" ) ? 365 : 720,  665
  //  height: ( containerHeight === "100%" ) ? 200 : 720, 
  // height: ( containerHeight === "100%" ) ? 875 : 720, 
  //   optimal range for video conf is b/w 720 to 920 px
  const jitsiContainerStyle = {
    display: (loading ? 'none' : 'block'),
    width: ( containerWidth === "100%" ) ? resizedWidth : 720,
    height: ( containerHeight === "100%" ) ? resizedHeight : 720,  
    // height: ( containerHeight === "100%" ) ? 475 : 720, 
  };
 const smallScreenWidth = 200;
 
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
 TOOLBAR_ALWAYS_VISIBLE: true,
 TOOLBAR_BUTTONS:[
   'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 'fullscreen',
   'fodeviceselection', 'hangup', 'profile', 'chat', 'recording', 'localrecording',
   'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
   'videoquality', 'filmstrip',  'feedback', 'stats', 'shortcuts',
   'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
 ],
 TOOLBAR_TIMEOUT: 500,
 VIDEO_QUALITY_LABEL_DISABLED: true
 },
 configOverwrite: {
   enableWelcomePage: false,
   enableClosePage: true,
   disableSimulcast: false,
 localRecording: {
    enabled: false,
    format: 'ogg'  
  },
  maxFullResolutionParticipants: -1,
  enableAutomaticUrlCopy: true,
  enableNoisyMicDetection: ( width === smallScreenWidth  ) ? true : false
 },
};


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
    TOOLBAR_ALWAYS_VISIBLE: true,
    TOOLBAR_BUTTONS:[
      'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 'fullscreen',
      'fodeviceselection', 'hangup', 'profile', 'chat', 'recording', 'localrecording',
      'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
      'videoquality', 'filmstrip',  'feedback', 'stats', 'shortcuts',
      'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
    ],
    TOOLBAR_TIMEOUT: 500,
    VIDEO_QUALITY_LABEL_DISABLED: true
    },
    configOverwrite: {
      enableWelcomePage: false,
      enableClosePage: true,
      disableSimulcast: false,
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
    // api.executeCommand('toggleShareScreen');
   });

   api.addEventListener('videoConferenceLeft', () => {
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

 const testsScreenShare =  ( domain, options)  => {
  const api = new window.JitsiMeetExternalAPI(domain, options);

  api.executeCommand('toggleShareScreen');
 }

 useEffect(() => {
  // verify the JitsiMeetExternalAPI constructor is added to the global..
  if ( window.JitsiMeetExternalAPI ) 
       startConference();
  else 
       alert('script not loaded');
  // });
}, []);

 return (
  <div style={containerStyle}
  >
    {loading }
    {/* <button onClick={() => testsScreenShare( `joinmeet.today`, options)}>{"Test"}</button> */}
   <div id="mycontainer" style={jitsiContainerStyle}/>
  </div>
 );
}

export default Meeting;


