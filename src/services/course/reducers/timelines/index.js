import produce from 'immer';
  
import { 
LOAD_TIMELINES_BEGIN, 
LOAD_TIMELINES_SUCCESS, 
LOAD_TIMELINES_ERROR,  
ADD_NEW_TIMELINE_BEGIN,  
ADD_NEW_TIMELINE_SUCCESS,  
ADD_NEW_TIMELINE_ERROR, 
SAVE_TIMELINE_BEGIN,  
SAVE_TIMELINE_SUCCESS,   
SAVE_TIMELINE_ERROR,   
// DELETE_TIMELINE_BEGIN,  
// DELETE_TIMELINE_SUCCESS,   
// DELETE_TIMELINE_ERROR, 
} from '../../actions/timelines';

const initialState = {
timeLines:{},
timeLine:{},
isLoading: false,
onError: null,
saveTimeLineInProgress: false,
onSaveTimeLineError: null
};

const reducer =  produce( (draft, action) => {
    switch(action.type){

       case ADD_NEW_TIMELINE_BEGIN:    
             draft.isLoading = true;
             draft.onError = false;  
        return; 
        case ADD_NEW_TIMELINE_SUCCESS:    
             draft.timelines[action.payload._id] = action.payload;  
        return;
        case ADD_NEW_TIMELINE_ERROR:    
             draft.isLoading = false;
             draft.onError = action.error;  
        return; 
        case LOAD_TIMELINES_BEGIN:    
             draft.isLoading = true;
             draft.onError = null;
        return;
        case LOAD_TIMELINES_SUCCESS:
             draft.isLoading = false;
             draft.onError = null;
             action.payload?.forEach(element => {
                draft.timeLines[element._id] = element;  
             });            
        return;
        case LOAD_TIMELINES_ERROR:
             draft.isLoading = false;    
             draft.onError = action.error;  
        return;
        case SAVE_TIMELINE_BEGIN:
             draft.saveTimeLineInProgress = true;
             draft.onSaveTimeLineError = null;
        return; 
        case SAVE_TIMELINE_SUCCESS:    
             draft.timelines[action.payload._id] = action.payload;
             draft.timeline =  action.payload;
             draft.saveTimeLineInProgress = false;
         return;    
         case SAVE_TIMELINE_ERROR:
             draft.saveTimeLineInProgress = false;    
             draft.onSaveTimeLineError = action.error;
        return;     
        default:
        return;  
        
    }
}, initialState);

export default reducer;