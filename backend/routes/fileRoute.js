import express from 'express';
import multer from 'multer';
import fs from 'fs';

const fileRoute = express.Router();

let fileNames;

const fileStorage = multer.diskStorage({ 
   destination: function(req, file, cb) { 
      cb (null, '../../public/files/'); 
   }, 
   filename: function(req, file, cb){
      console.log('file file file');
      console.log(file);
      fileNames = file.originalname;  
      console.log( fileNames )   
      cb(null,  fileNames );           
   }
});

const uploadFile = multer({ storage: fileStorage }).array('file');

fileRoute.post('/',  ( request, response ) => {
   uploadFile(request, response, ( err ) => {
      return response.status( 200 ).send( request?.file );   
  });
});

fileRoute.post('/avatar',  ( request, response ) => {
   uploadFile(request, response, ( err ) => {
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
});


















// import { 
//    sendMetaData, 
//    getContent,
//    url } from '../Helpers/storageHelper.js';


// const fileStorage = multer.diskStorage({ 
//    destination: function(req, file, cb) { 
//       cb (null, '../../public/files/'); 
//    }, 
      
//    filename: function(req, file, cb){
//       console.log('file file file');
//       console.log(file);
//       fileNames = file.originalname;  
//       console.log( fileNames )   
//       cb(null,  fileNames );           
//    }
// });

// function checkForMultarErrors(err, response){
//    if ( err instanceof multer.MulterError ){
//       return response.status( 200 ).json( err );
//    } else if ( err ) {
//       return response.status( 500 ).json( err ); 
//    }
// };


// function handleExistingFiles( existingFiles ){
//       if ( existingFiles ) {              
//          existingFiles.forEach( file => {
//          files.push( file );
//       });
//    }
// };

// function teachObject( request ) {
//  return {
//       objectUrl: url.BackeEndServerLessonPrefix + `/${request.body?.teachObjectName}/files?_id=${request.body?.fileName}`,
//       objectMetaData: url.BackeEndServerLessonPrefix + `/${request.body?.teachObjectName}/${request.body?.fileName}`
//    }    
// };

// function handleFileUpload( request, response, err ){
//    checkForMultarErrors( err, response );
//    let teachConfig = teachObject( request );
 
//    if ( teachConfig.objectMetaData ) {
//       getContent( teachConfig.objectUrl )
//       .then( user  =>  { 
//       handleExistingFiles( user?.data[0]?.files );
//       handleFrontEndUpdate( request, teachConfig, user, files )
//          files = [];
//          console.log('@@@ in handleFileUpload user', user)
//          return user;
//       })
//       .catch( error => { console.log( error ) 
//          console.log('@@@ in handleFileUpload error', error)
//          return error;
//       });
//    }
// };


// function handleFrontEndUpdate( request, teachConfig, user, files ){
//    switch ( request.body?.typeOfUpload ) {

//       // case 'userlessonfiles':
//       //    console.log('in userlessonfiles');
//       //    sendMetaData( teachConfig.objectMetaData, {          
//       //       ...user?.data[0],
//       //       files: [ ...files ]
//       //    });
//       //    break;

//       // case 'useravatarbiourl':
//       //    console.log('in useravatarbiourl');
//       //    sendMetaData( teachConfig.objectMetaData, {          
//       //       ...user?.data[0],
//       //       avatarUrl: files[0],
//       //       files: [ ...files ]
//       //    });
//       //    break;

//       default:
//          break;
//    };
// };

// fileRoute.post('/avatar',  ( request, response ) => {
//    uploadFile(request, response, ( err ) => {
//       let updatedUser = handleFileUpload( request, response, err )
//       return response.status( 200 ).send( updatedUser );  
//   });
// });

// const uploadFile = multer({ storage: fileStorage }).array('file');
// fileRoute.post('/',  ( request, response ) => {
//    uploadFile(request, response, ( err ) => {
//     //handleFileUpload( request, response, err );
//       return response.status( 200 ).send( request?.file );   
//   });
// });

// filename: function(req, file, cb){
//    console.log('file file file');
//    console.log(file);
//     //cb(null,  req.body?.name ); 
//       // cb(null,  req.body?.name );  
//    // fileNames =  (req.body?.name) ? req.body?.name : file.originalname;
//    //    files.push( url.frontEndServerPrefix + `/files/${fileNames}` )  
//    console.log(`GET GET GET GET JET JET GET LIKE A JET-${file.originalname}`)
//    // fileNames = req.body?.name;  
//    fileNames = `${Date.now()}-${file.originalname}`;  
//    console.log( fileNames )   
//    cb(null,  fileNames );           
//    }
// });

// fileRoute.post('/', uploadFile, ( request, response, next ) => {
//    if ( ! request?.file ) {
//       return next( new Error( 'pls upload a file' ) );
//    } 
//    return response.status( 200 ).send( request?.file ); 
// //fileRoute.post('/',  ( request, response ) => {
//    // uploadFile(request, response, ( err ) => {
//     //handleFileUpload( request, response, err );
//       // return response.status( 200 ).send( request?.file );   
//   });

export default fileRoute;