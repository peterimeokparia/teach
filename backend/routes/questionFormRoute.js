const express = require('express');

const questionFormModel = require('../model/questionFormModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js');

const questionFormRoute = express.Router();

questionFormRoute.use(logRouteInfo);

questionFormRoute.get('/', getRoute( questionFormModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

questionFormRoute.get('/question', getByObjectIdRoute( questionFormModel, 'questionId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

questionFormRoute.get('/videos', getByIdRoute( questionFormModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

questionFormRoute.get('/question/user', getByIdRoute( questionFormModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

questionFormRoute.post('/', postRoute( questionFormModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

questionFormRoute.put('/:questionId', putRoute( questionFormModel, 'questionId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

questionFormRoute.delete('/:questionId', deleteRoute(questionFormModel, 'questionId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = questionFormRoute;









// questionFormRoute.get('/', (req, res) => {
//     questionFormModel.find({})
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(QUESTIONFORMROUTE, error );
//         return res.status(400).json({ error });
//     });
//  });

// questionFormRoute.get('/question', (req, res) => {
//     let id = { _id: req.query.questionId };
//     questionFormModel.findById( id )   
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(QUESTIONFORMROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// questionFormRoute.get('/question/user', (req, res) => {
//     let userId = { userId: req?.query?.userId };
//     questionFormModel.find(userId)   
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(QUESTIONFORMROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// questionFormRoute.get('/videos', (req, res) => {
//     questionFormModel.find({ _id: req.query._id })
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch(error => { 
//         return res.status(400).json({ error });
//     });
//  });

// questionFormRoute.post('/', (req, res) => {
//     let questionData = getPostData( req );
//     let questionForm = new questionFormModel(questionData);
//     questionForm.save()
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(QUESTIONFORMROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// questionFormRoute.put('/:questionId', (req, res) => {
//     saveUpdatedData(req, questionFormModel, req.params.questionId)
//     .then( data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(QUESTIONFORMROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// questionFormRoute.delete('/:questionId', (req, res) => {
//     questionFormModel.remove({ _id: req.params.questionId }, ( error, result ) => {
//     if ( error ) {
//         return res.status(400).send(error);
//     }else {
//         return res.status(200).json(result);
//     }
//     });
// });