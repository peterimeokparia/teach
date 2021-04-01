import { 
Readable } from 'stream';

import axios from 'axios';
import mongoose from 'mongoose';
import fs from 'fs';
import bcrypt from 'bcrypt';
import webpush  from 'web-push';
import notificationModel from '../Model/notificationModel.js';


export const sendMetaData = ( url, metaData ) => {
   return updateContent( url, metaData );
 }
 
 export function getContent( url ){
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

export async function resetUserPassword( req,  resp,  model, id ) {
  const salt = await bcrypt.genSalt();
  let existingUser = await model.findById(mongoose.Types.ObjectId( id ));
   if ( existingUser ) {   
      try {
          existingUser[ 'password' ] = await bcrypt.hash( req.body.newUserPassword, salt );
        } catch (error) {
          return resp.status(400).json({msg: error });
        }
        return await existingUser.save();
    }
}

export async function saveUpdateUserOnLogin( req,  resp,  model, id ) {
  let existingUser = await model.findById( mongoose.Types.ObjectId(id) );
  let harshedPassword = existingUser[ 'password' ];
   if ( existingUser ) {
      const isMatch = await bcrypt.compare(req.body?.unHarshedPassword, harshedPassword);
    if ( !isMatch ) {
      return resp.status(400).json({ msg: err?.message });
    } else {
      try {
            let bodyData = Object.keys(req.body);
            bodyData.forEach(element => { 
            let arrg = ['_id', '__v'];
            if ( !arrg.includes( element )  ) {
               existingUser[element] = req.body[ element ] 
            }            
        });
        } catch (error) {   
          return resp.status(400).json({msg: error });
        }
        return await existingUser.save();
    }
   }
}

export async function verifyUser( existingUser, unHarshedPassword ) {
   let isMatch = false;
    if ( existingUser ) {
        isMatch = await bcrypt.compare(unHarshedPassword, existingUser?.password);
    }
    return isMatch;   
}

export async function saveUpdatedData( req, model, id ){
  try {
        const documentObjectToUpdate = await model.findById(mongoose.Types.ObjectId(id));
        let bodyData = Object.keys(req.body);
        bodyData.forEach(element => {
        let arrg = ['_id', '__v'];
        if ( !arrg.includes(element)  ) {
          console.log('PUT - saveUpdatedData',element);   
          documentObjectToUpdate[element] = req.body[element] 
        }            
      });
        return await documentObjectToUpdate.save();
     
  } catch ( error ) {
      return error;
  }
}

export const getVideoFileMeta = ( request ) => {
   let requestData = { }
   let idData = JSON.parse( request?.body?.id );
   let data = JSON.parse( request?.body?.data );
   let id = idData.id;
   let prefix = idData?.videoNamePrefix;
   let externalId = idData?.externalId;
 
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
     videoUrl = config.videoUrl   
     sendMetaData(
       config.videoAndMetaData, { 
        ...response.data[0],
        videoUrl 
     }); 
     break;

     case "QuestionVideoMultipleChoiceInputFields": 
     videoUrl = config.videoUrl   
     markDownEditors = response.data[0];
     currentFieldId = meta?.questionInputMeta?.inputFieldId;  
     markDownEditors.questions.
      find(question => question.questionNumber === meta?.questionInputMeta.currentQuestion?.questionNumber )
        .markDownEditorFormInputFields.find(field => field.questionNumber === meta?.questionInputMeta.currentQuestion?.questionNumber && 
        field?.id === currentFieldId).videoUrl = videoUrl;
     sendMetaData(
       config.videoAndMetaData, { 
        ...markDownEditors,
        videoUrl 
     }); 
     break;

     case "QuestionVideoMarkDownEditors": 
     videoUrl = config.videoUrl     
     markDownEditors = response.data[0];
     currentEditorId = meta?.questionInputMeta?.inputFieldId;  
     markDownEditors.questions.
      find(question => question.questionNumber === meta?.questionInputMeta.currentQuestion?.questionNumber &&
        question.id ===  currentEditorId).videoUrl = videoUrl;
     sendMetaData(
       config.videoAndMetaData, { 
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
     url: backEndRoute + `/videos?_id=${videoMeta?.id}`, 
     videoUrl: url.frontEndServerPrefix + `/videos/${videoFileName}`,
     videoAndMetaData: backEndRoute + `/${videoMeta?.id}`
  }
}

export async function updateFileData( req, model, id ){
  try {
        const documentObjectToUpdate = await model?.findById(mongoose.Types.ObjectId(id));
        let bodyData = Object.keys(req.body);
        bodyData.forEach(element => { 
        let arrg = ['_id', '__v'];
        if ( !arrg.includes(element)  ) {
            documentObjectToUpdate[element] = req.body[element] 
        }  
        });
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
    tempObject[element] = req.body[element] 
  });
  return await model.findOneAndUpdate( tempObject );
}

export const base64ToImageConverter = ( base64String, imageName, filePath ) => {
  try {
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
     documentObjectToUpdate[element] = req.body[element] 
  });
  return documentObjectToUpdate;
}

export async function sendSubscriptions(user, request, payload, response ){
  let responseDataCollection = [];
     await user?.subscriptions?.forEach( subscription => { 
       responseDataCollection.push( webPushSendNotification( subscription, request, payload, response ) );
     });
     return responseDataCollection;
}

export async function webPushSendNotification( subscription, request, payload, response ){
 let resultAsObject = {};
 try {
     let getSendNotification = await webpush.sendNotification(subscription, payload);
     if ( getSendNotification ) {
         request.body.messages = [ ...request?.body?.messages, request?.body?.message ];
         let saveUpdate = await saveUpdatedData(request, notificationModel, request?.params?.Id);
         if ( saveUpdate ) {
            resultAsObject = {pushedData: getSendNotification, savedData: saveUpdate }
         }
     }
 } catch (error) {
     throw Error(error);
 }
 return resultAsObject;
}

export const url = {
  BackeEndServerLessonPrefix : "http://localhost:9005/api/v1",
  frontEndServerPrefix : "http://localhost:3000"
}

export const vapidKeys = {
  publicVapidKey: 'BJvqz0UAiX-m62ElxLfR-g8kjkuUmos3-YJx9JwEoMxnJzkVYzQzOJcAdr3zkLa3D8Lbv7D3-y8RuqZuLFKAG9M',
  privateVapidKey: 'k5c3sss-1XauZuaDFvHaixOo2xWechDRQBP7LbQsX8U'
};


