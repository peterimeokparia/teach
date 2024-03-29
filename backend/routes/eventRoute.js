const express = require('express');

const eventModel = require('../model/eventModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js'); 

const eventRoute = express.Router();

eventRoute.use(logRouteInfo);

eventRoute.get('/', getRoute( eventModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

eventRoute.get('/', getByObjectIdRoute( eventModel, 'eventId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

eventRoute.get('/events/byUserId', getByIdRoute( eventModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

eventRoute.post('/', postRoute( eventModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

eventRoute.put('/:eventId', putRoute( eventModel, 'eventId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

eventRoute.delete('/:eventId', deleteRoute(eventModel, 'eventId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = eventRoute;
