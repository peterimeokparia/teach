import { useState } from 'react';

import { 
connect } from 'react-redux';

import { 
uploadFiles } from 'services/course/helpers/ServerHelper';

import {
Validations } from 'services/course/helpers/Validations';
import './style.css'

const SimpleUpload = ({ 
teachObject, 
fileUploadUrl, 
teachObjectName }) => {

const [ fileSelected,  selectFile ] = useState( null );

const onChangeHandler = event => {
    if ( Validations.maxSelectFile(event) && Validations.checkMimeType(event) && 
        Validations.checkMimeType(event) ) { selectFile(event.target.files); 
    }
}

const onClickHandler = () => {
    try {
        if ( fileSelected ){  
            uploadFiles( fileSelected, teachObject, fileUploadUrl, teachObjectName );
        }
    } catch (error) {
        console.log(error)
        }             
    }
    return ( <div></div>);
}

export default connect( null, uploadFiles )( SimpleUpload );