import produce from 'immer';

import { 
ADD_NEW_CALENDAR_EVENT,
LOAD_CALENDAR_EVENTS_BEGIN,
LOAD_CALENDAR_EVENTS_SUCCESS,
LOAD_CALENDAR_EVENTS_ERROR,
TOGGLE_CALENDAR_NEW_EVENT_INPUT, 
} from '../services/course/actions';



const initialState = {
    calendarEvents:{},
    isLoading: false,
    onError: null,
    toggleCalendarNewEventView: false
};


const reducer =  produce( (draft, action) => {
    switch(action.type){
        case ADD_NEW_CALENDAR_EVENT:    
             draft.calendarEvents[action.payload._id] = action.payload;  
        return;
        case LOAD_CALENDAR_EVENTS_BEGIN:    
             draft.isLoading = true;
             draft.onError = null;
        return;
        case LOAD_CALENDAR_EVENTS_SUCCESS:
             draft.isLoading = false;
             draft.onError = null;
             action.payload.forEach(element => {
                draft.calendarEvents[element._id] = element;  
             });    
               
        return;
        case LOAD_CALENDAR_EVENTS_ERROR:
             draft.isLoading = false;    
             draft.onError = action.error;  
        return;
        default:
        case TOGGLE_CALENDAR_NEW_EVENT_INPUT:
            draft.toggleCalendarNewEventView = (! draft.toggleCalendarNewEventView);
            return;  
    return;
    }
    
}, initialState);


export default reducer;