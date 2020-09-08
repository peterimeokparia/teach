import express from 'express';
import userModel from '../Model/userModel.js';
import { saveUpdatedData } from './lessonRoute.js';


const userRoute = express.Router();

userRoute.get('/', (req, res) => {
 
    userModel.find({ })
        .then(data => {
            console.log('Users Users', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
})




userRoute.get('/user', (req, res) => {

  let userName = { username: req.query.username };
 
  userModel.find(userName)   
      .then(data => {
          console.log('Users Users', data)
          res.status(200).json(data);
      })
       .catch(error => console.log(error));
})




userRoute.post('/', (req, res) => {

    let reqBodyKeys = Object.keys(req.body);
    let userData = {};

    reqBodyKeys.forEach(element => {
        
      userData[element] = req.body[element];

    });

   let user = new userModel(userData);  

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





userRoute.put('/:userId', (req, res) => {
 
    saveUpdatedData(req, userModel, req.params.userId)
    .then( data => {
      console.log(data);
      res.status(200).json(data)
    })
     .catch( error => {
        console.log(error);
        res.status(400).json({ error })
     });
});



userRoute.put('/buy/:userId', (req, res) => {
 
  saveUpdatedData(req, userModel, req.params.userId)
  .then( data => {
    console.log('buy data', data);
    res.status(200).json(data)
  })
   .catch( error => {
      console.log(error);
      res.status(400).json({ error })
   });
});



userRoute.delete('/:userId', (req, res) => {

    userModel.findByIdAndDelete(req.params.userId)
     .then(data => {
        console.log('data - doc', data);
        res.status(200).json(data)
     })
       .catch(error => {
        res.status(400).json({error});
       })
   
});


export default userRoute;