const express = require('express');

const examModel = require('../model/examModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js'); 

const examRoute = express.Router();

examRoute.use(logRouteInfo);

examRoute.get('/', getRoute( examModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

examRoute.get('/', getByIdRoute( examModel, 'examId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

examRoute.post('/', postRoute( examModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

examRoute.put('/:examId', putRoute( examModel, 'examId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

examRoute.delete('/:examId', deleteRoute(examModel, 'examId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = examRoute;
