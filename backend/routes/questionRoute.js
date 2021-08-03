import express from 'express';

import questionModel from '../model/questionModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
QUESTIONROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

const questionRoute = express.Router();

questionRoute.get('/', (req, res) => {
questionModel.find({ })
.then(data => {
    console.log('QuestionsNoID QuestionsNoID Comprende?', data)
    return res.status(200).json(data);
})
.catch( error => {
    console.log( error );
    handleBackEndLogs(QUESTIONROUTE, error );
    return res.status(400).json({ error })
    });
 });

 questionRoute.get('/test', (req, res) => {
    questionModel.find({ _id: req.query.questionId })
    .then(data => {
        console.log('testQuestions Questions', data)
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(QUESTIONROUTE, error );
        return res.status(400).json({ error })
    });
 });
 
 questionRoute.get('/videos', (req, res) => {
   questionModel.find({ _id: req.query._id })
    .then(data => {
        console.log('Questions Questions', data)
        return res.status(200).json(data);
       })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(QUESTIONROUTE, error );
        return res.status(400).json({ error })
    });
});
 
 questionRoute.get('/files', (req, res) => {
   questionModel.find({ _id: req.query._id })
       .then(data => {
           console.log('Questions Questions', data);
           return res.status(200).json(data);
       })
       .catch( error => {
        console.log( error );
        handleBackEndLogs(QUESTIONROUTE, error )
        return res.status(400).json({ error })
    });
});

 questionRoute.post('/', (req, res) => {
    let questionData = getPostData( req );

    let questions = new questionModel(questionData);

    questions.save()
    .then(data => {
     console.log('saved', data);
        return res.status(200).json(data)})
        .catch( error => {
        console.log( error );
        handleBackEndLogs(QUESTIONROUTE, error )
        return res.status(400).json({ error })
    });
    
 });

 questionRoute.put('/:questionId', (req, res) => {
    saveUpdatedData(req, questionModel, req.params.questionId)
       .then( data => {
         console.log(data);
        return res.status(200).json(data)
       })
       .catch( error => {
        console.log( error );
        handleBackEndLogs(QUESTIONROUTE, error )
        return res.status(400).json({ error })
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