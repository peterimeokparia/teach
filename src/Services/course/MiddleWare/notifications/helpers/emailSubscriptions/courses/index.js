import {
sendEmailMessage } from 'Services/course/MiddleWare/notifications/helpers/emailSubscriptions';

import {   
getCourseEmailMessageSubscribers } from 'Services/course/MiddleWare/notifications/helpers/subscribers/courses';

import {   
getCourseEmailNotificationMessage } from 'Services/course/MiddleWare/notifications/helpers/messages/email/courses';

import {
getCurrentUser,    
NotificationEntityEnum } from 'Services/course/MiddleWare/notifications/helpers';

export const sendCourseEmailSubscriptionMessage = ( config, notificationEntityEnumType ) => {
    config['notificationEnumType'] = notificationEntityEnumType;
    config['notificationEnumTypeMessageBody'] = NotificationEntityEnum.EmailMessage.HANDLE_COURSE_EMAIL;
    config['getEmailSubscribers'] = getCourseEmailMessageSubscribers;
    config['getEmailNotificationMessage'] = getCourseEmailNotificationMessage;
    config['currentUser'] = getCurrentUser( config );
    sendEmailMessage( config );
};