import express from 'express';

import questionInsightsModel from '../model/questionInsightsModel.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
paginatedResults,
postRoute,
putRoute,
deleteRoute,
logRouteInfo  } from '../middleWare/index.js'; 

const questionInsightsRoute = express.Router();

questionInsightsRoute.use(logRouteInfo);

questionInsightsRoute.get('/pagedRoute', paginatedResults( questionInsightsModel, 'formType' ), (req, res) => {
    res.json(res?.paginatedResults);
 });

questionInsightsRoute.get('/', getRoute( questionInsightsModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

questionInsightsRoute.get('/builder', getByIdRoute( questionInsightsModel, 'questionInsightsId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

questionInsightsRoute.get('/question', getByIdRoute( questionInsightsModel, 'questionId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

questionInsightsRoute.get('/answer', getByIdRoute( questionInsightsModel, 'answerId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

questionInsightsRoute.get('/user', getByIdRoute( questionInsightsModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

questionInsightsRoute.post('/', postRoute( questionInsightsModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

questionInsightsRoute.put('/:questionInsightsId', putRoute( questionInsightsModel, 'questionInsightsId' ), (req, res) => {
    return res?.status(200).json(res?.savedResult);
});

questionInsightsRoute.delete('/:questionInsightsId', deleteRoute(questionInsightsModel, 'questionInsightsId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

export default questionInsightsRoute;