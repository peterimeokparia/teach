const express = require('express');

const meetingModel = require('../model/meetingModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js');

const meetingRoute = express.Router();

meetingRoute.use(logRouteInfo);

meetingRoute.get('/', getRoute( meetingModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

meetingRoute.get('/meeting', getByObjectIdRoute( meetingModel, 'meetingId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

meetingRoute.post('/', postRoute( meetingModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

meetingRoute.put('/:meetingId', putRoute( meetingModel, 'meetingId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

meetingRoute.delete('/:meetingId', deleteRoute(meetingModel, 'meetingId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = meetingRoute;