import express from 'express';

import timeLineModel from '../model/timeLineModel.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } from '../middleWare/index.js';

const timeLineRoute = express.Router();

timeLineRoute.use(logRouteInfo);

timeLineRoute.get('/', getRoute( timeLineModel ), (req, res) => {
   return res.status(200).json(res?.newResult);
});

timeLineRoute.get('/timeLines/:timeLineId', getByObjectIdRoute( timeLineModel, 'timeLineId' ),  (req, res) => {
   return res.status(200).json(res?.newResult);
});

timeLineRoute.post('/', postRoute( timeLineModel ), (req, res) => {
   return res.status(200).json(res?.newResult);
});

timeLineRoute.put('/:timeLineId', putRoute( timeLineModel, 'timeLineId' ), (req, res) => {
   return res.status(200).json(res?.savedResult);
});

timeLineRoute.delete('/:timeLineId', deleteRoute(timeLineModel, 'timeLineId'), (req, res) => {
   return res.status(200).json(res?.newResult);
});

export default timeLineRoute;





// timeLineRoute.get('/', (req, res) => {
//    timeLineModel.find({ })
//    .then(data => {
//       return res.status(200).json(data);
//    })
//    .catch( error => {
//       handleBackEndLogs(TIMELINEROUTE, error );
//       return res.status(400).json({ error });
//    });
// });
 
// timeLineRoute.get('/timeLines/:timeLineId', (req, res) => {
//    let timeLineId = { _id: req.query.timeLineId };  
//    timeLineModel.findById( timeLineId )   
//    .then(data => {
//       return res.status(200).json(data);
//    })
//    .catch( error => {
//       handleBackEndLogs(TIMELINEROUTE, error );
//       return res.status(400).json({ error });
//    });
// });

// timeLineRoute.post('/', (req, res) => {
//    let timeLineData = getPostData( req );
//    let timelines = new timeLineModel( timeLineData );
//    timelines.save()
//    .then(data => {
//       return res.status(200).json(data);
//    })
//    .catch( error => {
//       handleBackEndLogs(TIMELINEROUTE, error );
//       return res.status(400).json({ error });
//     });
// });

//  timeLineRoute.put('/:timeLineId', (req, res) => {
//    if ( ! req?.params?.timeLineId ) return;
//    saveUpdatedData(req, timeLineModel, req.params.timeLineId )
//    .then( data => {
//       return res.status(200).json(data);
//    })
//    .catch( error => {
//       handleBackEndLogs(TIMELINEROUTE, error );
//       return res.status(400).json({ error });
//     });
//  });

//  timeLineRoute.delete('/:timeLineId', (req, res) => {
//    timeLineModel.remove({ _id: req.params.timeLineId }, ( error, result ) => {    
//    if ( error ) {
//       handleBackEndLogs(TIMELINEROUTE, error );
//       return res.status(400).send(error);
//    }
//    else {
//       return res.status(200).json(result);
//    }
//    });
// });