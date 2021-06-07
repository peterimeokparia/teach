export const STREAMING_SUCCESS = "STREAMING SUCCESS";
export const LESSON_VIDEO_METADATA = "LESSON VIDEO METADATA";

export const sendMediaStream = ( mediaStream ) => {
    return dispatch => { 
        dispatch({ type: STREAMING_SUCCESS, payload: mediaStream });
    };
};

export const sendVideoMetaData = ( videoMetaData ) => {
    return dispatch => {
          dispatch({ type: LESSON_VIDEO_METADATA, payload: videoMetaData  });
    };
};