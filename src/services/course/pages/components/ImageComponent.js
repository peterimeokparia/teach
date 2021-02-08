import React, { 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
toast } from 'react-toastify';

import {
Validations } from  '../../../../helpers/validations';

import { 
forceReload } from '../../../../helpers/serverHelper';

import {
postData } from  '../../../../helpers/serverHelper';

import { 
updateUser } from '../../api';

import { 
uploadAvatarImages,
lastLoggedInUser,
getUserByEmail } from '../../actions';

import ImageCrop from 'react-image-crop-component';

import 'react-image-crop-component/style.css';

import './FileUpload.css'

import { json } from 'body-parser';

const ImageComponent = ({ 
user, 
imageSrc, 
url, 
typeOfUpload,
teachObjectName, 
editMode,
uploadAvatarImages,
lastLoggedInUser,
getUserByEmail
}) => {
     


const [ imagePreview,  setImagePreview ] = useState( null );

const [ fileSelected,  selectFile ] = useState( null );
    
    
const onChangeHandler = event => {

   console.log( event.target.files )

   if ( Validations.maxSelectFile(event) && Validations.checkMimeType(event) &&    Validations.checkMimeType(event) ) { 

       selectFile(event.target.files);

       uploadAvatarImages( event.target.files, user, url, teachObjectName, typeOfUpload );

       forceReload();

   }
}






const onCrop = (croppedImage) => {
    
   updateUser({ ...user, avatarUrl: croppedImage?.image })
   .then( resp => {

      if ( resp.includes("Bad Server Response.") || resp.includes("Something went wrong") ) {

          throw new Error( resp )
      }   

      getUserByEmail( resp );
   })
    .catch( error => {

       console.log( error );
    });
        
}


return  (editMode) ? <div className={"avatar-img-preview"}>  

                <div>
                    <form method="post" action="#" id="#">
                    <div> 
                    <input type="file" name="file"  multiple onChange={onChangeHandler}></input>  
                    </div> 
                </form>      
                </div>

               (<div className="image-crapper" style={{width: "300px", height: "300px"}}>


                <ImageCrop 
                    src={ user.files[0] }
                    setWidth={300} 
                    setHeight={300} 
                    square={false} 
                    resize={true}
                    border={"dashed #ffffff 2px"}
                    onCrop={onCrop}
                />

                </div>) 
            </div>
        
    
         : ( <div>

                   <img  className={"avatar-img-preview"} src={ imageSrc } alt="Preview" />

         </div> )
}


export default connect( null, { uploadAvatarImages, lastLoggedInUser, getUserByEmail } )( ImageComponent );