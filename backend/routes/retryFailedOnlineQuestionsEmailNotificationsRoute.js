import express from 'express';

import retryFailedEmailNotificationsModel from '../model/retryFailedEmailNotificationsModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
FAILEDEMAILNOTIFICATIONSROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

const retryFailedOnlineQuestionsEmailNotificationsRoute = express.Router();

retryFailedOnlineQuestionsEmailNotificationsRoute.get('/email', (req, res) => {
    retryFailedEmailNotificationsModel.find({})
    .then(data => {
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
    let notificationData = getPostData( req );
    let failedNotification = new retryFailedEmailNotificationsModel(notificationData);
    failedNotification.save()
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(FAILEDEMAILNOTIFICATIONSROUTE, error )
        return res.status(400).json({ error })
    });
});

retryFailedOnlineQuestionsEmailNotificationsRoute.put('/email/:notificationId', (req, res) => {
    saveUpdatedData(req, retryFailedEmailNotificationsModel, req.params.notificationId)
    .then( data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(FAILEDEMAILNOTIFICATIONSROUTE, error )
        return res.status(400).json({ error })
    });
});

retryFailedOnlineQuestionsEmailNotificationsRoute.delete('/email/:notificationId', (req, res) => {
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