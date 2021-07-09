import {
sendEmailMessage } from 'Services/course/MiddleWare/subscriptions/helpers/emailSubscriptions';

import {   
getCourseEmailMessageSubscribers } from 'Services/course/MiddleWare/subscriptions/helpers/subscribers/courses';

import {   
getCourseEmailNotificationMessage } from 'Services/course/MiddleWare/subscriptions/helpers/messages/email/courses';

import {
getCurrentUser,    
NotificationEntityEnum } from 'Services/course/MiddleWare/subscriptions/helpers';

export const sendCourseEmailSubscriptionMessage = ( config, notificationEntityEnumType ) => {
    config['notificationEnumType'] = notificationEntityEnumType;
    config['notificationEnumTypeMessageBody'] = NotificationEntityEnum.EmailMessage.HANDLE_COURSE_EMAIL;
    config['getEmailSubscribers'] = getCourseEmailMessageSubscribers;
    config['getEmailNotificationMessage'] = getCourseEmailNotificationMessage;
    config['currentUser'] = getCurrentUser( config );
    sendEmailMessage( config );
};