import express from 'express';

import outcomeInsightsModel from '../model/outcomeInsightsModel.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
paginatedResults,
postRoute,
putRoute,
deleteRoute,
logRouteInfo  } from '../middleWare/index.js'; 

const outcomeInsightsRoute = express.Router();

outcomeInsightsRoute.use(logRouteInfo);

outcomeInsightsRoute.get('/pagedRoute', paginatedResults( outcomeInsightsModel, 'formType' ), (req, res) => {
    res.json(res?.paginatedResults);
 });

outcomeInsightsRoute.get('/', getRoute( outcomeInsightsModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

outcomeInsightsRoute.get('/builder', getByIdRoute( outcomeInsightsModel, 'outcomeInsightsId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

outcomeInsightsRoute.get('/answer', getByIdRoute( outcomeInsightsModel, 'answerId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

outcomeInsightsRoute.get('/user', getByIdRoute( outcomeInsightsModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

outcomeInsightsRoute.post('/', postRoute( outcomeInsightsModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

outcomeInsightsRoute.put('/:outcomeInsightsId', putRoute( outcomeInsightsModel, 'outcomeInsightsId' ), (req, res) => {
    return res?.status(200).json(res?.savedResult);
});

outcomeInsightsRoute.delete('/:outcomeInsightsId', deleteRoute(outcomeInsightsModel, 'outcomeInsightsId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

export default outcomeInsightsRoute;