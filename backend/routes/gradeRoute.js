const express = require('express');

const gradeModel = require('../model/gradeModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo  } = require('../middleWare/index.js'); 

const gradeRoute = express.Router();

gradeRoute.use(logRouteInfo);

gradeRoute.get('/', getRoute( gradeModel ), (req, res) => {
  return res.status(200).json(res?.newResult);
});

gradeRoute.get('/:studentId', getByObjectIdRoute( gradeModel, 'studentId' ),  (req, res) => {
  return res.status(200).json(res?.newResult);
});

gradeRoute.get('/:gradeId', getByObjectIdRoute( gradeModel, 'gradeId' ),  (req, res) => {
  return res.status(200).json(res?.newResult);
});

gradeRoute.post('/', postRoute( gradeModel ), (req, res) => {
  return res.status(200).json(res?.newResult);
});

gradeRoute.put('/:gradeId', putRoute( gradeModel, 'gradeId' ), (req, res) => {
  return res.status(200).json(res?.savedResult);
});

gradeRoute.delete('/:gradeId', deleteRoute(gradeModel, 'gradeId'), (req, res) => {
  return res.status(200).json(res?.newResult);
});

module.exports = gradeRoute;