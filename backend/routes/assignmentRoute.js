import express from 'express';
import assignmentModel from '../model/assignmentModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
ASSIGNMENTROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js'; 

const assignmentRoute = express.Router();
assignmentRoute.use(logRouteInfo);

assignmentRoute.get('/', (req, res) => {
    assignmentModel.find({ })
    .then(data => {
        return  res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ASSIGNMENTROUTE, error );
        return res.status(400).json({ error });
    });
});

assignmentRoute.get('/', (req, res) => {
    examModel.find( { assignmentId: req.query.assignmentId } )
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ASSIGNMENTROUTE, error );
        return res.status(400).json({ error });
    });
});

assignmentRoute.post('/', (req, res) => {
   let assignmentData =  getPostData( req );
   let assignments = new assignmentModel(assignmentData); 
    assignments.save()
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ASSIGNMENTROUTE, error );
        return res.status(400).json({ error });
    });
});

 assignmentRoute.put('/:assignmentId', (req, res) => {
    saveUpdatedData(req, assignmentModel, req.params.assignmentId)
    .then( data => {
      return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ASSIGNMENTROUTE, error );
        return res.status(400).json({ error });
    });
});

assignmentRoute.delete('/:assignmentId', (req, res) => {
    assignmentModel.findByIdAndDelete(req.params.assignmentId)
     .then(data => {
        return res.status(200).json(data);
     })
     .catch( error => {
        handleBackEndLogs( ASSIGNMENTROUTE, error );
        return res.status(400).json({ error });
     });
});

export default assignmentRoute;
