export const TOGGLE_PREVIEW_MODE = "TOGGLE PREVIEW MODE";
export const UPLOAD_FILE_SUCCESS = "UPLOAD FILE SUCCESS";

export const uploadFiles = ( files ) => {
    return dispatch => {
        dispatch({ type: UPLOAD_FILE_SUCCESS, payload: files});
    };
};

export const togglePreviewMode = () => ({
   type: TOGGLE_PREVIEW_MODE
});