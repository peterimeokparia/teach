import { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
paginatedResults,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } from '../middleWare/index.js'; 

import express from 'express';

import loginModel from '../model/loginModel.js';

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

export default loginRoute;