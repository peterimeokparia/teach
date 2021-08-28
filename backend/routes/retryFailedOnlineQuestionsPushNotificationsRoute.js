import express from 'express';

import retryFailedPushNotificationsModel from '../model/retryFailedPushNotificationsModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
FAILEDPUSHNOTIFICATIONSROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js';

const retryFailedOnlineQuestionsPushNotificationsRoute = express.Router();

retryFailedOnlineQuestionsPushNotificationsRoute.use(logRouteInfo);

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
    .catch( error => {
        handleBackEndLogs(FAILEDPUSHNOTIFICATIONSROUTE, error );
        return res.status(400).json({ error });
    });
});

retryFailedOnlineQuestionsPushNotificationsRoute.get('/push/user', (req, res) => {
    let userId = { userId: req?.query?.userId };
    retryFailedPushNotificationsModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(FAILEDPUSHNOTIFICATIONSROUTE, error );
        return res.status(400).json({ error });
    });
});

retryFailedOnlineQuestionsPushNotificationsRoute.post('/push', (req, res) => {
    let notificationData = getPostData( req );
    let failedNotification = new retryFailedPushNotificationsModel(notificationData);
    failedNotification.save()
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(FAILEDPUSHNOTIFICATIONSROUTE, error );
        return res.status(400).json({ error });
    });
});

retryFailedOnlineQuestionsPushNotificationsRoute.put('/push/:notificationId', (req, res) => {
    saveUpdatedData(req, retryFailedPushNotificationsModel, req.params.notificationId)
    .then( data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(FAILEDPUSHNOTIFICATIONSROUTE, error );
        return res.status(400).json({ error });
    });
});

retryFailedOnlineQuestionsPushNotificationsRoute.delete('/push/:notificationId', (req, res) => {
    retryFailedPushNotificationsModel.remove({ _id: req.params.notificationId }, ( error, result ) => {
    if ( error ) {
        handleBackEndLogs(FAILEDPUSHNOTIFICATIONSROUTE, error );
        return res.status(400).send(error);
    }else {
        return res.status(200).json(result);
    }
    });
});

export default retryFailedOnlineQuestionsPushNotificationsRoute;