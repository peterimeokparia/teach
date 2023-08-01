const express = require('express');

const onlineSurveyModel = require('../model/onlineSurveyModel.js');

const {
getPostData,    
saveUpdatedData } = require('../helpers/storageHelper.js');

const { 
ONLINESURVEYROUTE,
handleBackEndLogs } = require('../helpers/logHelper.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js');

const onlineSurveyRoute = express.Router();

onlineSurveyRoute.use(logRouteInfo);

onlineSurveyRoute.get('/', getRoute( onlineSurveyModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineSurveyRoute.get('/', getByObjectIdRoute( onlineSurveyModel, 'surveyId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineSurveyRoute.get('/videos', getByIdRoute( onlineSurveyModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineSurveyRoute.get('/survey/survey', (req, res) => {
    let userId = { userId: req?.query?.surveyId };
    onlineSurveyModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(ONLINESURVEYROUTE, error )
        return res.status(400).json({ error });
    });
});

onlineSurveyRoute.get('/survey/user', getByIdRoute( onlineSurveyModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineSurveyRoute.post('/', postRoute( onlineSurveyModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineSurveyRoute.put('/:surveyId', putRoute( onlineSurveyModel, 'surveyId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

onlineSurveyRoute.delete('/:surveyId', deleteRoute(onlineSurveyModel, 'surveyId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = onlineSurveyRoute;







// onlineSurveyRoute.get('/', (req, res) => {
//     onlineSurveyModel.find({})
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(ONLINESURVEYROUTE, error )
//         return res.status(400).json({ error });
//     });
//  });

// onlineSurveyRoute.get('/', (req, res) => {
//     let id = { _id: req.query.surveyId };
//     onlineSurveyModel.findById( id )   
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(ONLINESURVEYROUTE, error )
//         return res.status(400).json({ error });
//     });
// });

// onlineSurveyRoute.get('/survey/survey', (req, res) => {
//     let userId = { userId: req?.query?.surveyId };
//     onlineSurveyModel.find(userId)   
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(ONLINESURVEYROUTE, error )
//         return res.status(400).json({ error });
//     });
// });

// onlineSurveyRoute.get('/survey/user', (req, res) => {
//     let userId = { userId: req?.query?.userId };
//     onlineSurveyModel.find(userId)   
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(ONLINESURVEYROUTE, error )
//         return res.status(400).json({ error });
//     });
// });

// onlineSurveyRoute.get('/videos', (req, res) => {
//     onlineSurveyModel.find({ _id: req.query._id })
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch(error => { 
//         return res.status(400).json({ error });
//     });
//  });

// onlineSurveyRoute.post('/', (req, res) => {
//     let surveyData = getPostData( req );
//     let onlineSurvey = new onlineSurveyModel(surveyData);
//     onlineSurvey.save()
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(ONLINESURVEYROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// onlineSurveyRoute.put('/:surveyId', (req, res) => {
//     saveUpdatedData(req, onlineSurveyModel, req.params.surveyId)
//     .then( data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(ONLINESURVEYROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// onlineSurveyRoute.delete('/:surveyId', (req, res) => {
//     onlineSurveyModel.remove({ _id: req.params.surveyId }, ( error, result ) => {
//     if ( error ) {
//         return res.status(400).send(error);
//     }else {
//         return res.status(200).json(result);
//     }
//     });
// });