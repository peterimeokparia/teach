import {
NotificationEntityEnum } from 'services/course/middleware/subscriptions/helpers';

export function getOnlineQuestionsEmailNotificationMessage( notificationentityenumtype, action, currentUser ){
    switch ( notificationentityenumtype ) {

        case NotificationEntityEnum.EmailMessage.NEW_QUESTION_ADDED_EMAIL:  
            return `${ currentUser?.firstname } added question: ${ action?.payload?.markDownContenttt }`;

        case NotificationEntityEnum.EmailMessage.QUESTION_UPDATED_EMAIL:  
            return `${ currentUser?.firstname } updated question: ${ action?.payload?.markDownContenttt }`;

        case NotificationEntityEnum.EmailMessage.NEW_ANSWER_ADDED_EMAIL:  
            return `${ currentUser?.firstname } new answer: ${ action?.payload?.markDownContenttt }`;

        case NotificationEntityEnum.EmailMessage.ANSWER_UPDATED_EMAIL:  
            return `${ currentUser?.firstname } updated answer: question: ${ action?.payload?.markDownContenttt }`;

        case NotificationEntityEnum.EmailMessage.NEW_COMMENT_ADDED_EMAIL:  
            return `${ currentUser?.firstname } new comments: question: ${ action?.payload?.markDownContenttt }`;

        case NotificationEntityEnum.EmailMessage.COMMENT_UPDATED_EMAIL:  
            return `${ currentUser?.firstname } updated comments: question: ${ action?.payload?.markDownContenttt }`;

        case NotificationEntityEnum.EmailMessage.QUESTION_SAVED_EMAIL:
            return `${ currentUser?.firstname } : new update for : ${ action?.payload?.markDownContenttt }. Question saved.`;

        case NotificationEntityEnum.EmailMessage.QUESTION_REMOVED_EMAIL:  
            return `${ NotificationEntityEnum.EntityType.Deleted }: ${ action?.payload?._id }`; 
        
        case NotificationEntityEnum.EmailMessage.HANDLE_QUESTION_EMAIL:  
           return `${ NotificationEntityEnum.EntityType.Question }: ${ action?.payload?._id } : ${ action?.payload?.markDownContenttt }`; 
           
        default:
            break;
            
    };
};