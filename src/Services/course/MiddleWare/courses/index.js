import { 
     ADD_COURSE_SUCCESS } from 'teach/src/services/course/actions/courses';
     
     import {
     updateCourseCreatorAfterAddingNewCourse } from 'teach/src/services/course/middleware/courses/helpers';
     
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