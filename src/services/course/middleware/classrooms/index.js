import { 
ADD_CLASSROOM_SUCCESS,
ENABLE_TEACH_PLATFORM,
ADD_MEETING_EVENT_TO_CALENDAR } from 'services/course/actions/classrooms';

import {
LOAD_MEETING_USER_SUCCESS } from 'services/course/actions/users';

import {
START_NEW_MEETING,
WAIT_FOR_MEETING_TO_START,
ADD_NEW_MEETING_SUCCESS,
END_MEETING } from 'services/course/actions/meetings';

import { 
addCurentMeeting,
endCurrentMeeting } from './helpers/meetings';
     
import {
addNewClassRoomIdToStudentsAndTutors,
addNewMeetingEventToCalendar,
enableTeachPlatform,
getUsersCurrentMeetingStatus,
handleAddingNewMeeting,
waitForMeetingBeforeJoining } from 'services/course/middleware/classrooms/helpers';

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
               addNewMeetingEventToCalendar( action.payload, store);
               next(action);
          return;
          case END_MEETING:  
               endCurrentMeeting( action.payload, store );
               next(action);
          return;
          case LOAD_MEETING_USER_SUCCESS:  
               getUsersCurrentMeetingStatus( action.payload, store );
               next(action);
          return;
          case WAIT_FOR_MEETING_TO_START:  
               waitForMeetingBeforeJoining( action.payload, store );
               next(action);
          return;
          case ADD_MEETING_EVENT_TO_CALENDAR:  
               addNewMeetingEventToCalendar( action.payload, store)
               next(action);
          return;
          case ADD_NEW_MEETING_SUCCESS:
               handleAddingNewMeeting( action?.payload, store )
               default:
               next(action);
          return;
          
          };
};