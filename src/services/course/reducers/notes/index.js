import produce from 'immer';

import { 
ADD_NEW_NOTE_BEGIN,
ADD_NEW_NOTE_SUCCESS,
ADD_NEW_NOTE_ERROR,
SAVE_NOTE_BEGIN,
SAVE_NOTE_SUCCESS,
SAVE_NOTE_ERROR,
LOAD_NOTES_BEGIN,
LOAD_NOTES_SUCCESS,
LOAD_NOTES_ERROR,
DELETE_NOTE_BEGIN,
DELETE_NOTE_SUCCESS,
DELETE_NOTE_ERROR,
SET_NOTES_MARKDOWN } from 'services/course/actions/notes';

const initialState = {
     note:{},
     notes:{},
     isAdding: false,
     isSaving: false,
     isLoading: false,
     onError: null
};

const reducer =  produce( (draft, action) => {
     switch(action.type){

          case ADD_NEW_NOTE_BEGIN:
          case SAVE_NOTE_BEGIN:     
               draft.isAdding = true;
               draft.isSaving = true;
               draft.onError = null;  
          return;
          case ADD_NEW_NOTE_SUCCESS: 
          case SAVE_NOTE_SUCCESS:
               draft.isAdding = false;
               draft.isSaving = false;
               draft.onError = null;  
               draft.note = action.payload;   
               draft.notes[action.payload._id] = action.payload;  
          return;
          case ADD_NEW_NOTE_ERROR:
          case SAVE_NOTE_ERROR:     
               draft.isAdding = false;
               draft.isSaving = false;
               draft.onError = action.error;  
          return;
          case LOAD_NOTES_BEGIN:    
               draft.isLoading = true;
               draft.onError = null;
          return;
          case LOAD_NOTES_SUCCESS:
               draft.isLoading = false;
               draft.onError = null;
               action.payload?.forEach(element => {
                    draft.notes[element._id] = element;  
               });              
          return;
          case LOAD_NOTES_ERROR:
               draft.isLoading = false;    
               draft.onError = action.error;  
          return;
          case DELETE_NOTE_BEGIN:
               draft.isDeleting = true;
               draft.onError = null;
          return;
          case DELETE_NOTE_SUCCESS:
               draft.isDeleting = false;
               draft.onError = null;
               delete draft.notes[action.payload?._id];
          return;
          case DELETE_NOTE_ERROR:
               draft.isDeleting = false;
               draft.onError = action.error;
          return;  
          case SET_NOTES_MARKDOWN:
               if ( draft.notes[action.payload.teachObject?._id] ) {
                  draft.notes[action.payload.teachObject?._id].markDownContent = action.payload.markDownContent; 
               }    
          return;    
          default:
               
     }
}, initialState);

export default reducer;