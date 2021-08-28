import express from 'express';

import attendanceModel from '../model/attendanceModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
ATTENDANCEROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js'; 

const attendanceRoute = express.Router();
attendanceRoute.use(logRouteInfo);

attendanceRoute.get('/', (req, res) => {
   attendanceModel.find({ })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ATTENDANCEROUTE, error );
        return res.status(400).json({ error });
    });
 });
 
 attendanceRoute.get('/:studentId', (req, res) => {
   let studentId = { studentId: req.query.studentId };

   attendanceModel.findById( studentId )   
       .then(data => {
           return res.status(200).json(data);
       })
       .catch( error => {
            handleBackEndLogs( ATTENDANCEROUTE, error );
            return res.status(400).json({ error });
       });
 });

 attendanceRoute.get('/:attendanceId', (req, res) => {
   let attendanceId = { attendanceId: req.query.attendanceId };
   attendanceModel.findById( attendanceId )   
       .then(data => {
        return res.status(200).json(data);
       })
       .catch( error => {
        handleBackEndLogs( ATTENDANCEROUTE, error );
        return res.status(400).json({ error });
      });
 });

attendanceRoute.post('/', (req, res) => {
    let attendanceData = getPostData( req );
    let attendance = new attendanceModel(attendanceData);
    attendance.save()
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( ATTENDANCEROUTE, error );
        return res.status(400).json({ error });
    });
 });

 attendanceRoute.put('/:attendanceId', (req, res) => {
    saveUpdatedData(req, attendanceModel, req.params.attendanceId)
       .then( data => {
         return res.status(200).json(data)
       })
       .catch( error => {
         handleBackEndLogs( ATTENDANCEROUTE, error );
         return res.status(400).json({ error });
       });
 });

 attendanceRoute.delete('/:attendanceId', (req, res) => {
    attendanceModel.remove({ _id: req.params.attendanceId }, ( error, result ) => {
    if ( error ) {
        return res.status(400).send(error);
    }
    else {
        return res.status(200).json(result);
    }
    });
});

export default attendanceRoute;