import express from 'express';

import onlineCommentModel from '../model/onlineCommentModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
ONLINECOMMENTSROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js';

const onlineQuestionAnswersCommentsRoute = express.Router();
onlineQuestionAnswersCommentsRoute.use(logRouteInfo);

onlineQuestionAnswersCommentsRoute.get('/', (req, res) => {
    onlineCommentModel.find({})
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ONLINECOMMENTSROUTE, error );
        return res.status(400).json({ error });
    });
 });

onlineQuestionAnswersCommentsRoute.get('/', (req, res) => {
    let id = { _id: req.query.commentId };
    onlineCommentModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ONLINECOMMENTSROUTE, error );
        return res.status(400).json({ error });
    });
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

onlineQuestionAnswersCommentsRoute.get('/comment/user', (req, res) => {
    let userId = { userId: req?.query?.userId };
    onlineCommentModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ONLINECOMMENTSROUTE, error );
        return res.status(400).json({ error })
    });
})

onlineQuestionAnswersCommentsRoute.post('/', (req, res) => {
    let answerData = getPostData( req );
    let onlineComment = new onlineCommentModel(answerData);
    onlineComment.save()
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ONLINECOMMENTSROUTE, error );
        return res.status(400).json({ error });
    });
});

onlineQuestionAnswersCommentsRoute.put('/:commentId', (req, res) => {
    saveUpdatedData(req, onlineCommentModel, req.params.commentId)
    .then( data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ONLINECOMMENTSROUTE, error );
        return res.status(400).json({ error });
    });
});

onlineQuestionAnswersCommentsRoute.delete('/:commentId', (req, res) => {
    onlineCommentModel.remove({ _id: req.params.commentId }, ( error, result ) => {
        if ( error ) {
            handleBackEndLogs( ONLINECOMMENTSROUTE, error );
            return res.status(400).send(error);
        }else {
            return res.status(200).json(result);
        }
    });
});

export default onlineQuestionAnswersCommentsRoute;