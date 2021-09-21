import express from 'express';

import meetingNotesModel from '../model/meetingNotesModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
MEETINGNOTESROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js';

const meetingNotesRoute = express.Router();
meetingNotesRoute.use(logRouteInfo);

meetingNotesRoute.get('/', (req, res) => {
    meetingNotesModel.find({ })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( meetingNotesRoute, error );
        return res.status(400).json({ error });
    });
});

meetingNotesRoute.get('/notes', (req, res) => {
  let id = { _id: req.query.noteId };
  meetingNotesModel.findById(id)   
    .then(data => {
    if ( data === null || data === undefined ) {
        Error('Object is null or undefined');
    }
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( meetingNotesRoute, error );
        return res.status(400).json({ error });
    });
});

meetingNotesRoute.get('/meeting', (req, res) => {
    let id = { _id: req.query.meetingId };
    meetingNotesModel.findById(id)   
    .then(data => {
    if ( data === null || data === undefined ) {
        Error('Object is null or undefined');
    }
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( meetingNotesRoute, error );
        return res.status(400).json({ error });
    });
});

meetingNotesRoute.post('/', (req, res) => {
   let meetingNotesData = getPostData( req );
   let user = new meetingNotesModel(meetingNotesData);  
    user.save()
    .then(data => {
       return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( meetingNotesRoute, error );
        return res.status(400).json({ error });
    });
});

meetingNotesRoute.put('/:notesId', (req, res) => {
    saveUpdatedData(req, meetingNotesModel, req.params.notesId)
    .then( data => {
        return res.status(200).json(data)
    })
    .catch( error => {
        handleBackEndLogs( meetingNotesRoute, error );
        return res.status(400).json({ error });
    });
});

meetingNotesRoute.delete('/:notesId', (req, res) => {
    meetingNotesModel.findByIdAndDelete(req.params.notesId)
     .then(data => {
        return res.status(200).json(data);
     })
     .catch( error => {
        handleBackEndLogs( meetingNotesRoute, error );
        return res.status(400).json({ error });
    });
});

export default meetingNotesRoute;