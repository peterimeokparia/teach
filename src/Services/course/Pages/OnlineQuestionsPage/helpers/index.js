import {
elementMeta } from 'Services/course/Pages/QuestionsPage/helpers';

import { 
uploadFiles } from 'Services/course/helpers/ServerHelper';
  
export const upload_url = "http://localhost:9005/api/v1/fileUploads";

export async function uploadImageUrl( file, imageBlock, question, saveAction ) { // this behavior may have changed in the new Dante editor
await fetch( imageBlock?.img?.currentSrc )
        .then( result => result.blob())
        .then( response => { uploadFiles([ response ], question, upload_url, "questions", file?.name,  null )
        .then( resp => { console.log( resp ); } ); })
        .catch( error => { throw Error(`  ${error}`); });
        let inputFieldObject = JSON.parse( question )[ elementMeta.markDownContent ];

        Object.values(inputFieldObject).forEach( block => {
        if ( Object.keys( block ).length > 0 ) {
            block.find( obj => obj?.type === "image" && obj?.data?.url === imageBlock?.img?.currentSrc ).data.url = `http://localhost:3000/files/${ file?.name }`;
        } });
    
        question[ elementMeta.markDownContent ] = JSON.stringify( inputFieldObject );  
        saveAction( { ...question } );
};