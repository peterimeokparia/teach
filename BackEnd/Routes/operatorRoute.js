import express from 'express';

import operatorModel from '../Model/operatorModel.js';

import {
getPostData,      
saveUpdatedData   
} from '../Helpers/storageHelper.js';



const operatorRoute = express.Router();


operatorRoute.get('/', (req, res) => {
 
  operatorModel.find({ })
        .then(data => {
            console.log('Users Users', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
})




operatorRoute.get('/operator', (req, res) => {

  let userEmail = { email: req.query.email };

  console.log('userEmail@@@', userEmail);
 
  operatorModel.find(userEmail)   
      .then(data => {
          console.log('Users Users', data)
          res.status(200).json(data);
      })
       .catch(error => console.log(error));
})





operatorRoute.get('/files', (req, res) => {

  operatorModel.find({ _id: req.query._id })
      .then(data => {
          console.log('users users', data)
          res.status(200).json(data);
      })
       .catch(error => console.log(error));
});





operatorRoute.post('/', (req, res) => {

    // let reqBodyKeys = Object.keys(req.body);
    // let operatorData = {};

    // reqBodyKeys.forEach(element => {
        
    //   operatorData[element] = req.body[element];
    // });

    let operatorData = getPostData( req );

    let operator = new operatorModel(operatorData);  

    operator.save()
      .then(data => {
          console.log('saved', data);
          res.status(200).json(data)
      })
        .catch( error => {
            console.log(error);
            res.status(400).json({ error })
      });
});





operatorRoute.put('/:operatorId', (req, res) => {
 
  saveUpdatedData(req, operatorModel, req.params.operatorId)
    .then( data => {
      console.log(data);
      res.status(200).json(data)
    })
     .catch( error => {
        console.log(error);
        res.status(400).json({ error })
     });
});






operatorRoute.delete('/:operatorId', (req, res) => {

  operatorModel.findByIdAndDelete(req.params.operatorId)
     .then(data => {
        console.log('data - doc', data);
        res.status(200).json(data)
     })
       .catch(error => {
        res.status(400).json({error});
       })   
});




export default operatorRoute;