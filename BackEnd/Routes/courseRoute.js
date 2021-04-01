import express from 'express';

import courseModel from '../Model/courseModel.js';

import {
getPostData,    
saveUpdatedData   
} from '../Helpers/storageHelper.js';


const courseRoute = express.Router();


courseRoute.get('/', (req, res) => {
    courseModel.find({ })
        .then(data => {
            console.log('Courses Courses', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
})

courseRoute.post('/', (req, res) => {
    let courseData = getPostData( req );
    let courses = new courseModel(courseData);  
    courses.save()
        .then(data => {
        console.log('saved', data);
        res.status(200).json(data)})
        .catch( error => console.log(error) )
});

courseRoute.put('/:courseId', (req, res) => { 
    saveUpdatedData(req, courseModel, req.params.courseId)
    .then( data => {
      console.log(data);
      res.status(200).json(data)
    })
     .catch( error => {
        console.log(error);
        res.status(400).json({ error })
     });
});

courseRoute.delete('/:courseId', (req, res) => {
    courseModel.findByIdAndDelete(req.params.courseId)
     .then(data => {
        console.log('data - doc', data);
        res.status(200).json(data)
     })
       .catch(error => {
        res.status(400).json({error});
       })
});

export default courseRoute;