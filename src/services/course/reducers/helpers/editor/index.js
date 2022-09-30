export function saveEditorMarkDownContent( collection, action ){
    let indexValue =  Object.values( collection ).findIndex(item => item?._id === action?.payload._id );
    Object.values( collection ).splice(indexValue, 1, {...action.payload, markDownContent: action.payload.markDownContent });
}