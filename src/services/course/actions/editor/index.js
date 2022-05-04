
export const saveEditorMarkDownObjectToMw = markDownContent => ({
    type: markDownContent?.actionType,
    payload: markDownContent
});