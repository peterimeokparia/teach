import {
subscribeEntityOwnerToPushNotification,   
sendPushNotificationOnUpdate } from 'teach/src/services/course/middleware/subscriptions/helpers/pushSubscriptions';

import {
getCurrentUser,    
NotificationEntityEnum } from 'teach/src/services/course/middleware/subscriptions/helpers';

import {   
getCoursePushMessageSubscribers } from 'teach/src/services/course/middleware/subscriptions/helpers/subscribers/courses';

import {
getCoursePushNotificationMessage } from 'teach/src/services/course/middleware/subscriptions/helpers/messages/push/courses';

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




