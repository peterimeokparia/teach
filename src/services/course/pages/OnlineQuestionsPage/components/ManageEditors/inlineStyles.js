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
    fontSize: 60,
    "top": "-95%",
    "marginLeft": "55%",
    "marginBottom": "1%",
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
    fontSize: 60,
    "margin-left": "2%"
  };
};

export const iconStyleMain = () => {
  return {
    fontSize: 67,
    'margin-left': '90px'
  };
};

export const videoCallIconMain = ( capturingVideo, id, selectedId ) => {
  return {
    fontSize: 60,
    position: "relative",
    "top": ( capturingVideo && id === selectedId  ) ? "-130px" : "",
    "margin-left": ( capturingVideo && id === selectedId  ) ? "20%" : "1%",
    "visibility": ( capturingVideo && id === selectedId  ) ? "hidden" : "visible", 
  };
};

export const onlineAnswerVideoDeleteIconStyle = ( recording, id, selectedId ) => {
  return {
    fontSize: 60, 
    "margin-bottom": "%", 
    visibility: ( recording  && id === selectedId ) ? "hidden" : "visible"
  };
};

export const saveIconStyle = ( id, selectedId ) => {
  return {
    fontSize: 70,
    visibility: ( id === selectedId ) ? "visible" : "hidden"
  };
};

export const exitVideoCallIcon = ( capturingVideo ) => {
  return {
    fontSize: 60,
    position: "relative",
    "visibility": ( capturingVideo ) ? "visible" : "hidden",
  };
};

export const videoCallIcon = ( capturingVideo ) => {
  return {
    fontSize: 55,
    position: "relative",
    "visibility": ( capturingVideo ) ? "visible" : "hidden",
  };
};

export const shareScreenIcon = ( capturingVideo ) => {
  return {
    fontSize: 55,
    position: "relative",
    "visibility": ( capturingVideo ) ? "visible" : "hidden",
  };
};

export const videoMeta = element => { 
  return {
  videoCallIcon,
  exitVideoCallIcon,
  shareScreenIcon,
  deleteIconStyle: onlineAnswerVideoDeleteIconStyle,
  videoCallIconMain,
  saveIconStyle: saveIconStyle,
  recordingOn: false,
  videoNamePrefix: 'OnlineAnswerVideoMarkDownEditors', 
  displayMaterialButton: true,
  recordButtonText: 'Record Answer',
  videoSectionClassNameRecording: "answerVideoSection-recording",
  videoSectionClassNameRecordingStopped: "answerVideoSection-recordingStopped",
  videoSectionClassNameNoRecording: "mainVideoSection-recordingStopped", 
  videoClassName: ( element?.videoUrl === "" || element?.videoUrl === undefined ) ? "" : "",
  videoName: `${element?._id}_${element?._id}_${element?._id}_${element?.type}`,
  //videoMetaData: { inputFieldId: element?._id, currentQuestion: element },
  videoMetaData: { inputFieldId: element?._id, currentQuestion: element, name: element?._id?.toString() },
  //deleteVideo: () => deleteVideo( element ),
  exitVideoCallIconPageName: "ManageEditors",
  videoSectionCallOut: "answerVideoSectionCallOut",
  videoMetaDataExternalId:'name',
  objectId: element?._id,
  displaySavedRecording: true
}; }; 