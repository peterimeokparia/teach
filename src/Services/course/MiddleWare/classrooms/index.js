import { 
     ADD_CLASSROOM_SUCCESS,
     ENABLE_TEACH_PLATFORM } from 'teach/src/services/course/actions/classrooms';
     
     import {
     START_NEW_MEETING,
     END_MEETING } from 'teach/src/services/course/actions/meetings';
     
     import { 
     addCurentMeeting,
     endCurrentMeeting } from './helpers/meetings';
          
     import {
     addNewClassRoomIdToStudentsAndTutors,
     enableTeachPlatform } from 'teach/src/services/course/middleware/classrooms/helpers';
     
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