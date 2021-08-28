import express from 'express';

import gradeModel from '../model/gradeModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
GRADEROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js'; 

const gradeRoute = express.Router();
gradeRoute.use(logRouteInfo);

gradeRoute.get('/', (req, res) => { 
  gradeModel.find({ })
   .then(data => {
      return res.status(200).json(data);
   })
   .catch( error => {
      handleBackEndLogs( GRADEROUTE, error );
      return res.status(400).json({ error });
  });
});
 
gradeRoute.get('/:studentId', (req, res) => {
   let gradeId = { _id: req.query.studentId };
   gradeModel.findById( gradeId )   
       .then(data => {
          return res.status(200).json(data);
       })
       .catch( error => {
         handleBackEndLogs( GRADEROUTE, error );
         return res.status(400).json({ error })
     });
 });

 gradeRoute.get('/:gradeId', (req, res) => {
   let gradeId = { _id: req.query.gradeId };
   gradeModel.findById( gradeId )   
       .then(data => {
          return res.status(200).json(data);
       })
       .catch( error => {
         handleBackEndLogs( GRADEROUTE, error );
         return res.status(400).json({ error })
     });
 });

 gradeRoute.post('/', (req, res) => {
   let gradeData = getPostData( req );
   let grades = new gradeModel(gradeData);
   grades.save()
   .then(data => {
      return res.status(200).json(data)})
      .catch( error => {
        handleBackEndLogs( GRADEROUTE, error );
        return res.status(400).json({ error });
     });
 });

 gradeRoute.put('/:gradeId', (req, res) => {
    saveUpdatedData(req, gradeModel, req.params.gradeId)
       .then( data => {
         return res.status(200).json(data)
       })
       .catch( error => {
         handleBackEndLogs( GRADEROUTE, error );
         return res.status(400).json({ error });
     });
 });

gradeRoute.delete('/:gradeId', (req, res) => {
    gradeModel.remove({ _id: req.params.gradeId }, ( error, result ) => {    
    if ( error ) {
        return res.status(400).send(error);
    }
    else {
        return res.status(200).json(result);
    }
    });
});

export default gradeRoute;