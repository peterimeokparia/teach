import express from 'express';

import formFieldAnswerModel from '../model/formFieldAnswerModel.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } from '../middleWare/index.js'; 

const formFieldAnswersRoute = express.Router();

formFieldAnswersRoute.use(logRouteInfo);

formFieldAnswersRoute.get('/', getRoute( formFieldAnswerModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

formFieldAnswersRoute.get('/question', getByIdRoute( formFieldAnswerModel, 'questionId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

formFieldAnswersRoute.get('/formfield', getByIdRoute( formFieldAnswerModel, 'formfieldId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

formFieldAnswersRoute.get('/formfield/user', getByIdRoute( formFieldAnswerModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

formFieldAnswersRoute.put('/content/:formFieldId', putRoute( formFieldAnswerModel, 'formFieldId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

formFieldAnswersRoute.get('/videos', getByIdRoute( formFieldAnswerModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

formFieldAnswersRoute.post('/', postRoute( formFieldAnswerModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

formFieldAnswersRoute.put('/:formFieldId', putRoute( formFieldAnswerModel, 'formFieldId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

formFieldAnswersRoute.delete('/:formFieldId', deleteRoute(formFieldAnswerModel, 'formFieldId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

export default formFieldAnswersRoute;