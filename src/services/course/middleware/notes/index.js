import { ADD_NEW_NOTE_SUCCESS, SAVE_NOTE_SUCCESS, BUILD_LESSON_NOTES } from 'services/course/actions/notes';
import { handleNotes, buildLessonNotes } from 'services/course/middleware/notes/helpers';

export const notes = store => next =>  action => {
     switch(action.type){
          case ADD_NEW_NOTE_SUCCESS:
               handleNotes( action.payload, store ); 
               next(action);
          return;
          case SAVE_NOTE_SUCCESS: 
               handleNotes( action.payload, store ); 
               next(action);
          return;
          case BUILD_LESSON_NOTES: 
               buildLessonNotes( action.payload, store ); 
               next(action);
          return;
          default:
               next(action);
          return;
     };
};