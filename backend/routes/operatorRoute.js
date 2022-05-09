import express from 'express';

import operatorModel from '../model/operatorModel.js';


import { 
verifyRoute,
hashPasswordField,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } from '../middleWare/index.js';

const operatorRoute = express.Router();

operatorRoute.use(logRouteInfo);

operatorRoute.get('/', getRoute( operatorModel ), (req, res) => {
  return res.status(200).json(res?.newResult);
});

operatorRoute.get('/files', getByIdRoute( operatorModel, '_id' ),  (req, res) => {
  return res.status(200).json(res?.newResult);
});

operatorRoute.get('/operator', getByIdRoute( operatorModel, 'email' ),  (req, res) => {
  return res.status(200).json(res?.newResult);
});

operatorRoute.use(hashPasswordField);
operatorRoute.post('/', postRoute( operatorModel ), (req, res) => {
  return res.status(200).json(res?.newResult);
});

operatorRoute.use(hashPasswordField);
operatorRoute.put('/:operatorId', putRoute( operatorModel, 'operatorId' ), (req, res) => {
  return res.status(200).json(res?.savedResult);
});

operatorRoute.delete('/:operatorId', deleteRoute(operatorModel, 'operatorId'), (req, res) => {
  return res.status(200).json(res?.newResult);
});

export default operatorRoute;









// operatorRoute.get('/', (req, res) => {
//   operatorModel.find({ })
//   .then(data => {
//     return res.status(200).json(data);
//   })
//   .catch( error => {
//     handleBackEndLogs(OPERATORROUTE, error );
//     return res.status(400).json({ error });
//   });
// });

// operatorRoute.get('/operator', (req, res) => {
//   let userEmail = { email: req.query.email };
//   operatorModel.find(userEmail)   
//   .then(data => {
//     return res.status(200).json(data);
//   })
//   .catch( error => {
//     handleBackEndLogs(OPERATORROUTE, error );
//     return res.status(400).json({ error });
//   });
// });

// operatorRoute.get('/files', (req, res) => {
//   operatorModel.find({ _id: req.query._id })
//   .then(data => {
//     return res.status(200).json(data);
//   })
//   .catch( error => {
//     handleBackEndLogs(OPERATORROUTE, error );
//     return res.status(400).json({ error });
//   });
// });

// //operatorRoute.use(verifyRoute);
// operatorRoute.post('/', (req, res) => {
//     let operatorData = getPostData( req );
//     let operator = new operatorModel(operatorData);  
//     operator.save()
//     .then(data => {
//       return res.status(200).json(data);
//     })
//     .catch( error => {
//       handleBackEndLogs(OPERATORROUTE, error );
//       return res.status(400).json({ error });
//     });
// });

// operatorRoute.put('/:operatorId', (req, res) => {
//   saveUpdatedData(req, operatorModel, req.params.operatorId)
//   .then( data => {
//     return res.status(200).json(data);
//   })
//   .catch( error => {
//     handleBackEndLogs(OPERATORROUTE, error );
//     return res.status(400).json({ error });
//   });
// });

// operatorRoute.delete('/:operatorId', (req, res) => {
//   operatorModel.findByIdAndDelete(req.params.operatorId)
//   .then(data => {
//     return res.status(200).json(data);
//   })
//   .catch( error => {
//     handleBackEndLogs(OPERATORROUTE, error );
//     return res.status(400).json({ error });
// });
// });