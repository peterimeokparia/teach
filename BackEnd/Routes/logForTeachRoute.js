import express from 'express';

import logForTeachModel from '../Model/logForTeachModel.js';

import {
getPostData,    
saveUpdatedData } from '../Helpers/storageHelper.js';

const logForTeachRoute = express.Router();

logForTeachRoute.get('/', (req, res) => {
    logForTeachModel.find({})
    .then(data => {
        console.log('logs logForTeachRoute logForTeachRoute', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log(error);
        return res.status(400).json({ error })
    });
 });

 
 logForTeachRoute.get('/byObjectName', (req, res) => {
    logForTeachModel.find({ objectName: req.query.objectName })
    .then(data => {
        console.log('logs logForTeachRoute logForTeachRoute', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        return res.status(400).json({ error })
    });
 });

 logForTeachRoute.post('/', (req, res) => {
    console.log('logForTeachRoutelogForTeachRoutelogForTeachRoutelogForTeachRoutelogForTeachRoute@@@@@@@@@@@@@@')
     console.log( Object.values( req.body ) )

    let logForTeachData = getPostData( req );
    console.log('logForTeachRoutelogForTeachRoutelogForTeachRoutelogForTeachRoutelogForTeachRoute@@@@@@@@@@@@@@')
    console.log(logForTeachData)
    let logforteachobject = new logForTeachModel({
        objectName: req.body?.objectName,
        errorMessage: req.body?.errorMessage
      });
    console.log(logforteachobject)
    logforteachobject.save()
    .then(data => {
        console.log('saved', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log(error);
        return res.status(400).json({ error });
    });
});

logForTeachRoute.put('/:logId', (req, res) => {
    console.log('lSAVING OBJ SAVING OBJ')
    console.log(req.params)
    saveUpdatedData(req, logForTeachModel, req.params.logId)
    .then( data => {
        console.log(data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log(error);
        return res.status(400).json({ error });
    });
});

export default logForTeachRoute;