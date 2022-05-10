import produce from 'immer';

import { 
ADD_NEW_CALENDAR_BEGIN,
ADD_NEW_CALENDAR_SUCCESS,
ADD_NEW_CALENDAR_ERROR,
SAVE_CALENDAR_BEGIN,
SAVE_CALENDAR_SUCCESS,
SAVE_CALENDAR_ERROR,
LOAD_CALENDARS_BEGIN,
LOAD_CALENDARS_SUCCESS,
LOAD_CALENDARS_ERROR,
DELETE_CALENDAR_BEGIN,
DELETE_CALENDAR_SUCCESS,
DELETE_CALENDAR_ERROR,
TOGGLE_CALENDAR_NEW_INPUT,
CALENDAR_EVENT_TYPE
 } from 'services/course/actions/calendar';

const initialState = {
     calendar:{},
     calendars:{},
     calendarEventType:{},
     isAdding: false,
     isSaving: false,
     isLoading: false,
     onError: null,
     toggleCalendarNewEventView: false,
     toggleEditView: false
};

const reducer =  produce( (draft, action) => {
     switch(action.type){

          case ADD_NEW_CALENDAR_BEGIN:
          case SAVE_CALENDAR_BEGIN:     
               draft.isAdding = true;
               draft.isSaving = true;
               draft.onError = null;  
          return;
          case ADD_NEW_CALENDAR_SUCCESS: 
          case SAVE_CALENDAR_SUCCESS:
               draft.isAdding = false;
               draft.isSaving = false;
               draft.onError = null;  
               draft.calendar = action.payload;   
               draft.calendars[action.payload._id] = action.payload;  
          return;
          case ADD_NEW_CALENDAR_ERROR:
          case SAVE_CALENDAR_ERROR:     
               draft.isAdding = false;
               draft.isSaving = false;
               draft.onError = action.error;  
          return;
          case LOAD_CALENDARS_BEGIN:    
               draft.isLoading = true;
               draft.onError = null;
          return;
          case LOAD_CALENDARS_SUCCESS:
               draft.isLoading = false;
               draft.onError = null;
               action.payload?.forEach(element => {
                    draft.calendars[element._id] = element;  
               });              
          return;
          case LOAD_CALENDARS_ERROR:
               draft.isLoading = false;    
               draft.onError = action.error;  
          return;
          case DELETE_CALENDAR_BEGIN:
               draft.isDeleting = true;
               draft.onError = null;
          return;
          case DELETE_CALENDAR_SUCCESS:
               draft.isDeleting = false;
               draft.onError = null;
               delete draft.calendars[action.payload?.resp?._id];
          return;
          case DELETE_CALENDAR_ERROR:
               draft.isDeleting = false;
               draft.onError = action.error;
          return;
          case TOGGLE_CALENDAR_NEW_INPUT:
               draft.toggleCalendarNewEventView = (! draft.toggleCalendarNewEventView);
          return;    
          case CALENDAR_EVENT_TYPE:
               draft.calendarEventType = action.payload;
          return;   
          default:
               
     }
}, initialState);

export default reducer;