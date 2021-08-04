import { 
ToastContainer, 
toast } from 'react-toastify';

import Swal from 'sweetalert2';

export const Validations = {
    checkFormInputString: function ( fieldName, inputValue ) {
        if(!inputValue || inputValue === null || inputValue === '' || inputValue === undefined) {
            const msg = `Please enter a valid ${fieldName}`; // change

            console.log(msg);
            Swal.fire(msg);
            return false;
        }
        return true;
    },
    checkFormInputNumber: function ( fieldName, inputValue ) {
        if(!inputValue || inputValue === null || inputValue === undefined || inputValue === '') {
            const msg = `Please enter a valid ${fieldName}`;

            Swal.fire(msg);
            console.log(msg);
            return false;
        }
        return true;
    },
    maxSelectFile: function ( event ) {
        let files = event?.target?.files;

        if ( !files ) {
            const msg = "No image(s) selected.";

            Swal.fire(msg);
            return false;
        }
        if (files?.length > 3){
            const msg = "Only 3 images can be uploaded at one time";

            Swal.fire(msg);
            event.target.value = null;
            console.log(msg);
            return false;
        };
        return true;
    }, 
    checkMimeType: function ( event ) {
        let files = event?.target?.files;

        if ( !files ) {
            const msg = "No image(s) selected.";

            Swal.fire(msg);
            return false;
        }

        let err = [];
        const types = ['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'video/webm', 'video/mp4', 'audio/mp4'];

        for(let index = 0; index < files.length; index++){
            if(types.every( type => files[index]?.type !== type)){
                err[index] = files[index]?.type + ' is not supported.  format\n';
            }
        };
        return ( err?.length > 0 ) ? displayErrorMessage(event, err, toast) :  true;
    },
    checkFileSize: function ( event ) {
        let files = event?.target?.files;

        if ( !files ) {
            const msg = "No image(s) selected.";
            
            Swal.fire(msg);
            return false;
        }
        let size = 15000;
        let err = [];

        for(let index = 0; index < files.length; index++){
            if( files[index]?.size > size ){
                err[index] = files[index]?.type + ' is too large. please pick a smaller file.  format\n';
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
        Swal.fire(message);
    },
    toastWarning: function ( message ) {   
        toast.warn(message);   
    },
    duplicateCheck: function ( item, collection, description, propertyName ) {
        if( collection?.find( record => record[propertyName] === item) ) {
            const msg = `${item} exists. Please use a unique ${description}`;

            Swal.fire({
                title: msg,
                confirmButtonText: 'OK',
                confirmButtonColor: '#673ab7'
            });
            console.log(msg);
            return true;
        }
        return false;
    },
    itemNotSelected: function ( item, message ) {
        if( item === undefined )  {
            const msg = message;

            Swal.fire({
                title: msg,
                confirmButtonText: 'OK',
                confirmButtonColor: '#673ab7'
            });
            console.log(msg);
            return true;
        }
        return false;
    },
    setErrorMessageContainer: function () {
        return(
            <div>
                <div>
                    <ToastContainer />
                </div>
            </div>
        );
    } 
 };

const displayErrorMessage = (event, err, toast) => {
   for(let index = 0; index < err?.length; index++){
       event.target.value = null;
       console.log(err[index]);
       Swal.fire(err[index]);
       return false;
   }
};





