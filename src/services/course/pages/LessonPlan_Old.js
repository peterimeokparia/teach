import React, { useState, useEffect  } from 'react';
import { connect } from 'react-redux';
import LessonPlanIframeComponent from './LessonPlanIframeComponent'
import CheckBoxComponent from './CheckBoxComponent';
import MeetingIframeComponent from './MeetingIframeComponent';
import VideoPage from './VideoPage';
import { toggleTeachBoardOrEditor, updateUserInvitationUrl, setLessonInProgressStatus, inviteStudentsToLearningSession, loadMeetings, saveMeeting } from '../actions';
import { toggleVideoCapture } from '../../recorder/actions.js';
import { Validations } from  '../../../helpers/validations';
import NavLinks  from './NavLinks';
import './LessonPlan.css';
import Meeting from './Meeting';
import ReactModal from 'react-modal-resizable-draggable';
// import Portal from 'src/pages/Portal'



const LessonPlan = ({ 
      courseId,  
      lessonId, 
      lessonTitle,
      lessons,
      currentUser,
      boardOrEditor,
      toggleTeachBoardOrEditor,
      updateUserInvitationUrl,
      setLessonInProgressStatus,
      studentsSubscribedToThisCourse,
      loadMeetings,
      saveMeeting,
      lessonStarted,
      currentMeeting }) => {
   


  const page = `${courseId}_${lessonId}_${lessonTitle}`;
  let urls = {
      meeting:{ prod: `https://connect.247meetings.net/${page}`, dev:`https://connect.247meetings.net/${page}`},
      editor:{ prod:`https://padsconnect247.com/editor/p/${lessonTitle}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`, dev:`http://localhost:9002/p/${lessonTitle}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false` },
      canvas:{ prod:`https://padsconnect247.com/whiteboard/?whiteboardid=${page}&username=${currentUser?.username}`, dev:`http://localhost:8080/?whiteboardid=${page}&username=${currentUser?.username}`},
      recorder:{ prod:`https://padsconnect247.com/LessonPlan/VideoModal/${courseId}/${lessonId}/${lessonTitle}`, dev:`http://localhost:3000/LessonPlan/VideoModal/${courseId}/${lessonId}/${lessonTitle}`}
  };     
    
    
  const editorUrl = urls.editor.dev;
  const canvasUrl = urls.canvas.dev;
  const meetingUrl = urls.meeting.dev; 
  const recorderUrl = urls.recorder.dev;    
  
  const fullScreenSize = "1536px";
  const mainStageSize = "1125px";
  const hideMeetingStageSize = 0;
  const showMeetingStageSize = 440; 

  const [hideMeetingStage, setHideMeetingStage] = useState(false);
  const [fullMeetingStage, setFullMeetingStage] = useState(false);
  const [videoModalModeOn,  setVideoModalMode] = useState(false);
  const [meetingStageSize, setMeetingStageSize] = useState(600);
  const [session, setSession] = useState(false);
  const [loading, setLoading] = useState(true);
 

  

  const lesson = Object.values(lessons).filter(thisLesson => thisLesson._id === lessonId) 

  const alertRecording = () => {
   
    Validations.warn('Recording In Progress. To end this teaching session, please stop the recording.');
  };



  const toggleTeach = () => {

    if ( session ){
        
        if ( videoModalModeOn ){
            
            alertRecording();
            return;
        }

        if ( fullMeetingStage ){
           setFullMeetingStage(false);
           
        }

        setSession(false);
        
        let meeting = currentMeeting.find(meeting => meeting?.id === currentUser?.meetingId);

        let meetingInvitees = studentsSubscribedToThisCourse?.filter(student => meeting.invitees.includes(student?._id));

          if ( meeting ) {

            saveMeeting(currentUser?.meetingId, {...currentMeeting.find(meeting => meeting?.id === currentUser?.meetingId), timeEnded: Date.now() });  


            // meeting.invitees.map(invitee => {
              meetingInvitees.map(invitee => {
    
              let setInvitationUrl = "";
              let nameOfLessonInProgress = lesson.title;     
              let lessonInProgress = false;    
        
               updateUserInvitationUrl(invitee, setInvitationUrl, nameOfLessonInProgress, lessonInProgress); 
    
            });
          }
           

    }
    else{

        setSession(true);

        loadMeetings(currentUser._id);

    }

  }



    const meetingStage = () => {

      setMeetingStageSize(0);

      if( session && hideMeetingStage ){
        
        setHideMeetingStage(false);

      } 
      else{
    
        setHideMeetingStage(true);
        
        setFullMeetingStage(false);

      }
    }


    const showFullMeetingStage = () => {

      if ( fullMeetingStage ){
          
        setFullMeetingStage(false);

      }
      else{

        setFullMeetingStage(true);

      } 
      
    }



  const resetAllStartSettings = ( value ) => {

     console.log('resetAllSettings', value);

    if ( hideMeetingStage ){
        setHideMeetingStage(false);
    }

  }



  const resetAllStopSettings = ( value ) => {

    console.log('resetAllStopSettings', value);

    if ( videoModalModeOn ){
        setVideoModalMode(false);
    }
  }

 
 let width = (hideMeetingStage) ?  showMeetingStageSize  : hideMeetingStageSize;   
//  (hideMeetingStage) ? hideMeetingStageSize : showMeetingStageSize 
  //delete
 const recordSessionLink = () => ( <span>  <a href={recorderUrl} target="_blank">Start Recording</a></span> );
 
 console.log('user agent test', window.navigator.userAgent)

    return (

        <div className="LessonPlan"> 
              
              <header> 

                <h1>
                <NavLinks to={`/courses/${courseId}/lessons/${lessonId}`}> {lessonTitle}   </NavLinks>
                </h1>
                
  
                <div className="lesson-item"> 

                      <span className="span-btns">  
                      {/* <CheckBoxComponent courseId={courseId}/> */}
                          {/* images / gif */}

                            {/* <button className="plan-lesson-btn" onClick={endALlMeetingSessions}> End All Sessions </button> */}

                            <button className="plan-lesson-btn" onClick={toggleTeach}> { session ? 'End' : 'Join Video Conference' } </button>

                            <button className={ `toggle-stage-btns${fullMeetingStage ? "-hide" : "-show"}` } onClick={toggleTeachBoardOrEditor}> { boardOrEditor ? 'Board' : 'Editor' } </button>         

                            <button className={`toggle-stage-btns${(session) ? (fullMeetingStage) ?  "-hide" : "-show" : "-hide" }`}  onClick={meetingStage}> { ( session && hideMeetingStage ) ? "Show Meeting Stage"  :  "Hide Meeting Stage"  } </button> 
                            
                            <VideoPage buttonClassName={`toggle-stage-btns${( session ) ? "-show" : "-hide"}`} recordStream={session} resetAllStartSettings={all => resetAllStartSettings(all)}  resetAllStopSettings={stage => resetAllStopSettings(stage)}   setVideoModalMode={stage => setVideoModalMode(stage)} lesson={lesson}/>
                            
                            <button className={`toggle-stage-btns${(session) ? "-show" : "-hide"}`}  onClick={showFullMeetingStage}> { ( fullMeetingStage ) ? "Meeting Stage Half" : "Meeting Stage Full"   } </button> 
                        </span>
                </div>

              </header>

             <div className="content">
               
              <div className="sidebar"> 
               
              {/* {
                  boardOrEditor ? <div> < LessonPlanIframeComponent 
                                              name="embed_readwrite" 
                                              source={editorUrl}
                                              width={session  ? (( hideMeetingStage ) ? fullScreenSize : mainStageSize ) :  fullScreenSize }
                                              height="900px"
                                              allow="camera;microphone"
                                              scrolling="auto"
                                              frameBorder="0" 
                                        /> 
                                  </div> 
                              :        
                                  <div> < LessonPlanIframeComponent 
                                                name="embed_readwrite" 
                                                source={canvasUrl}
                                                width={session  ? (( hideMeetingStage ) ? fullScreenSize : mainStageSize ) :  fullScreenSize }
                                                height="900px"
                                                allow="camera;microphone"
                                                scrolling="auto"
                                                frameBorder="0"
                                          />
                                  </div>
              } */}

               
               { (fullMeetingStage) ? <Meeting 
                                           roomName={"The journey of 1k miles begins with 1 tippy toe"}
                                           width= { fullScreenSize }
                                      />
               
                                    //   <div>  <MeetingIframeComponent  
                                    //             name="embed_readwrite" 
                                    //             source={meetingUrl}
                                    //             width= { fullScreenSize }
                                    //             height="900px"
                                    //             allow="camera;microphone"
                                    //             scrolling="auto"
                                    //             frameBorder="0"
                                    //             recorderLink={recordSessionLink}
                                    //    />

                                    //  </div>
               
                                    :  boardOrEditor ? <div> < LessonPlanIframeComponent 
                                                                            name="embed_readwrite" 
                                                                            source={editorUrl}
                                                                            width={session  ? (( hideMeetingStage ) ? fullScreenSize : mainStageSize ) :  fullScreenSize }
                                                                            height="900px"
                                                                            allow="camera;microphone"
                                                                            scrolling="auto"
                                                                            frameBorder="0" 
                                                              /> 
                                                        </div> 
                                                     :        
                                                        <div> < LessonPlanIframeComponent 
                                                                      name="embed_readwrite" 
                                                                      source={canvasUrl}
                                                                      width={session  ? (( hideMeetingStage ) ? fullScreenSize : mainStageSize ) :  fullScreenSize }
                                                                      height="900px"
                                                                      allow="camera;microphone"
                                                                      scrolling="auto"
                                                                      frameBorder="0"
                                                        />
                                                        </div>
                                                          
                                        } 

                              </div>
           
                              
                                    <div className={ hideMeetingStage ? `meeting-hide` : `meeting`    }> 
                                
                                                      <div>
                                    { ( session && !(fullMeetingStage) ) ?  <Meeting 
                                                                              roomName={"Test...The journey of 1k miles begins with 1 tippy toe"}
                                                                              // width= {  (hideMeetingStage) ? hideMeetingStageSize : showMeetingStageSize } //hideMeetingStage ? 0 : 630
                                                                              width= {showMeetingStageSize} 
                                                                         />
                                                     
                                                                        //  { (fullMeetingStage) ?  hideMeetingStageSize : (hideMeetingStage) ? hideMeetingStageSize : showMeetingStageSize }
                                                      // <MeetingIframeComponent  
                                                      //               name="embed_readwrite" 
                                                      //               source={(fullMeetingStage) ? "https://connect.247meetings.net/" :  (session) ? meetingUrl : "https://connect.247meetings.net/"}
                                                      //               width= { (fullMeetingStage) ?  hideMeetingStageSize : (hideMeetingStage) ? hideMeetingStageSize : showMeetingStageSize }
                                                      //               height="900px"
                                                      //               allow="camera;microphone"
                                                      //               scrolling="auto"
                                                      //               frameBorder="0"
                                                      //               recorderLink={recordSessionLink}
                                                      //   />
                                                        : <div> </div>
                                                                    
                                    }
                                                            
                                                      </div>
                                              
                                  
                                  </div>
                                

                                  <div>
                                     
                                  </div>
                                  {Validations.setErrorMessageContainer()}
                                  </div>
                            </div>

                  );


}



const mapState = ( state, ownProps )   => {
  return {
         currentUser: state.users.user,
         lessons: state.lessons.lessons,
         lessonStarted: state.lessons.lessonStarted,
         boardOrEditor: state.lessons.toggleTeachBoardOrEditor,
         setVideoCapture: state.streams.setVideoCapture,
         invitees: state.users.invitees,
         studentsSubscribedToThisCourse : Object.values(state?.users?.users)?.filter(user => user?.role === "Student" && user?.courses?.includes(ownProps?.courseId)),
         currentMeeting: state.meetings.meetings
  };
}


export default connect(mapState, { toggleTeachBoardOrEditor, toggleVideoCapture, updateUserInvitationUrl, setLessonInProgressStatus,  inviteStudentsToLearningSession, loadMeetings, saveMeeting } )(LessonPlan);