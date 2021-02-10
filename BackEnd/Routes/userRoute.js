import express from 'express';

import bcrypt from 'bcrypt';

import userModel from '../Model/userModel.js';

import {
getPostData,      
saveUpdatedData,
saveUpdateUserOnLogin,
resetUserPassword   
} from '../Helpers/storageHelper.js';



const userRoute = express.Router();


userRoute.get('/', (req, res) => {
 
    userModel.find({ })
        .then(data => {

            console.log('Users Users', data);
            res.status(200).json(data);
        })
         .catch(error => { 

           console.log(error);
           res.status(400).json({ error }); 
        });
});





userRoute.get('/user', (req, res) => {

  let id = { _id: req.query.id };
 
  userModel.findById( id )   
      .then(data => {

        console.log('Users Users', data)
        return res.status(200).json(data);
      })
       .catch(error =>{ 
         
        console.log(error);
        return res.status(400).json({ error }); 
      });
});





userRoute.get('/user/byEmail', (req, res) => {

  let userEmail = { email: req.query.email };

  console.log('userEmail@@@', userEmail);
 
  userModel.find(userEmail)   
      .then(data => {

          console.log('Users Users', data)
          res.status(200).json(data);
      })
       .catch(error => { 

         console.log(error);
         res.status(400).json({ error })
      });
})




userRoute.get('/files', (req, res) => {

  userModel.find({ _id: req.query._id })
      .then(data => {

          console.log('users users files files', data)
          res.status(200).json(data);
      })
       .catch(error => { 

         console.log(error);
         res.status(400).json({ error });
      });
});





userRoute.post('/', (req, res) => {

   let userData = getPostData( req ); 

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





userRoute.post('/register', async (req, res) => {


let userData = getPostData( req ); 

  const salt = await bcrypt.genSalt();

    userData = {
      ...userData,
      email: userData.email.toLowerCase(),
      password: await bcrypt.hash( userData?.password, salt )
  }

  userModel.find( { email: req.body.email } )
   .then( resp => { resp 

        if ( resp?.length > 0 ) {

            return res.status(400).json({msg: "An account with this email address already exists."});
        }
      
    })
    .catch( err => { 
    
        if ( err ) {

          return res.status(400).json({ msg: err.message });
        }
    })


      try {
        
          let user = new userModel(userData);  

          let savedUserData =  await user.save();

          if ( savedUserData ) {

              return res.status(200).json(savedUserData);
          }

      } catch (error) {

          return res.status(400).json({ msg: error.message });
      }
  
});





userRoute.put('/reset/:userId', async (req, res) => {

  console.log('in reset in reset', req.params.userId)
 
   resetUserPassword(req, res, userModel, req.params.userId)
    .then( data => {
      console.log('SUCCESS SUCCESS resetUserPassword', data);
      return res.status(200).json(data)
    })
     .catch( error => {

        console.log(error);
        return res.status(400).json({ error })
     });
});







userRoute.put('/login/:userId', async (req, res) => {

   saveUpdateUserOnLogin(req, res, userModel, req.params.userId)
    .then( data => {
      return res.status(200).json(data)
    })
     .catch( error => {
        return res.status(400).json({ error })
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