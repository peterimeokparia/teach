import { useState, useEffect } from 'services/recorder/node_modules/react';
import { MDCCircularProgress } from '@material/circular-progress';


const Meeting = () => {
    const [ loading,  setLoading ] = useState(true);
    const containerStyle = {
        width: '800px',
        height: '400px',
    };

    const meetingContainerStyle = {
        display: (loading ? 'none' : 'block'),
        width: '100%',
        height: '100%',
    }

    const startConference = () => {
        try {
          const domain = 'connect.247meetings.net';
          const options = {
              roomName: 'roomName',
              height: 400,
              parentNode: document.getElementById('meeting-container'),
              interfaceConfigOverwrite: {
                filmStripOnly: false,
                SHOW_JITSI_WATERMARK: false,  
              },
              configureOverWrite: {
                  disableSimulcast: false,
              },
          };

         
           const api = new window.JitsiMeetExternalAPI(domain, options);
           api.addEventListener('videoConferenceJoined', () => {
               console.log('local user joined');
               setLoading(true);
               api.executeCommand('displayName', 'testName')
           });
        } catch (error) {
              console.log('failed to load meeting widget.')
            
        }
    }

         useEffect(() => {
           if( window.JitsiMeetExternalAPI ) startConference();
           else alert('Meeting web api is not loaded.')

         }, [])
     

        return (
            <div 
              style={containerStyle}
            >
              {loading && <MDCCircularProgress />}

              <div 
                 id="meeting-container'"
                 style={meetingContainerStyle}
               />    

            </div>
        );
}

export default Meeting;