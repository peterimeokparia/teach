import {
subscribeEntityOwnerToPushNotification,   
sendPushNotificationOnUpdate } from 'teach/src/services/course/middleware/subscriptions/helpers/pushSubscriptions';

import {   
getOnlineQuestionPushMessageSubscribers } from 'teach/src/services/course/middleware/subscriptions/helpers/subscribers/onlineQuestions';

import {
getCurrentUser,    
NotificationEntityEnum } from 'teach/src/services/course/middleware/subscriptions/helpers';

import {
getOnlinePushNotificationMessage } from 'teach/src/services/course/middleware/subscriptions/helpers/messages/push/onlineQuestions';
    
export const sendOnlineQuestionOwnerPushSubscriptionMessage = ( config, notificationEntityEnumType ) => {
    config['notificationEnumType'] = notificationEntityEnumType;
    config['notificationEnumTypeMessageBody'] = NotificationEntityEnum.PushMessage.HANDLE_QUESTION_PUSH_MESSAGE_BODY;
    config['getPushMessageSubscribers'] = getOnlineQuestionPushMessageSubscribers; 
    config['getPushNotificationMessage'] = getOnlinePushNotificationMessage;
    config['currentUser'] = getCurrentUser( config );
    subscribeEntityOwnerToPushNotification( config );
};

export const sendOnlineQuestionUpdatePushSubscriptionMessage = ( config, notificationEntityEnumType ) => {
    config['notificationEnumType'] = notificationEntityEnumType;
    config['notificationEnumTypeMessageBody'] = NotificationEntityEnum.PushMessage.HANDLE_QUESTION_PUSH_MESSAGE_BODY;
    config['getPushMessageSubscribers'] = getOnlineQuestionPushMessageSubscribers; 
    config['getPushNotificationMessage'] = getOnlinePushNotificationMessage;
    config['currentUser'] = getCurrentUser( config );
    sendPushNotificationOnUpdate( config );
};