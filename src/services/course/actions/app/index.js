export const TOGGLE_PREVIEW_MODE = "TOGGLE PREVIEW MODE";
export const UPLOAD_FILE_SUCCESS = "UPLOAD FILE SUCCESS";
export const TOGGLE_MODAL = "TOGGLE MODAL";
export const FORM_WIZARD_STEP = "FORM WIZARD STEP";

export const uploadFiles = ( files ) => {
    return dispatch => {
        dispatch({ type: UPLOAD_FILE_SUCCESS, payload: files});
    };
};

export const togglePreviewMode = () => ({
   type: TOGGLE_PREVIEW_MODE
});

export const toggleModal = () => ({
    type: TOGGLE_MODAL
 });

 export const setFormWizardStep = ( step ) => ({
    type: FORM_WIZARD_STEP, payload: step
 });