import express from 'express';

import multer from 'multer';

import { 
sendMetaData, 
getContent,
getVideoFileMeta,
videoObject,
sendResponseToStorage,
url } from '../helpers/storageHelper.js';

import { 
getLogObject,
handleBackEndLogs } from '../helpers/logHelper.js';

import { 
verifyRoute,
logRouteInfo } from '../middleWare/index.js'; 

const videoRoute = express.Router();
videoRoute.use(logRouteInfo);
const logs = getLogObject();

  let backeEndServerRoute, videoFileName, videoMeta;

  const storage = multer.diskStorage({ 
   destination: function(req, file, cb){ 
      cb (null, '../../public/videos/');     
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
   let responseWithDataToSend, videoConfigData;

   if ( ! request?.file ) { 
      return next( new Error( 'pls upload a file' ) );  
   } else {
     let videoConfig = videoObject( backeEndServerRoute, videoMeta, videoFileName );
      getContent( videoConfig.url )
       .then( resp  =>  {
            sendResponseToStorage( resp, videoMeta, videoConfig ); 
            responseWithDataToSend =  resp, videoConfigData = videoConfig;    
       })
       .catch( err => { 
          console.log( err );
      }) 
   }  
   return response.send({data: responseWithDataToSend?.data[0], videoUrl: videoConfigData?.videoUrl });
});

export default videoRoute;