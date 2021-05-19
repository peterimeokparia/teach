import express from 'express';

import retryFailedPushNotificationsModel from '../Model/retryFailedPushNotificationsModel.js';

import {
getPostData,    
saveUpdatedData   
} from '../Helpers/storageHelper.js';

const retryFailedOnlineQuestionsPushNotificationsRoute = express.Router();

// retryFailedOnlineQuestionsPushNotificationsRoute.get('/push', (req, res) => {
//     retryFailedPushNotificationsModel.find({})
//     .then(data => {
//         console.log('failedNotification failedNotification Debug', data);
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         console.log(error);
//         return res.status(400).json({ error })
//     });
//  });

retryFailedOnlineQuestionsPushNotificationsRoute.get('/push/byNotificationId', (req, res) => {
    let id = { _id: req.query.notificationId };
    retryFailedPushNotificationsModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch(error =>{    
        return res.status(400).json({ error }); 
    });
});

retryFailedOnlineQuestionsPushNotificationsRoute.get('/push/user', (req, res) => {
    let userId = { userId: req?.query?.userId };
    retryFailedPushNotificationsModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch(error => { 
        return res.status(400).json({ error })
    });
})

retryFailedOnlineQuestionsPushNotificationsRoute.post('/push', (req, res) => {
    console.log( req );
    console.log('in failedNotification failedNotification saved saved');
    let notificationData = getPostData( req );
    let failedNotification = new retryFailedPushNotificationsModel(notificationData);
    failedNotification.save()
    .then(data => {
        console.log('failedNotification failedNotification saved saved', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log(error);
        return res.status(400).json({ error });
    });
});

retryFailedOnlineQuestionsPushNotificationsRoute.put('/push/:notificationId', (req, res) => {
    console.log('retryFailedOnlineQuestionsPushNotificationsRoute.put(/:notificationId');
    console.log(req.params);
    console.log(req.params.notificationId);
    saveUpdatedData(req, retryFailedPushNotificationsModel, req.params.notificationId)
    .then( data => {
        console.log('retryFailedOnlineQuestionsPushNotificationsRoute retryFailedOnlineQuestionsPushNotificationsRoute retryFailedOnlineQuestionsPushNotificationsRoute put')
        console.log(data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log(error);
        return res.status(400).json({ error });
    });
});

retryFailedOnlineQuestionsPushNotificationsRoute.delete('/push/:notificationId', (req, res) => {
    console.log('retryFailedOnlineQuestionsPushNotificationsRoute.delete')
    console.log(req)
    console.log(req.params.notificationId)
    retryFailedPushNotificationsModel.remove({ _id: req.params.notificationId }, ( error, result ) => {
        if ( error ) {
            console.log(error)
            return res.status(400).send(error);
        }
        else {
            console.log(result)
            return res.status(200).json(result);
        }
    });
});

export default retryFailedOnlineQuestionsPushNotificationsRoute;