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
        return res.status(200).json(data);
    })
    .catch(error => {
        return res.status(400).json({ error })
    });
})

meetingRoute.get('/meeting', (req, res) => {
  let id = { _id: req.query.meetingId };
  console.log(`get by meetingid @@@@@ @@@@@ iD: ${id}`)
  meetingModel.findById(id)   
      .then(data => {
        console.log('get by meetingid @@@@@ @@@@@')
        console.log(data)
        return res.status(200).json(data);
      })
       .catch(error => {
        return res.status(400).json({ error })
    });
});

meetingRoute.post('/', (req, res) => {
   let meetingData = getPostData( req );
   let user = new meetingModel(meetingData);  
    user.save()
      .then(data => {
       return res.status(200).json(data)
      })
        .catch( error => {
         return res.status(400).json({ error })
    });
});

meetingRoute.put('/:meetingId', (req, res) => {
    saveUpdatedData(req, meetingModel, req.params.meetingId)
    .then( data => {
        return res.status(200).json(data)
    })
     .catch( error => {
        return res.status(400).json({ error })
     });
});

meetingRoute.delete('/:meetingId', (req, res) => {
    meetingModel.findByIdAndDelete(req.params.meetingId)
     .then(data => {
      return res.status(200).json(data)
     })
       .catch(error => {
        return res.status(400).json({error})
       });
});

export default meetingRoute;