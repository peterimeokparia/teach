import express from 'express';

import outcomesModel from '../model/outcomesModel.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } from '../middleWare/index.js';

const outcomesRoute = express.Router();

outcomesRoute.use(logRouteInfo);

outcomesRoute.get('/', getRoute( outcomesModel ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

outcomesRoute.get('/', getByIdRoute( outcomesModel, 'parentId' ),  (req, res) => {
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

export default outcomesRoute;