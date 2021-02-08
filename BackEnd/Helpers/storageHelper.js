import axios from 'axios';

import mongoose from 'mongoose';

import { Readable } from 'stream';

import fs from 'fs';



export const sendMetaData = ( url, metaData ) => {
   return updateContent( url, metaData );
 }
 

 
 export function getContent( url ){
  console.log('url url url', url)
   return axios.get( url );
 }
 

 
 export function updateContent( url, data = {}  ){
   return axios.put(url, data)
    .then(resp => {console.log(resp)})
     .catch(err => { console.log(err) })
 }




export function getPostData( req ) {
  let requestBodyParameters, requestBodyToPost = {};
  requestBodyParameters = Object.keys( req.body );
  requestBodyParameters.forEach(element => {
    requestBodyToPost[ element ] = req.body[ element ];
  });
  return requestBodyToPost;
} 




 export async function saveUpdatedData( req, model, id ){

  try {
        const documentObjectToUpdate = await model.findById(mongoose.Types.ObjectId(id));
        let bodyData = Object.keys(req.body);
         bodyData.forEach(element => {

           let arrg = ['_id', '__v'];
           // let arrg = [ '_id' ];

           if ( !arrg.includes(element)  ) {
              console.log('PUT - saveUpdatedData',element);   
              documentObjectToUpdate[element] = req.body[element] 
           }            
      });

        console.log(documentObjectToUpdate);
        return await documentObjectToUpdate.save();
     
  } catch ( error ) {
      console.log( error );
  }
   return;
}



export const getVideoFileMeta = ( request ) => {
   let requestData = { }

   let idData = JSON.parse( request?.body?.id );
   let data = JSON.parse( request?.body?.data );
   
   let id = idData.id;
   let prefix = idData?.videoNamePrefix;
   let externalId = idData?.externalId;

   console.log('id', id)
   console.log("data.metaData", data.metaData)
 
     switch (prefix) {
 
       case "LessonVideo":
       requestData = { 
         id, 
         prefix, 
         externalId, 
         backendServerRoute: "http://localhost:9005/api/v1/lessons", 
         videoFileName: `${prefix}_${Date.now()}_${externalId}_${id}_${Math.floor(Math.random() * Math.floor(9000))}.webm` 
       };  
       break;
 
       case "QuestionVideoMultipleChoiceInputFields":
       requestData = { 
         id, 
         prefix, 
         externalId, 
         backendServerRoute: "http://localhost:9005/api/v1/questions", 
         questionInputMeta: data.metaData,
         videoFileName: `${prefix}_${Date.now()}_${externalId}_${id}_${Math.floor(Math.random() * Math.floor(9000))}.webm`, 
       };    
       break;

       case "QuestionVideoMarkDownEditors":
       requestData = { 
         id, 
         prefix, 
         externalId, 
         backendServerRoute: "http://localhost:9005/api/v1/questions", 
         questionInputMeta: data.metaData,
         videoFileName: `${prefix}_${Date.now()}_${externalId}_${id}_${Math.floor(Math.random() * Math.floor(9000))}.webm`, 
       };    
       break;
       
       default:
         break;
     }
 
     return requestData; 
 }
 


 export function sendResponseToStorage( response, meta, config ){ 
      
  let videoUrl, markDownEditors, currentEditorId, currentFieldId;

  switch (meta.prefix) {

     case "LessonVideo":
     console.log('in LessonVideo');   
     videoUrl = config.videoUrl   
     sendMetaData(config.videoAndMetaData, { 
        ...response.data[0],
        videoUrl 
     }); 
     break;

     case "QuestionVideoMultipleChoiceInputFields":
     console.log('in QuestionVideoMultipleChoiceInputFields');   
     videoUrl = config.videoUrl   
     markDownEditors = response.data[0];
     currentFieldId = meta?.questionInputMeta?.inputFieldId;  

     markDownEditors.questions.
     find(question => question.questionNumber === meta?.questionInputMeta.currentQuestion?.questionNumber )
        .markDownEditorFormInputFields.find(field => field.questionNumber === meta?.questionInputMeta.currentQuestion?.questionNumber && 
        field?.id === currentFieldId).videoUrl = videoUrl;

     sendMetaData(config.videoAndMetaData, { 
        ...markDownEditors,
        videoUrl 
     }); 
     break;

     case "QuestionVideoMarkDownEditors":
     console.log('in QuestionVideoMarkDownEditors');     
     videoUrl = config.videoUrl     
     markDownEditors = response.data[0];
     currentEditorId = meta?.questionInputMeta?.inputFieldId;  

     markDownEditors.questions.
     find(question => question.questionNumber === meta?.questionInputMeta.currentQuestion?.questionNumber &&
        question.id ===  currentEditorId).videoUrl = videoUrl;

     sendMetaData(config.videoAndMetaData, { 
        ...markDownEditors,
        videoUrl 
     }); 
     break;

     default:
     break;
  }
}



export function videoObject( backEndRoute, videoMeta, videoFileName ) {
  return {
     url: backEndRoute + `/videos?_id=${videoMeta?.id}`, //request?.file?.originalname
     videoUrl: url.frontEndServerPrefix + `/videos/${videoFileName}`,
     videoAndMetaData: backEndRoute + `/${videoMeta?.id}`
  }
}



//test
export async function updateFileData( req, model, id ){
  try {
        const documentObjectToUpdate = await model.findById(mongoose.Types.ObjectId(id));
        let bodyData = Object.keys(req.body);
        bodyData.forEach(element => { 
           let arrg = ['_id', '__v'];
  
              // let arrg = [ '_id' ];
           if ( !arrg.includes(element)  ) {
              console.log('PUT - saveUpdatedData',element);
              documentObjectToUpdate[element] = req.body[element] 
           }  
        });
        console.log(documentObjectToUpdate);
        return await documentObjectToUpdate.update();  
  } catch ( error ) {
        console.log( error );
  }
   return;
}



export async function updatedData( req, model, id ){
    let bodyData = Object.keys(req.body);
    let tempObject = {};
    bodyData.forEach(element => {
    console.log(element);
    tempObject[element] = req.body[element] 
  });
  return await model.findOneAndUpdate( tempObject );
}



export const base64ToImageConverter = ( base64String, imageName, filePath ) => {
  try {
      console.log(' in base64ToImageConverter')
      //let ReadableData = require('stream').Readable;
      // let streamObj = new ReadableData();
      const imageBufferData = Buffer.from( base64String, 'base64');
      let streamObj = new Readable();
      streamObj.push( imageBufferData );
      streamObj.push( null );
      streamObj.pipe(fs.createWriteStream(filePath + `${imageName}.jpg`));
  } catch (error) {
      console.log(' in base64ToImageConverter error')
      console.log( error.message );
  }
}




async function getDocumentObjectToUpdate( requestBody, model, id ){

  let bodyData = Object.keys(requestBody);
   
  const documentObjectToUpdate = await model.findById(id);
  bodyData.forEach(element => {
     console.log(element);
     documentObjectToUpdate[element] = req.body[element] 
  });
     console.log(documentObjectToUpdate);
     return documentObjectToUpdate;
}


export const url = {
  BackeEndServerLessonPrefix : "http://localhost:9005/api/v1",
  frontEndServerPrefix : "http://localhost:3000"
}