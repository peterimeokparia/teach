import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import { uploadFiles } from '../actions';
import { uploadFiles } from  '../../../helpers/serverHelper';
import { Validations } from  '../../../helpers/validations';
import './FileUpload.css'


const FileUpload = ({ lesson }) => {
     
 const [ fileSelected,  selectFile ] = useState( null );


 const onChangeHandler = event => {

    console.log( event.target.files )

    if ( Validations.maxSelectFile(event) && Validations.checkMimeType(event) &&    Validations.checkMimeType(event) ) { 
 
        selectFile(event.target.files);

    }
 }



 const onClickHandler = () => {

    try {

        if ( fileSelected ){

             uploadFiles( fileSelected, lesson );

        }
        
    } catch (error) {

        console.log(error);
    }
          
 }

 
    return (
        <div class="container"> 
            <div class="row"> 
            <div class="col-md-6">
                <form method="post" action="#" id="#">

                <div class="form-group files"> 

                <label>Upload Your File </label>
                <input type="file" name="file" class="form-control" multiple onChange={onChangeHandler}></input>  
                </div> 
                <button type="button" class="button uploadBtn" onClick={onClickHandler}> Upload </button>     
                </form>      
            </div>
            {Validations.setErrorMessageContainer() }
            </div>
        </div>
    )
}


export default connect( null, uploadFiles )( FileUpload );