import {
ADD_ONLINEQUESTION_SUCCESS,
DELETE_ONLINEQUESTION_SUCCESS } from 'Services/course/Actions/OnlineQuestions';

import {
ADD_ONLINEANSWERS_SUCCESS } from 'Services/course/Actions/OnlineAnswers';

import {
ADD_ONLINECOMMENTS_SUCCESS } from 'Services/course/Actions/OnlineComments';

import {
RETRY_PUSH_NOTIFICATION_MESSAGE_SUCCESS } from 'Services/course/Actions/Notifications';

import {
deleteFailedPushNotification } from 'Services/course/Actions/FailedPushNotifications';

import {
subscribeQuestionOwnerToQuestionPushNotification,
sendPushNotificationOnQuestionUpdate,
subscribeQuestionOwnerToQuestionEmailNotification,
sendEmailNotificationOnQuestionUpdate,
getOnlineQuestion } from './helpers';

//https://stackoverflow.com/questions/51186205/how-to-dispatch-actions-from-redux-middleware-in-correct-order
//https://redux.js.org/api/store#getState

export const notifications = store => next =>  action => {
     
     let question = getOnlineQuestion( action, store.getState() );

     switch( action.type ){
          case ADD_ONLINEQUESTION_SUCCESS:   
               subscribeQuestionOwnerToQuestionPushNotification( store, store.getState(), action ); 
               subscribeQuestionOwnerToQuestionEmailNotification( store, store.getState(), action );
               next(action);
          return;
          case ADD_ONLINEANSWERS_SUCCESS:
               sendPushNotificationOnQuestionUpdate( store, store.getState(), action, question, "Answer" );  
               sendEmailNotificationOnQuestionUpdate( store, store.getState(), action, question, "Answer" );
               next(action);
          return;
          case ADD_ONLINECOMMENTS_SUCCESS:
               sendPushNotificationOnQuestionUpdate( store, store.getState(), action, question, "Comment" );
               sendEmailNotificationOnQuestionUpdate( store, store.getState(), action, question, "Comment" );  
               next(action);
          return;
          case DELETE_ONLINEQUESTION_SUCCESS:
               sendPushNotificationOnQuestionUpdate( store, store.getState(), action, question, "Update: Deleted" );
               sendEmailNotificationOnQuestionUpdate( store, store.getState(), action, question, "Update: Deleted" );    
               next(action);
          return;
          case RETRY_PUSH_NOTIFICATION_MESSAGE_SUCCESS: 
               store.dispatch( deleteFailedPushNotification( action.payload?.failedNotification ) );
               next(action);
          return;
          default:
               next(action);
          return;
      }
}
