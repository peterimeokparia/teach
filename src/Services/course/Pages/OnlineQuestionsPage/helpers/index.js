import {
elementMeta } from 'teach/src/services/course/pages/QuestionsPage/helpers';
  
export const upload_url = "http://localhost:9005/api/v1/fileUploads";

export async function uploadImageUrl( file, imageBlock, question, saveAction ) { // this behavior may have changed in the new Dante editor
await fetch( imageBlock?.img?.currentSrc )
        .then( result => result.blob())
        //.then( response => { uploadFiles([ response ], question, upload_url, "questions", file?.name,  null )
        //.then( resp => { console.log( resp ); } ); })
        .catch( error => { throw Error(`  ${error}`); });
        let inputFieldObject = JSON.parse( question )[ elementMeta.markDownContent ];

        Object.values(inputFieldObject).forEach( block => {
        if ( Object.keys( block ).length > 0 ) {
            block.find( obj => obj?.type === "image" && obj?.data?.url === imageBlock?.img?.currentSrc ).data.url = `http://localhost:3000/files/${ file?.name }`;
        } });
    
        question[ elementMeta.markDownContent ] = JSON.stringify( inputFieldObject );  
        saveAction( { ...question } );
};

export function Linkssss( selectedStudents, courseId ){
    return [ 
        { id: "SavedAnswers", title: "Saved Answers", path:`student/${ selectedStudents?._id }/savedanswers`, _id: selectedStudents?._id }, 
        { id: "Grades", title: "Grades", path:`student/${ selectedStudents?._id }/grades`, _id: selectedStudents?._id }, 
        { id: "Attendance", title: "Attendance", path: `student/${ selectedStudents?._id  }/attendance`, _id: selectedStudents?._id }, 
        { id: "Session", title: "Session", path: `student/${ selectedStudents?._id  }/sessions/courseId/${courseId}`, _id: selectedStudents?._id },
      ];
};

export function getOnlineQuestion( questions, courseId, onlineQuestionId ){
    let currentCourseQuestionCollection = questions?.filter( question => question?.courseId === courseId );
    let currentCourseQuestions = ( onlineQuestionId === undefined || !onlineQuestionId ) 
            ? currentCourseQuestionCollection
            : currentCourseQuestionCollection?.filter(question => question?._id === onlineQuestionId);

    return currentCourseQuestions
};