import { postData, putData, deleteData } from '../course/helpers/serverHelper';


const PREFIX = "/api";


export const createStream = ( title, description ) => {
  return postData(PREFIX + '/streams', {
    title,
    description
  });
};



export const getStream = ( lessonId ) => {
  return fetch(PREFIX + `/streams?lessonId=${lessonId}` )
    .then(handleErrors)
     .then(response => response.json());
}


export const removeStream = stream => {
  return deleteData(PREFIX + `/streams/${ stream.id }`);
}



export const getStreams = () => {
    return fetch(PREFIX + '/streams')
     .then(handleErrors)
       .then(response => response?.json() );
}




export const updateStream = ( stream ) => {
  return putData(PREFIX + `/streams/${ stream.id }`, stream );
};






function handleErrors(response){
   
   if ( ! response.ok ){
      
      return response.json()
       .then( error =>  { throw new Error(  error.message ) });
   }
   
   return response;
}

