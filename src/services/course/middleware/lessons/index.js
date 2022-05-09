import { 
START_NEW_LESSON_SUCCESS } from 'services/course/actions/lessons';

import {
addLessonEventToCalendar } from 'services/course/middleware/lessons/helpers';

export const lessons = store => next =>  action => {
     switch(action.type){
          
          case START_NEW_LESSON_SUCCESS:  
               addLessonEventToCalendar( action.payload, store );  
               next(action);
          return;
          default:
               next(action);
          return;
          
          };
};