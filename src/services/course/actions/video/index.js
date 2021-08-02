export const RECORDING_STATUS_RECORDING_STARTED = "RECORDING STATUS RECORDING STARTED";
export const RECORDING_STATUS_RECORDING_ENDED = "RECORDING STATUS RECORDING ENDED";
export const RECORDING_DIALOG_OPEN = "RECORDING DIALOG OPEN";
export const RECORDING_DIALOG_CLOSED = "RECORDING DIALOG CLOSED";
export const TOGGLE_VIDEO_MODAL = "TOGGLE VIDEO MODAL";
export const TOGGLE_RESET_OPTIONS = "TOGGLE RESET OPTIONS";
export const TOGGLE_RECORDING_STATUS = "TOGGLE RECORDING STATUS";
export const TOGGLE_CAMERA_STATUS = "TOGGLE CAMERA STATUS";
export const TOGGLE_SCREENSHARING_STATUS = "TOGGLE SCREENSHARING STATUS";
export const GET_VIDEO_META = "GET VIDEO META";

export const videoComponentMeta = element => ({
    type: GET_VIDEO_META,
    payload: element
});

export const toggleVideoModalMode= element => ({
    type: TOGGLE_VIDEO_MODAL,
    payload: element
});

export const toggleResetOptions= element => ({
    type: TOGGLE_RESET_OPTIONS,
    payload: element
});

export const toggleRecordingStatus= element => ({
    type: TOGGLE_RECORDING_STATUS,
    payload: element
});

export const toggleCameraStatus= element => ({
    type: TOGGLE_CAMERA_STATUS,
    payload: element
});

export const toggleScreenSharingStatus= element => ({
    type: TOGGLE_SCREENSHARING_STATUS,
    payload: element
});

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