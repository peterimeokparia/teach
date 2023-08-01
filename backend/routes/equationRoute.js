const express = require('express');

const equationModel = require('../model/equationModel.js');

const { 
verifyRoute,
getByIdRoute,
getRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js'); 

const equationRoute = express.Router();

equationRoute.use(logRouteInfo);

equationRoute.get('/', getRoute( equationModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

equationRoute.post('/', postRoute( equationModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

equationRoute.put('/:equationId', putRoute( equationModel, 'equationId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

equationRoute.delete('/:equationId', deleteRoute( equationModel, 'equationId' ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = equationRoute;