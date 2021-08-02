import {
NotificationEntityEnum } from 'services/course/middleware/subscriptions/helpers';
   
export function getCoursePushNotificationMessage( notificationentityenumtype, action, currentUser ){
    switch ( notificationentityenumtype ) {
       
        case NotificationEntityEnum.PushMessage.NEW_COURSE_ADDED_PUSH:  
           return `${ currentUser?.firstname } : new ${ NotificationEntityEnum.EntityType.Course } added: ${ action?.payload?.name }`;

        case NotificationEntityEnum.PushMessage.COURSE_UPDATED_PUSH:  
           return `${ currentUser?.firstname } : new ${ NotificationEntityEnum.EntityType.Course } update for : ${ action?.payload?.name }`;   

        case NotificationEntityEnum.PushMessage.HANDLE_COURSE_PUSH_MESSAGE_BODY:  
           return `${ NotificationEntityEnum.EntityType.Course }: ${ action?.payload?._id } : ${ action?.payload?.name }`; 
           
        default:
            break;

    };
};