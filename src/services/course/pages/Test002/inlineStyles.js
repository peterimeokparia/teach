export const helpIconStyle = () => {
  return {
    fontSize: 70,
    position: "fixed",
    "zIndex": 1, 
    left: "50%",
    top: "-3%",
  };
};

export const iconStyle = () => { 
  return {
    fontSize: 45,
    "top": "-95%",
    "marginLeft": "55%",
    "marginBottom": "1%",
  };
};

export const adjustRoomIcon = ( meetingOn ) => { 
  return {
    fontSize: 45,
    'margin-left': '70px',
    'margin-right': '40px',
    'visibility': ( meetingOn ) ? 'visible' : 'hidden'
  };
};

export const editorSaveIconStyle = () => { 
  return {
    fontSize: 60,
    "top": "-95%",
    "marginLeft": "55%",
    "marginBottom": "1%",
  };
};

export const plusOneIconStyle = () => {
  return {
    fontSize: 45,
    "margin-left": "2%"
  };
};

export const iconStyleMain = () => {
  return {
    fontSize: 45,
  };
};

let globalTest = false;
export const videoCallIconMain = ( capturingVideo ) => {
  globalTest = true;
  return {
    fontSize: 70,
    position: "fixed",
    "zIndex": 1, 
    left: "36%",
    top: "-3%",
    // fontSize: 45,
    // position: "relative",
    // "top": ( capturingVideo ) ? "-130px" : "",
    // "margin-left": ( capturingVideo ) ? "20%" : "1%",
    // "visibility": ( capturingVideo ) ? "hidden" : "visible", 
  };
};

export const onlineAnswerVideoDeleteIconStyle = ( recording, id, selectedId ) => {
  return {
    fontSize: 45, 
    "margin-bottom": "%", 
    visibility: ( recording  && id === selectedId ) ? "hidden" : "visible"
  };
};

export const saveIconStyle = () => {
  return {
    fontSize: 45
  };
};

export const exitVideoCallIcon = (capturingVideo ) => {
  return {
    fontSize: 45,
    position: "relative",
    "visibility": ( capturingVideo ) ? "visible" : "hidden",
  };
};

export const videoCallIcon = ( ) => {
  return {
    fontSize: 45,
    'margin-left': '0px',
  };
};

export const savedBoardIcon = ( color) => {
  return {
    fontSize: 45,
    'margin-left': '0px',
     color:color
  };
};

export const shareScreenIcon = ( capturingVideo ) => {
  return {
    fontSize: 45,
    position: "relative",
    "visibility": ( capturingVideo ) ? "visible" : "hidden",
  };
};

export const onlineQuestionVideoDeleteIconStyle = ( recording, id, selectedId ) => {
  return {
    fontSize: 45,
    visibility: ( recording  && id === selectedId  ) ? "hidden" : "visible"
  };
};



export const videoMeta = (element) =>  { 
  return {
  videoCallIconMain,
  videoCallIcon,
  shareScreenIcon,
  exitVideoCallIcon,
  deleteIconStyle: onlineQuestionVideoDeleteIconStyle,
  videoNamePrefix: 'LessonVideo', 
  recordButtonText: 'Record Question',
  displayMaterialButton: false,
  videoSectionClassNameRecording: "mainVideoSection-recording",
  videoSectionClassNameRecordingStopped: "mainVideoSection-recordingStopped",
  videoSectionClassNameNoRecording: "mainVideoSection-recordingStopped", 
  videoClassName: ( element?.videoUrl === ""  ) ? "videoPlayer" : "",
  exitVideoCallIconPageName: "OnlineListItems",
  videoSectionCallOut: `${globalTest ? 'videoSectionCallOut-selected' : 'videoSectionCallOut'}`,
  videoMetaData: {element},
  // videoMetaData: { inputFieldId: element?._id, currentQuestion: element, name: element?._id?.toString() },
  videoName: `${element?._id}_${element?._id}_${element?._id}_${element?.type}`,
  videoMetaDataExternalId:"courseId",
  buttonClassName: `toggle-stage-btns${( true ) ? "-show" : "-hide"}`, 
  objectId: element?._id,
  displaySavedRecording: false,
  displayVideoPlayer: false
 }; 
};