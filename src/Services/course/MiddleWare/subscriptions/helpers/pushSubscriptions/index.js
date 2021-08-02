
import {
    sendPushNotificationMessage,     
    subscribePushNotificationUser,
    savePushNotificationUser } from 'services/course/actions/notifications';
    
    import {
    handlePushNotificationSubscription } from 'services/course/helpers/PageHelpers';
    
    export const subscribeEntityOwnerToPushNotification = async ( config ) => {
        let notificationMessage = config?.getPushMessageSubscribers( config?.state, config?.action );
        let subscribedPushUsers = notificationMessage?.subscribedPushUsers;
        let currentUser = notificationMessage?.currentUser;
        let currentSubscription = notificationMessage?.currentSubscription;
    
        handlePushNotifications(
             config,   
             currentSubscription, 
             subscribedPushUsers, 
             config?.getPushNotificationMessage( config?.notificationEnumTypeMessageBody, config?.action, currentUser )
        ); 
    };
    
    export const sendPushNotificationOnUpdate = async ( config ) => {
        let notificationMessage = config?.getPushMessageSubscribers( config?.state, config?.action );
        let subscribedPushUsers = notificationMessage?.subscribedPushUsers;
        let currentUser = notificationMessage?.currentUser;
        let currentSubscription = notificationMessage?.currentSubscription;
    
        handlePushNotifications(
            config,   
            currentSubscription, 
            subscribedPushUsers, 
            config?.getPushNotificationMessage( config?.notificationEnumTypeMessageBody, config?.action, currentUser )
        );    
    };
    
    function handlePushNotifications( config, currentSubscription, subscribedPushUsers, notificationMessage ) {
        try {
             if ( ! currentSubscription ) {
                  handlePushNotificationSubscription( subscribedPushUsers, config?.currentUser, subscribePushNotificationUser, savePushNotificationUser ); 
              }
              // add link to question detail page
              if ( currentSubscription ) {
                config.store.dispatch(sendPushNotificationMessage( 
                    currentSubscription, { 
                       title:`${ config?.message }`, 
                       body: notificationMessage, 
                  })); 
              }
        } catch (error) {
             console.log( error );
        };
    };