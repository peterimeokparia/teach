import React, { 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
uploadFiles, 
forceReload } from  '../../../../helpers/serverHelper';

import {
Validations } from  '../../../../helpers/validations';

import './FileUpload.css'



const FileUpload = ({ teachObject, fileUploadUrl, teachObjectName }) => {
     
 const [ fileSelected,  selectFile ] = useState( null );


 const onChangeHandler = event => {

    console.log( event.target.files )

    if ( Validations.maxSelectFile(event) && Validations.checkMimeType(event) &&    Validations.checkMimeType(event) ) { 
 
        selectFile(event.target.files);

    }
 }



 const onClickHandler = () => {

    try {


        if ( Validations.itemNotSelected( teachObject, "Please click on the lesson link before uploading a file.") ) {

         return;
        }


        if ( fileSelected ){  

             uploadFiles( fileSelected, teachObject, fileUploadUrl, teachObjectName );
              
            //  Swal.fire(
            //     { title: 'File uploaded.',  
            //       confirmButtonColor: '#673ab7'   
            //     }).then( selectFile( null )  ); 

        }
        
    } catch (error) {

      console.log(error);
    }          
 }

 
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
    )
}


export default connect( null, uploadFiles )( FileUpload );