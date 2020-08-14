
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



export const uploadFiles = ( selectedFiles, lesson ) => {

    let url = 'http://localhost:9005/fileUploads';

    let formData = new FormData();
        formData.append('fileName', lesson?.id?.toString());

    for(var x = 0; x< selectedFiles.length; x++) {

        formData.append('file', selectedFiles[x]);
    };
    

    return uploadContent(url, formData);
}


export const deleteFiles = ( file ) => {
 
let url = 'http://localhost:9005/delete';

let formData = new FormData();
formData.append('delete', file);

return uploadContent(url, formData);;
}


 
  export const uploadVideos = ( videoData ) => {

    let url = 'http://localhost:9005/uploads';

    let formData = new FormData();
    formData.append('id', videoData?.videoMetaData[0].id.toString());
    formData.append('courseId', videoData?.videoMetaData[0].courseId.toString());
    formData.append('video', videoData?.videoBlob, videoData?.videoMetaData[0].id.toString());

     return uploadContent(url, formData);
  }



  const uploadContent = (url, formData, method = `POST`) => {
  
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



function fetchWithData( url =``, data = {}, method = 'POST') {
     return fetch(url, {
        method,
        headers: {
        'Content-Type': 'application/json',
        Authorization: authToken ? `Bearer ${authToken}` : undefined
        },
        body: JSON.stringify(data)
        // cache: "reload",
     } 
    ).then(response => response.json() )

}




// export const uploadVideos = (videoData) => {

//     let url = 'http://localhost:9005/uploads';
//     let headers = new Headers();
//     // headers.append('Content-Type', 'video/webm'); 
//     // headers.append('Accept', 'video/webm');
//     headers.append('Authorization',  authToken ? `Bearer ${authToken}` : undefined);

//     console.log('lessonId lessonId lessonId', videoData)
  
//     let formData = new FormData();
//     formData.append('fname', videoData?.videoMetaData[0].id.toString());
//     formData.append('video', videoData?.videoBlob, videoData?.videoMetaData[0].id.toString());
    
//     return fetch(url, {
//       method: 'POST',
//       headers,
//       body: formData
//    }) 
//     .then(resp => {console.log('resp', resp) })
//      .catch(err => console.log(err));
//   }

