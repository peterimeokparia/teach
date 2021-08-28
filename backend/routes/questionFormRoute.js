import express from 'express';

import questionFormModel from '../model/questionFormModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
QUESTIONFORMROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js';

const questionFormRoute = express.Router();

questionFormRoute.use(logRouteInfo);

questionFormRoute.get('/', (req, res) => {
    questionFormModel.find({})
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(QUESTIONFORMROUTE, error );
        return res.status(400).json({ error });
    });
 });

questionFormRoute.get('/question', (req, res) => {
    let id = { _id: req.query.questionId };
    questionFormModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(QUESTIONFORMROUTE, error );
        return res.status(400).json({ error });
    });
});

questionFormRoute.get('/question/user', (req, res) => {
    let userId = { userId: req?.query?.userId };
    questionFormModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(QUESTIONFORMROUTE, error );
        return res.status(400).json({ error });
    });
});

questionFormRoute.get('/videos', (req, res) => {
    questionFormModel.find({ _id: req.query._id })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch(error => { 
        return res.status(400).json({ error });
    });
 });

questionFormRoute.post('/', (req, res) => {
    let questionData = getPostData( req );
    let questionForm = new questionFormModel(questionData);
    questionForm.save()
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(QUESTIONFORMROUTE, error );
        return res.status(400).json({ error });
    });
});

questionFormRoute.put('/:questionId', (req, res) => {
    saveUpdatedData(req, questionFormModel, req.params.questionId)
    .then( data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(QUESTIONFORMROUTE, error );
        return res.status(400).json({ error });
    });
});

questionFormRoute.delete('/:questionId', (req, res) => {
    questionFormModel.remove({ _id: req.params.questionId }, ( error, result ) => {
    if ( error ) {
        return res.status(400).send(error);
    }else {
        return res.status(200).json(result);
    }
    });
});

export default questionFormRoute;