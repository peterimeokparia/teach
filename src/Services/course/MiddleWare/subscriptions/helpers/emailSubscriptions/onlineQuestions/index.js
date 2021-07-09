import {
sendEmailMessage } from 'Services/course/MiddleWare/subscriptions/helpers/emailSubscriptions';

import {   
getOnlineQuestionEmailMessageSubscribers } from 'Services/course/MiddleWare/subscriptions/helpers/subscribers/onlineQuestions';

import {
getOnlineQuestionsEmailNotificationMessage } from 'Services/course/MiddleWare/subscriptions/helpers/messages/email/onlineQuestions';

import {
getCurrentUser,    
NotificationEntityEnum } from 'Services/course/MiddleWare/subscriptions/helpers';

export const sendOnlineQuestionsEmailSubscriptionMessage = ( config, notificationEntityEnumType ) => {
    config['notificationEnumType'] = notificationEntityEnumType;
    config['notificationEnumTypeMessageBody'] = NotificationEntityEnum.EmailMessage.HANDLE_QUESTION_EMAIL;
    config['getEmailSubscribers'] = getOnlineQuestionEmailMessageSubscribers;
    config['getEmailNotificationMessage'] = getOnlineQuestionsEmailNotificationMessage;
    config['currentUser'] = getCurrentUser( config );
    sendEmailMessage( config );
};