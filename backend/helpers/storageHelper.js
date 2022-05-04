import { 
Readable } from 'stream';

import axios from 'axios';
import mongoose from 'mongoose';
import fs from 'fs';
import bcrypt from 'bcrypt';
import webpush  from 'web-push';
import notificationModel from '../model/notificationModel.js';

export const sendMetaData = ( url, metaData ) => {
   return updateContent( url, metaData );
}
 
export async function getContent( url ){
  return axios.get( url );
}
 
export async function addContent( url, data = {}  ){
  return axios.post(url, data)
   .then(resp => {console.log(resp)})
    .catch(err => { console.log(err) })
}

export async function updateContent( url, data = {}  ){
   return axios.put(url, data)
    .then(resp => { 
       console.log(resp);
       return resp;
      })
     .catch(err => { 
        console.log(err); 
        return err;
      })
}

export function getPostData( req ) {
  let requestBodyParameters, requestBodyToPost = {};
  requestBodyParameters = Object.keys( req.body );
  requestBodyParameters?.forEach(element => {
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
  console.log('Debug: saveUpdateUserOnLogin')
  console.log(id)
  let existingUser = await model.findById( mongoose.Types.ObjectId(id) );
  let harshedPassword = existingUser[ 'password' ];
   if ( existingUser ) {
      const isMatch = await bcrypt.compare(req.body?.unHarshedPassword, harshedPassword);
    if ( !isMatch ) {
      return resp.status(400).json({ msg: err?.message });
    } else {
      try {
            let bodyData = Object.keys(req.body);
            bodyData?.forEach(element => { 
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
  console.log('saveUpdatedData')
  console.log(JSON.stringify(req.body));  
  let tempResponse = null;
  try {
        const documentObjectToUpdate = await model.findById(mongoose.Types.ObjectId(id));

        if ( documentObjectToUpdate ) {
          console.log('found document documentObjectToUpdate')
          console.log(JSON.stringify(documentObjectToUpdate));  
        }

        console.log(`documentObjectToUpdate${ documentObjectToUpdate }`);  

        if ( documentObjectToUpdate === null || documentObjectToUpdate === undefined ) {
          return Error(`Problem with update operation: documentObjectToUpdate is null || undefined`);
        }

        let bodyData = Object.keys(req.body);

        bodyData?.forEach(element => {

          let arrg = ['_id', '__v'];

           if ( !arrg.includes(element)  ) {
             // 4 debugging
              // if ( !arrg.includes(element)  ) {
            console.log(`PUT - saveUpdatedData: modelName=${ model.collection.collectionName }`, element);   
            documentObjectToUpdate[element] = req.body[element] 
          }             
      });

      console.log(`after documentObjectToUpdate:${JSON.stringify(documentObjectToUpdate)}`);  
      tempResponse = await documentObjectToUpdate.save();
     
    } catch ( error ) {
      return Error(`Problem with update operation: ${error?.message} ${error}`);
  }

  console.log(`PUT - saveUpdatedData:${JSON.stringify(tempResponse)}`);    
  return tempResponse;
}

export const getVideoFileMeta = ( request ) => {
   let requestData = { }
   let idData = JSON.parse( request?.body?.id );
   let data = JSON.parse( request?.body?.data );
   let id = idData.id;
   let prefix = idData?.videoNamePrefix;
   let videoFileName = data?.videoFileName;

     switch (prefix) {
       case "LessonVideo":
       requestData = { 
         id, 
         prefix, 
         backendServerRoute: `${url.BackeEndServerLessonPrefix}/lessons`, 
         videoFileName
       };  
       break;
 
       case "QuestionVideoMultipleChoiceInputFields":
       requestData = { 
         id, 
         prefix, 
         backendServerRoute: `${url.BackeEndServerLessonPrefix}/questions`, 
         questionInputMeta: data.metaData,
         videoFileName
       };    
       break;

       case "QuestionVideoMarkDownEditors":
       requestData = { 
         id, 
         prefix, 
         backendServerRoute: `${url.BackeEndServerLessonPrefix}/questions`, 
         questionInputMeta: data.metaData,
         videoFileName
       };    
       break;

       case "OnlineQuestionVideoMarkDownEditors":
        requestData = { 
          id, 
          prefix, 
          backendServerRoute: `${url.BackeEndServerLessonPrefix}/onlinequestions`, 
          questionInputMeta: data.metaData,
          videoFileName 
        };    
        break;
       
        case "OnlineAnswerVideoMarkDownEditors":
        requestData = { 
          id, 
          prefix, 
          backendServerRoute: `${url.BackeEndServerLessonPrefix}/onlineanswers`, 
          questionInputMeta: data.metaData,
          videoFileName 
        };    
        break;

        case "OnlineAnswerVideoMarkDownEditorsRecordedBoard":
          requestData = { 
            id: data?.metaData?.current?._id, 
            prefix, 
            backendServerRoute: `${url.BackeEndServerLessonPrefix}/onlineanswers`, 
            questionInputMeta: data.metaData,
            videoFileName,
          };    
          break;
     
       default:
         break;
     }
     return requestData; 
 }
 
 export function sendResponseToStorage( response, meta, config ){ 
  let videoUrl, boardVideoUrl, markDownEditors, currentEditorId, currentFieldId;

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
     console.log('QuestionVideoMarkDownEditors')
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

     case "OnlineQuestionVideoMarkDownEditors": 
     console.log('OnlineQuestionVideoMarkDownEditors')
     videoUrl = config.videoUrl;     
     sendMetaData(
       config.videoAndMetaData, { 
        ...response.data[0],
        videoUrl 
     }); 
     break;

     case "OnlineAnswerVideoMarkDownEditors": 
     console.log('OnlineAnswerVideoMarkDownEditors')
     videoUrl = config.videoUrl;     
     sendMetaData(
       config.videoAndMetaData, { 
        ...response.data[0],
        videoUrl 
     }); 
     break;
     
     case "OnlineAnswerVideoMarkDownEditorsRecordedBoard": 
     console.log('OnlineAnswerVideoMarkDownEditorsRecordedBoard')
     boardVideoUrl = config.videoUrl;     
     sendMetaData(
       config.videoAndMetaData, { 
        ...response.data[0],
        boardVideoUrl 
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
        bodyData?.forEach(element => { 
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
    bodyData?.forEach(element => {
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
  bodyData?.forEach(element => {
     documentObjectToUpdate[element] = req.body[element] 
  });
  return documentObjectToUpdate;
}

export async function sendSubscriptions( user, request, payload, response ){
  let responseDataCollection = [];
     await user?.subscriptions?.forEach(  subscription => { 
      let result = webPushSendNotification( subscription, request, payload, response );
         try {

          if ( result ) {
            responseDataCollection.push( result );
          }

         } catch (error) {
          responseDataCollection.push( error );
         }
     });
     return responseDataCollection;
}

export async function webPushSendNotification( subscription, request, payload, response ){
 let resultAsObject = {};

 try {
     let sentNotification = await webpush.sendNotification(subscription, payload);
     if ( sentNotification ) {
         request.body.messages = [ ...request?.body?.messages, request?.body?.message ];
         let saveUpdate = await saveUpdatedData(request, notificationModel, request?.params?.Id);
         if ( saveUpdate ) {
            resultAsObject = { pushedData: sentNotification, savedData: saveUpdate }
         }
     }
 } catch ( error ) {
      getContent( `${url.BackeEndServerLessonPrefix}/notifications/subscribedUser/byId?userId=${request.params?.Id}` )
       .then( resp => { 

          let subscriberInfo = resp?.data;
          let subscriptions =  subscriberInfo?.subscriptions.filter(sub => sub.endpoint !== error?.endpoint )

          addContent(
            `${url.BackeEndServerLessonPrefix}/retryfailedonlinequestionspushnotificationsqueue/push`, 
              { 
                notificationType: 'Push',
                sendFailureTime: Date.now(),
                retryTime: Date.now(),
                retryCount: 0,
                errorStatusCode: error?.statusCode,
                error: JSON.stringify( error ),
                failedNotificationObject: JSON.stringify({ subscription,  payload }),
                userId: subscriberInfo?.userId,
                operatorId: subscriberInfo?.operatorId
             }
            ).then(resp => { 
              console.log('payloadsentNotificationupdateContent')
              console.log( resp ) 
            }).catch(error => { 
              console.log('payloadsentNotificationupdateContent')
              console.log( error ) 
            });

            let failedPushErrorStatusCode = [400, 404, 502 ]
            if ( failedPushErrorStatusCode.includes( error?.statusCode )  ) {
              console.log('payloadsentNotificationupdateContent')
              updateContent(
                `${url.BackeEndServerLessonPrefix}/notifications/subscribe/user/${request.params?.Id}`, 
                { ...subscriberInfo, subscriptions }
              );
            };  
       })
       .catch( error => { 
        console.log('payloadsentNotificationupdateContent')
        console.log( error ) 
      });
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


