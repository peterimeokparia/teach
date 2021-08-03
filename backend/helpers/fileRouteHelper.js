import { 
sendMetaData, 
getContent, 
base64ToImageConverter,
url } from '../helpers/storageHelper.js';



fileRoute.post('/croppedAvatarImage',  ( request, response ) => {
   
    let teachConfig = teachObject( request );

    console.log('in cropped cropped')
    
    try {
       
      if ( request.body.base64ImageUrl ) {

         base64ToImageConverter( request.body.base64ImageUrl, request.body?.fileName, request.body?.filePath );
         return response.status( 200 ).json( resp );  
      }  
       
    } catch (error) {
      
      return response.status( 400 ).json( { error } );   
    }
    

   if ( teachConfig.objectMetaData ) {

      getContent( teachConfig.objectUrl )
      .then( user  =>  { 

      sendMetaData( teachConfig.objectMetaData, {          
         ...user?.data[0],
         avatarUrl: request.body?.croppedImageUrl
      });
         
         files = [];

         console.log( resp );
         return response.status( 200 ).json( resp );  
      })
      .catch( err => { 
         
         console.log( err );
         return response.status( 400 ).json( { err } );   
      
      });
   }  

});