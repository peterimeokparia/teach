import { 
connect } from 'react-redux';

import { 
updateUser } from 'services/course/api';

import { 
forceReload } from 'services/course/helpers/ServerHelper';

import {     
getUserByEmail, 
saveUser} from 'services/course/actions/users';

import FileUpload from 'services/course/pages/components/FileUpload';
import ImageCrop from 'react-image-crop-component';
import 'react-image-crop-component/style.css';
import './style.css';

const ImageComponent = ({ 
user, 
imageSrc, 
url, 
editMode,
getUserByEmail,
saveUser
}) => {   
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

const onChangeHandler = event => {
    let avatarUrl, files = [];

    for (let index = 0; index < event.target.files.length; index++) {    
        avatarUrl = `http://localhost:3000/files/${event.target.files[index]?.name}`;       
        files = [avatarUrl, ...user?.files ];     
    }
    saveUser({ ...user, avatarUrl, files });
};

return  (editMode) ? <div className={""}>  
       <div className={"col"}>
       <div >
       <FileUpload 
            fileUploadUrl={url}
            onChangeHandler={onChangeHandler}
        />
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

async function getCurrentUser( email, password  ){  // remove & use getUserByEmail
    return await getUserByEmail( { email, password } )
     .then(user => {
        return user[0];
     }).catch(error => {
        return error;
    });
}

export default connect( null, { saveUser, getUserByEmail } )( ImageComponent );