import {
TEACH_EMAIL_ADDRESS } from 'services/course/actions/emails';

import {
sendEmails } from 'services/course/actions/emails';


export const sendEmailMessage = async ( config ) => {
    handleEmailNotifications( config );      
}; 

function handleEmailNotifications( config ) { 
    let notificationMessage = config?.getEmailSubscribers( config?.state, config?.action );

    try {
          // add link to question detail 
          notificationMessage.emailNotificationSubscribers?.forEach(element => {
            config.store.dispatch(sendEmails(
                TEACH_EMAIL_ADDRESS,
                element?.email,
                config?.getEmailNotificationMessage( config?.notificationEnumType, config?.action, config?.currentUser ), 
                config?.getEmailNotificationMessage( config?.notificationEnumTypeMessageBody, config?.action, config?.currentUser ),
                element?.userId
            ));
        });      
    } catch (error) {
         console.log( error );
    };
};
