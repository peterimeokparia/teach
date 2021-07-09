import { 
ADD_COURSE_SUCCESS } from 'Services/course/Actions/Courses';

import {
updateCourseCreatorAfterAddingNewCourse } from 'Services/course/MiddleWare/courses/helpers';

export const courses = store => next =>  action => {
     switch(action.type){
          
          case ADD_COURSE_SUCCESS:  
               updateCourseCreatorAfterAddingNewCourse( action.payload, store );  
               next(action);
          return;
          default:
               next(action);
          return;
          
      };
};