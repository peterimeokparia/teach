const express = require('express');

const formBuilderModel = require('../model/formBuilderModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
paginatedResults,
postRoute,
putRoute,
deleteRoute,
logRouteInfo  } = require('../middleWare/index.js'); 

const formBuilderRoute = express.Router();

formBuilderRoute.use(logRouteInfo);

formBuilderRoute.get('/pagedRoute', paginatedResults( formBuilderModel, 'formType' ), (req, res) => {
    res.json(res?.paginatedResults);
 });

formBuilderRoute.get('/', getRoute( formBuilderModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

formBuilderRoute.get('/builder', getByIdRoute( formBuilderModel, 'formBuilderId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

formBuilderRoute.get('/user', getByIdRoute( formBuilderModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

formBuilderRoute.post('/', postRoute( formBuilderModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

formBuilderRoute.put('/:formBuilderId', putRoute( formBuilderModel, 'formBuilderId' ), (req, res) => {
    return res?.status(200).json(res?.savedResult);
});

formBuilderRoute.delete('/:formBuilderId', deleteRoute(formBuilderModel, 'formBuilderId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = formBuilderRoute;