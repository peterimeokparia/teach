import express from 'express';

import eventModel from '../model/eventModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
EVENTROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js'; 

const eventRoute = express.Router();
eventRoute.use(logRouteInfo);

eventRoute.get('/', (req, res) => {
    eventModel.find({})
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( EVENTROUTE, error );
        return res.status(400).json({ error })
    });
 });

eventRoute.get('/', (req, res) => {
    let id = { _id: req.query.eventId };
    eventModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( EVENTROUTE, error );
        return res.status(400).json({ error })
    });
});
  
eventRoute.get('/events/byUserId', (req, res) => {
    let userId = { userId: req?.query?.userId };
    eventModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( EVENTROUTE, error );
        return res.status(400).json({ error })
    });
});

eventRoute.post('/', (req, res) => {
    let eventData = getPostData( req );
    let calendar = new eventModel(eventData);
    calendar.save()
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( EVENTROUTE, error );
        return res.status(400).json({ error });
    });
});

eventRoute.put('/:eventId', (req, res) => {
    saveUpdatedData(req, eventModel, req.params?.eventId)
    .then( data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( EVENTROUTE, error );
        return res.status(400).json({ error });
    });
});

eventRoute.delete('/:eventId', (req, res) => {
    eventModel.remove({ _id: req.params.eventId }, ( error, result ) => {
    if ( error ) {
        return res.status(400).send(error);
    }else {
        return res.status(200).json(result);
    }
    });
});

export default eventRoute;
