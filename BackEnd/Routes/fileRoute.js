import express from 'express';

import multer from 'multer';

import fs from 'fs';

import { 
sendMetaData, 
getContent,
url } from '../Helpers/storageHelper.js';

const fileRoute = express.Router();

let fileNames, files = [];

const fileStorage = multer.diskStorage({ 

destination: function(req, file, cb) { 
   cb (null, '../public/files/'); 
   }, filename: function(req, file, cb){
   console.log('file file file');
   console.log(file);
   fileNames =  (req.body?.name) ? req.body?.name : file.originalname;
      files.push( url.frontEndServerPrefix + `/files/${fileNames}` )  
         cb(null,  fileNames );           
   }
});

const uploadFile = multer({ storage: fileStorage }).array('file');
fileRoute.post('/',  ( request, response ) => {
   uploadFile(request, response, ( err ) => {
      handleFileUpload( request, response, err );
      return response.status( 200 ).send( request?.file );   
  });
});

fileRoute.post('/avatar',  ( request, response ) => {
   uploadFile(request, response, ( err ) => {
      let updatedUser = handleFileUpload( request, response, err )
      return response.status( 200 ).send( updatedUser );  
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
});

function checkForMultarErrors(err, response){
   if ( err instanceof multer.MulterError ){
      return response.status( 200 ).json( err );
   } else if ( err ) {
      return response.status( 500 ).json( err ); 
   }
};

function handleExistingFiles( existingFiles ){

      if ( existingFiles ) {
                     
         existingFiles.forEach( file => {

         files.push( file );
      });
   }
};

function teachObject( request ) {
 return {
      objectUrl: url.BackeEndServerLessonPrefix + `/${request.body?.teachObjectName}/files?_id=${request.body?.fileName}`,
      objectMetaData: url.BackeEndServerLessonPrefix + `/${request.body?.teachObjectName}/${request.body?.fileName}`
   }    
};

function handleFileUpload( request, response, err ){
   checkForMultarErrors( err, response );
   let teachConfig = teachObject( request );
 
   if ( teachConfig.objectMetaData ) {
      getContent( teachConfig.objectUrl )
      .then( user  =>  { 
      handleExistingFiles( user?.data[0]?.files );
      handleFrontEndUpdate( request, teachConfig, user, files )
         files = [];
         console.log('@@@ in handleFileUpload user', user)
         return user;
      })
      .catch( error => { console.log( error ) 
         onsole.log('@@@ in handleFileUpload error', error)
         return error;
      });
   }
};

function handleFrontEndUpdate( request, teachConfig, user, files ){
   switch ( request.body?.typeOfUpload ) {

      case 'userlessonfiles':
         console.log('in userlessonfiles');
         sendMetaData( teachConfig.objectMetaData, {          
            ...user?.data[0],
            files: [ ...files ]
         });
         break;

      case 'useravatarbiourl':
         console.log('in useravatarbiourl');
         sendMetaData( teachConfig.objectMetaData, {          
            ...user?.data[0],
            avatarUrl: files[0],
            files: [ ...files ]
         });
         break;

      default:
         break;
   };
};

export default fileRoute;