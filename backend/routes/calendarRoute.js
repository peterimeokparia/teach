import express from 'express';

import calendarModel from '../model/calendarModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
CALENDARROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

const calendarRoute = express.Router();

calendarRoute.get('/', (req, res) => {
    calendarModel.find({})
    .then(data => {
        console.log('Calendar Calendar Debug', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( CALENDARROUTE, error );
        return res.status(400).json({ error })
    });
 });

calendarRoute.get('/', (req, res) => {
    let id = { _id: req.query.calendarId };
    calendarModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( CALENDARROUTE, error );
        return res.status(400).json({ error });
    });
});
  
calendarRoute.get('/calendars/byUserId', (req, res) => {
    let userId = { userId: req?.query?.userId };
    calendarModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( CALENDARROUTE, error );
        return res.status(400).json({ error });
    });
})

calendarRoute.post('/', (req, res) => {
    console.log( req );
    console.log('in calendar calendar saved saved');
    let eventData = getPostData( req );
    let calendar = new calendarModel(eventData);
    calendar.save()
    .then(data => {
        console.log('calendar calendar saved saved', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( CALENDARROUTE, error );
        return res.status(400).json({ error });
    });
});

calendarRoute.put('/:calendarId', (req, res) => {
    saveUpdatedData(req, calendarModel, req.params.calendarId)
    .then( data => {
        console.log('calendarRoute calendarRoute calendarRoute put')
        console.log(data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( CALENDARROUTE, error );
        return res.status(400).json({ error });
    });
});

calendarRoute.delete('/:calendarId', (req, res) => {
    console.log('calendarRoute.delete')
    console.log(req)
    calendarModel.remove({ _id: req.params.calendarId }, ( error, result ) => {
        if ( error ) {
            console.log(error)
            handleBackEndLogs( CALENDARROUTE, error );
            return res.status(400).send(error);
        }
        else {
            console.log(result)
            return res.status(200).json(result);
        }
    });
});

export default calendarRoute;