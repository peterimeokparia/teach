// import moment from 'moment';
import moment from 'moment-timezone';

import {
serviceWorkerSupported,
send } from '../PushNotifications';

import e from 'cors';



let authToken = null;

export const setToken = token => {
  authToken = token;
}

export function postData(url = ``, data = {}) {
    return fetchWithData( url, data, 'POST')
}

export function putData(url = ``, data = {}) {
    return fetchWithData( url, data, 'PUT');
}

export function deleteData(url = ``, data = {}) {
    return fetchWithData( url, data, 'DELETE');
}

export const uploadFiles = ( selectedFiles, file, url, teachObjectName, typeOfUpload ) => {
    if ( ! file  ) return;

    if ( selectedFiles.length === 0 ) return;
    let formData = new FormData();
        formData.append('fileName', file?._id);
        formData.append('teachObjectName', teachObjectName);
        formData.append('typeOfUpload', typeOfUpload); 

    for( var x = 0; x < selectedFiles.length; x++ ) {
         formData.append('name', selectedFiles[x]?.name ); // might break with multi file upload - test
         formData.append('file', selectedFiles[x]);
    };
    return uploadContent(url, formData);
}

export const deleteFiles = ( file ) => {
    let url = routeUrl().DeleteFile;
    let formData = new FormData();
    formData.append('delete', file);
    return uploadContent(url, formData);
}

export const uploadVideos = ( videoData, externalId, videoNamePrefix ) => {
  let url = routeUrl().Uploads;
  let id = { id: videoData?.objectId, videoNamePrefix, externalId };
  let data = {  
    id: videoData?.objectId, 
    videoNamePrefix: videoData?.videoMetaData?.videoNamePrefix,
    externlId: videoData?.videoMetaData[ externalId ],
    videoName: videoData?.videoName,
    inputFieldId: videoData?.inputFieldId,
    metaData:  videoData?.videoMetaData
  }
  let formData = new FormData();
  formData.append('id', JSON.stringify(id));
  formData.append(videoNamePrefix, videoData?.videoMetaData?.videoNamePrefix);
  formData.append(externalId, videoData?.videoMetaData[ externalId ]);
  formData.append('data', JSON.stringify(data));
  formData.append('videoName', videoData?.videoName);
  formData.append('metaData', JSON.stringify( videoData?.videoMetaData ));
  formData.append('video', videoData?.videoBlob, videoData?.videoMetaData?._id);
  return uploadContent(url, formData);
}

export async function uploadContent(url, formData, method = `POST`) {
  let headers = new Headers();
  // headers.append('Content-Type', 'video/webm'); 
  // headers.append('Accept', 'video/webm');
  // headers.append('Content-Type', 'image/png'); 
  headers.append('Authorization',  authToken ? `Bearer ${authToken}` : undefined);
  return fetch(url, {
    method,
    headers,
    body: formData
  }).then(resp => {
    console.log('resp', resp);
    return resp;
  }).catch(err => { console.log(err);
    return err.message; 
  });
}

export const forceReload = () => {
    window.location.reload()
}

export function routeUrl(){
  return{
    DeleteFile: 'http://localhost:9005/api/v1/delete',
    Uploads: 'http://localhost:9005/api/v1/uploads'
  } 
}

async function fetchWithData( url =``, data = {}, method = 'POST') {
    let responseData = null;
      try {
        responseData = await fetch(url, {
          method,
          headers: {
          'Content-Type': 'application/json',
          Authorization: authToken ? `Bearer ${authToken}` : undefined
        },
          body: JSON?.stringify(data)
          // cache: "reload",
      } 
    );

    if ( responseData?.status >= 400 && responseData?.status < 600 ) {
        let response = await responseData?.json();
        if ( response?.msg ) {
          throw new Error("Bad Server Response."  + response?.msg ); 
        } else {
          throw new Error("Bad Server Response."  + response ); 
        }               
    }

    if ( ! responseData?.ok ) {   
        let response = await responseData?.json();
        if ( response?.msg ) {
          throw new Error( "Something went wrong"   + response?.msg ); 
        } else {
          throw new Error( "Something went wrong" + response ); 
        }
    } 
        
    
    } catch ( error ) {
      console.log( error );    
      throw Error(`${ error?.message }` )
    }
    return responseData?.json();
}


export const paymentStatus = { Approved: "approved", Denied: "denied"  };

export const randomIdGenerator = (min, max) => {
  return `${Math.random() * ( max - min ) + min}${Date.now()}`
}

export const getTimeZoneDateTime = ( dateTime ) => {
 let currentTimeZone = sessionStorage?.getItem('timeZone');
 return moment( dateTime )?.tz( currentTimeZone )
}