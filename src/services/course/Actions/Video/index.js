export const RECORDING_STATUS_RECORDING_STARTED = "RECORDING STATUS RECORDING STARTED";
export const RECORDING_STATUS_RECORDING_ENDED = "RECORDING STATUS RECORDING ENDED";
export const RECORDING_DIALOG_OPEN = "RECORDING DIALOG OPEN";
export const RECORDING_DIALOG_CLOSED = "RECORDING DIALOG CLOSED";


export const recordingStatusRecordingStarted= () => ({
    type: RECORDING_STATUS_RECORDING_STARTED
});

export const recordingStatusRecordingStopped = () => ({
   type: RECORDING_STATUS_RECORDING_ENDED
});

export const recordingDialogOpen= () => ({
    type: RECORDING_DIALOG_OPEN
});

export const recordingDialogClosed = () => ({
   type: RECORDING_DIALOG_CLOSED
});