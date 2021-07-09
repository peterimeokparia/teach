import { 
ADD_CLASSROOM_SUCCESS } from 'Services/course/Actions/ClassRooms';

import {
addNewClassRoomIdToStudentsAndTutors } from 'Services/course/MiddleWare/classrooms/helpers';

export const classrooms = store => next =>  action => {
     switch(action.type){
          
          case ADD_CLASSROOM_SUCCESS:  
               addNewClassRoomIdToStudentsAndTutors( action.payload, store );  
               next(action);
          return;
          default:
               next(action);
          return;
          
      };
};