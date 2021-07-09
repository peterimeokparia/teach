import { 
ADD_EVENT_SUCCESS,
SAVE_EVENT_SUCCESS,
DELETE_EVENT_SUCCESS } from 'Services/course/Actions/Event';

import {
sendUpdatesAfterAddingNewCalendarEvents,
sendUpdatesAfterModifyingCalendarEvents,
sendUpdatesAfterDeletingCalendarEvents } from 'Services/course/MiddleWare/events/helpers';

export const events = store => next =>  action => {
     switch(action.type){
          
          case ADD_EVENT_SUCCESS:
               sendUpdatesAfterAddingNewCalendarEvents( action.payload, store ); 
               next(action);
          return;
          case SAVE_EVENT_SUCCESS: 
               sendUpdatesAfterModifyingCalendarEvents( action.payload, store ); 
               next(action);
          return;
          case DELETE_EVENT_SUCCESS:  
               sendUpdatesAfterDeletingCalendarEvents( action.payload, store );
               next(action);
          return;
          default:
               next(action);
          return;
          
      };
};