import express from 'express';

import formBuilderModel from '../model/formBuilderModel.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
paginatedResults,
postRoute,
putRoute,
deleteRoute,
logRouteInfo  } from '../middleWare/index.js'; 

const formBuilderRoute = express.Router();

formBuilderRoute.use(logRouteInfo);

formBuilderRoute.get('/pagedRoute', paginatedResults( formBuilderModel, 'formType' ), (req, res) => {
    res.json(res?.paginatedResults);
 });

formBuilderRoute.get('/', getRoute( formBuilderModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

formBuilderRoute.get('/formbuilder/builder', getByIdRoute( formBuilderModel, 'formBuilderId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

formBuilderRoute.get('/formbuilder/user', getByIdRoute( formBuilderModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

formBuilderRoute.post('/', postRoute( formBuilderModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

formBuilderRoute.put('/:formBuilderId', putRoute( formBuilderModel, 'formBuilderId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

formBuilderRoute.delete('/:formFieldId', deleteRoute(formBuilderModel, 'formBuilderId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

export default formBuilderRoute;