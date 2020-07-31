import { createStream,  getStream, removeStream, getStreams, updateStream } from './api';

export const ADD_STREAM_BEGIN = "ADD STREAM BEGIN";
export const ADD_STREAM_SUCCESS = "ADD STREAM SUCCESS";
export const ADD_STREAM_ERROR = "ADD STREAM ERROR";
export const LOAD_STREAMS_BEGIN = "LOAD STREAMS BEGIN";
export const LOAD_STREAMS_SUCCESS = "LOAD STREAMS SUCCESS";
export const LOAD_STREAMS_ERROR = "LOAD STREAMS ERROR";
export const LOAD_STREAM_BEGIN = "LOAD STREAM BEGIN";
export const LOAD_STREAM_SUCCESS = "LOAD STREAM SUCCESS";
export const LOAD_STREAM_ERROR = "LOAD STREAM ERROR";
export const SAVE_STREAM_BEGIN = "SAVE STREAM BEGIN";
export const SAVE_STREAM_SUCCESS = "SAVE STREAM SUCCESS";
export const SAVE_STREAM_ERROR = "SAVE STREAM ERROR";
export const DELETE_STREAM_SUCCESS = "DELETE STREAM SUCCESS";
export const DELETE_STREAM_BEGIN = "DELETE STREAM BEGIN";
export const DELETE_STREAM_ERROR = "DELETE STREAM ERROR";
export const STREAMING_SUCCESS = "STREAMING SUCCESS";
export const TOGGLE_STREAM = "TOGGLE STREAM"; 



 export const addNewStream = ( title, description ) => {
     return dispatch => {
         dispatch({ type: ADD_STREAM_BEGIN })
         return createStream( title, description )
         .then(course => {
             dispatch({ type: ADD_STREAM_SUCCESS, payload: course })
         })
          .catch(error => { 
              dispatch({ type: ADD_STREAM_ERROR, error })
          })
     }
 }


 export const loadStreams = () => {
     return dispatch => {
         dispatch({ type: LOAD_STREAMS_BEGIN })
         getStreams()
          .then( course => {
              dispatch({ type: LOAD_STREAMS_SUCCESS, payload: course });
          })
            .catch( error => {
                dispatch({ type: LOAD_STREAMS_ERROR , error })
            });
     }
 }


 export const loadStream = ( lessonId ) => {
    return dispatch => {
        dispatch({ type: LOAD_STREAM_BEGIN })
        getStream( lessonId )
         .then( stream => {
             dispatch({ type: LOAD_STREAM_SUCCESS, payload: stream });
         })
           .catch( error => {
               dispatch({ type: LOAD_STREAM_ERROR , error })
           });
    }
}



export const deleteStream = stream => {
    return dispatch => {
        dispatch({ type: DELETE_STREAM_BEGIN })
         return removeStream( stream )
         .then( () => {
             dispatch({ type: DELETE_STREAM_SUCCESS, payload: stream });
         })
           .catch( error => {
               dispatch({ type: DELETE_STREAM_ERROR , error })
           });
    }
}



export const saveStream = ( stream ) => {
    return dispatch => {
         dispatch({ type: SAVE_STREAM_BEGIN })
         return updateStream( stream )
          .then( lesson => {  
              dispatch({        
               type: SAVE_STREAM_SUCCESS, payload: stream }) 
           }).catch( error => {
               dispatch({ type: SAVE_STREAM_ERROR , error })
           });
         
    };
};



export const sendMediaStream = ( mediaStream ) => {
    return dispatch => { 
        dispatch({ type: STREAMING_SUCCESS, payload: mediaStream });
    }
}


export const toggleVideoCapture = () => ({
    type: TOGGLE_STREAM 
})








