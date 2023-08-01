const express = require('express');

const multer = require('multer');

const { 
sendMetaData, 
getContent,
getVideoFileMeta,
videoObject,
sendResponseToStorage,
url } = require('../helpers/storageHelper.js');

const { 
getLogObject,
handleBackEndLogs } = require('../helpers/logHelper.js');

const { 
verifyRoute,
logRouteInfo } = require('../middleWare/index.js'); 

const videoRoute = express.Router();

videoRoute.use(logRouteInfo);

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

module.exports = videoRoute;