const express = require('express');

const meetingNotesModel = require('../model/meetingNotesModel.js');

const { 
verifyRoute,
getRoute,
getByIdRoute,
getByObjectIdRoute,
postRoute,
putRoute,
deleteRoute,
logRouteInfo } = require('../middleWare/index.js');

const meetingNotesRoute = express.Router();

meetingNotesRoute.use(logRouteInfo);

meetingNotesRoute.get('/', getRoute( meetingNotesModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

meetingNotesRoute.get('/notes', getByObjectIdRoute( meetingNotesModel, 'noteId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

meetingNotesRoute.get('/meeting', getByObjectIdRoute( meetingNotesModel, 'meetingId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

meetingNotesRoute.get('/formfield/user', getByIdRoute( meetingNotesModel, 'userId' ),  (req, res) => {
    return res.status(200).json(res?.newResult);
});

meetingNotesRoute.post('/', postRoute( meetingNotesModel ), (req, res) => {
    return res.status(200).json(res?.newResult);
});

meetingNotesRoute.put('/:notesId', putRoute( meetingNotesModel, 'notesId' ), (req, res) => {
    return res.status(200).json(res?.savedResult);
});

meetingNotesRoute.delete('/:notesId', deleteRoute(meetingNotesModel, 'notesId'), (req, res) => {
    return res.status(200).json(res?.newResult);
});

module.exports = meetingNotesRoute;