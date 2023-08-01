const express = require('express');

const lessonModel = require('../model/lessonModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js');

const lessonRoute = express.Router();

lessonRoute.use(logRouteInfo);

lessonRoute.get('/', getRoute( lessonModel ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonRoute.get('/', getByIdRoute( lessonModel, 'courseId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonRoute.get('/files', getByIdRoute( lessonModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonRoute.get('/videos', getByIdRoute( lessonModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonRoute.get('/formfield/user', getByIdRoute( lessonModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonRoute.post('/', postRoute( lessonModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonRoute.put('/:lessonId', putRoute( lessonModel, 'lessonId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

lessonRoute.delete('/:lessonId', deleteRoute(lessonModel, 'lessonId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = lessonRoute;