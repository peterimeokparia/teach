import express from 'express';

import webpush  from 'web-push';

import notificationModel from '../Model/notificationModel.js';

import {    
saveUpdatedData   
} from '../Helpers/storageHelper.js';





const notificationRoute = express.Router();
const BackeEndServerLessonPrefix = "http://localhost:9005/api/v1";
const frontEndServerPrefix = "http://localhost:3000"; 
const publicVapidKey = 'BJvqz0UAiX-m62ElxLfR-g8kjkuUmos3-YJx9JwEoMxnJzkVYzQzOJcAdr3zkLa3D8Lbv7D3-y8RuqZuLFKAG9M';
const privateVapidKey = 'k5c3sss-1XauZuaDFvHaixOo2xWechDRQBP7LbQsX8U';



webpush.setVapidDetails('mailto:peter.imeokparia@gmail.com', publicVapidKey, privateVapidKey);


// Route: http:localhost:9007/api/v1/notifications/subscribedUsers
notificationRoute.get('/subscribedUsers', ( request, response ) => {

    notificationModel.find({ })
    .then(data => {
        console.log('Users Users', data)
        response.status(200).json(data);
    })
     .catch(error => console.log(error));

});


// Route: http:localhost:9007/api/v1/notifications/subscribedUser?id={id}
notificationRoute.get('/subscribedUser', ( request, response ) => {

    let id = { _id: request.query.userId };
 
    notificationModel.findById( id )   
        .then(data => {
            console.log('Users Users', data)
            response.status(200).json(data);
        })
         .catch(error => console.log(error));

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

      console.log('saved', data);

      response.status(200).json(data)})
      
      .catch( error => {
       console.log(error); 

       response.status(400).json({ error });

      });
                
});




//Route:  http:localhost:9007/api/v1/notifications/subscribe/user/{userId}
notificationRoute.put('/subscribe/user/:Id', ( request, response ) => {

    saveUpdatedData(request, notificationModel, request.params?.Id)
    .then( data => {
        console.log(data);
        response.status(200).json(data)
    })
     .catch( error => {
         console.log(error);
         response.status(400).json({ error })
     });


});




//Route:  http:localhost:9007/api/v1/notifications/sendPushNotifications/user
notificationRoute.put('/sendPushNotifications/user/:Id', ( request, response ) => {

    const user = request.body?.user;
    const message = request.body?.message;

    const payload = JSON.stringify({ title: message?.title,  body: message?.body });
  // Pass users subscription send to info including device info etc 
  // plus the notification we wish to send as the payload into sendNotification 

    user?.subscriptions?.forEach( subscription => {

        webpush.sendNotification(subscription, payload)
        .then( data => {
            
            request.body.messages = [ ...request?.body?.messages, request.body?.message ];

            saveUpdatedData(request, notificationModel, request.params?.Id)
             .then( savedData => {

                response.status(200)?.json({pushedData: data, savedData: savedData });
             })
              .catch(error => {

                console.error(error);
                response.status(400)?.json({error});
              })
            })
            .catch(error => {

                console.error(error);
                response.status(400)?.json({error});
            });
    });
});





//Route:  http:localhost:9007/api/v1/notifications/subscribe
notificationRoute.post('/subscribe',  ( request, response ) => {
   // Get pushSubscription object

   const subscription = request?.body;
   console.log('get end point info for database', request.body);


   // Create payload with notification details
   const payload = JSON.stringify({ title: 'Welcome to Teach!!!', body: 'Notified' });

   // Pass users subscription send to info including device info etc 
   // plus the notification we wish to send as the payload into sendNotification 
 
    webpush.sendNotification( subscription, payload )
        .then( data => {
            
          response.status(200)?.json(data);

        })
    .catch(error => console.error(error));
    
});





//Route:  http:localhost:9007/api/v1/notifications/sendPushNotifications/users
notificationRoute.post('/sendPushNotifications/users', ( request, response ) => {

    const user = request.body?.user;
    const message = request.body?.message;

    const payload = JSON.stringify({ title: message?.title,  body: message?.body });
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




// unsubscribe user
notificationRoute.get('/delete',  ( request, response) => {
 
})




export default notificationRoute;