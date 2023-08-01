const express = require('express');

const conceptModel = require('../model/conceptModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js');

const conceptRoute = express.Router();

conceptRoute.use(logRouteInfo);

conceptRoute.get('/', getRoute( conceptModel ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

conceptRoute.get('/:conceptId', getByIdRoute( conceptModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

conceptRoute.get('/:courseId', getByObjectIdRoute( conceptModel, 'courseId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

conceptRoute.get('/:lessonOutcomeId', getByObjectIdRoute( conceptModel, 'lessonOutcomeId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

conceptRoute.get('/:type', getByObjectIdRoute( conceptModel, 'type' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

conceptRoute.post('/', postRoute( conceptModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

conceptRoute.put('/:conceptId', putRoute( conceptModel, 'conceptId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

conceptRoute.delete('/:conceptId', deleteRoute(conceptModel, 'conceptId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = conceptRoute;