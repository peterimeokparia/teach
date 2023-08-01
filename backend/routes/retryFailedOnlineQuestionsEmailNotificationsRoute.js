const express = require('express');

const retryFailedEmailNotificationsModel = require('../model/retryFailedEmailNotificationsModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js');

const retryFailedOnlineQuestionsEmailNotificationsRoute = express.Router();

retryFailedOnlineQuestionsEmailNotificationsRoute.use(logRouteInfo);

retryFailedOnlineQuestionsEmailNotificationsRoute.get('/', getRoute( retryFailedEmailNotificationsModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

retryFailedOnlineQuestionsEmailNotificationsRoute.get('/email', getByObjectIdRoute( retryFailedEmailNotificationsModel, 'notificationId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

retryFailedOnlineQuestionsEmailNotificationsRoute.get('/email/user', getByIdRoute( retryFailedEmailNotificationsModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

retryFailedOnlineQuestionsEmailNotificationsRoute.post('/email', postRoute( retryFailedEmailNotificationsModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

retryFailedOnlineQuestionsEmailNotificationsRoute.put('/email/:notificationId', putRoute( retryFailedEmailNotificationsModel, 'notificationId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

retryFailedOnlineQuestionsEmailNotificationsRoute.delete('/email/:notificationId', deleteRoute(retryFailedEmailNotificationsModel, 'notificationId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = retryFailedOnlineQuestionsEmailNotificationsRoute;









// retryFailedOnlineQuestionsEmailNotificationsRoute.get('/email', (req, res) => {
//     retryFailedEmailNotificationsModel.find({})
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(FAILEDEMAILNOTIFICATIONSROUTE, error );
//         return res.status(400).json({ error });
//     });
//  });

// retryFailedOnlineQuestionsEmailNotificationsRoute.get('/email', (req, res) => {
//     let id = { _id: req.query.notificationId };
//     retryFailedEmailNotificationsModel.findById( id )   
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(FAILEDEMAILNOTIFICATIONSROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// retryFailedOnlineQuestionsEmailNotificationsRoute.get('/email/user', (req, res) => {
//     let userId = { userId: req?.query?.userId };
//     retryFailedEmailNotificationsModel.find(userId)   
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(FAILEDEMAILNOTIFICATIONSROUTE, error );
//         return res.status(400).json({ error });
//     });
// })

// retryFailedOnlineQuestionsEmailNotificationsRoute.post('/email', (req, res) => {
//     let notificationData = getPostData( req );
//     let failedNotification = new retryFailedEmailNotificationsModel(notificationData);
//     failedNotification.save()
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(FAILEDEMAILNOTIFICATIONSROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// retryFailedOnlineQuestionsEmailNotificationsRoute.put('/email/:notificationId', (req, res) => {
//     saveUpdatedData(req, retryFailedEmailNotificationsModel, req.params.notificationId)
//     .then( data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(FAILEDEMAILNOTIFICATIONSROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// retryFailedOnlineQuestionsEmailNotificationsRoute.delete('/email/:notificationId', (req, res) => {
//     retryFailedEmailNotificationsModel.remove({ _id: req.params.notificationId }, ( error, result ) => {
//     if ( error ) {
//         return res.status(400).send(error);
//     }else {
//         return res.status(200).json(result);
//     }
//     });
// });