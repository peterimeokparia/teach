import React, { 
useState, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
toast } from 'react-toastify';

import { 
uploadAvatarImages } from '../../actions';

import Avatar from 'react-avatar-edit'

import './FileUpload.css'



const ImageComponent = ({ 
      user, 
      imageSrc, 
      url, 
      teachObjectName, 
      editMode,
      uploadAvatarImages
     }) => {
     

 const [ imagePreview,  setImagePreview ] = useState( null );


 const onClose = () => {

    setImagePreview( null );
 }



 const onCrop = imagePreview => {

    setImagePreview( imagePreview );
 }



 const onBeforeFileLoad = event => {

    try {

        if (! event ) return;

        if ( event.target.files[0].size > 71680 ) {

            toast.error("Please click on the lesson link.")

             event.target.value = "";
        }

        
        uploadAvatarImages( event.target.files, user, url, teachObjectName );

                
    } catch (error) {

      console.log(error);
    }          
 }





    return (
        <div> 
           
         <div>
        {
             (editMode) ? (
                         <div className="avatar-img-upload">   
                                <Avatar
                                        className="avatar-img-upload"
                                        width={170}
                                        height={195}
                                        onCrop={onCrop}
                                        onClose={onClose}
                                        onBeforeFileLoad={onBeforeFileLoad}
                                        src={imageSrc}
                                />

                            </div>    
                                
                            
                                ) 
                            : ( <div> 
                                <img className={"avatar-img-preview"} src={user?.files[0]} alt="Preview" />
                                     {/* <img src={imagePreview} alt="Preview" /> */}
                                </div>
                             )
        }
         </div>
        </div>
    )
}


export default connect( null, { uploadAvatarImages } )( ImageComponent );