import express from 'express';

import multer from 'multer';

import { 
sendMetaData, 
getContent,
getVideoFileMeta,
videoObject,
sendResponseToStorage,
url } from '../Helpers/storageHelper.js';



const videoRoute = express.Router();

  let backeEndServerRoute, videoFileName, videoMeta;

  const storage = multer.diskStorage({ 
   destination: function(req, file, cb){ 
      cb (null, '../public/videos/');     
   }, 
    
   filename: function(req, file, cb){
      videoMeta = getVideoFileMeta( req );
      videoFileName = videoMeta?.videoFileName;
      backeEndServerRoute = videoMeta?.backendServerRoute;
      cb(null, videoFileName );
   }
});




const uploadVideo = multer({ storage });

 videoRoute.post('/', uploadVideo.single('video'), ( request, response, next ) => {

   if ( ! request?.file ) { 

      return next( new Error( 'pls upload a file' ) );

   } else {

     console.log('uploading');

     let videoConfig = videoObject( backeEndServerRoute, videoMeta, videoFileName );
 
      getContent( videoConfig.url )
       .then( resp  =>  {
              sendResponseToStorage( resp, videoMeta, videoConfig );      
        })
          .catch( err => { console.log(err)}) 
   }  
   return response.end().send({data: resp.data[0], videoUrl: videoConfig.videoUrl })
});


export default videoRoute;