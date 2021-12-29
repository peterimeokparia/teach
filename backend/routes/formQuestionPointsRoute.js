import express from 'express';

import formQuestionPointsModel from '../model/formQuestionPointsModel.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } from '../middleWare/index.js'; 

const formQuestionPointsRoute = express.Router();

formQuestionPointsRoute.use(logRouteInfo);

formQuestionPointsRoute.get('/', getRoute( formQuestionPointsModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

formQuestionPointsRoute.get('/question', getByIdRoute( formQuestionPointsModel, 'questionId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

formQuestionPointsRoute.get('/formfield', getByIdRoute( formQuestionPointsModel, 'formfield' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

formQuestionPointsRoute.get('/formfield/user', getByIdRoute( formQuestionPointsModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

formQuestionPointsRoute.post('/', postRoute( formQuestionPointsModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

formQuestionPointsRoute.put('/:formFieldId', putRoute( formQuestionPointsModel, 'formFieldId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

formQuestionPointsRoute.delete('/:formFieldId', deleteRoute(formQuestionPointsModel, 'formFieldId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

export default formQuestionPointsRoute;