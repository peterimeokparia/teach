const { 
verifyRoute,
generateSignOnCredentialToken,
hashPasswordField,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js');

const express = require('express');
const operatorModel = require('../model/operatorModel.js');

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

operatorRoute.use(generateSignOnCredentialToken);
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

module.exports = operatorRoute;