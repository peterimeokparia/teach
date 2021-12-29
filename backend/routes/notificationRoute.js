import {    
saveUpdatedData,
sendSubscriptions,
vapidKeys } from '../helpers/storageHelper.js';

import express from 'express';
import webpush  from 'web-push';
import notificationModel from '../model/notificationModel.js';

import {
NOTIFICATIONROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js';

const notificationRoute = express.Router();

notificationRoute.use(logRouteInfo);

webpush.setVapidDetails('mailto:peter.imeokparia@gmail.com', vapidKeys.publicVapidKey, vapidKeys.privateVapidKey);

// Route: http:localhost:9007/api/v1/notifications/subscribedUsers
notificationRoute.get('/', ( request, response ) => {
    notificationModel.find({ })
    .then(data => {
        return response.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( NOTIFICATIONROUTE, error );
        return response.status(400).json({ error })
    });
});

// Route: http:localhost:9007/api/v1/notifications/subscribedUser?id={id}
notificationRoute.get('/subscribedUser/byId', ( request, response ) => {
    let id = { _id: request.query.userId };
    notificationModel.findById( id )   
        .then(data => {
            return response.status(200).json(data);
        })
        .catch( error => {
            handleBackEndLogs( NOTIFICATIONROUTE, error );
            return response.status(400).json({ error })
        });
});

//Route:  http:localhost:9007/api/v1/notifications/subscribe/user
notificationRoute.post('/subscribe/user', ( request, response ) => {
    let usersSubscriptionData = {
        userId: request.body?.userId,
        subscriptions: request.body?.subscriptions,
        operatorId: request.body?.operatorId
    }
    let usersSubscription = new notificationModel( usersSubscriptionData );  
    usersSubscription.save()
      .then(data => {
        response.status(200).json(data)})
        .catch( error => {
            handleBackEndLogs( NOTIFICATIONROUTE, error );
            return response.status(400).json({ error })
        });  
});

//Route:  http:localhost:9007/api/v1/notifications/subscribe/user/{userId}
notificationRoute.put('/subscribe/user/:Id', ( request, response ) => {
    saveUpdatedData(request, notificationModel, request.params?.Id)
    .then( data => {
        if ( data ) {
           return response.status(200).json(data);
        }
    })
    .catch( error => {     
        if ( error ) {
            handleBackEndLogs( NOTIFICATIONROUTE, error );
           return response.status(400).json({ error })
        }
    });
});

//Route:  http:localhost:9007/api/v1/notifications/sendPushNotifications/user
notificationRoute.put('/sendPushNotifications/user/:Id', ( request, response ) => {
    const user = request?.body?.user;
    const message = request?.body?.message;
    const payload = JSON.stringify({ title: message?.title,  body: message?.body });
    //Pass users subscription send to info including device info etc 
    //plus the notification we wish to send as the payload into sendNotification 
    let result = [];
      try {
        sendSubscriptions( user, request, payload, response )
         .then( promiseResponse => {
             promiseResponse?.forEach( responseAsPromise => {
                responseAsPromise
                 .then( notificationResponse => {
                     result.push( notificationResponse )
                     if ( result?.length === promiseResponse?.length ) {
                         return response.status(200).json( JSON.stringify( result ) );
                     }
                 })
                 .catch(error => {
                      console.log( error )
                 })
             })
         }).catch( error => { console.log( error )})
      } catch ( error ) {
        handleBackEndLogs( NOTIFICATIONROUTE, error );
         return response.status(400)?.json( { error } );
      }
});

//Route:  http:localhost:9007/api/v1/notifications/sendPushNotifications/user
notificationRoute.put('/retryPushNotifications/user/:Id', ( request, response ) => {
    const user = request?.body?.user;
    const message = request?.body?.message;
    const failedNotification = JSON.stringify( request?.body?.failedNotification );
    const payload = JSON.stringify({ title: message?.title,  body: message?.body, failedNotification  });
    //Pass users subscription send to info including device info etc 
    //plus the notification we wish to send as the payload into sendNotification 
    let result = [];
      try {
        sendSubscriptions( user, request, payload, response )
         .then( promiseResponse => {
             promiseResponse?.forEach( responseAsPromise => {
                responseAsPromise
                 .then( notificationResponse => {
                     result.push(  notificationResponse  )
                     if ( result?.length === promiseResponse?.length ) {
                         let responseData = { failedNotification: JSON.parse( failedNotification ), result: JSON.stringify( result ) }
                         return response.status(200).json( responseData );
                     }
                 })
                 .catch(error => {
                    handleBackEndLogs( NOTIFICATIONROUTE, error );
                      console.log( error )
                 })
             })
         }).catch( error => { console.log( error )})
      } catch ( error ) {
        handleBackEndLogs( NOTIFICATIONROUTE, error );
         return response.status(400)?.json( { error } );
      }
});

//Route:  http:localhost:9007/api/v1/notifications/subscribe
notificationRoute.post('/subscribe',  ( request, response ) => {
   // Get pushSubscription object
   const subscription = request?.body;
   // Create payload with notification details
   const payload = JSON.stringify({ title: 'Welcome to Teach!!!', body: 'Notified' });
   // Pass users subscription send to info including device info etc 
   // plus the notification we wish to send as the payload into sendNotification 
    webpush.sendNotification( subscription, payload )
    .then( data => {
        response.status(200)?.json(data);
    })
    .catch(error => {
        console.error(error);
        response.status(400)?.json({error});
    });
});

//Route:  http:localhost:9007/api/v1/notifications/sendPushNotifications/users
notificationRoute.post('/sendPushNotifications/users', ( request, response ) => {
    const user = request.body?.user;
    const message = request.body?.message;
    const payload = JSON.stringify({ title: message?.title,  body: message?.body  });
  // Pass users subscription send to info including device info etc 
  // plus the notification we wish to send as the payload into sendNotification 
    user?.subscriptions?.forEach( subscription => {
        webpush.sendNotification(subscription, payload)
        .then( data => {
            response.status(200)?.json(data);
        })
        .catch(error => {
            console.error(error);
            response.status(400)?.json({error});
        });
    });
});

//unsubscribe user
notificationRoute.get('/delete',  ( request, response) => { 
});

export default notificationRoute;
