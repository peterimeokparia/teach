import express from 'express';

import operatorModel from '../model/operatorModel.js';

import {
getPostData,      
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
OPERATORROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js';

const operatorRoute = express.Router();
operatorRoute.use(logRouteInfo);

operatorRoute.get('/', (req, res) => {
  operatorModel.find({ })
  .then(data => {
    return res.status(200).json(data);
  })
  .catch( error => {
    handleBackEndLogs(OPERATORROUTE, error );
    return res.status(400).json({ error });
  });
});

operatorRoute.get('/operator', (req, res) => {
  let userEmail = { email: req.query.email };
  operatorModel.find(userEmail)   
  .then(data => {
    return res.status(200).json(data);
  })
  .catch( error => {
    handleBackEndLogs(OPERATORROUTE, error );
    return res.status(400).json({ error });
  });
});

operatorRoute.get('/files', (req, res) => {
  operatorModel.find({ _id: req.query._id })
  .then(data => {
    return res.status(200).json(data);
  })
  .catch( error => {
    handleBackEndLogs(OPERATORROUTE, error );
    return res.status(400).json({ error });
  });
});

//operatorRoute.use(verifyRoute);
operatorRoute.post('/', (req, res) => {
    let operatorData = getPostData( req );
    let operator = new operatorModel(operatorData);  
    operator.save()
    .then(data => {
      return res.status(200).json(data);
    })
    .catch( error => {
      handleBackEndLogs(OPERATORROUTE, error );
      return res.status(400).json({ error });
    });
});

operatorRoute.put('/:operatorId', (req, res) => {
  saveUpdatedData(req, operatorModel, req.params.operatorId)
  .then( data => {
    return res.status(200).json(data);
  })
  .catch( error => {
    handleBackEndLogs(OPERATORROUTE, error );
    return res.status(400).json({ error });
  });
});

operatorRoute.delete('/:operatorId', (req, res) => {
  operatorModel.findByIdAndDelete(req.params.operatorId)
  .then(data => {
    return res.status(200).json(data);
  })
  .catch( error => {
    handleBackEndLogs(OPERATORROUTE, error );
    return res.status(400).json({ error });
});
});

export default operatorRoute;