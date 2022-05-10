import {
     ADD_COURSE_SUCCESS } from 'services/course/actions/courses';
     
     import {
     ADD_ONLINEQUESTION_SUCCESS,
     DELETE_ONLINEQUESTION_SUCCESS } from 'services/course/actions/onlinequestions';
     
     import {
     ADD_ONLINEANSWERS_SUCCESS } from 'services/course/actions/onlineanswers';
     
     import {
     ADD_ONLINECOMMENTS_SUCCESS } from 'services/course/actions/onlinecomments';
     
     import {
     RETRY_PUSH_NOTIFICATION_MESSAGE_SUCCESS } from 'services/course/actions/notifications';
     
     import {
     deleteFailedPushNotification } from 'services/course/actions/failedpushnotifications';
     
     import {
     sendOnlineQuestionOwnerPushSubscriptionMessage,
     sendOnlineQuestionUpdatePushSubscriptionMessage } from 'services/course/middleware/subscriptions/helpers/pushSubscriptions/onlineQuestions';
     
     import {
     sendOnlineQuestionsEmailSubscriptionMessage } from 'services/course/middleware/subscriptions/helpers/emailSubscriptions/onlineQuestions';
     
     import {
     sendCourseOwnerPushSubscriptionMessage } from 'services/course/middleware/subscriptions/helpers/pushSubscriptions/courses';
     
     import {
     sendCourseEmailSubscriptionMessage } from 'services/course/middleware/subscriptions/helpers/emailSubscriptions/courses';
     
     import {   
     NotificationEntityEnum } from './helpers';
     
     export const subscriptions = store => next =>  action => {
          let config = { state: store?.getState(), action, store };
     
          switch( action.type ){
     
               case ADD_COURSE_SUCCESS:
                  //  sendCourseOwnerPushSubscriptionMessage( config, NotificationEntityEnum.PushMessage.NEW_COURSE_ADDED_PUSH );
                //    sendCourseEmailSubscriptionMessage( config, NotificationEntityEnum.EmailMessage.NEW_COURSE_ADDED_EMAIL  );   
                    next(action);
               return;
               case ADD_ONLINEQUESTION_SUCCESS:
                   // sendOnlineQuestionOwnerPushSubscriptionMessage( config, NotificationEntityEnum.PushMessage.NEW_QUESTION_ADDED_PUSH );
                  //  sendOnlineQuestionsEmailSubscriptionMessage( config, NotificationEntityEnum.EmailMessage.NEW_QUESTION_ADDED_EMAIL  );   
                    next(action);
               return;
               case ADD_ONLINEANSWERS_SUCCESS:
                  //  sendOnlineQuestionUpdatePushSubscriptionMessage( config, NotificationEntityEnum.PushMessage.NEW_ANSWER_ADDED_PUSH );
                 //   sendOnlineQuestionsEmailSubscriptionMessage( config, NotificationEntityEnum.EmailMessage.NEW_ANSWER_ADDED_EMAIL );   
                    next(action);
               return;
               case ADD_ONLINECOMMENTS_SUCCESS:
                  //  sendOnlineQuestionUpdatePushSubscriptionMessage( config, NotificationEntityEnum.PushMessage.NEW_COMMENT_ADDED_PUSH );
                 //   sendOnlineQuestionsEmailSubscriptionMessage( config, NotificationEntityEnum.EmailMessage.NEW_COMMENT_ADDED_EMAIL ); 
                    next(action);
               return;
               case DELETE_ONLINEQUESTION_SUCCESS:
                 //   sendOnlineQuestionUpdatePushSubscriptionMessage( config, NotificationEntityEnum.PushMessage.QUESTION_REMOVED_PUSH );
                 //   sendOnlineQuestionsEmailSubscriptionMessage( config, NotificationEntityEnum.EmailMessage.QUESTION_REMOVED_EMAIL ); 
                    next(action);
               return;
               case RETRY_PUSH_NOTIFICATION_MESSAGE_SUCCESS: 
                 //   store.dispatch( deleteFailedPushNotification( action.payload?.failedNotification ) );
                    next(action);
               return;
               default:
                    next(action);
               return;
               
           };
     };
     