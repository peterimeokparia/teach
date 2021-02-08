import express from 'express';

import questionModel from '../Model/questionModel.js';

import {
getPostData,    
saveUpdatedData   
} from '../Helpers/storageHelper.js';

 
const questionRoute = express.Router();



 questionRoute.get('/', (req, res) => {
 
    questionModel.find({ })
        .then(data => {
            console.log('QuestionsNoID QuestionsNoID Comprende?', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
 });



 questionRoute.get('/test', (req, res) => {
 
    questionModel.find({ _id: req.query.questionId })
        .then(data => {
            console.log('testQuestions Questions', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
 });


 
 questionRoute.get('/videos', (req, res) => {

   questionModel.find({ _id: req.query._id })
       .then(data => {
           console.log('Questions Questions', data)
           res.status(200).json(data);
       })
        .catch(error => console.log(error));
});


 
 questionRoute.get('/files', (req, res) => {
 
   questionModel.find({ _id: req.query._id })
       .then(data => {
           console.log('Questions Questions', data)
           res.status(200).json(data);
       })
        .catch(error => console.log(error));
});



 questionRoute.post('/', (req, res) => {
 
       let questionData = getPostData( req );
 
       let questions = new questionModel(questionData);

       questions.save()
       .then(data => {
          console.log('saved', data);
          res.status(200).json(data)})
       .catch( error => console.log(error) ); 
      
 });




 questionRoute.put('/:questionId', (req, res) => {
 
       saveUpdatedData(req, questionModel, req.params.questionId)
       .then( data => {
         console.log(data);
         res.status(200).json(data)
       })
        .catch( error => {
           console.log(error);
           res.status(400).json({ error })
        });
 });





 questionRoute.delete('/:questionId', (req, res) => {
  
    questionModel.remove({ _id: req.params.questionId }, ( error, result ) => {
         
         if ( error ) {
            res.status(400).send(error);
         }
         else {
            res.status(200).json(result);
         }
    });

});



export default questionRoute;