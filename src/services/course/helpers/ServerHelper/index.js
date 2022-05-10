import moment from 'moment-timezone';

let authToken = null;

export const setToken = token => {
  authToken = token;
};

export function getRequest(url = ``, data = {}){
  return fetchWithHeaders( url);
}

export function postData(url = ``, data = {}) {
    return fetchWithData( url, data, 'POST');
}

export function putData(url = ``, data = {}) {
    return fetchWithData( url, data, 'PUT');
}

export function deleteData(url = ``, data = {}) {
    return fetchWithData( url, data, 'DELETE');
}

export const deleteFiles = ( file ) => {
    let url = routeUrl().DeleteFile;
    let formData = new FormData();
    formData.append('delete', file);
    return uploadContent(url, formData);
};

export const uploadVideos = ( videoData, externalId, videoNamePrefix ) => {
  let url = routeUrl().Uploads;
  let id = { id: videoData?.objectId, videoNamePrefix, externalId };
  let data = {  
    id: videoData?.objectId, 
    videoNamePrefix,
    // externlId: videoData?.videoMetaData[ externalId ],
    videoName: videoData?.videoName,
    inputFieldId: videoData?.inputFieldId,
    metaData:  videoData?.videoMetaData,
    videoFileName: ( videoData?.eventId !== undefined ) ? `${videoNamePrefix}_${videoData?.objectId}.webm` : `${videoNamePrefix}_${Date.now()}_${videoData?.videoMetaData[ externalId ]}_${videoData?.objectId}_${Math.floor(Math.random() * Math.floor(9000))}.webm`
    // videoFileName: `${videoData?.videoMetaData?.videoNamePrefix}_${Date.now()}_${videoData?.videoMetaData[ externalId ]}_${videoData?.objectId}_${Math.floor(Math.random() * Math.floor(9000))}.webm`
  };

  let formData = new FormData();
  formData.append('id', JSON.stringify(id));
  formData.append(videoNamePrefix, videoData?.videoMetaData?.videoNamePrefix);
  formData.append('data', JSON.stringify(data));
  formData.append('videoName', videoData?.videoName);
  formData.append('metaData', JSON.stringify( videoData?.videoMetaData ));
  formData.append('video', videoData?.videoBlob, videoData?.videoMetaData?._id);
  uploadContent(url, formData);
  return data?.videoFileName;
};

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
    return resp;
  }).catch(err => { console.log(err);
    return err.message; 
  });
}

export const forceReload = () => {
    window.location.reload();
};

export function routeUrl(){
  return{
    DeleteFile: 'http://localhost:9005/api/v1/delete',
    Uploads: 'http://localhost:9005/api/v1/uploads'
  }; 
}

async function fetchWithHeaders( url =``) {
  return await fetch(url, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken ? `Bearer ${authToken}` : undefined,
      }
    } 
  );
};

async function fetchWithData( url =``, data = {}, method = 'POST') {
    let responseData = null;

      try {
        responseData = await fetch(url, {
          method,
          headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken ? `Bearer ${authToken}` : undefined,
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
    }; 
    } catch ( error ) {
      console.log( error );    
      throw Error(`${ error?.message }` );
    }
    return responseData?.json();
}

export const paymentStatus = { Approved: "approved", Denied: "denied"  };

export const randomIdGenerator = (min, max) => {
  return `${Math.random() * ( max - min ) + min}${Date.now()}`;
};

export const getTimeZoneDateTime = ( dateTime ) => {
 let currentTimeZone = sessionStorage?.getItem('timeZone');
    return moment( dateTime )?.tz( currentTimeZone );
};

export const setItemInSessionStorage = (key, item) => {
  if ( item === null || item === "" ) return;
  sessionStorage.setItem(key, JSON.stringify(item));
};

export const getItemFromSessionStorage = (key) => {
  return JSON.parse( sessionStorage.getItem(key) );
};