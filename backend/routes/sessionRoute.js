import express from 'express';

import sessionModel from '../model/sessionModel.js';

import {
getPostData,      
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
SESSIONROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

const sessionRoute = express.Router();

 sessionRoute.get('/', (req, res) => {
  sessionModel.find({ })
    .then(data => {
        console.log('Sessions', data)
      return res.status(200).json(data);
    })
    .catch( error => {
      console.log( error );
      handleBackEndLogs(SESSIONROUTE, error );
      return res.status(400).json({ error })
    });
});

sessionRoute.get('/:sessionId', (req, res) => {
  let sessionId = { _id: req.query.sessionId };
 
  sessionModel.findById( sessionId )   
      .then(data => {
          console.log('Sessions', data)
        return res.status(200).json(data);
      })
      .catch( error => {
        console.log( error );
        handleBackEndLogs(SESSIONROUTE, error );
        return res.status(400).json({ error })
      });
});

sessionRoute.get('/:userId', (req, res) => {
  let userId = { userId: req.query.userId };
 
  sessionModel.find(userId)   
      .then(data => {
          console.log('Sessions', data)
          return res.status(200).json(data);
      })
      .catch( error => {
        console.log( error );
        handleBackEndLogs(SESSIONROUTE, error );
        return res.status(400).json({ error })
      });
});

sessionRoute.post('/', (req, res) => {
   let sessionData = getPostData( req );

   let session = new sessionModel(sessionData);  

   session.save()
      .then(data => {
          console.log('...saving session', data);
          return res.status(200).json(data)
      })
      .catch( error => {
        console.log( error );
        handleBackEndLogs(SESSIONROUTE, error );
        return res.status(400).json({ error })
      });
});

sessionRoute.put('/:sessionId', (req, res) => {
  console.log( 'sessionRoute.put(' );
  console.log( req.params );
    saveUpdatedData(req, sessionModel, req.params.sessionId)
    .then( data => {
      console.log(data);
      console.log( 'success' );
      return res.status(200).json(data)
    })
    .catch( error => {
      console.log( error );
      handleBackEndLogs(SESSIONROUTE, error );
      return res.status(400).json({ error })
    });
});

sessionRoute.delete('/:sessionId', (req, res) => {

  sessionModel.findByIdAndDelete(req.params.sessionId)
     .then(data => {
        console.log('data - doc', data);
        res.status(200).json(data)
     })
     .catch( error => {
      console.log( error );
      handleBackEndLogs(SESSIONROUTE, error );
      return res.status(400).json({ error })
    });
});

export default sessionRoute;