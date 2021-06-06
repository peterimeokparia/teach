import 
React, { 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
Validations } from  'Services/course/helpers/Validations';

import { 
updateUser } from 'Services/course/Api';

import { 
forceReload } from 'Services/course/helpers/ServerHelper';

import {
uploadAvatarImages,       
getUserByEmail } from 'Services/course/Actions/Users';

import ImageCrop from 'react-image-crop-component';
import 'react-image-crop-component/style.css';
import './style.css';

const ImageComponent = ({ 
user, 
imageSrc, 
url, 
typeOfUpload,
teachObjectName, 
editMode,
uploadAvatarImages,
getUserByEmail,
}) => {
const [ fileSelected,  selectFile ] = useState( null );
    
const onChangeHandler = event => {
   if ( Validations.maxSelectFile(event) && Validations.checkMimeType(event) &&    Validations.checkMimeType(event) ) { 
       selectFile(event.target.files);
       uploadAvatarImages( event.target.files, {...user, avatarUrl: `http://localhost:3000/files/${fileSelected[0].name}`}, url, teachObjectName, typeOfUpload );
   }
};

async function onCrop( croppedImage ) {
let updatedUser, getUser =  null;

try {
    updatedUser =  await updateUser({ ...user, avatarUrl: croppedImage?.image });
    if ( updatedUser.includes("Bad Server Response.") || updatedUser.includes("Something went wrong") ) {
        throw new Error( updatedUser );
    } else {
        getUser = await getCurrentUser( updatedUser?.email, updatedUser?.password  );

        if ( getUser ) {
             forceReload();   
        }
    }   
} catch (error) {
    console.log( error );
}

forceReload();   
 return getUserByEmail;
}
return  (editMode) ? <div className={""}>  
       <div className={"col"}>
       <div >
            <form method="post" action="#" id="#">
                <div> 
                <input type="file" name="file"  multiple onChange={onChangeHandler}></input>  
                </div> 
            </form>      
                <ImageCrop 
                    src={ user.files[0] }
                    setWidth={300} 
                    setHeight={300}
                    resize={true}
                    border={"dashed #ffffff 2px"}
                    onCrop={onCrop}
                />
            </div>
       </div>
    </div>
    : ( <div>
        <img  className={"avatar-img-preview"} src={ imageSrc } alt="Preview" />
    </div> );
};

async function getCurrentUser( email, password  ){
    return await getUserByEmail( { email, password } )
     .then(user => {
        return user[0];
     }).catch(error => {
        return error;
    });
}

export default connect( null, { uploadAvatarImages, getUserByEmail } )( ImageComponent );