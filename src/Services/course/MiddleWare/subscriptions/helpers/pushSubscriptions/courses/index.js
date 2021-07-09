import {
subscribeEntityOwnerToPushNotification,   
sendPushNotificationOnUpdate } from 'Services/course/MiddleWare/subscriptions/helpers/pushSubscriptions';

import {
getCurrentUser,    
NotificationEntityEnum } from 'Services/course/MiddleWare/subscriptions/helpers';

import {   
getCoursePushMessageSubscribers } from 'Services/course/MiddleWare/subscriptions/helpers/subscribers/courses';

import {
getCoursePushNotificationMessage } from 'Services/course/MiddleWare/subscriptions/helpers/messages/push/courses';

export const sendCourseOwnerPushSubscriptionMessage = ( config, notificationEntityEnumType  ) => {
    config['notificationEnumType'] = notificationEntityEnumType;
    config['notificationEnumTypeMessageBody'] = NotificationEntityEnum.PushMessage.HANDLE_COURSE_PUSH_MESSAGE_BODY;
    config['getPushMessageSubscribers'] = getCoursePushMessageSubscribers; 
    config['getPushNotificationMessage'] = getCoursePushNotificationMessage;
    config['currentUser'] = getCurrentUser( config );
    subscribeEntityOwnerToPushNotification( config );
};

export const sendCourseUpdatePushSubscriptionMessage = ( config, notificationEntityEnumType ) => {
    config['notificationEnumType'] = notificationEntityEnumType;
    config['notificationEnumTypeMessageBody'] = NotificationEntityEnum.PushMessage.HANDLE_COURSE_PUSH_MESSAGE_BODY;
    config['getPushMessageSubscribers'] = getCoursePushMessageSubscribers; 
    config['getPushNotificationMessage'] = getCoursePushNotificationMessage;
    config['currentUser'] = getCurrentUser( config );
    sendPushNotificationOnUpdate( config );
};




