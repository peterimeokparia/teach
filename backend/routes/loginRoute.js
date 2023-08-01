const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
paginatedResults,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js'); 

const express = require('express');

const loginModel = require('../model/loginModel.js');

const loginRoute = express.Router();

loginRoute.use(logRouteInfo);

loginRoute.get('/pagedRoute', paginatedResults( loginModel, 'userId' ), (req, res) => {
   res.json(res?.paginatedResults);
});

loginRoute.get('/', getRoute( loginModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

loginRoute.get('/', getByIdRoute( loginModel, 'courseId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

loginRoute.get('/userId', getByObjectIdRoute( loginModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

loginRoute.post('/', postRoute( loginModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

loginRoute.put('/:loginId', putRoute( loginModel, 'loginId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

loginRoute.delete('/:loginId', deleteRoute(loginModel, 'loginId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = loginRoute;