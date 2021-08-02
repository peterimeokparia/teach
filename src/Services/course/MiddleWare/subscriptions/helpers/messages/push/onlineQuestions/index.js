import {
NotificationEntityEnum } from 'services/course/middleware/subscriptions/helpers';

export function getOnlinePushNotificationMessage( notificationentityenumtype, action, currentUser ){
    switch ( notificationentityenumtype ) {

        case NotificationEntityEnum.PushMessage.NEW_QUESTION_ADDED_PUSH:  
           return `${ currentUser?.firstname } : new ${ NotificationEntityEnum.EntityType.Question } added : ${ action?.payload?.markDownContenttt }`;

        case NotificationEntityEnum.PushMessage.QUESTION_UPDATED_PUSH:   
           return `${ currentUser?.firstname } : new ${ NotificationEntityEnum.EntityType.Question } update for : ${ action?.payload?.markDownContenttt }`;

        case NotificationEntityEnum.PushMessage.NEW_ANSWER_ADDED_PUSH:  
           return `${ currentUser?.firstname } : new ${ NotificationEntityEnum.EntityType.Answer } update for : ${ action?.payload?.markDownContenttt }`;

        case NotificationEntityEnum.PushMessage.ANSWER_UPDATED_PUSH:  
           return `${ currentUser?.firstname } : new ${ NotificationEntityEnum.EntityType.Answer} update for : ${ action?.payload?.name }`; 

        case NotificationEntityEnum.PushMessage.NEW_COMMENT_ADDED_PUSH:  
           return `${ currentUser?.firstname } : new ${ NotificationEntityEnum.EntityType.Comments } update for : ${ action?.payload?.markDownContenttt }`;

        case NotificationEntityEnum.PushMessage.COMMENT_UPDATED_PUSH:  
           return `${ currentUser?.firstname } : new ${ NotificationEntityEnum.EntityType.Comments} update for : ${ action?.payload?.name }`; 

        case NotificationEntityEnum.PushMessage.QUESTION_REMOVED_PUSH:  
           return `${ currentUser?.firstname } : new ${ NotificationEntityEnum.EntityType.Deleted } update for : ${ action?.payload?.name }`; 

         case NotificationEntityEnum.PushMessage.QUESTION_SAVED_PUSH:
           return `${ currentUser?.firstname } : new ${ NotificationEntityEnum.EntityType.Question } update for : ${ action?.payload?.markDownContenttt }. Question saved.`;

        case NotificationEntityEnum.PushMessage.HANDLE_QUESTION_PUSH_MESSAGE_BODY:  
           return `${ NotificationEntityEnum.EntityType.Question }: ${ action?.payload?._id }`; 
        default:
            break;
            
    }
}