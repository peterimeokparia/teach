import express from 'express';

import lessonModel from '../model/lessonModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
LESSONROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js'; 

const lessonRoute = express.Router();
lessonRoute.use(logRouteInfo);

lessonRoute.get('/', (req, res) => {
    lessonModel.find({ courseId: req.query.courseId })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( LESSONROUTE, error );
        return res.status(400).json({ error });
    });
 });

lessonRoute.get('/videos', (req, res) => {
    lessonModel.find({ _id: req.query._id })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( LESSONROUTE, error );
        return res.status(400).json({ error });
    });
});
 
lessonRoute.get('/files', (req, res) => { 
   lessonModel.find({ _id: req.query._id })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( LESSONROUTE, error );
        return res.status(400).json({ error });
    });
});

lessonRoute.post('/', (req, res) => {
    let lessonData = getPostData( req );
    let lessons = new lessonModel(lessonData);
    lessons.save()
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( LESSONROUTE, error );
        return res.status(400).json({ error });
    });
});

lessonRoute.put('/:lessonId', (req, res) => {
    saveUpdatedData(req, lessonModel, req.params.lessonId)
    .then( data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( LESSONROUTE, error );
        return res.status(400).json({ error });
    });
});

lessonRoute.delete('/:lessonId', (req, res) => {
    lessonModel.remove({ _id: req.params.lessonId }, ( error, result ) => {
    if ( error ) {
        return res.status(400).send(error);
    }
    else {
        return res.status(200).json(result);
    }
    });
});

export default lessonRoute;