import express from 'express';

import retryFailedEmailNotificationsModel from '../Model/retryFailedEmailNotificationsModel.js';

import {
getPostData,    
saveUpdatedData } from '../Helpers/storageHelper.js';

import { 
FAILEDEMAILNOTIFICATIONSROUTE,
handleBackEndLogs } from '../Helpers/logHelper.js';

const retryFailedOnlineQuestionsEmailNotificationsRoute = express.Router();

retryFailedOnlineQuestionsEmailNotificationsRoute.get('/email', (req, res) => {
    retryFailedEmailNotificationsModel.find({})
    .then(data => {
        console.log('failedNotification failedNotification Debug', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(FAILEDEMAILNOTIFICATIONSROUTE, error )
        return res.status(400).json({ error })
    });
 });

retryFailedOnlineQuestionsEmailNotificationsRoute.get('/email', (req, res) => {
    let id = { _id: req.query.notificationId };
    retryFailedEmailNotificationsModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(FAILEDEMAILNOTIFICATIONSROUTE, error )
        return res.status(400).json({ error })
    });
});

retryFailedOnlineQuestionsEmailNotificationsRoute.get('/email/user', (req, res) => {
    let userId = { userId: req?.query?.userId };
    retryFailedEmailNotificationsModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(FAILEDEMAILNOTIFICATIONSROUTE, error )
        return res.status(400).json({ error })
    });
})

retryFailedOnlineQuestionsEmailNotificationsRoute.post('/email', (req, res) => {
    console.log( req );
    console.log('in failedNotification failedNotification saved saved');
    let notificationData = getPostData( req );
    let failedNotification = new retryFailedEmailNotificationsModel(notificationData);
    failedNotification.save()
    .then(data => {
        console.log('failedNotification failedNotification saved saved', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(FAILEDEMAILNOTIFICATIONSROUTE, error )
        return res.status(400).json({ error })
    });
});

retryFailedOnlineQuestionsEmailNotificationsRoute.put('/email/:notificationId', (req, res) => {
    console.log('retryFailedOnlineQuestionsEmailNotificationsRoute.put(/:notificationId');
    console.log(req.params);
    console.log(req.params.notificationId);
    saveUpdatedData(req, retryFailedEmailNotificationsModel, req.params.notificationId)
    .then( data => {
        console.log('retryFailedOnlineQuestionsEmailNotificationsRoute put')
        console.log(data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(FAILEDEMAILNOTIFICATIONSROUTE, error )
        return res.status(400).json({ error })
    });
});

retryFailedOnlineQuestionsEmailNotificationsRoute.delete('/email/:notificationId', (req, res) => {
    console.log('retryFailedOnlineQuestionsEmailNotificationsRoute.delete')
    console.log(req)
    console.log(req.params.notificationId)
    retryFailedEmailNotificationsModel.remove({ _id: req.params.notificationId }, ( error, result ) => {
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

export default retryFailedOnlineQuestionsEmailNotificationsRoute;