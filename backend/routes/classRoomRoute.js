const express = require('express');

const classRoomModel = require('../model/classRoomModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js'); 

const classRoomRoute = express.Router();

classRoomRoute.use(logRouteInfo);

classRoomRoute.get('/', getRoute( classRoomModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

classRoomRoute.post('/', postRoute( classRoomModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

classRoomRoute.put('/:classRoomId', putRoute( classRoomModel, 'classRoomId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

classRoomRoute.delete('/:classRoomId', deleteRoute(classRoomModel, 'classRoomId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = classRoomRoute;