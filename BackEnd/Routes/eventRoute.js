import express from 'express';

import eventModel from '../Model/eventModel.js';

import {
getPostData,    
saveUpdatedData } from '../Helpers/storageHelper.js';

import { 
EVENTROUTE,
handleBackEndLogs } from '../Helpers/logHelper.js';

const eventRoute = express.Router();

eventRoute.get('/', (req, res) => {
    eventModel.find({})
    .then(data => {
        console.log('Event Event Debug', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
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
        console.log( error );
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
        console.log( error );
        handleBackEndLogs( EVENTROUTE, error );
        return res.status(400).json({ error })
    });
});

eventRoute.post('/', (req, res) => {
    let eventData = getPostData( req );
    let calendar = new eventModel(eventData);
    calendar.save()
    .then(data => {
        console.log('saved new event data', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( EVENTROUTE, error );
        return res.status(400).json({ error })
    });
});

eventRoute.put('/:eventId', (req, res) => {
    console.log('eventRoute eventRoute eventRoute put b4')
    console.log(req?.params)
    saveUpdatedData(req, eventModel, req.params?.eventId)
    .then( data => {
        console.log(data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( EVENTROUTE, error );
        return res.status(400).json({ error })
    });
});

eventRoute.delete('/:eventId', (req, res) => {
    console.log('eventRoute.delete')
    console.log(req)
    console.log(req.params.eventId)
    eventModel.remove({ _id: req.params.eventId }, ( error, result ) => {
        if ( error ) {
            console.log(error)
            return res.status(400).send(error);
        }
        else {
            console.log(result)
            return res.status(200).json(result);
        }
    });
});

export default eventRoute;
