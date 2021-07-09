import express from 'express';

import courseModel from '../Model/courseModel.js';

import {
getPostData,    
saveUpdatedData } from '../Helpers/storageHelper.js';

import { 
COURSEROUTE,
handleBackEndLogs } from '../Helpers/logHelper.js';

const courseRoute = express.Router();

courseRoute.get('/', (req, res) => {
    courseModel.find({ })
    .then(data => {
        console.log('Courses Courses', data)
        return res.status(200).json(data);
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( COURSEROUTE, error );
        return res.status(400).json({ error })
    });
});

courseRoute.post('/', (req, res) => {
    let courseData = getPostData( req );
    let courses = new courseModel(courseData);  
    courses.save()
    .then(data => {
        console.log('saved', data);
        return res.status(200).json(data)})
    .catch( error => {
        console.log( error );
        handleBackEndLogs( COURSEROUTE, error );
        return res.status(400).json({ error })
    });
});

courseRoute.put('/:courseId', (req, res) => { 
    saveUpdatedData(req, courseModel, req.params.courseId)
    .then( data => {
      console.log(data);
      return res.status(200).json(data)
    })
    .catch( error => {
        console.log( error );
        handleBackEndLogs( COURSEROUTE, error );
        return res.status(400).json({ error })
    });
});

courseRoute.delete('/:courseId', (req, res) => {
    courseModel.findByIdAndDelete(req.params.courseId)
     .then(data => {
        console.log('data - doc', data);
        return res.status(200).json(data)
     })
     .catch( error => {
        console.log( error );
        handleBackEndLogs( COURSEROUTE, error );
        return res.status(400).json({ error })
    });
});

export default courseRoute;