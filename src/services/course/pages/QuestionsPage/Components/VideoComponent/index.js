import { 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import {
videoComponentMeta } from 'Services/course/Actions/Video';
   
import MaterialVideoPage from 'Services/course/Pages/MaterialVideoPage';
import './style.css';

const VideoComponent = ({
element,
videoComponentMeta,
objectId,
video,
//config,
// onlineQuestionId,
// toggleRecording,
// toggleCamera,
// toggleScreenSharing,
// id, 
// name,
// className,
// recordButtonText,
// videoMetaData,
// videoMetaDataExternalId,
// videoNamePrefix,
// videoName,
// objectId,
// displayMaterialButton,
// videoSectionClassName,
// handleSubmit
}) => {

let videoMeta = {
   // videoCallIcon,
   // exitVideoCallIcon,
   // shareScreenIcon,
   // deleteIconStyle: onlineAnswerVideoDeleteIconStyle,
   // videoCallIconMain,
   // saveIconStyle: saveIconStyle,
   recordingOn: false,
   recordButtonText: 'Record Answer',
   videoSectionClassNameRecording: "answerVideoSection-recording",
   videoSectionClassNameRecordingStopped: "answerVideoSection-recordingStopped",
   videoSectionClassNameNoRecording: "mainVideoSection-recordingStopped", 
   videoClassName: ( element?.videoUrl === "" || element?.videoUrl === undefined ) ? "" : "",
   exitVideoCallIconPageName: "ManageEditors",
   videoSectionCallOut: "answerVideoSectionCallOut",
   objectId,
   videoMetaData:({inputFieldId: element?.id, currentQuestion: element} ),
   videoMetaDataExternalId:'name',
   videoName:`${element?.id}_${element?.questionNumber}_${element?.id}_${element?.type}`,
   //videoNamePrefix,
   //videoNamePrefix:"QuestionVideoMarkDownEditors",
}; 

// useEffect(() => {

//    videoComponentMeta({ ...video, videoMeta  });
   
//    }, [ video, videoComponentMeta ]);
   
return (
   <div>
      <MaterialVideoPage element={element} />
   </div>
   );
};

const mapDispatch = {
   videoComponentMeta,
 };
 
const mapState = ( state, ownProps ) => {
return {
   hasRecordingStarted: state?.hasRecordingStarted?.hasRecordingStarted,
   isRecordingDialogOpen: state.hasRecordingStarted.recordingDialogOpen
};
};

export default connect( mapState, mapDispatch )( VideoComponent );