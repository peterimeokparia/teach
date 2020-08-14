import express from 'express';
import multer from 'multer';
import http from 'http';
import cors from 'cors';
import fs, { readSync } from 'fs';
import fse from 'fs-extra';
import path from 'path';
import replaceExt from 'replace-ext';
import axios from 'axios';
const app = express();
const server = http.createServer(app);
app.use('/static', express.static('public/videos'))
app.use(cors());




let videoFileName;

const storage = multer.diskStorage({ 

    destination: function(req, file, cb){ 
      
      cb (null, '../public/videos/'); 
          
    }, filename: function(req, file, cb){

      videoFileName = `LessonVideo_${Date.now()}_${req?.body?.courseId}_${req?.body?.id}_${Math.floor(Math.random() * Math.floor(9000))}.webm`;
      
          cb(null, `${videoFileName}` );
      }
    })

      
const upload = multer({ storage: storage });
 
app.get('/', (req, res) => {

    res.send('hello');
});


app.post('/uploads', upload.single('video'), ( request, response, next ) => {

    if ( !request?.file ) { 

       return next(new Error('pls upload a file'))

    } else {

          console.log('uploading');
 
          let lessonUrl = `http://localhost:3000/api/lessons?id=${parseInt(request?.file?.originalname, 10)}`;
          let videoUrl = `http://localhost:3000/videos/${videoFileName}`;
          let lessonVideoAndMetaData = `http://localhost:3000/api/lessons/${parseInt(request?.file?.originalname, 10)}`;


          getContent(lessonUrl)
           .then( resp  =>  {
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



let fileNames;
let files = [];
const fileStorage = multer.diskStorage({ 

    destination: function(req, file, cb){ 
      
      cb (null, '../public/files/'); 
          
    }, filename: function(req, file, cb){

       fileNames = Date.now() + '-' + file.originalname;
  
       files.push(`http://localhost:3000/files/${fileNames}`)  

          cb(null,  fileNames );

      }
    })


      
const fileUpload = multer({ storage: fileStorage }).array('file');

app.post('/fileUploads',  ( request, response ) => {

  fileUpload(request, response, ( err ) => {
    
     if (err instanceof multer.MulterError ){

        return response.status( 500 ).json( err );

     } else if ( err ) {

         return response.status( 500 ).json( err ); 
     }
     
   
        let lessonUrl = `http://localhost:3000/api/lessons?id=${parseInt(request.body?.fileName, 10)}`;
        let lessonMetaData = `http://localhost:3000/api/lessons/${parseInt(request.body?.fileName, 10)}`;
         
         if ( lessonMetaData ) {

          getContent( lessonUrl )
          .then( resp  =>  {
          
            if ( resp?.data[0]?.files ){
                
               resp?.data[0]?.files.forEach( file => {

                files.push( file );

               });

            }

            sendMetaData(lessonMetaData, {          
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




app.post('/delete', upload.single('delete'), ( request, response, next) => {

      if ( request?.file ){

         return next( new Error("no file"))

      } else {

    
        console.log('request.file?.filename', request.body?.delete)
   
            fs.readdir('../public/files/', ( err, files) => {   
              
              files?.forEach( file => { 
                
                if (request.body?.delete.includes(file)) {

                    fs.unlink(`../public/files/${request?.body?.delete.split('/files/')[1]}`, ( err ) => {
  
                      if ( err ) {
             
                         console.log('error', err );
             
                         return;
                      }
                   }); 
               }
 
              });

            })
        }
})

 


 
const localPort = 9005;

  server.listen(localPort, () => {

     console.log('listening on', localPort);

});




const sendMetaData = ( url, metaData ) => {
   updateContent( url, metaData );
}



function getContent( url ){
  return axios.get( url );
}



function updateContent( url, data = {}  ){

  return axios.put(url, data)
   .then(resp => {console.log(resp)})
    .catch(err => { console.log(err) })

}


   // const res = axios.post('http://localhost:3000/api/uploads', {
        //     videoMetadata: { ...request.file, referer: request.headers.referer} 
        // }); 