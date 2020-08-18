 import React from 'react';
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
 
//https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
//https://fkhadra.github.io/react-toastify/introduction/

 export const Validations = {

    checkFormInputString: function ( fieldName, inputValue ) {
   
          if(!inputValue || inputValue === null || inputValue === '' || inputValue === undefined) {
              const msg = `Please enter a valid ${fieldName}`; // change
              console.log(msg);
            //toast.error(msg);
              Swal.fire(msg)
              return false;
          }
          return true;

    },

    checkFormInputNumber: function ( fieldName, inputValue ) {
   
        if(!inputValue || inputValue === null || inputValue === undefined || inputValue === '') {
            const msg = `Please enter a valid ${fieldName}`;
            // toast.error(msg);
            Swal.fire(msg)
            console.log(msg);
            return false;
        }
        return true;

  },

    maxSelectFile: function ( event ) {
        let files = event.target.files;
        if (files?.length > 3){
            const msg = "Only 3 images can be uploaded at one time";
            Swal.fire(msg)
            //toast.error(msg);
            event.target.value = null;
            console.log(msg);
            return false;
        };
        return true;
    }, 

    checkMimeType: function ( event ) {
        let files = event.target.files;
        let err = [];
        const types = ['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'video/webm', 'video/mp4', 'audio/mp4'];

        for(var x = 0; x < files.length; x++){

            if(types.every( type => files[x]?.type !== type)){
  
                err[x] = files[x]?.type + ' is not supported.  format\n'
            }
        };

        return ( err?.length > 0 ) ? displayErrorMessage(event, err, toast) :  true;
    },


    checkFileSize: function ( event ) {
        let files = event.target.files;
        let size = 15000;
        let err = [];
       
        for(var x = 0; x < files.length; x++){

            if( files[x]?.size > size ){
  
                err[x] = files[x]?.type + ' is too large. please pick a smaller file.  format\n'
            }
        };

        return ( err?.length > 0 ) ? displayErrorMessage(event, err, toast) :  true;
    },

    confirmDelete: function ( item ) {

        if ( window?.confirm( `Are you sure you want to delete ${item}?`)) {
            
            return true;
        } 
        return false;
    },

    warn: function ( message ) {

        // toast.warn(message);
        Swal.fire(message)
    },

    setErrorMessageContainer: function () {
        return(
            <div>
                <div>
                    <ToastContainer />
                </div>
            </div>
        )
    } 
 }


const displayErrorMessage = (event, err, toast) => {

    for(var x = 0; x < err?.length; x++){
        event.target.value = null;
        console.log(err[x]);
        // toast.error(err[x]);
        Swal.fire(err[x])
        return false;
    }
}





