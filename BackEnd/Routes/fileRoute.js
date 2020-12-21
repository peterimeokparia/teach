import express from 'express';
import multer from 'multer';
import fs, { readSync } from 'fs';
import { sendMetaData, getContent } from '../Helpers/storageHelpers.js';

const fileRoute = express.Router();

const BackeEndServerLessonPrefix = "http://localhost:9005/api/v1";
const frontEndServerPrefix = "http://localhost:3000"; 


let fileNames, files = [];
const fileStorage = multer.diskStorage({ 

    destination: function(req, file, cb){ 

      cb (null, '../public/files/'); 
          
    }, filename: function(req, file, cb){

       fileNames = Date.now() + '-' + file.originalname;
  
       files.push( frontEndServerPrefix + `/files/${fileNames}` )  

          cb(null,  fileNames );

      }
})




      
const uploadFile = multer({ storage: fileStorage }).array('file');


fileRoute.post('/',  ( request, response ) => {

   uploadFile(request, response, ( err ) => {
    
     if (err instanceof multer.MulterError ){

        return response.status( 200 ).json( err );

     } else if ( err ) {

         return response.status( 500 ).json( err ); 
     }
     
   
       let teachObject = {
          objectUrl: BackeEndServerLessonPrefix + `/${request.body?.teachObjectName}/files?_id=${request.body?.fileName}`,
          objectMetaData: BackeEndServerLessonPrefix + `/${request.body?.teachObjectName}/${request.body?.fileName}`
       } 
       
       
      if ( teachObject.objectMetaData ) {

         getContent( teachObject.objectUrl )
         .then( resp  =>  {
         
         if ( resp?.data[0]?.files ){
               
            resp?.data[0]?.files.forEach( file => {

               files.push( file );
            });
         }

         sendMetaData( teachObject.objectMetaData, {          
               ...resp?.data[0],
               files: [ ...files ]
            });
            
            files = [];
         })
         .catch( err => { console.log(err)});
      }

       return response.status( 200 ).send( request?.file );   
  });

});






fileRoute.get('/delete',  ( request, response) => {

   if ( ! request?.query.fileName ){

      return  response.status(400).json({message: "no filename"});

   } else {


         fs.readdir('../public/files/', ( err, files) => {   
           
           files?.forEach( file => { 
             
             if (request.query?.fileName.includes(file)) {

                  fs.unlink(`../public/files/${request?.query?.fileName}`, ( err ) => {

                   if ( err ) {
          
                      console.log('error', err );
          
                      return response.status(400).json({message: "unable to delete file"});
                   }

                   return response.status(200).json({message: "file deleted successfully"});
                }); 
            }

           });

         })
     }
})




export default fileRoute;