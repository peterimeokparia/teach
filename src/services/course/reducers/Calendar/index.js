import produce from 'immer';

import { 
ADD_NEW_CALENDAR_EVENT_BEGIN,
ADD_NEW_CALENDAR_EVENT_SUCCESS,
ADD_NEW_CALENDAR_EVENT_ERROR,
SAVE_CALENDAR_EVENT_BEGIN,
SAVE_CALENDAR_EVENT_SUCCESS,
SAVE_CALENDAR_EVENT_ERROR,
LOAD_CALENDAR_EVENTS_BEGIN,
LOAD_CALENDAR_EVENTS_SUCCESS,
LOAD_CALENDAR_EVENTS_ERROR,
DELETE_CALENDAR_EVENT_BEGIN,
DELETE_CALENDAR_EVENT_SUCCESS,
DELETE_CALENDAR_EVENT_ERROR,
TOGGLE_CALENDAR_NEW_EVENT_INPUT,
TOGGLE_EVENT_EDIT_FORM } from 'Services/course/Actions/Calendar';

const initialState = {
     calendarEvent:{},
     calendarEvents:{},
     isAdding: false,
     isSaving: false,
     isLoading: false,
     onError: null,
     toggleCalendarNewEventView: false,
     toggleEditView: false
};

const reducer =  produce( (draft, action) => {
     switch(action.type){
          case ADD_NEW_CALENDAR_EVENT_BEGIN:
          case SAVE_CALENDAR_EVENT_BEGIN:     
               draft.isAdding = true;
               draft.isSaving = true;
               draft.onError = null;  
          return;
          case ADD_NEW_CALENDAR_EVENT_SUCCESS: 
          case SAVE_CALENDAR_EVENT_SUCCESS:
               draft.isAdding = false;
               draft.isSaving = false;
               draft.onError = null;  
               draft.calendarEvent = action.payload;   
               draft.calendarEvents[action.payload._id] = action.payload;  
          return;
          case ADD_NEW_CALENDAR_EVENT_ERROR:
          case SAVE_CALENDAR_EVENT_ERROR:     
               draft.isAdding = false;
               draft.isSaving = false;
               draft.onError = action.error;  
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
          case DELETE_CALENDAR_EVENT_BEGIN:
               draft.isDeleting = true;
               draft.onError = null;
          return;
          case DELETE_CALENDAR_EVENT_SUCCESS:
               draft.isDeleting = false;
               draft.onError = null;
               delete draft.calendarEvents[action.payload?._id];
          return;
          case DELETE_CALENDAR_EVENT_ERROR:
               draft.isDeleting = false;
               draft.onError = action.error;
          return;
          case TOGGLE_CALENDAR_NEW_EVENT_INPUT:
               draft.toggleCalendarNewEventView = (! draft.toggleCalendarNewEventView);
          return;    
          default:
     }
}, initialState);

export default reducer;