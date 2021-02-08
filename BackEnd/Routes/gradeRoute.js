import express from 'express';

import gradeModel from '../Model/gradeModel.js';

import {
getPostData,    
saveUpdatedData   
} from '../Helpers/storageHelper.js';



const gradeRoute = express.Router();


gradeRoute.get('/', (req, res) => {
 
   gradeModel.find({ })
         .then(data => {
             console.log('Grades', data)
             res.status(200).json(data);
         })
          .catch(error => console.log(error));
 });
 



 gradeRoute.get('/:studentId', (req, res) => {
 
   let gradeId = { _id: req.query.studentId };
  
   gradeModel.findById( gradeId )   
       .then(data => {
           console.log('Grades', data)
           res.status(200).json(data);
       })
        .catch(error => console.log(error));
 });




 gradeRoute.get('/:gradeId', (req, res) => {
 
   let gradeId = { _id: req.query.gradeId };
  
   gradeModel.findById( gradeId )   
       .then(data => {
           console.log('Grades', data)
           res.status(200).json(data);
       })
        .catch(error => console.log(error));
 });


 

 gradeRoute.post('/', (req, res) => {
 
      //  let gradeData = {
      //         testDate: req.body.testDate, 
      //         score:req.body.score, 
      //         percentChange:req.body.percentChange,
      //         symbol:req.body.symbol,
      //         courseId:req.body.courseId,
      //         lessonId:req.body.lessonId, 
      //         studentId:req.body.studentId 
      //  };
 
       let gradeData = getPostData( req );

       let grades = new gradeModel(gradeData);

       grades.save()
       .then(data => {
          console.log('saved', data);
          res.status(200).json(data)})
       .catch( error => console.log(error) ); 
      
 });




 gradeRoute.put('/:gradeId', (req, res) => {
 
       saveUpdatedData(req, gradeModel, req.params.gradeId)
       .then( data => {
         console.log(data);
         res.status(200).json(data)
       })
        .catch( error => {
           console.log(error);
           res.status(400).json({ error })
        });
 });





 gradeRoute.delete('/:gradeId', (req, res) => {
  
    gradeModel.remove({ _id: req.params.gradeId }, ( error, result ) => {
         
            if ( error ) {
               res.status(400).send(error);
            }
            else {
               res.status(200).json(result);
            }

    });

});



export default gradeRoute;