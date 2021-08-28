import express from 'express';

import answerFormModel from '../model/answerFormModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
ANSWERFORMROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js'; 

const answerFormRoute = express.Router();
answerFormRoute.use(logRouteInfo);

answerFormRoute.get('/', (req, res) => {
    answerFormModel.find({})
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(ANSWERFORMROUTE, error );
        return res.status(400).json({ error });
    });
});

answerFormRoute.get('/answer', (req, res) => {
    let id = { _id: req.query.answerId };
    answerFormModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(ANSWERFORMROUTE, error );
        return res.status(400).json({ error });
    });
});

answerFormRoute.get('/question', (req, res) => {
    let questionId = { questionId: req.query.questionId };
    answerFormModel.findById( questionId )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(ANSWERFORMROUTE, error );
        return res.status(400).json({ error });
    });
});

answerFormRoute.get('/answer/user', (req, res) => {
    let userId = { userId: req?.query?.userId };
    answerFormModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(ANSWERFORMROUTE, error );
        return res.status(400).json({ error });
    });
});

answerFormRoute.get('/videos', (req, res) => {
    answerFormModel.find({ _id: req.query._id })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch(error => { console.log(error)
        return res.status(400).json({ error });
    });
 });

answerFormRoute.post('/', (req, res) => {
    let answerData = getPostData( req );
    let answerForm = new answerFormModel(answerData);
    answerForm.save()
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(ANSWERFORMROUTE, error );
        return res.status(400).json({ error })
    });
});

answerFormRoute.put('/:answerId', (req, res) => {
    saveUpdatedData(req, answerFormModel, req.params.answerId)
    .then( data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(ANSWERFORMROUTE, error );
        return res.status(400).json({ error })
    });
});

answerFormRoute.delete('/:answerId', (req, res) => {
    answerFormModel.remove({ _id: req.params.answerId }, ( error, result ) => {
    if ( error ) {
        return res.status(400).send(error);
    }
    else {
        return res.status(200).json(result);
    }
    });
});

export default answerFormRoute;