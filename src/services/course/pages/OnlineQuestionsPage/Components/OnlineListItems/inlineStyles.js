
export const onlineQuestionVideoDeleteIconStyle = ( recording, id, selectedId ) => {
  return {
    fontSize: 70,
    visibility: ( recording && id === selectedId ) ? "hidden" : "visible"
  }
}


export const saveIconStyle = ( id, selectedId ) => {
  return {
    fontSize: 70,
    visibility: ( id === selectedId ) ? "visible" : "hidden"
  }
}

export const deleteQuestionIconStyle = () => {
  return {
    fontSize: 70,
    marginTop : '-55%',
    marginLeft : '50%',
    // visibility: ( recording ) ? "hidden" : "visible"
  }
}