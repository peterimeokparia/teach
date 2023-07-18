import express from 'express';

import studentQuestionInsightsModel from '../model/studentQuestionInsightsModel.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
paginatedResults,
postRoute,
putRoute,
deleteRoute,
logRouteInfo  } from '../middleWare/index.js'; 

const studentQuestionInsightsRoute = express.Router();

studentQuestionInsightsRoute.use(logRouteInfo);

studentQuestionInsightsRoute.get('/pagedRoute', paginatedResults( studentQuestionInsightsModel, 'formType' ), (req, res) => {
    res.json(res?.paginatedResults);
 });

studentQuestionInsightsRoute.get('/', getRoute( studentQuestionInsightsModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

studentQuestionInsightsRoute.get('/builder', getByIdRoute( studentQuestionInsightsModel, 'studentQuestionInsightsId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

studentQuestionInsightsRoute.get('/formType', getByIdRoute( studentQuestionInsightsModel, 'formType' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

studentQuestionInsightsRoute.get('/answer', getByIdRoute( studentQuestionInsightsModel, 'answerId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

studentQuestionInsightsRoute.get('/user', getByIdRoute( studentQuestionInsightsModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

studentQuestionInsightsRoute.post('/', postRoute( studentQuestionInsightsModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

studentQuestionInsightsRoute.put('/:studentQuestionInsightsId', putRoute( studentQuestionInsightsModel, 'studentQuestionInsightsId' ), (req, res) => {
    return res?.status(200).json(res?.savedResult);
});

studentQuestionInsightsRoute.delete('/:studentQuestionInsightsId', deleteRoute( studentQuestionInsightsModel, 'studentQuestionInsightsId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

export default studentQuestionInsightsRoute;