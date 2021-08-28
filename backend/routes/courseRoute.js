import express from 'express';

import courseModel from '../model/courseModel.js';

import {
getPostData,    
saveUpdatedData } from '../helpers/storageHelper.js';

import { 
COURSEROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js'; 

const courseRoute = express.Router();
courseRoute.use(logRouteInfo);

courseRoute.get('/', (req, res) => {
    courseModel.find({ })
    .then(data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( COURSEROUTE, error );
        return res.status(400).json({ error })
    });
});

// courseRoute.use(verifyRoute);
courseRoute.post('/', (req, res) => {
    let courseData = getPostData( req );
    let courses = new courseModel(courseData);  
    courses.save()
    .then(data => {
        return res.status(200).json(data)})
    .catch( error => {
        handleBackEndLogs( COURSEROUTE, error );
        return res.status(400).json({ error });
    });
});

courseRoute.put('/:courseId', (req, res) => { 
    saveUpdatedData(req, courseModel, req.params.courseId)
    .then( data => {
        return res.status(200).json(data);
    })
    .catch( error => {
        handleBackEndLogs( COURSEROUTE, error );
        return res.status(400).json({ error });
    });
});

courseRoute.delete('/:courseId', (req, res) => {
    courseModel.findByIdAndDelete(req.params.courseId)
     .then(data => {
        return res.status(200).json(data);
     })
     .catch( error => {
        handleBackEndLogs( COURSEROUTE, error );
        return res.status(400).json({ error });
    });
});

export default courseRoute;