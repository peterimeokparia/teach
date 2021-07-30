import { 
ADD_CLASSROOM_SUCCESS,
ENABLE_TEACH_PLATFORM } from 'Services/course/Actions/ClassRooms';

import {
START_NEW_MEETING,
END_MEETING } from 'Services/course/Actions/Meetings';

import { 
addCurentMeeting,
endCurrentMeeting } from './helpers/meetings';
     
import {
addNewClassRoomIdToStudentsAndTutors,
enableTeachPlatform } from 'Services/course/MiddleWare/classrooms/helpers';

export const classrooms = store => next =>  action => {
     switch(action.type){  

          case ADD_CLASSROOM_SUCCESS:  
               addNewClassRoomIdToStudentsAndTutors( action.payload, store );  
               next(action);
          return;
          case ENABLE_TEACH_PLATFORM:  
               enableTeachPlatform( action.payload, store );  
               next(action);
          return;
          case START_NEW_MEETING:  
               addCurentMeeting( action.payload, store );  
               next(action);
          return;
          case END_MEETING:  
               endCurrentMeeting( action.payload, store );
               next(action);
          return;
               default:
               next(action);
          return;
          
      };
};