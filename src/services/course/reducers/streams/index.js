import produce from 'immer';

import { 
LESSON_VIDEO_METADATA} from '../../actions/streams';

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
      
      case LESSON_VIDEO_METADATA:   
        draft.metaData = action.payload;
      return;
      default:
      return;

    }   
}, initialState);

export default reducer;