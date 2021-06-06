import {
subscribeEntityOwnerToPushNotification,   
sendPushNotificationOnUpdate } from 'Services/course/MiddleWare/notifications/helpers/pushSubscriptions';

import {
getCurrentUser,    
NotificationEntityEnum } from 'Services/course/MiddleWare/notifications/helpers';

import {   
getCoursePushMessageSubscribers } from 'Services/course/MiddleWare/notifications/helpers/subscribers/courses';

import {
getCoursePushNotificationMessage } from 'Services/course/MiddleWare/notifications/helpers/messages/push/courses';

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




