import produce from 'immer';
import { STREAMING_SUCCESS } from '../services/course/actions';
// import { ADD_STREAM_BEGIN, ADD_STREAM_SUCCESS,  ADD_STREAM_ERROR, 
//           LOAD_STREAMS_BEGIN, LOAD_STREAMS_SUCCESS, LOAD_STREAMS_ERROR, 
//             LOAD_STREAM_BEGIN, LOAD_STREAM_SUCCESS, LOAD_STREAM_ERROR, 
//               SAVE_STREAM_BEGIN, SAVE_STREAM_SUCCESS, SAVE_STREAM_ERROR, 
              //   DELETE_STREAM_SUCCESS, TOGGLE_STREAM, DELETE_STREAM_BEGIN, DELETE_STREAM_ERROR, 
                import { LESSON_VIDEO_METADATA} from '../services/course/actions';


 


const initialState = {
    streams: [],
    metaData: {},
    saveInProgress: false,
    onSaveError: null,
    loadingInProgress: false,
    onLoadError: null,
    setVideoCapture: false
};

const reducer = produce((draft, action) => {
    switch(action.type){

       //  case ADD_STREAM_BEGIN: 
       //  case SAVE_STREAM_BEGIN:       
       //          draft.saveInProgress = true;
       //          draft.onSaveError = null;
       //   return;

       //  case ADD_STREAM_SUCCESS:
       //  case SAVE_STREAM_SUCCESS:          
       //          draft.saveInProgress = false;
       //          draft.streams[action.payload.id] = action.payload; 
       //   return;

       //   case ADD_STREAM_ERROR:
       //   case SAVE_STREAM_ERROR:        
       //          draft.onSaveError = action.error;
       //          draft.saveInProgress = false;
       //   return;


       //   case LOAD_STREAMS_BEGIN:    
       //   case LOAD_STREAM_BEGIN: 
       //          draft.loadingInProgress = true;
       //   return;

       //  case LOAD_STREAMS_SUCCESS:   
       //          draft.loadingInProgress = false;
       //          action.payload.forEach( stream => {
       //          draft.streams[stream.id] = stream;
       //        });  
              
       //   return;

       //   case LOAD_STREAMS_ERROR: 
       //   case LOAD_STREAM_ERROR:     
       //          draft.onSaveError = action.error;
       //          draft.loadingInProgress = false;
       //   return;



       //  case LOAD_STREAM_SUCCESS:   
       //      draft.loadingInProgress = false;
       //      draft.streams[action.payload.id] = action.payload; 
              
       //   return;

       //   case TOGGLE_STREAM:   
       //   draft.setVideoCapture = (! draft.setVideoCapture );
        
       //   return;

         case LESSON_VIDEO_METADATA:   
         draft.metaData = action.payload;
        
         return;

       //   case DELETE_STREAM_SUCCESS:   
       //        delete draft.streams[action.payload.id];
              
       //   return;

        default:
        return;

    }
    
}, initialState);


export default reducer;