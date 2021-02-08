import express from 'express';

import meetingModel from '../Model/meetingModel.js';

import {
getPostData,    
saveUpdatedData   
} from '../Helpers/storageHelper.js';



const meetingRoute = express.Router();

meetingRoute.get('/', (req, res) => {
 
    meetingModel.find({ })
        .then(data => {
            console.log('Meetings', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
})




meetingRoute.get('/:userId', (req, res) => {

  let userId = { userId: req.query.userId };
 
  meetingModel.find(userId)   
      .then(data => {
          console.log('Meetings', data)
          res.status(200).json(data);
      })
       .catch(error => console.log(error));
})




meetingRoute.post('/', (req, res) => {

    // let reqBodyKeys = Object.keys(req.body);
    // let meetingData = {};
    // reqBodyKeys.forEach(element => {
    //   meetingData[element] = req.body[element];
    // });

   let meetingData = getPostData( req );

   let user = new meetingModel(meetingData);  

    user.save()
      .then(data => {
          console.log('saved', data);
          res.status(200).json(data)
      })
        .catch( error => {
            console.log(error);
            res.status(400).json({ error })
        });
});





meetingRoute.put('/:meetingId', (req, res) => {
 
    saveUpdatedData(req, meetingModel, req.params.meetingId)
    .then( data => {
      console.log(data);
      res.status(200).json(data)
    })
     .catch( error => {
        console.log(error);
        res.status(400).json({ error })
     });
});




meetingRoute.delete('/:meetingId', (req, res) => {

    meetingModel.findByIdAndDelete(req.params.meetingId)
     .then(data => {
        console.log('data - doc', data);
        res.status(200).json(data)
     })
       .catch(error => {
        res.status(400).json({error});
       })
   
});


export default meetingRoute;