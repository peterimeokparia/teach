import express from 'express';

import onlineQuestionModel from '../model/onlineQuestionModel.js';

import { 
ONLINEQUESTIONSROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } from '../middleWare/index.js';

const onlineQuestionRoute = express.Router();

onlineQuestionRoute.use(logRouteInfo);

onlineQuestionRoute.get('/', getRoute( onlineQuestionModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionRoute.get('/', getByObjectIdRoute( onlineQuestionModel, 'questionId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionRoute.get('/videos', getByIdRoute( onlineQuestionModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionRoute.get('/question/user', getByIdRoute( onlineQuestionModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionRoute.get('/question/question', (req, res) => {
    let userId = { userId: req?.query?.questionId };
    onlineQuestionModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(ONLINEQUESTIONSROUTE, error )
        return res.status(400).json({ error });
    });
})

onlineQuestionRoute.post('/', postRoute( onlineQuestionModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionRoute.put('/:questionId', putRoute( onlineQuestionModel, 'questionId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

onlineQuestionRoute.delete('/:questionId', deleteRoute(onlineQuestionModel, 'questionId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});


export default onlineQuestionRoute;









// onlineQuestionRoute.get('/', (req, res) => {
//     onlineQuestionModel.find({})
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(ONLINEQUESTIONSROUTE, error )
//         return res.status(400).json({ error });
//     });
//  });

// onlineQuestionRoute.get('/', (req, res) => {
//     let id = { _id: req.query.questionId };
//     onlineQuestionModel.findById( id )   
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(ONLINEQUESTIONSROUTE, error )
//         return res.status(400).json({ error });
//     });
// });

// onlineQuestionRoute.get('/question/question', (req, res) => {
//     let userId = { userId: req?.query?.questionId };
//     onlineQuestionModel.find(userId)   
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(ONLINEQUESTIONSROUTE, error )
//         return res.status(400).json({ error });
//     });
// });

// onlineQuestionRoute.get('/question/user', (req, res) => {
//     let userId = { userId: req?.query?.userId };
//     onlineQuestionModel.find(userId)   
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(ONLINEQUESTIONSROUTE, error )
//         return res.status(400).json({ error });
//     });
// });

// onlineQuestionRoute.get('/videos', (req, res) => {
//     onlineQuestionModel.find({ _id: req.query._id })
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch(error => { 
//         return res.status(400).json({ error });
//     });
//  });

// onlineQuestionRoute.post('/', (req, res) => {
//     let questionData = getPostData( req );
//     let onlineQuestion = new onlineQuestionModel(questionData);
//     onlineQuestion.save()
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(ONLINEQUESTIONSROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// onlineQuestionRoute.put('/:questionId', (req, res) => {
//     saveUpdatedData(req, onlineQuestionModel, req.params.questionId)
//     .then( data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs(ONLINEQUESTIONSROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// onlineQuestionRoute.delete('/:questionId', (req, res) => {
//     onlineQuestionModel.remove({ _id: req.params.questionId }, ( error, result ) => {
//     if ( error ) {
//         return res.status(400).send(error);
//     }else {
//         return res.status(200).json(result);
//     }
//     });
// });