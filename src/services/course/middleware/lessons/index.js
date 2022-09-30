import { ADD_NEW_LESSON_SUCCESS, START_NEW_LESSON_SUCCESS, HANDLE_CURRENT_LESSON_MEETING, HANDLE_CURRENT_LESSON_ITEMS } from 'services/course/actions/lessons';
import { addLessonEventToCalendar, createTutorsLessonNote } from 'services/course/middleware/lessons/helpers';
import { handleCurrentLesson, handleLessonItems } from 'services/course/middleware/lessons/meetings';

export const lessons = store => next =>  action => {
     switch(action.type){
          case START_NEW_LESSON_SUCCESS:  
               addLessonEventToCalendar( action.payload, store );  
               next(action);
          return;
          case ADD_NEW_LESSON_SUCCESS:  
               createTutorsLessonNote( action.payload, store );  
               next(action);
          return;
          case HANDLE_CURRENT_LESSON_MEETING:  
               handleCurrentLesson( action.payload, store );  
               next(action);
          return;
          case HANDLE_CURRENT_LESSON_ITEMS:  
               handleLessonItems( action.payload, store );  
               next(action);
          return;
          default:
               next(action);
          return;    
     };
};