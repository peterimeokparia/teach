import express from 'express';

import classRoomModel from '../model/classRoomModel.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } from '../middleWare/index.js'; 

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

export default classRoomRoute;