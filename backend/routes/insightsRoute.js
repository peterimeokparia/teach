import express from 'express';

import insightsModel from '../model/insightsModel.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
paginatedResults,
postRoute,
putRoute,
deleteRoute,
logRouteInfo  } from '../middleWare/index.js'; 

const insightsRoute = express.Router();

insightsRoute.use(logRouteInfo);

insightsRoute.get('/pagedRoute', paginatedResults( insightsModel, 'formType' ), (req, res) => {
    res.json(res?.paginatedResults);
 });

insightsRoute.get('/', getRoute( insightsModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

insightsRoute.get('/builder', getByIdRoute( insightsModel, 'insightsId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

insightsRoute.get('/user', getByIdRoute( insightsModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

insightsRoute.post('/', postRoute( insightsModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

insightsRoute.put('/:insightsId', putRoute( insightsModel, 'insightsId' ), (req, res) => {
    return res?.status(200).json(res?.savedResult);
});

insightsRoute.delete('/:insightsId', deleteRoute(insightsModel, 'insightsId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

export default insightsRoute;