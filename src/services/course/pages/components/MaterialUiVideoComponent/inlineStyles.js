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

export const deleteQuestionIconStyle = () => {
  return {
    fontSize: 60,
    "top": "-100%",
    "marginLeft": "95%",
    "marginBottom": "1%",
  };
};

export const saveQuestionIconStyle = () => {
  return {
    fontSize: 60,
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