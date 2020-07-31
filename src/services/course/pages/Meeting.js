import React, { useState, useEffect } from 'react';
// import ProgressComponent from '@material-ui/core/CircularProgress';

function Meeting({teach}) {
  const [loading, setLoading] = useState(true);
  const containerStyle = {
    width: '800px',
    height: '400px',
  };

  const jitsiContainerStyle = {
    display: (loading ? 'none' : 'block'),
    width: '100%',
    height: '100%',
  }

 function startConference() {
  try {
   const domain = `connect.247meetings.net`;
   const options = {
    roomName: teach,
    height: 400,
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
     GENERATE_ROOMNAMES_ON_WELCOME_PAGE: true,
     DISPLAY_WELCOME_PAGE_CONTENT: true,
     DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
     INVITATION_POWERED_BY: true
    },
    configOverwrite: {
     disableSimulcast: false,
    },
   };

   const api = new window.JitsiMeetExternalAPI(domain, options);
   api.addEventListener('videoConferenceJoined', () => {
    console.log('Local User Joined');
    setLoading(false);
    api.executeCommand('displayName', 'MyName');
   });
  } catch (error) {
   console.error('Failed to load Jitsi API', error);
  }
 }

 useEffect(() => {
  // verify the JitsiMeetExternalAPI constructor is added to the global..
  if (window.JitsiMeetExternalAPI) startConference();
  else alert('Jitsi Meet API script not loaded');
 }, []);

 return (
  <div
  //  style={containerStyle}
  >
   {/* {loading && <ProgressComponent />} */}
   {loading }

   <div
    id="mycontainer"
    // style={jitsiContainerStyle}
   />
  </div>
 );
}

export default Meeting;








// import React, { useState, useEffect } from 'react';
// import { MDCCircularProgress } from '@material/circular-progress';


// const Meeting = () => {
//     const [ loading,  setLoading ] = useState(true);
//     const containerStyle = {
//         width: '800px',
//         height: '400px',
//     };

//     const meetingContainerStyle = {
//         display: (loading ? 'none' : 'block'),
//         width: '100%',
//         height: '100%',
//     }

//     const startConference = () => {
//         try {
//           const domain = 'connect.247meetings.net';
//           const options = {
//               roomName: 'roomName',
//               height: 400,
//               parentNode: document.getElementById('meetingcontainer'),
//               interfaceConfigOverwrite: {
//                 filmStripOnly: false,
//                 SHOW_JITSI_WATERMARK: false,  
//               },
//               configureOverWrite: {
//                   disableSimulcast: false,
//               },
//           };

         
//            const api = new window.JitsiMeetExternalAPI(domain, options);
//            api.addEventListener('videoConferenceJoined', () => {
//                console.log('local user joined');
//                setLoading(true);
//                api.executeCommand('displayName', 'testName')
//            });
//         } catch (error) {
//               console.log('failed to load meeting widget.')
            
//         }
//     }

//          useEffect(() => {
//            if( window.JitsiMeetExternalAPI ) startConference();
//            else alert('Meeting web api is not loaded.')

//          }, [])
     

//         return (
//             <div 
//               style={containerStyle}
//             >
//               {/* {loading && <MDCCircularProgress />} */}
//               {loading }

//               <div 
//                  id="meetingcontainer'"
//                 //  style={meetingContainerStyle}
//                />    

//             </div>
//         );
// }

// export default Meeting;