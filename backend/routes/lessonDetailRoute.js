const express = require('express');
const lessonDetailModel = require('../model/lessonDetailModel.js');
const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js');

const lessonDetailRoute = express.Router();

lessonDetailRoute.use(logRouteInfo);

lessonDetailRoute.get('/', getRoute( lessonDetailModel ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailRoute.get('/:courseId', getByObjectIdRoute( lessonDetailModel, 'courseId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailRoute.get('/:lessonId', getByObjectIdRoute( lessonDetailModel, 'lessonId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailRoute.get('/:userId', getByObjectIdRoute( lessonDetailModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailRoute.get('/:lessonDetailId', getByIdRoute( lessonDetailModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailRoute.get('/files', getByIdRoute( lessonDetailModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailRoute.get('/videos', getByIdRoute( lessonDetailModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailRoute.post('/', postRoute( lessonDetailModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailRoute.put('/:lessonDetailId', putRoute( lessonDetailModel, 'lessonDetailId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

lessonDetailRoute.delete('/:lessonDetailId', deleteRoute(lessonDetailModel, 'lessonDetailId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = lessonDetailRoute;