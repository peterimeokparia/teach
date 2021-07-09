import { 
ADD_NEW_CALENDAR_SUCCESS,
DELETE_CALENDAR_SUCCESS } from 'Services/course/Actions/Calendar';

import {
addCalendarEventsOnAddingANewCalendar,
addCalendarTimeLineGroupOnAddingANewCalendar,
sendPushNotificationsAfterDeletingACalendar,
sendEmailNotificationsAfterDeletingACalendar } from 'Services/course/MiddleWare/calendar/helpers';

export const calendar = store => next =>  action => {
     switch(action.type){
          
          case ADD_NEW_CALENDAR_SUCCESS:  
               addCalendarEventsOnAddingANewCalendar( action.payload, store );  
               addCalendarTimeLineGroupOnAddingANewCalendar( action.payload, store );
               next(action);
          return;
          case DELETE_CALENDAR_SUCCESS:  
               sendPushNotificationsAfterDeletingACalendar( action.payload, store );
               sendEmailNotificationsAfterDeletingACalendar( action.payload, store );
               next(action);
          return;
          default:
               next(action);
          return;
          
      };
};