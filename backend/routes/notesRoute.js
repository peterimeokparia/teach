import express from 'express';

import notesModel from '../model/notesModel.js';

import { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } from '../middleWare/index.js';

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

notesRoute.delete('/:noteId', deleteRoute(notesModel, 'noteId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

export default notesRoute;