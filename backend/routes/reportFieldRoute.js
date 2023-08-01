const express = require('express');

const reportFieldModel = require('../model/reportFieldModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo  } = require('../middleWare/index.js'); 

const reportFieldRoute = express.Router();

reportFieldRoute.use(logRouteInfo);

reportFieldRoute.get('/', getRoute( reportFieldModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

reportFieldRoute.get('/report', getByIdRoute( reportFieldModel, 'reportId' ),  (req, res) => {// /question
    return res.status(200).json(res?.newResult);
});

reportFieldRoute.get('/reportfield', getByIdRoute( reportFieldModel, 'reportFieldId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

reportFieldRoute.get('/reportfield/user', getByIdRoute( reportFieldModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

reportFieldRoute.get('/videos', getByIdRoute( reportFieldModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

reportFieldRoute.post('/', postRoute( reportFieldModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

reportFieldRoute.put('/:reportFieldId', putRoute( reportFieldModel, 'reportFieldId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

reportFieldRoute.delete('/:reportFieldId', deleteRoute(reportFieldModel, 'reportFieldId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = reportFieldRoute;