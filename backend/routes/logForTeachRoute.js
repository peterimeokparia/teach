const express = require('express');

const logForTeachModel = require('../model/logForTeachModel.js');

const {
getPostData,    
saveUpdatedData } = require('../helpers/storageHelper.js');

const logForTeachRoute = express.Router();

logForTeachRoute.get('/', (req, res) => {
    logForTeachModel.find({})
    .then(data => {
        console.log('logForTeachRoute', data);
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
        console.log('logForTeachRoute', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        return res.status(400).json({ error })
    });
 });

 logForTeachRoute.post('/', (req, res) => {
     console.log( Object.values( req.body ) )

    let logForTeachData = getPostData( req );
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

module.exports = logForTeachRoute;