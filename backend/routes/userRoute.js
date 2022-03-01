import {
getPostData,      
saveUpdatedData,
saveUpdateUserOnLogin,
verifyUser,
resetUserPassword } from '../helpers/storageHelper.js';

import { 
USERROUTE,
handleBackEndLogs } from '../helpers/logHelper.js';

import express from 'express';
import bcrypt from 'bcrypt';
import userModel from '../model/userModel.js';

import { 
verifyRoute,
logRouteInfo,
paginatedResults } from '../middleWare/index.js';

const userRoute = express.Router();

userRoute.use(logRouteInfo);

userRoute.get('/', (req, res) => {
  userModel.find({ })
    .then(data => {
      return res.status(200).json(data);;
    })
    .catch( error => {
      handleBackEndLogs(USERROUTE, error );
      return res.status(400).json({ error });
    });
});

userRoute.get('/user', (req, res) => {
  let id = { _id: req.query.id };
  userModel.findById( id )   
  .then(data => {
    return res.status(200).json(data);
  })
  .catch( error => {
    handleBackEndLogs(USERROUTE, error );
    return res.status(400).json({ error });
  });
});

userRoute.get('/user/byEmail', (req, res) => {
  let userCredentials = JSON.parse(req?.query?.email)
  let userEmail = { email: userCredentials.email };
  userModel.find(userEmail)   
  .then(data => {
    let isUserVerified = verifyUser( data[0], userCredentials.password );
    if ( !isUserVerified  ) {
      return res.status(400).json({ error, message: "The password entered is incorrect." })
    }
      return res.status(200).json(data);
    })
  .catch( error => {
    handleBackEndLogs(USERROUTE, error );
    return res.status(400).json({ error });
  });
})

userRoute.get('/files', (req, res) => {
  userModel.find({ _id: req.query._id })
  .then(data => {
    return res.status(200).json(data);
  })
  .catch( error => {
    handleBackEndLogs(USERROUTE, error );
    return res.status(400).json({ error });
  });
});

//userRoute.use(verifyRoute);
userRoute.post('/', (req, res) => {
  let userData = getPostData( req ); 
  let user = new userModel(userData);  
  user.save()
  .then(data => {
    return res.status(200).json(data);
  })
  .catch( error => {
    console.log( error );
    handleBackEndLogs(USERROUTE, error );
    return res.status(400).json({ error });
  });
});

userRoute.post('/register', async (req, res) => {
  let userData = getPostData( req ); 

  if( ! userData || !userData?.password || !userData?.email ){ return res.status(400).json({msg: "Please provide a valid email address & password."});}

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
        handleBackEndLogs(USERROUTE, error );
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
        handleBackEndLogs(USERROUTE, error );
        return res.status(400).json({ msg: error.message });
    }
});

userRoute.get('/pagedRoute', paginatedResults( userModel, 'userId' ), (req, res) => {
  res.json(res?.paginatedResults);
});

userRoute.put('/reset/:userId', async (req, res) => {
   resetUserPassword(req, res, userModel, req.params.userId)
    .then( data => {
      return res.status(200).json(data);
    })
    .catch( error => {
      handleBackEndLogs(USERROUTE, error );
      return res.status(400).json({ error })
    });
});

userRoute.put('/login/:userId', async (req, res) => {
   saveUpdateUserOnLogin(req, res, userModel, req.params.userId)
    .then( data => {
      return res.status(200).json(data);
    })
    .catch( error => {
      handleBackEndLogs(USERROUTE, error );
      return res.status(400).json({ error });
    });
});

userRoute.put('/:userId', (req, res) => {
  console.log(req?.body);
  saveUpdatedData(req, userModel, req.params.userId)
  .then( data => {
    return res.status(200).json(data);
  })
  .catch( error => {
    handleBackEndLogs(USERROUTE, error );
    return res.status(400).json({ error });
  });
});

userRoute.delete('/:userId', (req, res) => {
  userModel.findByIdAndDelete(req.params.userId)
    .then(data => {
      return res.status(200).json(data);
    })
    .catch( error => {
      handleBackEndLogs(USERROUTE, error );
      return res.status(400).json({ error });
    }); 
});

export default userRoute;