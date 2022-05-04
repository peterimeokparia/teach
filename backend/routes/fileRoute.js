import express from 'express';
import multer from 'multer';
import fs from 'fs';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js';

const fileRoute = express.Router();

let fileNames, fileCollection=[];

const fileStorage = multer.diskStorage({ 
   destination: function(req, file, cb) {
      fs.readdir('../../public/files/', ( err, files) => {   
         fileCollection = files;
      });
      // cb (null, '../public/files/'); 
      cb (null, '../../public/files/'); 
   }, 
   filename: function(req, file, cb){
      fileNames = file.originalname; 
      cb(null,  fileNames );           
   }
});

fileRoute.use(logRouteInfo);

const uploadFile = multer({ storage: fileStorage }).array('file');

fileRoute.post('/',  ( request, response ) => {
   uploadFile(request, response, ( err ) => {  
   return response.status( 200 ).send( fileNames );   
  });
});

fileRoute.post('/editor',  ( request, response ) => {

   fs.readdir('../../public/files/', ( err, files) => {   
      
      fileCollection = files;

      console.log('files');
      console.log( JSON.stringify(files) );

      console.log('file name');
      console.log( request?.query?.fileName);

      if ( !fileCollection?.includes( request?.query?.fileName ) ) {

         console.log('...uploading file')

         uploadFile(request, response, ( err ) => {  
            return response.status( 200 ).json({file: fileNames, fileCollection }); 
         });

      } else {

         return response.status( 200 ).json({file: fileNames, fileCollection }); 
      }
      
   });

});

fileRoute.post('/avatar',  ( request, response ) => {
   uploadFile(request, response, ( err ) => {
      return response.status( 200 ).send( request?.file );  
  });
});

fileRoute.get('/delete',  ( request, response) => {
   console.log(request?.query?.fileName)
   if ( ! request?.query.fileName ){
      return  response.status(400).json({message: "no filename"});
   } else {
      fs.readdir('../../public/files/', ( err, files) => {   
         files?.forEach( file => {   
            if (request.query?.fileName.includes(file)) {
               fs.unlink(`../../public/files/${request?.query?.fileName}`, ( err ) => {
                  // fs.unlink(`../../public/files/27177.jpg`, ( err ) => {
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
} );

export default fileRoute;