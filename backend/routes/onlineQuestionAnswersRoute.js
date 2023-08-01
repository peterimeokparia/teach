const express = require('express');

const onlineAnswerModel = require('../model/onlineAnswerModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js');

const onlineQuestionAnswersRoute = express.Router();

onlineQuestionAnswersRoute.use(logRouteInfo);

onlineQuestionAnswersRoute.get('/', getRoute( onlineAnswerModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionAnswersRoute.get('/', getByIdRoute( onlineAnswerModel, 'courseId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionAnswersRoute.get('/question', getByObjectIdRoute( onlineAnswerModel, 'questionId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionAnswersRoute.get('/videos', getByIdRoute( onlineAnswerModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionAnswersRoute.get('/answer/user', getByIdRoute( onlineAnswerModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionAnswersRoute.post('/', postRoute( onlineAnswerModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionAnswersRoute.put('/:answerId', putRoute( onlineAnswerModel, 'answerId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

onlineQuestionAnswersRoute.delete('/:answerId', deleteRoute(onlineAnswerModel, 'answerId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = onlineQuestionAnswersRoute;










// onlineQuestionAnswersRoute.get('/', (req, res) => {
//     onlineAnswerModel.find({})
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs( ONLINEANSWERSROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// onlineQuestionAnswersRoute.get('/question', (req, res) => {
//     let id = { _id: req.query.questionId };
//     onlineAnswerModel.findById( id )   
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs( ONLINEANSWERSROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// onlineQuestionAnswersRoute.get('/answer/user', (req, res) => {
//     let userId = { userId: req?.query?.userId };
//     onlineAnswerModel.find(userId)   
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs( ONLINEANSWERSROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// onlineQuestionAnswersRoute.get('/videos', (req, res) => {
//  onlineAnswerModel.find({ _id: req.query._id })
//     .then(data => {
//         res.status(200).json(data);
//     })
//     .catch( error => {
//         if ( error ) {
//             handleBackEndLogs(ONLINEANSWERSROUTE, error )
//             .then( resp => { console.log( `response: ${JSON.stringify(resp)}`)})
//             .catch( error => { console.log( `error: ${ error}`)});
//         }
//         return res.status(400).json({ error });
//     });
//  });

// onlineQuestionAnswersRoute.post('/', (req, res) => {
//     let answerData = getPostData( req );
//     let onlineAnswer = new onlineAnswerModel(answerData);
//     onlineAnswer.save()
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs( ONLINEANSWERSROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// onlineQuestionAnswersRoute.put('/:answerId', (req, res) => {
//     saveUpdatedData(req, onlineAnswerModel, req.params.answerId)
//     .then( data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs( ONLINEANSWERSROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// onlineQuestionAnswersRoute.delete('/:answerId', (req, res) => {
//     onlineAnswerModel.remove({ _id: req.params.answerId }, ( error, result ) => {
//     if ( error ) {
//         return res.status(400).send(error);
//     }else {
//         return res.status(200).json(result);
//     }
//     });
// });