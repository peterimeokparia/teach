import express from 'express';

import timeLineModel from '../model/timeLineModel.js';

import {
getPostData,    
saveUpdatedData   
} from '../helpers/storageHelper.js';

import { 
TIMELINEROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

const timeLineRoute = express.Router();

timeLineRoute.get('/', (req, res) => {
   timeLineModel.find({ })
   .then(data => {
      return res.status(200).json(data);
   })
   .catch( error => {
      console.log( error );
      handleBackEndLogs(TIMELINEROUTE, error );
      return res.status(400).json({ error })
    });
});
 
timeLineRoute.get('/timeLines/:timeLineId', (req, res) => {
   let timeLineId = { _id: req.query.timeLineId };  
   timeLineModel.findById( timeLineId )   
   .then(data => {
      return res.status(200).json(data);
   })
   .catch( error => {
      console.log( error );
      handleBackEndLogs(TIMELINEROUTE, error );
      return res.status(400).json({ error })
    });
});

timeLineRoute.post('/', (req, res) => {
   let timeLineData = getPostData( req );
   let timelines = new timeLineModel( timeLineData );
   timelines.save()
   .then(data => {
      return res.status(200).json(data)
   })
   .catch( error => {
      console.log( error );
      handleBackEndLogs(TIMELINEROUTE, error );
      return res.status(400).json({ error })
    });
});

 timeLineRoute.put('/:timeLineId', (req, res) => {
   if ( ! req?.params?.timeLineId ) return;

   saveUpdatedData(req, timeLineModel, req.params.timeLineId )
   .then( data => {
      console.log(data);
      return res.status(200).json(data)
   })
   .catch( error => {
      console.log( error );
      handleBackEndLogs(TIMELINEROUTE, error );
      return res.status(400).json({ error })
    });
 });

 timeLineRoute.delete('/:timeLineId', (req, res) => {
    timeLineModel.remove({ _id: req.params.timeLineId }, ( error, result ) => {    
      if ( error ) {
         handleBackEndLogs(TIMELINEROUTE, error );
         return res.status(400).send(error);
      }
      else {
         return res.status(200).json(result);
      }
    });
});

export default timeLineRoute;