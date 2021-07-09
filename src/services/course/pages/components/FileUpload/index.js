import { useState } from 'react';

import { 
connect } from 'react-redux';

import { 
uploadFiles } from  'Services/course/helpers/ServerHelper';

import { 
Validations } from  'Services/course/helpers/Validations';

import './style.css';

const FileUpload = ({ 
teachObject, 
fileUploadUrl, 
teachObjectName, 
typeOfUpload }) => {
const [ fileSelected,  selectFile ] = useState( null );
const onChangeHandler = event => {
    if ( Validations.maxSelectFile(event) && Validations.checkMimeType(event) &&    Validations.checkMimeType(event) ) { 
        selectFile(event.target.files);
    }
};

const onClickHandler = () => {
    try {
        if ( Validations.itemNotSelected( teachObject, "Please click on the lesson link before uploading a file.") ) {
            return;
        }
        if ( fileSelected ){  
            uploadFiles( fileSelected, teachObject, fileUploadUrl, teachObjectName, typeOfUpload );
        }
    } catch (error) {
        console.log(error);
    }          
};

return (
    <div class="container"> 
        <div className="files-file-Container">
        <div class="row"> 
        <div class="col-md-6">
            <form method="post" action="#" id="#">
            <div class="form-group files"> 
            <label>Upload lesson specific files </label>
            <input type="file" name="file" class="form-control" multiple onChange={onChangeHandler}></input>  
            </div> 
            <button type="button" class="button uploadBtn" onClick={onClickHandler}> Upload </button>     
            </form>      
        </div>
        {Validations.setErrorMessageContainer() }
        </div>
        </div>
    </div>
); };

export default connect( null, uploadFiles )( FileUpload );