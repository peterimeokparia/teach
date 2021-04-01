import express from 'express';

import calendarModel from '../Model/calendarModel.js';

import {
getPostData,    
saveUpdatedData   
} from '../Helpers/storageHelper.js';

const calendarRoute = express.Router();

calendarRoute.get('/', (req, res) => {
    calendarModel.find({})
    .then(data => {
        console.log('Calendar Calendar Debug', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log(error);
        return res.status(400).json({ error })
    });
 });

calendarRoute.get('/', (req, res) => {
    let id = { _id: req.query.calendarId };
    calendarModel.findById( id )   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch(error =>{    
        return res.status(400).json({ error }); 
    });
});
  
calendarRoute.get('/events/byUserId', (req, res) => {
    let userId = { userId: req?.query?.userId };
    calendarModel.find(userId)   
    .then(data => {
        return res.status(200).json(data);
    })
    .catch(error => { 
        return res.status(400).json({ error })
    });
})

calendarRoute.post('/', (req, res) => {
    let eventData = getPostData( req );
    let calendar = new calendarModel(eventData);
    calendar.save()
    .then(data => {
        console.log('saved', data);
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log(error);
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
        console.log(error);
        return res.status(400).json({ error });
    });
});

calendarRoute.delete('/:calendarId', (req, res) => {
    console.log('calendarRoute.delete')
    console.log(req)
    console.log(req.params.calendarId)
    calendarModel.remove({ _id: req.params.calendarId }, ( error, result ) => {
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

export default calendarRoute;