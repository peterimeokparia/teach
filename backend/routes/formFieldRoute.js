import express from 'express';

import formFieldModel from '../model/formFieldModel.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo  } from '../middleWare/index.js'; 

const formFieldRoute = express.Router();

formFieldRoute.use(logRouteInfo);

formFieldRoute.get('/', getRoute( formFieldModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

formFieldRoute.get('/question', getByIdRoute( formFieldModel, 'questionId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

formFieldRoute.get('/formfield', getByIdRoute( formFieldModel, 'formFieldId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

formFieldRoute.get('/formfield/user', getByIdRoute( formFieldModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

formFieldRoute.get('/videos', getByIdRoute( formFieldModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

formFieldRoute.post('/', postRoute( formFieldModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

formFieldRoute.put('/:formFieldId', putRoute( formFieldModel, 'formFieldId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

formFieldRoute.put('/content/:formFieldId', putRoute( formFieldModel, 'formFieldId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

formFieldRoute.delete('/:formFieldId', deleteRoute(formFieldModel, 'formFieldId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

export default formFieldRoute;