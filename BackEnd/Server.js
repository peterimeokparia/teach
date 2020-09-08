import express from 'express';
import multer from 'multer';
import http from 'http';
import cors from 'cors';
import fs, { readSync } from 'fs';
import fse from 'fs-extra';
import path from 'path';
import replaceExt from 'replace-ext';
import axios from 'axios';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import courseRoute from './Routes/courseRoute.js'
import lessonRoute from './Routes/lessonRoute.js'
import userRoute from './Routes/userRoute.js'
import meetingRoute from './Routes/meetingRoute.js'
import emailRoute from './Routes/emailRoute.js'


//https://dev.to/pacheco/my-fullstack-setup-node-js-react-js-and-mongodb-2a4k


const app = express();
const server = http.createServer(app);

app.use('/static', express.static('public/videos'))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use('/courses', courseRoute);

app.use('/lessons', lessonRoute);

app.use('/users', userRoute);

app.use('/meetings', meetingRoute);

app.use('/emails', emailRoute)


mongoose.connect('mongodb+srv://dbuser:dbuser2020@cluster0.8heal.mongodb.net/teach?retryWrites=true&w=majority', {
   useNewUrlParser: true, 
   useUnifiedTopology: true,
   useCreateIndex: true
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});



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
 
         let lessonUrl = `http://localhost:9005/lessons?_id=${request?.file?.originalname}`;
         let videoUrl = `http://localhost:3000/videos/${videoFileName}`;
         let lessonVideoAndMetaData = `http://localhost:9005/lessons/${request?.file?.originalname}`;


          getContent(lessonUrl)
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
     
   
        let lessonUrl = `http://localhost:9005/lessons?_id=${request.body?.fileName}`;
        let lessonMetaData = `http://localhost:9005/lessons/${request.body?.fileName}`;

        
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

