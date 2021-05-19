export const videoCallIconMain = ( capturingVideo ) => {
  return {
    fontSize: 70,
    position: "relative",
    "top": ( capturingVideo ) ? "-130px" : "",
    "margin-left": ( capturingVideo ) ? "20%" : "1%",
    "visibility": ( capturingVideo ) ? "hidden" : "visible",
  }
}

export const exitVideoCallIcon = ( capturingVideo ) => {
  return {
    fontSize: 70,
    position: "relative",
    // "top": ( capturingVideo ) ? "-130px" : "",
    // "margin-right": ( capturingVideo ) ? "-80%" : "1%",


    //@@@@@@@@@@
    "top": ( capturingVideo ) ? "-130px" : "",
    "margin-left": ( capturingVideo ) ? "5%" : "1%",
        //@@@@@@@@@@
    "right": ( capturingVideo ) ? "58%" : "1%",
    "visibility": ( capturingVideo ) ? "visible" : "hidden",



    //fontSize: 70,
    //position: "relative",
    // "top": ( capturingVideo ) ? "-130px" : "",
    // "margin-left": ( capturingVideo ) ? "5%" : "1%",
    // "margin-left": ( capturingVideo ) ? "5%" : "1%",
    //"visibility": ( capturingVideo ) ? "visible" : "hidden",
  }
}

export const videoCallIcon = ( capturingVideo ) => {
  return {
    // fontSize: 60,
    // position: "relative",
    // "top": ( capturingVideo ) ? "-130px" : "",

    fontSize: 60,
    position: "relative",
    "top": ( capturingVideo ) ? "130px" : "",
    "margin-left": ( capturingVideo ) ? "-50%" : "1%",
    // "top": ( capturingVideo ) ? "-30px" : "",
    "top": ( capturingVideo ) ? "-130px" : "",
  }
}

export const shareScreenIcon = ( capturingVideo ) => {
  return {
    // fontSize: 60,
    // position: "relative",
    // "margin-left": "5px",
    // "top": ( capturingVideo ) ? "-130px" : "",

    fontSize: 60,
    position: "relative",
    "margin-left": "5px",
    "top": ( capturingVideo ) ? "-130px" : "",
    "margin-top": "160px",
    // "top": ( capturingVideo ) ? "-30px" : "",
  }
}