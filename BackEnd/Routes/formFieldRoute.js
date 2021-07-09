import express from 'express';

import formFieldModel from '../Model/formFieldModel.js';

import {
getPostData,    
saveUpdatedData } from '../Helpers/storageHelper.js';

import { 
FORMFIELDROUTE,
handleBackEndLogs } from '../Helpers/logHelper.js';

const formFieldRoute = express.Router();

formFieldRoute.get('/', (req, res) => {
    formFieldModel.find({})
    .then(data => {
        console.log('formField formField Debug', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(FORMFIELDROUTE, error );
        return res.status(400).json({ error })
    });
 });

 formFieldRoute.get('/question', (req, res) => {
    let id = { questionId: req.query.questionId };
    formFieldModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(FORMFIELDROUTE, error );
        return res.status(400).json({ error })
    });
});

formFieldRoute.get('/formfield', (req, res) => {
    let id = { _id: req.query.formFieldId };
    formFieldModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(FORMFIELDROUTE, error );
        return res.status(400).json({ error })
    });
});

formFieldRoute.get('/formfield/user', (req, res) => {
    let userId = { userId: req?.query?.userId };
    formFieldModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(FORMFIELDROUTE, error );
        return res.status(400).json({ error })
    });
});

formFieldRoute.get('/videos', (req, res) => {
    formFieldModel.find({ _id: req.query._id })
        .then(data => {
            console.log('formField formField', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
 });

formFieldRoute.post('/', (req, res) => {
    console.log( req );
    console.log('in formField formField saved saved');
    let formFieldData = getPostData( req );
    let formField = new formFieldModel(formFieldData);
    formField.save()
    .then(data => {
        console.log('formField formField saved saved', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(FORMFIELDROUTE, error );
        return res.status(400).json({ error })
    });
});

formFieldRoute.put('/:formFieldId', (req, res) => {
    console.log(req.params);
    console.log(req.params.formFieldId);
    saveUpdatedData(req, formFieldModel, req.params.formFieldId)
    .then( data => {
        console.log('formFieldRoute formFieldRoute formFieldRoute put')
        console.log(data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs(FORMFIELDROUTE, error );
        return res.status(400).json({ error })
    });
});

formFieldRoute.delete('/:formFieldId', (req, res) => {
    console.log('formFieldRoute.delete')
    console.log(req)
    console.log(req.params.formFieldId)
    formFieldModel.remove({ _id: req.params.formFieldId }, ( error, result ) => {
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

export default formFieldRoute;