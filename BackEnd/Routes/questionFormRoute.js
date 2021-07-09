import express from 'express';

import questionFormModel from '../Model/questionFormModel.js';

import {
getPostData,    
saveUpdatedData } from '../Helpers/storageHelper.js';

import { 
QUESTIONFORMROUTE,
handleBackEndLogs } from '../Helpers/logHelper.js';

const questionFormRoute = express.Router();

questionFormRoute.get('/', (req, res) => {
    questionFormModel.find({})
    .then(data => {
        console.log('questionForm questionForm Debug', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(QUESTIONFORMROUTE, error )
        return res.status(400).json({ error })
    });
 });

questionFormRoute.get('/question', (req, res) => {
    let id = { _id: req.query.questionId };
    questionFormModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(QUESTIONFORMROUTE, error )
        return res.status(400).json({ error })
    });
});

questionFormRoute.get('/question/user', (req, res) => {
    let userId = { userId: req?.query?.userId };
    questionFormModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(QUESTIONFORMROUTE, error )
        return res.status(400).json({ error })
    });
});

questionFormRoute.get('/videos', (req, res) => {
    questionFormModel.find({ _id: req.query._id })
        .then(data => {
            console.log('QuestionForm QuestionForm', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
 });

questionFormRoute.post('/', (req, res) => {
    console.log( req );
    console.log('in questionForm questionForm saved saved');
    let questionData = getPostData( req );
    let questionForm = new questionFormModel(questionData);
    questionForm.save()
    .then(data => {
        console.log('questionForm questionForm saved saved', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(QUESTIONFORMROUTE, error )
        return res.status(400).json({ error })
    });
});

questionFormRoute.put('/:questionId', (req, res) => {
    console.log('questionFormRoute.put(/:questionId');
    console.log(req.params);
    console.log(req.params.questionId);
    saveUpdatedData(req, questionFormModel, req.params.questionId)
    .then( data => {
        console.log('questionFormRoute questionFormRoute questionFormRoute put')
        console.log(data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(QUESTIONFORMROUTE, error )
        return res.status(400).json({ error })
    });
});

questionFormRoute.delete('/:questionId', (req, res) => {
    console.log('questionFormRoute.delete')
    console.log(req)
    console.log(req.params.questionId)
    questionFormModel.remove({ _id: req.params.questionId }, ( error, result ) => {
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

export default questionFormRoute;