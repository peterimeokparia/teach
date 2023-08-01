const express = require('express');

const answerFormModel = require('../model/answerFormModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo  } = require('../middleWare/index.js'); 

const answerFormRoute = express.Router();

answerFormRoute.use(logRouteInfo);

answerFormRoute.get('/', getRoute( answerFormModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

answerFormRoute.get('/question', getByIdRoute( answerFormModel, 'questionId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

answerFormRoute.get('/answer', getByObjectIdRoute( answerFormModel, 'answerId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

answerFormRoute.get('/videos', getByIdRoute( answerFormModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

answerFormRoute.get('/answer/user', getByIdRoute( answerFormModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

answerFormRoute.post('/', postRoute( answerFormModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

answerFormRoute.put('/:answerId', putRoute( answerFormModel, 'answerId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

answerFormRoute.delete('/:answerId', deleteRoute(answerFormModel, 'answerId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = answerFormRoute;