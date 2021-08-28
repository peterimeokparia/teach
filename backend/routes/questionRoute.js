import express from 'express';

import questionModel from '../model/questionModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
QUESTIONROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js';

const questionRoute = express.Router();
questionRoute.use(logRouteInfo);

questionRoute.get('/', (req, res) => {
questionModel.find({ })
.then(data => {
    return res.status(200).json(data);
})
.catch( error => {
    handleBackEndLogs(QUESTIONROUTE, error );
    return res.status(400).json({ error });
    });
 });

 questionRoute.get('/test', (req, res) => {
    questionModel.find({ _id: req.query.questionId })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(QUESTIONROUTE, error );
        return res.status(400).json({ error });
    });
 });
 
 questionRoute.get('/videos', (req, res) => {
   questionModel.find({ _id: req.query._id })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(QUESTIONROUTE, error );
        return res.status(400).json({ error });
    });
});
 
 questionRoute.get('/files', (req, res) => {
   questionModel.find({ _id: req.query._id })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
    handleBackEndLogs(QUESTIONROUTE, error );
    return res.status(400).json({ error })
    });
});

 questionRoute.post('/', (req, res) => {
    let questionData = getPostData( req );
    let questions = new questionModel(questionData);
    questions.save()
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(QUESTIONROUTE, error );
        return res.status(400).json({ error });
    });
 });

 questionRoute.put('/:questionId', (req, res) => {
    saveUpdatedData(req, questionModel, req.params.questionId)
    .then( data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(QUESTIONROUTE, error );
        return res.status(400).json({ error });
    });
 });

 questionRoute.delete('/:questionId', (req, res) => {
    questionModel.remove({ _id: req.params.questionId }, ( error, result ) => {
    if ( error ) {
        res.status(400).send(error);
    }
    else {
        res.status(200).json(result);
    }
    });
});

export default questionRoute;