import {
sendEmailMessage } from 'teach/src/services/course/middleware/subscriptions/helpers/emailSubscriptions';

import {   
getOnlineQuestionEmailMessageSubscribers } from 'teach/src/services/course/middleware/subscriptions/helpers/subscribers/onlineQuestions';

import {
getOnlineQuestionsEmailNotificationMessage } from 'teach/src/services/course/middleware/subscriptions/helpers/messages/email/onlineQuestions';

import {
getCurrentUser,    
NotificationEntityEnum } from 'teach/src/services/course/middleware/subscriptions/helpers';

export const sendOnlineQuestionsEmailSubscriptionMessage = ( config, notificationEntityEnumType ) => {
    config['notificationEnumType'] = notificationEntityEnumType;
    config['notificationEnumTypeMessageBody'] = NotificationEntityEnum.EmailMessage.HANDLE_QUESTION_EMAIL;
    config['getEmailSubscribers'] = getOnlineQuestionEmailMessageSubscribers;
    config['getEmailNotificationMessage'] = getOnlineQuestionsEmailNotificationMessage;
    config['currentUser'] = getCurrentUser( config );
    sendEmailMessage( config );
};