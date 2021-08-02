import {
sendEmailMessage } from 'teach/src/services/course/middleware/subscriptions/helpers/emailSubscriptions';

import {   
getCourseEmailMessageSubscribers } from 'teach/src/services/course/middleware/subscriptions/helpers/subscribers/courses';

import {   
getCourseEmailNotificationMessage } from 'teach/src/services/course/middleware/subscriptions/helpers/messages/email/courses';

import {
getCurrentUser,    
NotificationEntityEnum } from 'teach/src/services/course/middleware/subscriptions/helpers';

export const sendCourseEmailSubscriptionMessage = ( config, notificationEntityEnumType ) => {
    config['notificationEnumType'] = notificationEntityEnumType;
    config['notificationEnumTypeMessageBody'] = NotificationEntityEnum.EmailMessage.HANDLE_COURSE_EMAIL;
    config['getEmailSubscribers'] = getCourseEmailMessageSubscribers;
    config['getEmailNotificationMessage'] = getCourseEmailNotificationMessage;
    config['currentUser'] = getCurrentUser( config );
    sendEmailMessage( config );
};