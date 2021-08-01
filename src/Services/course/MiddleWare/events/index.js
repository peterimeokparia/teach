import { 
ADD_EVENT_SUCCESS,
SAVE_EVENT_SUCCESS,
DELETE_EVENT_SUCCESS } from 'services/course/actions/event';

import {
sendUpdatesAfterAddingNewCalendarEvents,
sendUpdatesAfterModifyingCalendarEvents,
addTimeLineItemsToEvent,
sendUpdatesAfterDeletingCalendarEvents,
updateTimeLineItemsToMatchEventUpdates } from 'services/course/middleware/events/helpers';

export const events = store => next =>  action => {
     switch(action.type){
          
          case ADD_EVENT_SUCCESS:
               addTimeLineItemsToEvent( action.payload, store );
               sendUpdatesAfterAddingNewCalendarEvents( action.payload, store ); 
               next(action);
          return;
          case SAVE_EVENT_SUCCESS: 
               sendUpdatesAfterModifyingCalendarEvents( action.payload, store ); 
               updateTimeLineItemsToMatchEventUpdates( action.payload, store );
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