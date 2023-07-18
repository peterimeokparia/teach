export const onlineQuestionVideoDeleteIconStyle = ( recording, id, selectedId ) => {
  return {
    fontSize: 60,
    visibility: ( recording  && id === selectedId  ) ? "hidden" : "visible"
  };
};

export const saveIconStyle = ( id, selectedId ) => {
  return {
    fontSize: 70,
    visibility: ( id === selectedId ) ? "visible" : "hidden"
  };
};

export const iconStyle = ( id, selectedId ) => {
  return {
    fontSize: 25,
    "marginLeft": "105px",
    "marginBottom": "-15px",
    visibility: ( id === selectedId ) ? "visible" : "hidden"
  };
};

export const plusOneIconStyle = ( id, selectedId ) => {
  return {
    fontSize: 25,
    "marginLeft": "-1px",
    "marginBottom": "-58px",
    "z-index": 1,
    position: "fixed",
    visibility: ( id === selectedId ) ? "visible" : "hidden"
  };
};

export const deleteQuestionIconStyle = () => {
  return {
    fontSize: 60,
    "top": "-100%",
    "marginLeft": "95%",
    "marginBottom": "1%",
  };
};

export const plusOneIconStyleHeader = ( id, selectedId ) => {
  return {
    fontSize: 30,
    "z-index": 1,
    "marginTop": "-15px",
    "marginBottom": "15px",
    "marginLeft": "93%",
    color:"greenyellow",
    visibility: ( id === selectedId ) ? "visible" : "hidden"
  };
};

export const addIconStyleHeader = ( id, selectedId ) => {
  return {
    // fontSize: 30,
    "z-index": 1,
    "top": "130%",
    // "marginBottom": "15px",
    // "marginLeft": "90%",
    visibility: ( id === selectedId ) ? "visible" : "hidden"
  };
};

export const toggleIconStyleHeader = ( id, selectedId ) => {
  return {
    fontSize: 30,
    "z-index": 1,
    "marginBottom": "150px",
    visibility: ( id === selectedId ) ? "visible" : "hidden"
  };
};

export const saveQuestionIconStyle = () => {
  return {
    fontSize: 50,
    "top": "-100%",
    "marginLeft": "95%",
    "marginBottom": "1%",
  };
};

export const onlineListItemsExitVideoCallIcon = ( capturingVideo ) => {
  return  {
    fontSize: 70,
    position: "relative",
    "top": ( capturingVideo ) ? "-130px" : "",
    "margin-left": ( capturingVideo ) ? "5%" : "1%",
    "visibility": ( capturingVideo ) ? "visible" : "hidden", 
  };
};

export const videoCallIconMain = ( capturingVideo, id, selectedId ) => {
  return {
    fontSize: 60,
    "visibility": ( capturingVideo && id === selectedId ) ? "hidden" : "visible",
  };
};

export const exitVideoCallIcon = (capturingVideo, id, selectedId  ) => {
  return {
    fontSize: 60,
    position: "relative",
    "visibility": ( capturingVideo && id === selectedId ) ? "visible" : "hidden",
  };
};

export const videoCallIcon = ( capturingVideo, id, selectedId  ) => {
  return {
    fontSize: 55,
    position: "relative",
    "visibility": ( capturingVideo && id === selectedId ) ? "visible" : "hidden",
  };
};

export const shareScreenIcon = ( capturingVideo, id, selectedId  ) => {
  return {
    fontSize: 55,
    position: "relative",
    visibility: ( capturingVideo && id === selectedId ) ? "visible" : "hidden"
  };
};

export const videoMeta = element  => { 
  return {
    videoCallIconMain,
    deleteIconStyle: onlineQuestionVideoDeleteIconStyle,
    videoCallIcon,
    shareScreenIcon,
    exitVideoCallIcon,
    videoNamePrefix: 'OnlineQuestionVideoMarkDownEditors', 
    recordButtonText: 'Record Question',
    displayMaterialButton: true,
    videoSectionClassNameRecording: "mainVideoSection-recording",
    videoSectionClassNameRecordingStopped: "mainVideoSection-recordingStopped",
    videoSectionClassNameNoRecording: "mainVideoSection-recordingStopped", 
    videoClassName: ( element?.videoUrl === ""  ) ? "videoPlayer" : "",
    exitVideoCallIconPageName: "OnlineListItems",
    videoSectionCallOut: "videoSectionCallOut",
    videoMetaData: { inputFieldId: element?._id, currentQuestion: element, name: element?._id?.toString() },
    videoName: `${element?._id}_${element?._id}_${element?._id}_${element?.type}`,
    videoMetaDataExternalId:'name',
    buttonClassName: `toggle-stage-btns${( true ) ? "-show" : "-hide"}`, 
    objectId: element?._id, 
    displaySavedRecording: true
  }};
  


