import express from 'express';

import onlineAnswerModel from '../model/onlineAnswerModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
ONLINEANSWERSROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js';

const onlineQuestionAnswersRoute = express.Router();
onlineQuestionAnswersRoute.use(logRouteInfo);

onlineQuestionAnswersRoute.get('/', (req, res) => {
    onlineAnswerModel.find({})
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ONLINEANSWERSROUTE, error );
        return res.status(400).json({ error });
    });
});

onlineQuestionAnswersRoute.get('/question', (req, res) => {
    let id = { _id: req.query.questionId };
    onlineAnswerModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ONLINEANSWERSROUTE, error );
        return res.status(400).json({ error });
    });
});

onlineQuestionAnswersRoute.get('/answer/user', (req, res) => {
    let userId = { userId: req?.query?.userId };
    onlineAnswerModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ONLINEANSWERSROUTE, error );
        return res.status(400).json({ error });
    });
});

onlineQuestionAnswersRoute.get('/videos', (req, res) => {
 onlineAnswerModel.find({ _id: req.query._id })
    .then(data => {
        res.status(200).json(data);
    })
    .catch( error => {
        if ( error ) {
            handleBackEndLogs(ONLINEANSWERSROUTE, error )
            .then( resp => { console.log( `response: ${JSON.stringify(resp)}`)})
            .catch( error => { console.log( `error: ${ error}`)});
        }
        return res.status(400).json({ error });
    });
 });

onlineQuestionAnswersRoute.post('/', (req, res) => {
    let answerData = getPostData( req );
    let onlineAnswer = new onlineAnswerModel(answerData);
    onlineAnswer.save()
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ONLINEANSWERSROUTE, error );
        return res.status(400).json({ error });
    });
});

onlineQuestionAnswersRoute.put('/:answerId', (req, res) => {
    saveUpdatedData(req, onlineAnswerModel, req.params.answerId)
    .then( data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ONLINEANSWERSROUTE, error );
        return res.status(400).json({ error });
    });
});

onlineQuestionAnswersRoute.delete('/:answerId', (req, res) => {
    onlineAnswerModel.remove({ _id: req.params.answerId }, ( error, result ) => {
    if ( error ) {
        return res.status(400).send(error);
    }else {
        return res.status(200).json(result);
    }
    });
});

export default onlineQuestionAnswersRoute;