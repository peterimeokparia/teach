import express from 'express';

import equationModel from '../model/equationModel.js';

import { 
verifyRoute,
getByIdRoute,
getRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } from '../middleWare/index.js'; 

const equationRoute = express.Router();

equationRoute.use(logRouteInfo);

equationRoute.get('/', getRoute( equationModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

equationRoute.post('/', postRoute( equationModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

equationRoute.put('/:equationId', putRoute( equationModel, 'equationId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

equationRoute.delete('/:equationId', deleteRoute( equationModel, 'equationId' ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

export default equationRoute;