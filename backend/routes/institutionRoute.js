import express from 'express';

import institutionModel from '../model/institutionModel.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo  } from '../middleWare/index.js'; 

const institutionRoute = express.Router();

institutionRoute.use(logRouteInfo);

institutionRoute.get('/', getRoute( institutionModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

institutionRoute.get('/institution', getByIdRoute( institutionModel, 'institutionId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

institutionRoute.post('/', postRoute( institutionModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

institutionRoute.put('/:institutionId', putRoute( institutionModel, 'institutionId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

institutionRoute.delete('/:institutionId', deleteRoute(institutionModel, 'institutionId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

export default institutionRoute;