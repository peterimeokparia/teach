const express = require('express');

const calendarModel = require('../model/calendarModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js'); 

const calendarRoute = express.Router();

calendarRoute.use(logRouteInfo);

calendarRoute.get('/', getRoute( calendarModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

calendarRoute.get('/', getByObjectIdRoute( calendarModel, 'calendarId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

calendarRoute.get('/calendars/byUserId', getByIdRoute( calendarModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

calendarRoute.post('/', postRoute( calendarModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

calendarRoute.put('/:calendarId', putRoute( calendarModel, 'calendarId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

calendarRoute.delete('/:calendarId', deleteRoute(calendarModel, 'calendarId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = calendarRoute;