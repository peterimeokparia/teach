import express from 'express';

import onlineQuestionModel from '../model/onlineQuestionModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
ONLINEQUESTIONSROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

const onlineQuestionRoute = express.Router();

onlineQuestionRoute.get('/', (req, res) => {
    onlineQuestionModel.find({})
    .then(data => {
        console.log('onlineQuestion Debug', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(ONLINEQUESTIONSROUTE, error )
        return res.status(400).json({ error })
    });
 });

onlineQuestionRoute.get('/', (req, res) => {
    let id = { _id: req.query.questionId };
    onlineQuestionModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(ONLINEQUESTIONSROUTE, error )
        return res.status(400).json({ error })
    });
});

onlineQuestionRoute.get('/question/question', (req, res) => {
    let userId = { userId: req?.query?.questionId };
    onlineQuestionModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(ONLINEQUESTIONSROUTE, error )
        return res.status(400).json({ error })
    });
});

onlineQuestionRoute.get('/question/user', (req, res) => {
    let userId = { userId: req?.query?.userId };
    onlineQuestionModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(ONLINEQUESTIONSROUTE, error )
        return res.status(400).json({ error })
    });
});

onlineQuestionRoute.get('/videos', (req, res) => {
    onlineQuestionModel.find({ _id: req.query._id })
        .then(data => {
            console.log('OnlineQuestions OnlineQuestions', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
 });

onlineQuestionRoute.post('/', (req, res) => {
    console.log( req );
    console.log('in onlineQuestion onlineQuestion saved saved');
    let questionData = getPostData( req );
    let onlineQuestion = new onlineQuestionModel(questionData);
    onlineQuestion.save()
    .then(data => {
        console.log('onlineQuestion saved', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(ONLINEQUESTIONSROUTE, error )
        return res.status(400).json({ error })
    });
});

onlineQuestionRoute.put('/:questionId', (req, res) => {
    console.log('onlineQuestionRoute.put(/:questionId');
    console.log(req.params);
    console.log(req.params.questionId);
    saveUpdatedData(req, onlineQuestionModel, req.params.questionId)
    .then( data => {
        console.log('onlineQuestionRoute put')
        console.log(data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(ONLINEQUESTIONSROUTE, error )
        return res.status(400).json({ error })
    });
});

onlineQuestionRoute.delete('/:questionId', (req, res) => {
    console.log('onlineQuestionRoute.delete')
    console.log(req)
    console.log(req.params.questionId)
    onlineQuestionModel.remove({ _id: req.params.questionId }, ( error, result ) => {
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

export default onlineQuestionRoute;