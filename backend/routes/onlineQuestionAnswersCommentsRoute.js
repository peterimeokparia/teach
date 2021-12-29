import express from 'express';

import onlineCommentModel from '../model/onlineCommentModel.js';

import { 
ONLINECOMMENTSROUTE,
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

const onlineQuestionAnswersCommentsRoute = express.Router();

onlineQuestionAnswersCommentsRoute.use(logRouteInfo);

onlineQuestionAnswersCommentsRoute.get('/', getRoute( onlineCommentModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionAnswersCommentsRoute.get('/', getByObjectIdRoute( onlineCommentModel, 'commentId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionAnswersCommentsRoute.get('/comment/user', getByIdRoute( onlineCommentModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionAnswersCommentsRoute.get('/question', (req, res) => {
    onlineCommentModel.find({ onlineQuestionId: req.query.questionId })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ONLINECOMMENTSROUTE, error );
        return res.status(400).json({ error });
    });
 });

onlineQuestionAnswersCommentsRoute.get('/answer', (req, res) => {
    onlineCommentModel.find({ onlineQuestionAnswerId: req.query.answerId })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ONLINECOMMENTSROUTE, error );
        return res.status(400).json({ error });
    });
 });

onlineQuestionAnswersCommentsRoute.post('/', postRoute( onlineCommentModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionAnswersCommentsRoute.put('/:commentId', putRoute( onlineCommentModel, 'commentId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

onlineQuestionAnswersCommentsRoute.delete('/:commentId', deleteRoute(onlineCommentModel, 'commentId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

export default onlineQuestionAnswersCommentsRoute;











// onlineQuestionAnswersCommentsRoute.get('/', (req, res) => {
//     onlineCommentModel.find({})
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs( ONLINECOMMENTSROUTE, error );
//         return res.status(400).json({ error });
//     });
//  });

// onlineQuestionAnswersCommentsRoute.get('/', (req, res) => {
//     let id = { _id: req.query.commentId };
//     onlineCommentModel.findById( id )   
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs( ONLINECOMMENTSROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// onlineQuestionAnswersCommentsRoute.get('/question', (req, res) => {
//     onlineCommentModel.find({ onlineQuestionId: req.query.questionId })
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs( ONLINECOMMENTSROUTE, error );
//         return res.status(400).json({ error });
//     });
//  });

//  onlineQuestionAnswersCommentsRoute.get('/answer', (req, res) => {
//     onlineCommentModel.find({ onlineQuestionAnswerId: req.query.answerId })
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs( ONLINECOMMENTSROUTE, error );
//         return res.status(400).json({ error });
//     });
//  });

// onlineQuestionAnswersCommentsRoute.get('/comment/user', (req, res) => {
//     let userId = { userId: req?.query?.userId };
//     onlineCommentModel.find(userId)   
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs( ONLINECOMMENTSROUTE, error );
//         return res.status(400).json({ error })
//     });
// })

// onlineQuestionAnswersCommentsRoute.post('/', (req, res) => {
//     let answerData = getPostData( req );
//     let onlineComment = new onlineCommentModel(answerData);
//     onlineComment.save()
//     .then(data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs( ONLINECOMMENTSROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// onlineQuestionAnswersCommentsRoute.put('/:commentId', (req, res) => {
//     saveUpdatedData(req, onlineCommentModel, req.params.commentId)
//     .then( data => {
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         handleBackEndLogs( ONLINECOMMENTSROUTE, error );
//         return res.status(400).json({ error });
//     });
// });

// onlineQuestionAnswersCommentsRoute.delete('/:commentId', (req, res) => {
//     onlineCommentModel.remove({ _id: req.params.commentId }, ( error, result ) => {
//         if ( error ) {
//             handleBackEndLogs( ONLINECOMMENTSROUTE, error );
//             return res.status(400).send(error);
//         }else {
//             return res.status(200).json(result);
//         }
//     });
// });