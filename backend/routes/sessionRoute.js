const express = require('express');

const sessionModel = require('../model/sessionModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js');

const sessionRoute = express.Router();

sessionRoute.use(logRouteInfo);

sessionRoute.get('/', getRoute( sessionModel ), (req, res) => {
  return res.status(200).json(res?.newResult);
});

sessionRoute.get('/:sessionId', getByObjectIdRoute( sessionModel, 'sessionId' ),  (req, res) => {
  return res.status(200).json(res?.newResult);
});

sessionRoute.get('/:userId', getByIdRoute( sessionModel, 'userId' ),  (req, res) => {
  return res.status(200).json(res?.newResult);
});

sessionRoute.post('/', postRoute( sessionModel ), (req, res) => {
  return res.status(200).json(res?.newResult);
});

sessionRoute.put('/:sessionId', putRoute( sessionModel, 'sessionId' ), (req, res) => {
  return res.status(200).json(res?.savedResult);
});

sessionRoute.delete('/:sessionId', deleteRoute(sessionModel, 'sessionId'), (req, res) => {
  return res.status(200).json(res?.newResult);
});

module.exports = sessionRoute;




// sessionRoute.get('/', (req, res) => {
//   sessionModel.find({ })
//   .then(data => {
//     return res.status(200).json(data);
//   })
//   .catch( error => {
//     handleBackEndLogs(SESSIONROUTE, error );
//     return res.status(400).json({ error });
//   });
// });

// sessionRoute.get('/:sessionId', (req, res) => {
//   let sessionId = { _id: req.query.sessionId };
//   sessionModel.findById( sessionId )   
//   .then(data => {
//     return res.status(200).json(data);
//   })
//   .catch( error => {
//     handleBackEndLogs(SESSIONROUTE, error );
//     return res.status(400).json({ error });
//   });
// });

// sessionRoute.get('/:userId', (req, res) => {
//   let userId = { userId: req.query.userId };
//   sessionModel.find(userId)   
//   .then(data => {
//       return res.status(200).json(data);
//   })
//   .catch( error => {
//     handleBackEndLogs(SESSIONROUTE, error );
//     return res.status(400).json({ error });
//   });
// });

// sessionRoute.post('/', (req, res) => {
//   let sessionData = getPostData( req );
//   let session = new sessionModel(sessionData);  
//   session.save()
//   .then(data => {
//       return res.status(200).json(data)
//   })
//   .catch( error => {
//     handleBackEndLogs(SESSIONROUTE, error );
//     return res.status(400).json({ error });
//   });
// });

// sessionRoute.put('/:sessionId', (req, res) => {
//   saveUpdatedData(req, sessionModel, req.params.sessionId)
//   .then( data => {
//     return res.status(200).json(data)
//   })
//   .catch( error => {
//     handleBackEndLogs(SESSIONROUTE, error );
//     return res.status(400).json({ error });
//   });
// });

// sessionRoute.delete('/:sessionId', (req, res) => {
//   sessionModel.findByIdAndDelete(req.params.sessionId)
//   .then(data => {
//     return res.status(200).json(data)
//   })
//   .catch( error => {
//     handleBackEndLogs(SESSIONROUTE, error );
//     return res.status(400).json({ error });
//   });
// });