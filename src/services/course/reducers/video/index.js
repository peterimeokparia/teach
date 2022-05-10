import produce from 'immer';

import {
RECORDING_STATUS_RECORDING_STARTED, 
RECORDING_STATUS_RECORDING_ENDED, 
RECORDING_DIALOG_OPEN,
RECORDING_DIALOG_CLOSED } from '../../actions/video';

const initialState = {
    hasRecordingStarted: false,
    recordingDialogOpen: false,
};

const reducer = produce((draft, action) => {
    switch(action.type){
        
        case RECORDING_STATUS_RECORDING_STARTED:
             draft.hasRecordingStarted = true;
        return;
        case RECORDING_STATUS_RECORDING_ENDED:
             draft.hasRecordingStarted = false;
        return;
        case RECORDING_DIALOG_OPEN:
            draft.recordingDialogOpen = true;
       return;
       case RECORDING_DIALOG_CLOSED:
            draft.recordingDialogOpen = false;
       return;
        default:
        return;

    }
}, initialState);

export default reducer;
