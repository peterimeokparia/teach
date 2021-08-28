import express from 'express';

import examModel from '../model/examModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
EXAMROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js'; 

const examRoute = express.Router();
examRoute.use(logRouteInfo);

examRoute.get('/', (req, res) => {
    examModel.find( { } )
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( EXAMROUTE, error );
        return res.status(400).json({ error })
    });
});

examRoute.get('/', (req, res) => {
    examModel.find( { examId: req.query.examId } )
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( EXAMROUTE, error );
        return res.status(400).json({ error });
    });
});

examRoute.post('/', (req, res) => {
    let examData = getPostData( req );
    let exams = new examModel(examData);  
    exams.save()
    .then(data => {
        return res.status(200).json(data)
    })
    .catch( error => {
        handleBackEndLogs( EXAMROUTE, error );
        return res.status(400).json({ error })
    });
});

examRoute.put('/:examId', (req, res) => {
    saveUpdatedData(req, examModel, req.params.examId)
    .then( data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( EXAMROUTE, error );
        return res.status(400).json({ error })
    });
});

examRoute.delete('/:examId', (req, res) => {
    examModel.findByIdAndDelete(req.params.examId)
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( EXAMROUTE, error );
        return res.status(400).json({ error })
    });
});

export default examRoute;
