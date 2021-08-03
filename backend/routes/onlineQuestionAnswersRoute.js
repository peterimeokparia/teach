import express from 'express';

import onlineAnswerModel from '../model/onlineAnswerModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
ONLINEANSWERSROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

const onlineQuestionAnswersRoute = express.Router();

onlineQuestionAnswersRoute.get('/', (req, res) => {
    onlineAnswerModel.find({})
    .then(data => {
        console.log('onlineAnswer onlineAnswer Debug', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( ONLINEANSWERSROUTE, error );
        return res.status(400).json({ error })
    });
});

onlineQuestionAnswersRoute.get('/question', (req, res) => {
    let id = { _id: req.query.questionId };
    onlineAnswerModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( ONLINEANSWERSROUTE, error );
        return res.status(400).json({ error })
    });
});

onlineQuestionAnswersRoute.get('/answer/user', (req, res) => {
    let userId = { userId: req?.query?.userId };
    onlineAnswerModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( ONLINEANSWERSROUTE, error );
        return res.status(400).json({ error })
    });
});

onlineQuestionAnswersRoute.get('/videos', (req, res) => {
 onlineAnswerModel.find({ _id: req.query._id })
    .then(data => {
        console.log('onlineAnswer onlineAnswer videos', data)
        res.status(200).json(data);
    })
    .catch( error => {
        console.log( 'error is not defined :)' );
        console.log( error );
        if ( error ) {
            console.log('logging')
            console.log( 'error is not defined2 :)' );
            console.log( JSON.stringify(error) );
            handleBackEndLogs(ONLINEANSWERSROUTE, error )
            .then( resp => { console.log( `response response ${JSON.stringify(resp)}`)})
            .catch( yep => { console.log( `yep yep yep yep  ${yep}`)})
        }
        
        return res.status(400).json({ error })
    });
 });

onlineQuestionAnswersRoute.post('/', (req, res) => {
    console.log('in onlineAnswer onlineAnswer saved saved');
    let answerData = getPostData( req );
    console.log( 'answerData' )
    console.log( answerData )
    let onlineAnswer = new onlineAnswerModel(answerData);
    onlineAnswer.save()
    .then(data => {
        console.log('onlineAnswer onlineAnswer saved saved', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( ONLINEANSWERSROUTE, error );
        return res.status(400).json({ error })
    });
});

onlineQuestionAnswersRoute.put('/:answerId', (req, res) => {
    saveUpdatedData(req, onlineAnswerModel, req.params.answerId)
    .then( data => {
        console.log('onlineAnswersRoute onlineAnswersRoute onlineAnswersRoute put')
        console.log(data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( ONLINEANSWERSROUTE, error );
        return res.status(400).json({ error })
    });
});

onlineQuestionAnswersRoute.delete('/:answerId', (req, res) => {
    console.log('onlineQuestionAnswersRoute.delete')
    console.log(req)
    console.log(req.params.answerId)
    onlineAnswerModel.remove({ _id: req.params.answerId }, ( error, result ) => {
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

export default onlineQuestionAnswersRoute;