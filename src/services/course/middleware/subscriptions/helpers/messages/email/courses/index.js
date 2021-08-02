import {
NotificationEntityEnum } from 'services/course/middleware/subscriptions/helpers';

export function getCourseEmailNotificationMessage( notificationentityenumtype, action, currentUser ){
    switch ( notificationentityenumtype ) {
       
        case NotificationEntityEnum.EmailMessage.NEW_COURSE_ADDED_EMAIL:  
            return `${ currentUser?.firstname } added course: ${ action?.payload?.name }`;

        case NotificationEntityEnum.EmailMessage.COURSE_UPDATED_EMAIL:  
            return `${ currentUser?.firstname } updated course: ${ action?.payload?.name }`;

        case NotificationEntityEnum.EmailMessage.HANDLE_COURSE_EMAIL:  
           return `${ NotificationEntityEnum.EntityType.Course }: ${ action?.payload?._id } : ${ action?.payload?.name }`; 

        default:
            break;
            
    };
};