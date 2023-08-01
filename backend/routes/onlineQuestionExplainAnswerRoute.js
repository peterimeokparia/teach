const express = require('express');

const onlineQuestionExplainAnswerModel = require('../model/onlineQuestionExplainAnswerModel.js');

const { 
ONLINEQUESTIONSROUTE,
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

const onlineQuestionExplainAnswerRoute = express.Router();

onlineQuestionExplainAnswerRoute.use(logRouteInfo);

onlineQuestionExplainAnswerRoute.get('/', getRoute( onlineQuestionExplainAnswerModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionExplainAnswerRoute.post('/', postRoute( onlineQuestionExplainAnswerModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

onlineQuestionExplainAnswerRoute.put('/:questionId', putRoute( onlineQuestionExplainAnswerModel, 'questionId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

onlineQuestionExplainAnswerRoute.put('/content/:questionId', putRoute( onlineQuestionExplainAnswerModel, 'questionId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

onlineQuestionExplainAnswerRoute.delete('/:questionId', deleteRoute( onlineQuestionExplainAnswerModel, 'questionId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = onlineQuestionExplainAnswerRoute;
