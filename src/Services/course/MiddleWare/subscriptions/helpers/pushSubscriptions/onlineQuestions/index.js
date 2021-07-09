import {
subscribeEntityOwnerToPushNotification,   
sendPushNotificationOnUpdate } from 'Services/course/MiddleWare/subscriptions/helpers/pushSubscriptions';

import {   
getOnlineQuestionPushMessageSubscribers } from 'Services/course/MiddleWare/subscriptions/helpers/subscribers/onlineQuestions';

import {
getCurrentUser,    
NotificationEntityEnum } from 'Services/course/MiddleWare/subscriptions/helpers';

import {
getOnlinePushNotificationMessage } from 'Services/course/MiddleWare/subscriptions/helpers/messages/push/onlineQuestions';
    
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