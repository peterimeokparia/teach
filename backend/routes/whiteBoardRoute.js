const express = require('express');

const whiteBoardModel = require('../model/whiteBoardModel.js');

const {
getPostData,    
saveUpdatedData } = require('../helpers/storageHelper.js');

const { 
WHITEBOARDROUTE,
handleBackEndLogs } = require('../helpers/logHelper.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js'); 

const whiteBoardRoute = express.Router();

whiteBoardRoute.use(logRouteInfo);

whiteBoardRoute.get('/', getRoute( whiteBoardModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

whiteBoardRoute.get('/byId', getByObjectIdRoute( whiteBoardModel, 'id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

whiteBoardRoute.get('/byWid', getByIdRoute( whiteBoardModel, 'wid' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

whiteBoardRoute.post('/', postRoute( whiteBoardModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

whiteBoardRoute.put('/:id', putRoute( whiteBoardModel, 'id' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

whiteBoardRoute.delete('/:id', deleteRoute(whiteBoardModel, 'id'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = whiteBoardRoute;




