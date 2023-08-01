const express = require('express');
const lessonDetailPlanModel = require('../model/lessonDetailPlanModel.js');
const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js');

const lessonDetailPlanRoute = express.Router();

lessonDetailPlanRoute.use(logRouteInfo);

lessonDetailPlanRoute.get('/', getRoute( lessonDetailPlanModel ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailPlanRoute.get('/:courseId', getByObjectIdRoute( lessonDetailPlanModel, 'courseId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailPlanRoute.get('/:lessonId', getByObjectIdRoute( lessonDetailPlanModel, 'lessonId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailPlanRoute.get('/:lessonDetailId', getByObjectIdRoute( lessonDetailPlanModel, 'lessonDetailId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailPlanRoute.get('/:userId', getByObjectIdRoute( lessonDetailPlanModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailPlanRoute.get('/:lessonDetailLessonPlanId', getByIdRoute( lessonDetailPlanModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailPlanRoute.get('/files', getByIdRoute( lessonDetailPlanModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailPlanRoute.get('/videos', getByIdRoute( lessonDetailPlanModel, '_id' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailPlanRoute.post('/', postRoute( lessonDetailPlanModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

lessonDetailPlanRoute.put('/:lessonPlanId', putRoute( lessonDetailPlanModel, 'lessonPlanId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

lessonDetailPlanRoute.delete('/:lessonPlanId', deleteRoute(lessonDetailPlanModel, 'lessonPlanId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = lessonDetailPlanRoute;