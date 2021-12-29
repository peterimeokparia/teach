import express from 'express';

import assignmentModel from '../model/assignmentModel.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo  } from '../middleWare/index.js'; 

const assignmentRoute = express.Router();

assignmentRoute.use(logRouteInfo);

assignmentRoute.get('/', getRoute( assignmentModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

assignmentRoute.get('/', getByIdRoute( assignmentModel, 'assignmentId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

assignmentRoute.post('/', postRoute( assignmentModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

assignmentRoute.put('/:assignmentId', putRoute( assignmentModel, 'assignmentId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

assignmentRoute.delete('/:assignmentId', deleteRoute(assignmentModel, 'assignmentId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

export default assignmentRoute;
