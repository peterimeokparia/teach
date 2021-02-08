import express from 'express';

import classRoomModel from '../Model/classRoomModel.js';

import {
getPostData,    
saveUpdatedData   
} from '../Helpers/storageHelper.js';


const classRoomRoute = express.Router();


classRoomRoute.get('/', (req, res) => {
 
    classRoomModel.find({ })
        .then(data => {
            console.log('ClassRooms ClassRooms Test', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
})





classRoomRoute.post('/', (req, res) => {

    // let classRoomData = {
    //     name: req.body.name, 
    //     description: req.body.description,
    //     users: req.body.users, 
    //     createdBy: req.body.createdBy,
    //     operatorId: req.body.operatorId
    // };

    let classRoomData = getPostData( req );
 
    let classRooms = new classRoomModel(classRoomData);  

    classRooms.save()
        .then(data => {
        console.log('saved', data);
        res.status(200).json(data)})
        .catch( error => console.log(error) )
});




classRoomRoute.put('/:classRoomId', (req, res) => {
 
    saveUpdatedData(req, classRoomModel, req.params.classRoomId)
    .then( data => {
      console.log(data);
      res.status(200).json(data)
    })
     .catch( error => {
        console.log(error);
        res.status(400).json({ error })
     });
});




classRoomRoute.delete('/:classRoomId', (req, res) => {

    classRoomModel.findByIdAndDelete(req.params.classRoomId)
     .then(data => {
        console.log('data - doc', data);
        res.status(200).json(data)
     })
       .catch(error => {
        res.status(400).json({error});
       })
   
});


export default classRoomRoute;