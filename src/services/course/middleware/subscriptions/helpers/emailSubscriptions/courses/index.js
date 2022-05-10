import {
sendEmailMessage } from 'services/course/middleware/subscriptions/helpers/emailSubscriptions';

import {   
getCourseEmailMessageSubscribers } from 'services/course/middleware/subscriptions/helpers/subscribers/courses';

import {   
getCourseEmailNotificationMessage } from 'services/course/middleware/subscriptions/helpers/messages/email/courses';

import {
getCurrentUser,    
NotificationEntityEnum } from 'services/course/middleware/subscriptions/helpers';

export const sendCourseEmailSubscriptionMessage = ( config, notificationEntityEnumType ) => {
    config['notificationEnumType'] = notificationEntityEnumType;
    config['notificationEnumTypeMessageBody'] = NotificationEntityEnum.EmailMessage.HANDLE_COURSE_EMAIL;
    config['getEmailSubscribers'] = getCourseEmailMessageSubscribers;
    config['getEmailNotificationMessage'] = getCourseEmailNotificationMessage;
    config['currentUser'] = getCurrentUser( config );
    sendEmailMessage( config );
};