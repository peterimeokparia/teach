export const helpIconStyle = () => {
  return {
    fontSize: 70,
    position: "fixed",
    "z-index": 1, 
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

export const videoCallIconMain = ( capturingVideo ) => {
  return {
    fontSize: 60,
    position: "relative",
    "top": ( capturingVideo ) ? "-130px" : "",
    "margin-left": ( capturingVideo ) ? "20%" : "1%",
    "visibility": ( capturingVideo ) ? "hidden" : "visible", 
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

export const exitVideoCallIcon = (capturingVideo ) => {
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