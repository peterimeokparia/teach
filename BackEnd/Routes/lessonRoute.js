import express from 'express';

import lessonModel from '../Model/lessonModel.js';

import {
getPostData,    
saveUpdatedData   
} from '../Helpers/storageHelper.js';



const lessonRoute = express.Router();

lessonRoute.get('/', (req, res) => {
 
    lessonModel.find({ courseId: req.query.courseId })
        .then(data => {
            console.log('Lessons Lessons', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
 });


 
 
 lessonRoute.get('/videos', (req, res) => {

   console.log( 'req.query._id req.query._id req.query._id', req.query._id)
 
   lessonModel.find({ _id: req.query._id })
       .then(data => {
           console.log('Lessons Lessons', data)
           res.status(200).json(data);
       })
        .catch(error => console.log(error));
});


 
 lessonRoute.get('/files', (req, res) => {
 
   lessonModel.find({ _id: req.query._id })
       .then(data => {
           console.log('Lessons Lessons', data)
           res.status(200).json(data);
       })
        .catch(error => console.log(error));
});



 lessonRoute.post('/', (req, res) => {
 
      //  let lessonData = {
      //         title: req.body.title, 
      //         courseId:req.body.courseId, 
      //         markDown:req.body.markDown,
      //         videoUrl:req.body.videoUrl,
      //         files:req.body.files,
      //         lessonDate:req.body.lessonDate
      //  };

       let lessonData = getPostData( req );
 
       let lessons = new lessonModel(lessonData);

       lessons.save()
       .then(data => {
          console.log('saved', data);
          res.status(200).json(data)})
       .catch( error => console.log(error) ); 
      
 });




 lessonRoute.put('/:lessonId', (req, res) => {
 
       saveUpdatedData(req, lessonModel, req.params.lessonId)
       .then( data => {
         console.log(data);
         res.status(200).json(data)
       })
        .catch( error => {
           console.log(error);
           res.status(400).json({ error })
        });
 });





 lessonRoute.delete('/:lessonId', (req, res) => {
  
    lessonModel.remove({ _id: req.params.lessonId }, ( error, result ) => {
         
            if ( error ) {
               res.status(400).send(error);
            }
            else {
               res.status(200).json(result);
            }
    });

});



export default lessonRoute;