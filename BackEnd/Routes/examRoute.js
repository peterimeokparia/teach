import express from 'express';

import examModel from '../Model/examModel.js';

import {
getPostData,    
saveUpdatedData   
} from '../Helpers/storageHelper.js';


const examRoute = express.Router();


examRoute.get('/', (req, res) => {
 
    examModel.find( { } )
        .then(data => {
            console.log('Exams Exams', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
})



examRoute.get('/', (req, res) => {
 
    examModel.find( { examId: req.query.examId } )
        .then(data => {
            console.log('Exams Exams', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
})




examRoute.post('/', (req, res) => {

    let examData = getPostData( req );
 
    let exams = new examModel(examData);  

    exams.save()
        .then(data => {
        console.log('saved', data);
        res.status(200).json(data)})
        .catch( error => console.log(error) )
});




 examRoute.put('/:examId', (req, res) => {
 
    saveUpdatedData(req, examModel, req.params.examId)
    .then( data => {
      console.log(data);
      res.status(200).json(data)
    })
     .catch( error => {
        console.log(error);
        res.status(400).json({ error })
     });
});




examRoute.delete('/:examId', (req, res) => {

    examModel.findByIdAndDelete(req.params.examId)
     .then(data => {
        console.log('data - doc', data);
        res.status(200).json(data)
     })
       .catch(error => {
        res.status(400).json({error});
       })
   
});


export default examRoute;
