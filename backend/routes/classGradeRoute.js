const express = require('express');

const classGradeModel = require('../model/classGradeModel.js');

const { 
verifyRoute,
getByIdRoute,
paginatedResults,
getRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo  } = require('../middleWare/index.js'); 

const classGradeRoute = express.Router();

classGradeRoute.use(logRouteInfo);

classGradeRoute.get('/', getRoute( classGradeModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

classGradeRoute.post('/', postRoute( classGradeModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

classGradeRoute.put('/:classGradeId', putRoute( classGradeModel, 'classGradeId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

classGradeRoute.delete('/:classGradeId', deleteRoute(classGradeModel, 'classGradeId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = classGradeRoute;