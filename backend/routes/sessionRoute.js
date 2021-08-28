import express from 'express';

import sessionModel from '../model/sessionModel.js';

import {
getPostData,      
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
SESSIONROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js';

const sessionRoute = express.Router();
sessionRoute.use(logRouteInfo);

 sessionRoute.get('/', (req, res) => {
  sessionModel.find({ })
  .then(data => {
    return res.status(200).json(data);
  })
  .catch( error => {
    handleBackEndLogs(SESSIONROUTE, error );
    return res.status(400).json({ error });
  });
});

sessionRoute.get('/:sessionId', (req, res) => {
  let sessionId = { _id: req.query.sessionId };
  sessionModel.findById( sessionId )   
  .then(data => {
    return res.status(200).json(data);
  })
  .catch( error => {
    handleBackEndLogs(SESSIONROUTE, error );
    return res.status(400).json({ error });
  });
});

sessionRoute.get('/:userId', (req, res) => {
  let userId = { userId: req.query.userId };
  sessionModel.find(userId)   
  .then(data => {
      return res.status(200).json(data);
  })
  .catch( error => {
    handleBackEndLogs(SESSIONROUTE, error );
    return res.status(400).json({ error });
  });
});

sessionRoute.post('/', (req, res) => {
  let sessionData = getPostData( req );
  let session = new sessionModel(sessionData);  
  session.save()
  .then(data => {
      return res.status(200).json(data)
  })
  .catch( error => {
    handleBackEndLogs(SESSIONROUTE, error );
    return res.status(400).json({ error });
  });
});

sessionRoute.put('/:sessionId', (req, res) => {
  saveUpdatedData(req, sessionModel, req.params.sessionId)
  .then( data => {
    return res.status(200).json(data)
  })
  .catch( error => {
    handleBackEndLogs(SESSIONROUTE, error );
    return res.status(400).json({ error });
  });
});

sessionRoute.delete('/:sessionId', (req, res) => {
  sessionModel.findByIdAndDelete(req.params.sessionId)
  .then(data => {
    return res.status(200).json(data)
  })
  .catch( error => {
    handleBackEndLogs(SESSIONROUTE, error );
    return res.status(400).json({ error });
  });
});

export default sessionRoute;