const express = require('express');

const notesModel = require('../model/notesModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js');

const notesRoute = express.Router();

notesRoute.use(logRouteInfo);

notesRoute.get('/', getRoute( notesModel ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

notesRoute.get('/', getByObjectIdRoute( notesModel, 'noteId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

notesRoute.get('/user', getByIdRoute( notesModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

notesRoute.post('/', postRoute( notesModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

notesRoute.put('/:noteId', putRoute( notesModel, 'noteId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

notesRoute.put('/content/:noteId', putRoute( notesModel, 'noteId' ), (req, res) => {
});

notesRoute.delete('/:noteId', deleteRoute(notesModel, 'noteId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = notesRoute;