import express from 'express';

import formFieldModel from '../model/formFieldModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
FORMFIELDROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js'; 

const formFieldRoute = express.Router();
formFieldRoute.use(logRouteInfo);

formFieldRoute.get('/', (req, res) => {
    formFieldModel.find({})
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(FORMFIELDROUTE, error );
        return res.status(400).json({ error });
    });
 });

 formFieldRoute.get('/question', (req, res) => {
    let id = { questionId: req.query.questionId };
    formFieldModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(FORMFIELDROUTE, error );
        return res.status(400).json({ error });
    });
});

formFieldRoute.get('/formfield', (req, res) => {
    let id = { _id: req.query.formFieldId };
    formFieldModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(FORMFIELDROUTE, error );
        return res.status(400).json({ error });
    });
});

formFieldRoute.get('/formfield/user', (req, res) => {
    let userId = { userId: req?.query?.userId };
    formFieldModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(FORMFIELDROUTE, error );
        return res.status(400).json({ error });
    });
});

formFieldRoute.get('/videos', (req, res) => {
    formFieldModel.find({ _id: req.query._id })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch(error => {
        handleBackEndLogs(FORMFIELDROUTE, error );
        return res.status(400).json({ error });
    });
 });

formFieldRoute.post('/', (req, res) => {
    let formFieldData = getPostData( req );
    let formField = new formFieldModel(formFieldData);
    formField.save()
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(FORMFIELDROUTE, error );
        return res.status(400).json({ error });
    });
});

formFieldRoute.put('/:formFieldId', (req, res) => {
    saveUpdatedData(req, formFieldModel, req.params.formFieldId)
    .then( data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs(FORMFIELDROUTE, error );
        return res.status(400).json({ error });
    });
});

formFieldRoute.delete('/:formFieldId', (req, res) => {
    formFieldModel.remove({ _id: req.params.formFieldId }, ( error, result ) => {
    if ( error ) {
        return res.status(400).send(error);
    }else {
        return res.status(200).json(result);
    }
    });
});

export default formFieldRoute;