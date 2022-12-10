import express from 'express';

import courseOutcomeInsightsModel from '../model/courseOutcomeInsightsModel.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
paginatedResults,
postRoute,
putRoute,
deleteRoute,
logRouteInfo  } from '../middleWare/index.js'; 

const courseOutcomeInsightsRoute = express.Router();

courseOutcomeInsightsRoute.use(logRouteInfo);

courseOutcomeInsightsRoute.get('/pagedRoute', paginatedResults( courseOutcomeInsightsModel, 'formType' ), (req, res) => {
    res.json(res?.paginatedResults);
 });

courseOutcomeInsightsRoute.get('/', getRoute( courseOutcomeInsightsModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

courseOutcomeInsightsRoute.get('/builder', getByIdRoute( courseOutcomeInsightsModel, 'outcomeInsightsId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

courseOutcomeInsightsRoute.get('/answer', getByIdRoute( courseOutcomeInsightsModel, 'answerId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

courseOutcomeInsightsRoute.get('/user', getByIdRoute( courseOutcomeInsightsModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

courseOutcomeInsightsRoute.post('/', postRoute( courseOutcomeInsightsModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

courseOutcomeInsightsRoute.put('/:outcomeInsightsId', putRoute( courseOutcomeInsightsModel, 'outcomeInsightsId' ), (req, res) => {
    return res?.status(200).json(res?.savedResult);
});

courseOutcomeInsightsRoute.delete('/:outcomeInsightsId', deleteRoute(courseOutcomeInsightsModel, 'outcomeInsightsId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

export default courseOutcomeInsightsRoute;