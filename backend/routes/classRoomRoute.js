import express from 'express';

import classRoomModel from '../model/classRoomModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
CLASSROOMROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js'; 

const classRoomRoute = express.Router();
classRoomRoute.use(logRouteInfo);

classRoomRoute.get('/', (req, res) => {
    classRoomModel.find({ })
    .then(data => {
        return res.status(200).json(data); 
    })
    .catch( error => {
        handleBackEndLogs( CLASSROOMROUTE, error );
        return res.status(400).json({ error });
    });
})

classRoomRoute.post('/', (req, res) => {
    let classRoomData = getPostData( req );
    let classRooms = new classRoomModel(classRoomData);  
    classRooms.save()
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( CLASSROOMROUTE, error );
        return res.status(400).json({ error });
    });
});

classRoomRoute.put('/:classRoomId', (req, res) => {
    saveUpdatedData(req, classRoomModel, req.params.classRoomId)
    .then( data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( CLASSROOMROUTE, error );
        return res.status(400).json({ error });
    });
});

classRoomRoute.delete('/:classRoomId', (req, res) => {
    classRoomModel.findByIdAndDelete(req.params.classRoomId)
     .then(data => {
        return res.status(200).json(data);
     })
     .catch( error => {
        handleBackEndLogs( CLASSROOMROUTE, error );
        return res.status(400).json({ error });
    });
});

export default classRoomRoute;