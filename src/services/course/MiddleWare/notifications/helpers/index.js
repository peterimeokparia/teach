import {
sendEmail } from 'Services/course/Api';

import {
sendEmails } from 'Services/course/Actions/Emails';

import {
sendPushNotificationMessage,     
subscribePushNotificationUser,
savePushNotificationUser } from 'Services/course/Actions/Notifications';

import {
handlePushNotificationSubscription } from 'Services/course/helpers/PageHelpers';


export const subscribeQuestionOwnerToQuestionPushNotification = async ( store, state, action ) => {
    let notificationMessage = sendQuestionPushMessageConfig( state, action );
    let subscribedPushUsers = notificationMessage?.subscribedPushUsers;
    let currentUser = notificationMessage?.currentUser;
    let currentSubscription = notificationMessage?.currentSubscription;
    handlePushNotifications(
         action?.payload,   
         currentSubscription, 
         subscribedPushUsers, 
         currentUser, 
         action,
         store,
         `${ currentUser?.firstname } added question: ${ action?.payload?.markDownContenttt }`
    );        
}

export const sendPushNotificationOnQuestionUpdate = async ( store, state, action, question, questionEntity ) => {   
    let notificationMessage = sendQuestionPushMessageConfig( state, action );
    let subscribedPushUsers = notificationMessage?.subscribedPushUsers;
    let currentUser = notificationMessage?.currentUser;
    let currentSubscription = notificationMessage?.currentSubscription;
    handlePushNotifications(
         question,
         currentSubscription, 
         subscribedPushUsers, 
         currentUser, 
         action,
         store,
         `${ currentUser?.firstname } : new ${ questionEntity } added for question: ${ question?.markDownContenttt }`
    );    
}

let sendQuestionPushMessageConfig = ( state, action ) => {
    let subscribedPushUsers = Object.values( state?.notifications?.pushNotificationSubscribers );
    let currentUser = Object.values( state?.users?.users )?.find(user => user?._id === action?.payload?.userId );
    let questionPushSubcribers = ( action?.payload?.questionPushNotificationSubscribers === null || action?.payload?.questionPushNotificationSubscribers === undefined ) 
                                       ? Object.values( state?.onlineQuestions?.onlineQuestions )?.find( question => question?._id === action?.payload?.onlineQuestionId )?.questionPushNotificationSubscribers
                                       : action?.payload?.questionPushNotificationSubscribers
    let currentSubscription = subscribedPushUsers?.filter( user => questionPushSubcribers?.includes( user?.userId ));
    return {
         subscribedPushUsers,
         currentUser,
         currentSubscription
    }
} 

export const subscribeQuestionOwnerToQuestionEmailNotification = async ( store, state, action ) => {
    let notificationMessage = sendQuestionEmailMessageConfig( state, action );
    handleEmailNotifications(
        action?.payload, 
        notificationMessage?.emailNotificationSubscribers,
        // notificationMessage?.currentUser, 
        // action,
        store,
        `${ notificationMessage?.currentUser?.firstname } added question: ${ action?.payload?.markDownContenttt }`
    );      
}

export const sendEmailNotificationOnQuestionUpdate = async ( store, state, action, question, questionEntity ) => {   
    let notificationMessage = sendQuestionEmailMessageConfig( state, action );
    handleEmailNotifications(
        question, 
        notificationMessage?.emailNotificationSubscribers,
        // notificationMessage?.currentUser, 
        // action,
        store,
        `${ notificationMessage?.currentUser?.firstname } : new ${ questionEntity } added for question: ${ question?.markDownContenttt }`
    );    
}

let sendQuestionEmailMessageConfig = ( state, action ) => {
    let currentUser = Object.values( state?.users?.users )?.find(user => user?._id === action?.payload?.userId );
    let questionEmailSubcribers = ( action?.payload?.questionEmailNotificationSubscribers === null || action?.payload?.questionEmailNotificationSubscribers === undefined ) 
                                       ? Object.values( state?.onlineQuestions?.onlineQuestions )?.find( question => question?._id === action?.payload?.onlineQuestionId )?.questionEmailNotificationSubscribers
                                       : action?.payload?.questionEmailNotificationSubscribers
    let emailNotificationSubscribers = Object.values( state?.users?.users )?.filter( user => questionEmailSubcribers?.includes( user?._id ))?.map(( user ) => { return { email: user?.email, userId: user?._id } });
    return {
         currentUser,
         emailNotificationSubscribers
    }
} 

export function getOnlineQuestion( action, state ) {
    return ( action?.payload?.onlineQuestionId === null || 
             action?.payload?.onlineQuestionId === undefined ) 
               ? action?.payload
               : Object.values( state?.onlineQuestions?.onlineQuestions )?.find( question => question?._id === action?.payload?.onlineQuestionId );
}

function handlePushNotifications( question, currentSubscription, subscribedPushUsers, currentUser, action, store,  message ) {
    try {
         if ( ! currentSubscription ) {
              handlePushNotificationSubscription( subscribedPushUsers, currentUser, subscribePushNotificationUser, savePushNotificationUser ); 
          }
          // add link to question detail page
          if ( currentSubscription ) {
              store.dispatch(sendPushNotificationMessage( 
                   currentSubscription, { 
                   title:`${ message }`, 
                   body:`Question: ${ question?._id } : ${ action?.payload?.markDownContenttt }` 
              })); 
          }
    } catch (error) {
         console.log( error )
    }
}

function handleEmailNotifications( question,  emailNotificationSubscribers, store,  message ) {
    try {
          // add link to question detail 
            emailNotificationSubscribers.forEach(element => {
            store.dispatch(sendEmails(
                "teachpadsconnect247@gmail.com",
                element?.email,
                `New updates to Question # ${ question?._id } : ${ question?.markDownContenttt }`,
                message,
                element?.userId
            ));
        })      
    } catch (error) {
         console.log( error )
    }
}
