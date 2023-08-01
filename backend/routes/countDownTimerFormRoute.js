const express = require('express');

const countDownTimerFormModel = require('../model/countDownTimerFormModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js'); 

const countDownTimerFormRoute = express.Router();

countDownTimerFormRoute.use(logRouteInfo);

countDownTimerFormRoute.get('/', getRoute( countDownTimerFormModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

countDownTimerFormRoute.get('/formUuId', getByIdRoute( countDownTimerFormModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

countDownTimerFormRoute.post('/', postRoute( countDownTimerFormModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

countDownTimerFormRoute.put('/:formUuId', putRoute( countDownTimerFormModel, 'formUuId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

countDownTimerFormRoute.delete('/:formUuId', deleteRoute( countDownTimerFormModel, 'lessonId' ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = countDownTimerFormRoute;