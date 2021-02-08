import express from 'express';

import assignmentModel from '../Model/assignmentModel.js';

import {
getPostData,    
saveUpdatedData   
} from '../Helpers/storageHelper.js';


const assignmentRoute = express.Router();


assignmentRoute.get('/', (req, res) => {
 
    assignmentModel.find({ })
        .then(data => {
            console.log('Assignments Assignments', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
})


assignmentRoute.get('/', (req, res) => {
 
    examModel.find( { assignmentId: req.query.assignmentId } )
        .then(data => {
            console.log('Assignments Assignments', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
})



assignmentRoute.post('/', (req, res) => {

   let assignmentData =  getPostData( req );
 
   let assignments = new assignmentModel(assignmentData);  

    assignments.save()
        .then(data => {
        console.log('saved', data);
        res.status(200).json(data)})
        .catch( error => console.log(error) )
});




 assignmentRoute.put('/:assignmentId', (req, res) => {
 
    saveUpdatedData(req, assignmentModel, req.params.assignmentId)
    .then( data => {
      console.log(data);
      res.status(200).json(data)
    })
     .catch( error => {
        console.log(error);
        res.status(400).json({ error })
     });
});




assignmentRoute.delete('/:assignmentId', (req, res) => {

    assignmentModel.findByIdAndDelete(req.params.assignmentId)
     .then(data => {
        console.log('data - doc', data);
        res.status(200).json(data)
     })
       .catch(error => {
        res.status(400).json({error});
       })
   
});


export default assignmentRoute;
