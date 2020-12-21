import express from 'express';
import sessionModel from '../Model/sessionModel.js';
import { saveUpdatedData } from './lessonRoute.js';


const sessionRoute = express.Router();

 sessionRoute.get('/', (req, res) => {
 
  sessionModel.find({ })
        .then(data => {
            console.log('Sessions', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
})


sessionRoute.get('/:sessionId', (req, res) => {

  let sessionId = { _id: req.query.sessionId };
 
  sessionModel.findById( sessionId )   
      .then(data => {
          console.log('Sessions', data)
          res.status(200).json(data);
      })
       .catch(error => console.log(error));
})



sessionRoute.get('/:userId', (req, res) => {

  let userId = { userId: req.query.userId };
 
  sessionModel.find(userId)   
      .then(data => {
          console.log('Sessions', data)
          res.status(200).json(data);
      })
       .catch(error => console.log(error));
})



sessionRoute.post('/', (req, res) => {

  console.log('...saving session', req?.body );

    let reqBodyKeys = Object.keys(req.body);
    let sessionData = {};

    reqBodyKeys.forEach(element => {
        
      sessionData[element] = req.body[element];

    });

   let session = new sessionModel(sessionData);  

   session.save()
      .then(data => {
          console.log('...saving session', data);
          res.status(200).json(data)
      })
        .catch( error => {
            console.log(error);
            res.status(400).json({ error })
        });
});





sessionRoute.put('/:sessionId', (req, res) => {
 
    saveUpdatedData(req, sessionModel, req.params.sessionId)
    .then( data => {
      console.log(data);
      res.status(200).json(data)
    })
     .catch( error => {
        console.log(error);
        res.status(400).json({ error })
     });
});




sessionRoute.delete('/:sessionId', (req, res) => {

  sessionModel.findByIdAndDelete(req.params.sessionId)
     .then(data => {
        console.log('data - doc', data);
        res.status(200).json(data)
     })
       .catch(error => {
        res.status(400).json({error});
       })
   
});


export default sessionRoute;