import express from 'express';

import answerFormModel from '../model/answerFormModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
ANSWERFORMROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

const answerFormRoute = express.Router();

answerFormRoute.get('/', (req, res) => {
    answerFormModel.find({})
    .then(data => {
        console.log('answerForm', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(ANSWERFORMROUTE, error );
        return res.status(400).json({ error })
    });
 });

 answerFormRoute.get('/answer', (req, res) => {
    let id = { _id: req.query.answerId };
    answerFormModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(ANSWERFORMROUTE, error );
        return res.status(400).json({ error })
    });
});

answerFormRoute.get('/question', (req, res) => {
    let questionId = { questionId: req.query.questionId };
    answerFormModel.findById( questionId )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(ANSWERFORMROUTE, error );
        return res.status(400).json({ error })
    });
});

answerFormRoute.get('/answer/user', (req, res) => {
    let userId = { userId: req?.query?.userId };
    answerFormModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(ANSWERFORMROUTE, error );
        return res.status(400).json({ error })
    });
});

answerFormRoute.get('/videos', (req, res) => {
    answerFormModel.find({ _id: req.query._id })
        .then(data => {
            console.log('answerForm', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
 });

answerFormRoute.post('/', (req, res) => {
    console.log( req );
    console.log('answerForm');
    let answerData = getPostData( req );
    let answerForm = new answerFormModel(answerData);
    answerForm.save()
    .then(data => {
        console.log('answerForm ', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(ANSWERFORMROUTE, error );
        return res.status(400).json({ error })
    });
});

answerFormRoute.put('/:answerId', (req, res) => {
    saveUpdatedData(req, answerFormModel, req.params.answerId)
    .then( data => {
        console.log('answerFormRoute put')
        console.log(data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(ANSWERFORMROUTE, error );
        return res.status(400).json({ error })
    });
});

answerFormRoute.delete('/:answerId', (req, res) => {
    console.log('answerFormRoute.delete')
    console.log(req)
    console.log(req.params.answerId)
    answerFormModel.remove({ _id: req.params.answerId }, ( error, result ) => {
        if ( error ) {
            console.log(error)
            return res.status(400).send(error);
        }
        else {
            console.log(result)
            return res.status(200).json(result);
        }
    });
});

export default answerFormRoute;