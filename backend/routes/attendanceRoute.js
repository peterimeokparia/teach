import express from 'express';

import attendanceModel from '../model/attendanceModel.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } from '../middleWare/index.js'; 

const attendanceRoute = express.Router();

attendanceRoute.use(logRouteInfo);

attendanceRoute.get('/', getRoute( attendanceModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

attendanceRoute.get('/', getByIdRoute( attendanceModel, 'studentId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

attendanceRoute.get('/', getByIdRoute( attendanceModel, 'attendanceId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

attendanceRoute.post('/', postRoute( attendanceModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

attendanceRoute.put('/:attendanceId', putRoute( attendanceModel, 'attendanceId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

attendanceRoute.delete('/:attendanceId', deleteRoute(attendanceModel, 'attendanceId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

export default attendanceRoute;