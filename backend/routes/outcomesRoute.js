const express = require('express');

const outcomesModel = require('../model/outcomesModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js');

const outcomesRoute = express.Router();

outcomesRoute.use(logRouteInfo);

outcomesRoute.get('/', getRoute( outcomesModel ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

outcomesRoute.get('/:outcomeId', getByIdRoute( outcomesModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

outcomesRoute.get('/', getByObjectIdRoute( outcomesModel, 'parentId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

outcomesRoute.get('/', getByObjectIdRoute( outcomesModel, 'lessonId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

outcomesRoute.get('/:type', getByObjectIdRoute( outcomesModel, 'type' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

outcomesRoute.post('/', postRoute( outcomesModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

outcomesRoute.put('/:outcomeId', putRoute( outcomesModel, 'outcomeId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

outcomesRoute.delete('/:outcomeId', deleteRoute(outcomesModel, 'outcomeId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = outcomesRoute;