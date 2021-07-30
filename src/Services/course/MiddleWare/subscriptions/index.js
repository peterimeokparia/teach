import {
ADD_COURSE_SUCCESS } from 'Services/course/Actions/Courses';

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
sendOnlineQuestionOwnerPushSubscriptionMessage,
sendOnlineQuestionUpdatePushSubscriptionMessage } from 'Services/course/MiddleWare/subscriptions/helpers/pushSubscriptions/onlineQuestions';

import {
sendOnlineQuestionsEmailSubscriptionMessage } from 'Services/course/MiddleWare/subscriptions/helpers/emailSubscriptions/onlineQuestions';

import {
sendCourseOwnerPushSubscriptionMessage } from 'Services/course/MiddleWare/subscriptions/helpers/pushSubscriptions/courses';

import {
sendCourseEmailSubscriptionMessage } from 'Services/course/MiddleWare/subscriptions/helpers/emailSubscriptions/courses';

import {   
NotificationEntityEnum } from './helpers';

export const subscriptions = store => next =>  action => {
     let config = { state: store?.getState(), action, store };
     //let config = { state: store, action, store }

     switch( action.type ){

          case ADD_COURSE_SUCCESS:
               sendCourseOwnerPushSubscriptionMessage( config, NotificationEntityEnum.PushMessage.NEW_COURSE_ADDED_PUSH );
               sendCourseEmailSubscriptionMessage( config, NotificationEntityEnum.EmailMessage.NEW_COURSE_ADDED_EMAIL  );   
               next(action);
          return;
          case ADD_ONLINEQUESTION_SUCCESS:
               sendOnlineQuestionOwnerPushSubscriptionMessage( config, NotificationEntityEnum.PushMessage.NEW_QUESTION_ADDED_PUSH );
               sendOnlineQuestionsEmailSubscriptionMessage( config, NotificationEntityEnum.EmailMessage.NEW_QUESTION_ADDED_EMAIL  );   
               next(action);
          return;
          case ADD_ONLINEANSWERS_SUCCESS:
               sendOnlineQuestionUpdatePushSubscriptionMessage( config, NotificationEntityEnum.PushMessage.NEW_ANSWER_ADDED_PUSH );
               sendOnlineQuestionsEmailSubscriptionMessage( config, NotificationEntityEnum.EmailMessage.NEW_ANSWER_ADDED_EMAIL );   
               next(action);
          return;
          case ADD_ONLINECOMMENTS_SUCCESS:
               sendOnlineQuestionUpdatePushSubscriptionMessage( config, NotificationEntityEnum.PushMessage.NEW_COMMENT_ADDED_PUSH );
               sendOnlineQuestionsEmailSubscriptionMessage( config, NotificationEntityEnum.EmailMessage.NEW_COMMENT_ADDED_EMAIL ); 
               next(action);
          return;
          case DELETE_ONLINEQUESTION_SUCCESS:
               sendOnlineQuestionUpdatePushSubscriptionMessage( config, NotificationEntityEnum.PushMessage.QUESTION_REMOVED_PUSH );
               sendOnlineQuestionsEmailSubscriptionMessage( config, NotificationEntityEnum.EmailMessage.QUESTION_REMOVED_EMAIL ); 
               next(action);
          return;
          case RETRY_PUSH_NOTIFICATION_MESSAGE_SUCCESS: 
               store.dispatch( deleteFailedPushNotification( action.payload?.failedNotification ) );
               next(action);
          return;
          default:
               next(action);
          return;
          
      };
};
