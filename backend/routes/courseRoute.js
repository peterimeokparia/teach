const express = require('express');

const courseModel = require('../model/courseModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js'); 

const courseRoute = express.Router();

courseRoute.use(logRouteInfo);

courseRoute.get('/', getRoute( courseModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

courseRoute.post('/', postRoute( courseModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

courseRoute.put('/:courseId', putRoute( courseModel, 'courseId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

courseRoute.delete('/:courseId', deleteRoute(courseModel, 'courseId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = courseRoute;