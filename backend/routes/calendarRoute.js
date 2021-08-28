import express from 'express';

import calendarModel from '../model/calendarModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
CALENDARROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js'; 

const calendarRoute = express.Router();
calendarRoute.use(logRouteInfo);

calendarRoute.get('/', (req, res) => {
    calendarModel.find({})
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( CALENDARROUTE, error );
        return res.status(400).json({ error });
    });
 });

calendarRoute.get('/', (req, res) => {
    let id = { _id: req.query.calendarId };
    calendarModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
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
        handleBackEndLogs( CALENDARROUTE, error );
        return res.status(400).json({ error });
    });
})

calendarRoute.post('/', (req, res) => {
    let eventData = getPostData( req );
    let calendar = new calendarModel(eventData);
    calendar.save()
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( CALENDARROUTE, error );
        return res.status(400).json({ error });
    });
});

calendarRoute.put('/:calendarId', (req, res) => {
    saveUpdatedData(req, calendarModel, req.params.calendarId)
    .then( data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( CALENDARROUTE, error );
        return res.status(400).json({ error });
    });
});

calendarRoute.delete('/:calendarId', (req, res) => {
    calendarModel.remove({ _id: req.params.calendarId }, ( error, result ) => {
        if ( error ) {
            handleBackEndLogs( CALENDARROUTE, error );
            return res.status(400).send(error);
        }
        else {
            return res.status(200).json(result);
        }
    });
});

export default calendarRoute;