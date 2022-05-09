import {
elementMeta  } from 'services/course/pages/QuestionsPage/components/MultiEditorComponent/helpers/node_modules/Services/course/Pages/QuestionsPage/helpers';

const upload_url = "http://localhost:9005/api/v1/fileUploads";

async function uploadImageUrl(file, imageBlock, element, currentLessonQuestions, saveAction) {
  //remove
  let markDownEditors = null;
  
  await fetch( imageBlock?.img?.currentSrc )
        .then( result => result.blob())
        // .then( response => { uploadFiles([ response ], currentLessonQuestions, upload_url, "questions", file?.name,  null )
        // .then( resp => { console.log( resp ); }); })
        .catch( error => { console.log( error ); });

  let inputFieldObject = JSON.parse(  markDownEditors.find(obj => obj?.id === element?._id  )[ elementMeta.markDownContent ] );

  Object.values(inputFieldObject).forEach( block => {
    if ( Object.keys( block ).length > 0 ) {
       block.find( obj => obj?.type === "image" && obj?.data?.url === imageBlock?.img?.currentSrc ).data.url = `http://localhost:3000/files/${ file?.name }`;
    } });

  markDownEditors.find( obj => obj?.id === element?._id   )[ elementMeta.markDownContent ] = JSON.stringify( inputFieldObject ); 

  saveAction( markDownEditors );
};


export function savedQuestionsExist( questions ) {
  return questions?.length > 0;
};