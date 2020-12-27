import express from 'express';
import lessonModel from '../Model/lessonModel.js';
import mongoose from 'mongoose';


const lessonRoute = express.Router();

lessonRoute.get('/', (req, res) => {
 
    lessonModel.find({ courseId: req.query.courseId })
        .then(data => {
            console.log('Lessons Lessons', data)
            res.status(200).json(data);
        })
         .catch(error => console.log(error));
 });


 
 lessonRoute.get('/videos', (req, res) => {

   console.log( 'req.query._id req.query._id req.query._id', req.query._id)
 
   lessonModel.find({ _id: req.query._id })
       .then(data => {
           console.log('Lessons Lessons', data)
           res.status(200).json(data);
       })
        .catch(error => console.log(error));
});


 
 lessonRoute.get('/files', (req, res) => {
 
   lessonModel.find({ _id: req.query._id })
       .then(data => {
           console.log('Lessons Lessons', data)
           res.status(200).json(data);
       })
        .catch(error => console.log(error));
});



 lessonRoute.post('/', (req, res) => {
 
       let lessonData = {
              title: req.body.title, 
              courseId:req.body.courseId, 
              markDown:req.body.markDown,
              videoUrl:req.body.videoUrl,
              files:req.body.files,
              lessonDate:req.body.lessonDate
       }
 
       let lessons = new lessonModel(lessonData);

       lessons.save()
       .then(data => {
          console.log('saved', data);
          res.status(200).json(data)})
       .catch( error => console.log(error) ); 
      
 });




 lessonRoute.put('/:lessonId', (req, res) => {
 
       saveUpdatedData(req, lessonModel, req.params.lessonId)
       .then( data => {
         console.log(data);
         res.status(200).json(data)
       })
        .catch( error => {
           console.log(error);
           res.status(400).json({ error })
        });
 });





 lessonRoute.delete('/:lessonId', (req, res) => {
  
    lessonModel.remove({ _id: req.params.lessonId }, ( error, result ) => {
         
            if ( error ) {
               res.status(400).send(error);
            }
            else {
               res.status(200).json(result);
            }

    });

});




export async function saveUpdatedData( req, model, id ){

   try {

         const documentObjectToUpdate = await model.findById(mongoose.Types.ObjectId(id));

         let bodyData = Object.keys(req.body);

         bodyData.forEach(element => {
         
            let arrg = ['_id', '__v'];
            // let arrg = [ '_id' ];

            if ( !arrg.includes(element)  ) {
      
               console.log('PUT - saveUpdatedData',element);
            
               documentObjectToUpdate[element] = req.body[element] 
            }            
         });

         console.log(documentObjectToUpdate);
         return await documentObjectToUpdate.save();
      
   } catch ( error ) {

         console.log( error );
   }
    return;
 }


//test
 export async function updateFileData( req, model, id ){

   try {

         const documentObjectToUpdate = await model.findById(mongoose.Types.ObjectId(id));

         let bodyData = Object.keys(req.body);

         bodyData.forEach(element => {
         
            let arrg = ['_id', '__v'];
            // let arrg = [ '_id' ];

            if ( !arrg.includes(element)  ) {
      
               console.log('PUT - saveUpdatedData',element);
            
               documentObjectToUpdate[element] = req.body[element] 
            }            
         });

         console.log(documentObjectToUpdate);
         // return await documentObjectToUpdate.update(); 
         return await documentObjectToUpdate.update();
      
   } catch ( error ) {

         console.log( error );
   }
    return;
   
 }
 

 //https://masteringjs.io/tutorials/mongoose/update
 //https://masteringjs.io/tutorials/mongoose/save
 //https://stackoverflow.com/questions/41567319/getting-error-in-mongodb-cast-issue-for-valid-object-id/53139672#53139672
//https://stackoverflow.com/questions/17223517/mongoose-casterror-cast-to-objectid-failed-for-value-object-object-at-path
 export async function updatedData( req, model, id ){

   let bodyData = Object.keys(req.body);
   let tempObject = {};

   bodyData.forEach(element => {
         console.log(element);
   
         tempObject[element] = req.body[element] 
   });

   return await model.findOneAndUpdate( tempObject );
 }






 async function getDocumentObjectToUpdate( requestBody, model, id ){

   let bodyData = Object.keys(requestBody);
    
   const documentObjectToUpdate = await model.findById(id);

   bodyData.forEach(element => {
      console.log(element);

      documentObjectToUpdate[element] = req.body[element] 
   });
     
      console.log(documentObjectToUpdate); 

      return documentObjectToUpdate;
 }


export default lessonRoute;