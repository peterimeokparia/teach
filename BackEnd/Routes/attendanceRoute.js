import express from 'express';

import attendanceModel from '../Model/attendanceModel.js';

import {
getPostData,    
saveUpdatedData   
} from '../Helpers/storageHelper.js';



const attendanceRoute = express.Router();

attendanceRoute.get('/', (req, res) => {
 
   attendanceModel.find({ })
         .then(data => {
             console.log('Attendance', data)
             res.status(200).json(data);
         })
          .catch(error => console.log(error));
 });
 



 attendanceRoute.get('/:studentId', (req, res) => {
 
   let studentId = { studentId: req.query.studentId };
  
   attendanceModel.findById( studentId )   
       .then(data => {
           console.log('Attendance', data)
           res.status(200).json(data);
       })
        .catch(error => console.log(error));
 });




 attendanceRoute.get('/:attendanceId', (req, res) => {
 
   let attendanceId = { attendanceId: req.query.attendanceId };
  
   attendanceModel.findById( attendanceId )   
       .then(data => {
           console.log('Attendance', data)
           res.status(200).json(data);
       })
        .catch(error => console.log(error));
 });


 

 attendanceRoute.post('/', (req, res) => {
  
      let attendanceData = getPostData( req );

      let attendance = new attendanceModel(attendanceData);

       attendance.save()
       .then(data => {
          console.log('saved', data);
          res.status(200).json(data)})
       .catch( error => console.log(error) ); 
      
 });




 attendanceRoute.put('/:attendanceId', (req, res) => {
 
       saveUpdatedData(req, attendanceModel, req.params.attendanceId)
       .then( data => {
         console.log(data);
         res.status(200).json(data)
       })
        .catch( error => {
           console.log(error);
           res.status(400).json({ error })
        });
 });





 attendanceRoute.delete('/:attendanceId', (req, res) => {
  
    attendanceModel.remove({ _id: req.params.attendanceId }, ( error, result ) => {
         
            if ( error ) {
               res.status(400).send(error);
            }
            else {
               res.status(200).json(result);
            }

    });

});



export default attendanceRoute;