import {
    sendPushNotificationMessage } from 'services/course/actions/notifications';
    
    export const updateUserAfterAddingNewGrades = ( grades, store ) => {
        try {
            store?.dispatch(sendPushNotificationMessage( 
                grades?.pushNotificationUser, { 
                title:'Grade Added!', 
                body:`New Grade Added for course: ${ grades?.course?.name }` 
            })); 
        } catch (error) {
            console.error(`Problem updating user after adding new grades: ${ error }`);
        };
    };