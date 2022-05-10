import produce from 'immer';

import { 
ADD_EVENT_BEGIN,
ADD_EVENT_SUCCESS,
ADD_EVENT_ERROR,
SAVE_EVENT_BEGIN,
SAVE_EVENT_SUCCESS,
SAVE_TIMELINE_EVENTS,
SAVE_EVENT_ERROR,
LOAD_EVENTS_BEGIN,
LOAD_EVENTS_SUCCESS,
LOAD_EVENTS_ERROR,
DELETE_EVENT_BEGIN,
DELETE_EVENT_SUCCESS,
DELETE_EVENT_ERROR } from 'services/course/actions/event';

const initialState = {
     events:{},
     event:{},
     isAdding: false,
     isSaving: false,
     isLoading: false,
     onError: null,
     toggleCalendarNewEventView: false,
     toggleEditView: false
};

const reducer =  produce( (draft, action) => {
     switch(action.type){

          case ADD_EVENT_BEGIN:
          case SAVE_EVENT_BEGIN:     
               draft.isAdding = true;
               draft.isSaving = true;
               draft.onError = null;  
          return;
          case ADD_EVENT_SUCCESS: 
          case SAVE_EVENT_SUCCESS:
          case SAVE_TIMELINE_EVENTS:
               draft.isAdding = false;
               draft.isSaving = false;
               draft.onError = null;  
               draft.event = action.payload?.calendarEventData;   
               draft.events[action.payload?.calendarEventData?._id] = action.payload?.calendarEventData;  
          return;
          case ADD_EVENT_ERROR:
          case SAVE_EVENT_ERROR:     
               draft.isAdding = false;
               draft.isSaving = false;
               draft.onError = action.error;  
          return;
          case LOAD_EVENTS_BEGIN:    
               draft.isLoading = true;
               draft.onError = null;
          return;
          case LOAD_EVENTS_SUCCESS:
               draft.isLoading = false;
               draft.onError = null;
               action.payload?.forEach(element => {
                    draft.events[element._id] = element;  
               });              
          return;
          case LOAD_EVENTS_ERROR:
               draft.isLoading = false;    
               draft.onError = action.error;  
          return;
          case DELETE_EVENT_BEGIN:
               draft.isDeleting = true;
               draft.onError = null;
          return;
          case DELETE_EVENT_SUCCESS:
               draft.isDeleting = false;
               draft.onError = null;
               delete draft.events[action.payload?.resp?._id];
          return;
          case DELETE_EVENT_ERROR:
               draft.isDeleting = false;
               draft.onError = action.error;
          return;  
          default:
               
     }
}, initialState);

export default reducer;