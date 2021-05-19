export const helpIconStyle = () => {
  return {
    fontSize: 70,
    position: "fixed",
    "z-index": 1, 
    left: "50%",
    top: "-3%",
  }
}

export const iconStyle = () => {
  return {
    fontSize: 70,
    "margin-right": "60px",
  }
}

export const plusOneIconStyle = () => {
  return {
    fontSize: 70,
    "margin-left": "50%",
  }
}

export const iconStyleMain = () => {
  return {
    fontSize: 75,
    'margin-left': '10px',
    'margin-bottom': '-13%'
  }
}

export const onlineAnswerVideoDeleteIconStyle = ( recording, id, selectedId ) => {
  return {
    fontSize: 70, 
    visibility: ( recording  && id === selectedId ) ? "hidden" : "visible"
  }
}

export const saveIconStyle = ( id, selectedId ) => {
  return {
    fontSize: 70,
    visibility: ( id === selectedId ) ? "visible" : "hidden"
  }
}

// export const deleteQuestionIconStyle = () => {
//   return {
//     fontSize: 70,
//     marginTop : '-55%',
//     marginLeft : '50%',
//     // visibility: ( recording ) ? "hidden" : "visible"
//   }
// }