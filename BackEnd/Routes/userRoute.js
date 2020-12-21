import express from 'express';
import userModel from '../Model/userModel.js';
import { saveUpdatedData, updatedData } from './lessonRoute.js';



const userRoute = express.Router();


userRoute.get('/', (req, res) => {
 
    userModel.find({ })
        .then(data => {
            console.log('Users Users', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
});





userRoute.get('/user', (req, res) => {

  let id = { _id: req.query.id };
 
  userModel.findById( id )   
      .then(data => {
          console.log('Users Users', data)
          res.status(200).json(data);
      })
       .catch(error => console.log(error));
});





userRoute.get('/user/byEmail', (req, res) => {

  let userEmail = { email: req.query.email };

  console.log('userEmail@@@', userEmail);
 
  userModel.find(userEmail)   
      .then(data => {
          console.log('Users Users', data)
          res.status(200).json(data);
      })
       .catch(error => console.log(error));
})




userRoute.get('/files', (req, res) => {

  userModel.find({ _id: req.query._id })
      .then(data => {
          console.log('users users', data)
          res.status(200).json(data);
      })
       .catch(error => console.log(error));
});





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



//https://stackoverflow.com/questions/56350530/performing-an-update-on-the-path-id-would-modify-the-immutable-field-id
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



//todo: purchase history
// userRoute.put('/buy/:userId', (req, res) => {
//   console.log('what is the user id what is the user id', req.params.userId);
//   updatedData(req, userModel, req.params.userId)
//   .then( data => {
//     console.log('buy data', data);
//     res.status(200).json(data)
//   })
//    .catch( error => {
//       console.log(error);
//       res.status(400).json({ error })
//    });
// });


export default userRoute;