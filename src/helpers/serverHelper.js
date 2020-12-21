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



export const uploadFiles = ( selectedFiles, file, url, teachObjectName ) => {

    if ( ! file  ) return;

    if ( selectedFiles.length === 0 ) return;


    let formData = new FormData();
        formData.append('fileName', file?._id);
        formData.append('teachObjectName', teachObjectName);

    for(var x = 0; x < selectedFiles.length; x++) {

        formData.append('file', selectedFiles[x]);
    };
    
    return uploadContent(url, formData);
}




export const deleteFiles = ( file ) => {
 
    let url = 'http://localhost:9005/api/v1/delete';

    let formData = new FormData();
    formData.append('delete', file);

    return uploadContent(url, formData);
}





 
export const uploadVideos = ( videoData ) => {

    let url = 'http://localhost:9005/api/v1/uploads';

    let formData = new FormData();
    formData.append('id', videoData?.videoMetaData[0]._id);
    formData.append('courseId', videoData?.videoMetaData[0].courseId);
    formData.append('video', videoData?.videoBlob, videoData?.videoMetaData[0]._id);

    return uploadContent(url, formData);
}




export const uploadContent = (url, formData, method = `POST`) => {

  let headers = new Headers();
  // headers.append('Content-Type', 'video/webm'); 
  // headers.append('Accept', 'video/webm');
  headers.append('Authorization',  authToken ? `Bearer ${authToken}` : undefined);

  return fetch(url, {
    method,
    headers,
    body: formData
  }) 
  .then(resp => {console.log('resp', resp) })
    .catch(err => console.log(err));
}



export const forceReload = () => {
    window.location.reload()
}




function fetchWithData( url =``, data = {}, method = 'POST') {
    return fetch(url, {
      method,
      headers: {
      'Content-Type': 'application/json',
      Authorization: authToken ? `Bearer ${authToken}` : undefined
      },
      body: JSON.stringify(data),
      // cache: "reload",
    } 
  ).then(response => { 

      if ( response?.status >= 400 && response?.status < 600 ) {

         throw new Error("Bad Server Response.");
      } 

      if ( ! response?.ok ) {
        
        throw new Error( "Something went wrong" + response?.json() ); 
      }

       return response.json() 

    }).catch(error => {

        console.log( error );

      return error?.message;
    })
}

