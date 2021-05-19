export const RECORDING_STATUS_RECORDING_STARTED = "RECORDING STATUS RECORDING STARTED";
export const RECORDING_STATUS_RECORDING_ENDED = "RECORDING STATUS RECORDING ENDED";


export const recordingStatusRecordingStarted= () => ({
    type: RECORDING_STATUS_RECORDING_STARTED
});

export const recordingStatusRecordingStopped = () => ({
   type: RECORDING_STATUS_RECORDING_ENDED
});