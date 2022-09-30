import produce from 'immer';

import { 
TOGGLE_PREVIEW_MODE, 
UPLOAD_FILE_SUCCESS, 
TOGGLE_MODAL,
FORM_WIZARD_STEP } from '../../actions/app';

const initialState = {
    previewMode : false,
    toggleModal: false,
    selectedFile: null,
    formWizardStep: null
};

const reducer = produce((draft, action) => {
    switch ( action.type ) {

    case UPLOAD_FILE_SUCCESS:
        draft.selectedFile = action.payload;
    return;
    case TOGGLE_PREVIEW_MODE:
        draft.previewMode = ! draft.previewMode;
    return;
    case TOGGLE_MODAL:
        draft.toggleModal = ! draft.toggleModal;
    return;
    case FORM_WIZARD_STEP:
        draft.formWizardStep = action.payload;
    return;
    default:
    break;
    
    }
}, initialState);

export default reducer;