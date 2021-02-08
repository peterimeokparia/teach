import React, { 
    useState } from 'react';
    
    import { 
    connect } from 'react-redux';
    
    import { 
    uploadFiles, 
    forceReload } from  '../../../../helpers/serverHelper';
    
    import {
    Validations } from  '../../../../helpers/validations';
    
    // import './SimpleFileUpload.css'
    
    
    
    const SimpleUpload = ({ 
        
    teachObject, 
    fileUploadUrl, 
    teachObjectName }) => {
         

     const [ fileSelected,  selectFile ] = useState( null );
    
    
     const onChangeHandler = event => {
    
        console.log( event.target.files )
    
        if ( Validations.maxSelectFile(event) && Validations.checkMimeType(event) &&    Validations.checkMimeType(event) ) { 
     
            selectFile(event.target.files);
    
        }
     }
    
    
    
     const onClickHandler = () => {
    
        try {
    
    
            // if ( Validations.itemNotSelected( teachObject, "Please click on the lesson link before uploading a file.") ) {
    
            //  return;
            // }
    
    
            if ( fileSelected ){  
    
                 uploadFiles( fileSelected, teachObject, fileUploadUrl, teachObjectName );
      
            }
            
        } catch (error) {
    
          console.log(error);
        }          
     }
    
     return ( <div></div>);
     
        return (
            <div class="container"> 
                <div> 
                <div>
                    <form method="post" action="#" id="#">
                    <div> 
                    <input type="file" name="file"  multiple onChange={onChangeHandler}></input>  
                    </div> 
                    <button type="button" class="button uploadBtn" onClick={onClickHandler}> Upload </button>     
                    </form>      
                </div>
                {Validations.setErrorMessageContainer() }
                </div>
            </div>
        )
    }
    
    
    export default connect( null, uploadFiles )( SimpleUpload );