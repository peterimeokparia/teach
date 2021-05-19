import produce from 'immer';

import {
RECORDING_STATUS_RECORDING_STARTED, 
RECORDING_STATUS_RECORDING_ENDED } from '../../Actions/Video';

const initialState = {
    hasRecordingStarted: false
};

const reducer = produce((draft, action) => {
    switch(action.type){
        case RECORDING_STATUS_RECORDING_STARTED:
             draft.hasRecordingStarted = true;
        return;
        case RECORDING_STATUS_RECORDING_ENDED:
             draft.hasRecordingStarted = false;
        return;
        default:
        return;
    }
    
}, initialState);

export default reducer;