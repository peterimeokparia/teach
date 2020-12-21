import express from 'express';
import multer from 'multer';
import { sendMetaData, getContent } from '../Helpers/storageHelpers.js';


const videoRoute = express.Router();

const BackeEndServerLessonPrefix = "http://localhost:9005/api/v1/lessons";
const frontEndServerPrefix = "http://localhost:3000"; 


  let videoFileName;
  
  const storage = multer.diskStorage({ 

   destination: function(req, file, cb){ 
      
      cb (null, '../public/videos/'); 
          
   }, 
    
    
   filename: function(req, file, cb){

      videoFileName = `LessonVideo_${Date.now()}_${req?.body?.courseId}_${req?.body?.id}_${Math.floor(Math.random() * Math.floor(9000))}.webm`;
      
         cb(null, `${videoFileName}` );
   }

});



      
const uploadVideo = multer({ storage });

  videoRoute.post('/', uploadVideo.single('video'), ( request, response, next ) => {

   if ( ! request?.file ) { 

      return next( new Error( 'pls upload a file' ) );

   } else {

         console.log('uploading');
         console.log('request?.file?.originalname request?.file?.originalname', request?.file?.originalname);

        let lessonUrl = BackeEndServerLessonPrefix + `/videos?_id=${request?.file?.originalname}`;
        let videoUrl = frontEndServerPrefix + `/videos/${videoFileName}`;
        let lessonVideoAndMetaData = BackeEndServerLessonPrefix + `/${request?.file?.originalname}`;

         getContent( lessonUrl )
          .then( resp  =>  {

             console.log('resp resp resp', resp);

           sendMetaData(lessonVideoAndMetaData, { 
                 ...resp.data[0],
                 videoUrl 
             });      
          })
          .catch( err => { console.log(err)}) 
   }
  
    response.send(request?.file)

    return response.end();
});




export default videoRoute;